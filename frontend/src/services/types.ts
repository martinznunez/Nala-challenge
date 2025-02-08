import { Edge } from "react-flow-renderer";
import { CustomNode } from "../globalTypes/typesNodes";

export type UpdateTierResponse = {
    tierId: string;
    tierName: string;
  };
  
  
  export type UpdateNodePositionResponse = {
    nodeId: string;
    newGroupId: string;
    newPosition: { x: number; y: number };
    updatedEdges: Edge[];
  };
  export type UpdateNodeResponse = {
    id: string;
    label: string;
    employees: number;
  };
  
  export type GetOrgResponse = {
    nodes: CustomNode[];
    edges: Edge[];
  };
  export type DeleteNodeResponse = {
    success: boolean;
    message: string;
  };
  export type NewNodesCreateResponse = {
    nodeId: string;
    groupId: string;
    tierId: string;
  };
  