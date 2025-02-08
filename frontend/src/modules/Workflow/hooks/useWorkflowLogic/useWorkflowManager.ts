import { useState, useCallback, useRef } from "react"
import {  useReactFlow } from "@xyflow/react";
import {  Edge } from "react-flow-renderer";

import { findGroupIndex, findParentNode, findTargetGroup } from "../../../utils/workflowHelpers/workflowHelpers"
import { useNodesContext } from "../../../../contexts/NodesContext"

import { CustomNode, CustomNodeType, ModalStateEditions, NodeState, RelatedNode } from "../../../../globalTypes/typesNodes";

import { getFlowPosition, restoreNodePosition } from "../../../utils/flowPosition/flowPositionUtils";
import { createCustomNodesFetch, createNewPosition, handleUpdateNode, handleUpdateTier, onDeleteNode } from "../../../utils/nodeMutations/nodeMutations";
import { useNodeMutations } from "../../../../hooks/useNodeMutations";
import { handlerCreateGroupNodes } from "../../utils/createGroupNodesHandler";
import { disconnectionHelpers } from "../../utils/disconnectionHelpers";


export const useWorkflowManager = () => {
  const { getViewport } = useReactFlow();
  const { nodes, setNodes, edges, setEdges, onNodesChange } = useNodesContext();
  const { updateTierMutate, deleteNodeMutate, updateNodeMutate, createNodeMutate,updateNodeGroupMutate } = useNodeMutations(setNodes, setEdges);
  const [modalResolve, setModalResolve] = useState<((value: RelatedNode) => void) | null>(null);
  
  const originalPositionRef = useRef<{ [key: string]: { x: number; y: number } }>({});
  const handleReconnection = useCallback(() => new Promise<RelatedNode>((resolve) => setModalResolve(() => resolve)), []);

  const [modalState, setModalState] = useState<ModalStateEditions>({
    open: false,
    state: null, 
    type: '',
    lastNodeId: null,
    lastPosition: null
  });

  const handleClickReconnection = useCallback(
    (selectedNode: RelatedNode) => {
      if (modalResolve) {
        modalResolve(selectedNode)
        setModalResolve(null)
      }
    },
    [modalResolve],
  )

   const handleUpdateTierHandler = handleUpdateTier(nodes, updateTierMutate);

   const handleUpdateNodeHandler = handleUpdateNode(updateNodeMutate);

   const onDeleteNodeHandler = onDeleteNode(deleteNodeMutate);

   const createCustomNodesFetchHandler = createCustomNodesFetch(createNodeMutate);

   const updatePositionHandler = createNewPosition(updateNodeGroupMutate);


   const onNodeDragStart = useCallback((event: React.MouseEvent, node: CustomNode) => {
    originalPositionRef.current[node.id] = { ...node.position };
  
   }, []);
  

  const handleDisconnectionCallback = useCallback(
    async (node: CustomNodeType, edges: Edge[], nodes: CustomNode[], originalPosition: { x: number; y: number }, handleReconnection: () => Promise<Edge | null>, targetGroupId:string): Promise<Edge[]>   => {
      return  disconnectionHelpers(node, edges, nodes, setModalState, originalPosition, handleReconnection,targetGroupId);
    },
    []
  );
  
  
   const updateNodeGroup = async ( node: CustomNodeType,targetGroup: CustomNode,   flowPosition: { x: number; y: number }, updatedEdges: Edge[]
    ) => {
      const relativePosition = {
        x: flowPosition.x - targetGroup.position.x,
        y: 20, 
      };
    

    await updatePositionHandler(node.id,targetGroup.id, relativePosition, updatedEdges)
  };


   const handlerCreateGroupNodesCallback = useCallback(
    async (parentId: string, division: string) => {
      await handlerCreateGroupNodes(nodes, parentId, division, createCustomNodesFetchHandler);
    },
    [nodes, createCustomNodesFetchHandler]
  );
  

 const handleNodeDragStop = async (event: React.DragEvent, node: CustomNodeType) => {
  const originalPosition = originalPositionRef.current[node.id];
  const flowPosition = getFlowPosition(event, getViewport());
  const currentGroupIndex = findGroupIndex(nodes, node?.parentId);
  
  if (currentGroupIndex === -1) return

  const targetGroup = findTargetGroup(nodes, flowPosition);
  
  if (targetGroup?.id === "parentA") return restoreNodePosition(setNodes, node.id, originalPosition);
  
  if (targetGroup && findGroupIndex(nodes, targetGroup.id) > currentGroupIndex) return restoreNodePosition(setNodes, node.id, originalPosition);
  
  let updatedEdges = edges; 
  
  if (targetGroup && findGroupIndex(nodes, targetGroup.id) < currentGroupIndex) {
    if (!window.confirm("⚠️ Se va a realizar una desconexión. ¿Deseas continuar?")) {
      return restoreNodePosition(setNodes, node.id, originalPosition);
    }
    updatedEdges = await handleDisconnectionCallback(node, edges, nodes, originalPosition, handleReconnection,targetGroup.id);
  }

  if (targetGroup && targetGroup.id !== node.parentId) {
    await updateNodeGroup(node, targetGroup, flowPosition, updatedEdges);
  } else {
    return null
  }
};
 
const handleEditNode = useCallback((id: string) => {
  const nodeEdition = findParentNode(nodes, id);

  if (nodeEdition) {
   
    const nodeState: NodeState = {
      ...nodeEdition,
      type: nodeEdition.type || 'default',  
    };
    setModalState({ open: true, state: nodeState,type:'nodeEdition' });
  }
}, [nodes]);
  

  return {
    nodes,
    edges,
    setNodes,
    handleUpdateTierHandler,
    onDeleteNodeHandler,
    handlerCreateGroupNodesCallback,
    handleEditNode,
    setModalState,
    modalState,
    onNodesChange,
    handleUpdateNodeHandler,
    handleNodeDragStop,
    onNodeDragStart,
    handleClickReconnection
  }
}
