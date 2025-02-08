import { Edge } from "react-flow-renderer";
import { CustomNode, CustomNodeType, ModalStateEditions } from "../../../globalTypes/typesNodes";

export const disconnectionHelpers = async (
 node: CustomNodeType,
 edges: Edge[],
 nodes: CustomNode[],
 setModalState: (modalState: ModalStateEditions) => void,
 originalPosition: { x: number; y: number },
 handleReconnection: () => Promise<Edge | null>,
 targetGroupId:string
): Promise<Edge[]> => {
  const connectedEdge = edges.find(edge => edge.source === node.id || edge.target === node.id);
  
  if (!connectedEdge) return edges;
  
  const groups = nodes.filter((node) => node.type === 'group')
  
  const groupToConnectIndex = groups.findIndex((group) => group.id === targetGroupId) - 1
  
  const groupToConnect = groups[groupToConnectIndex]
    
  const originalSource = connectedEdge.source === node.id ? connectedEdge.target : connectedEdge.source;
  
  const sourceNode = nodes.find(n => n.id === originalSource);
    
  if (!sourceNode || !sourceNode.parentId) return edges 
  
  const upperGroupChildren:CustomNode[] = nodes.filter(n => n.parentId === groupToConnect.id && n.type === 'custom');

  if (upperGroupChildren.length === 1) {
    return edges.map(edge =>
      edge.id === connectedEdge.id ? { ...edge, source: upperGroupChildren[0].id, target: node.id } : edge
    );
  }

  if (upperGroupChildren.length > 1) {
   
    setModalState({ open: true, state: upperGroupChildren, type: 'connectionOptions', lastNodeId: node.id, lastPosition: originalPosition});

   const responseReconnection: Edge | null = await handleReconnection();

    if (!responseReconnection) return edges;
    
      return edges.map(edge =>
        edge.id === connectedEdge.id ? { ...edge, source: responseReconnection.id, target: node.id } : edge
      );   
  }
  
    return edges;
};
