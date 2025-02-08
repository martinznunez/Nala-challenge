import { Edge } from "react-flow-renderer";
import { CustomNode, CustomNodeType, GroupNode, TierNode } from "../../../globalTypes/typesNodes";
import { findTierNode } from "../workflowHelpers/workflowHelpers";

type UpdateTierMutate = (tierId: string, newName: string) => void;
type UpdateNodeMutate = (id: string, label: string, employees: number) => void;
type DeleteNodeMutate = (nodeId: string) => void;
type CreateNodeMutate = (group: GroupNode, node: CustomNodeType, tier: TierNode, edge: Edge) => void;
type updateNodeGroupMutate = (nodeId: string, targetGroupId: string, relativePosition: { x: number, y: number }, updatedEdges: Edge []) => void;


export const handleUpdateTier = (nodes: CustomNode[], updateTierMutate: UpdateTierMutate) => 
  async (tierId: string): Promise<boolean> => {
    const tierNode = findTierNode(nodes, tierId);
    if (!tierNode) return false;

    const newName = prompt("Enter new tier name:", tierNode.data.tierName as string)?.trim();
    if (!newName || newName === tierNode.data.tierName) return false;

    updateTierMutate(tierId, newName);
    return true;
  };

export const handleUpdateNode = (updateNodeMutate: UpdateNodeMutate) => 
  async (id: string, label: string, employees: number): Promise<void> => {
    updateNodeMutate(id, label, employees);
  };

export const onDeleteNode = (deleteNodeMutate: DeleteNodeMutate) => 
  async (nodeId: string): Promise<void> => {
    deleteNodeMutate(nodeId);
  };

export const createCustomNodesFetch = (createNodeMutate: CreateNodeMutate) => 
  async (group: GroupNode, node: CustomNodeType, tier: TierNode, edge: Edge): Promise<void> => {
    createNodeMutate(group, node, tier, edge);
  };


export const createNewPosition = (updateNodeGroupMutate: updateNodeGroupMutate) => 
    async (nodeId:string,targetGroupId:string , relativePosition:{x:number,y:number}, updatedEdges:Edge []): Promise<void> => {
      updateNodeGroupMutate(nodeId,targetGroupId,relativePosition,updatedEdges );
    };
  
