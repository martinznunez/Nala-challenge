import { type Edge, type Node } from "@xyflow/react";

export interface XYPosition {
  x: number;
  y: number;
}

export interface CustomNode extends Node {
  position: XYPosition; 
  measured?: { width: number, height: number };
  type?: string;
  data: {
    label: string;
    employees?: number;
    id?: string;
    children?: string[] | null; 
    tierName?: string;
    isDefault?: boolean;
    tierId?: string;
  };
  parentId:string
  style?: {
    width: string;
    height: string;
    backgroundColor: string;
    border: string;
    zIndex: number;
  };
}

export interface GroupNode extends Omit<CustomNode, 'parentId'> {
  id: string;
  type: 'group';
  
}

export interface CustomNodeType extends Omit<CustomNode, 'data'> {
  type: 'custom';
  data: Partial<CustomNode['data']>;  
}

export interface TierNode extends Omit<CustomNode, 'data'> {
  type: 'tier';
  data: Partial<CustomNode['data']>; 
}


export type CreateNewGroupWithNodeReturn = {
  group: GroupNode;
  node: CustomNodeType;
  tier: TierNode;
};


export interface NodeState extends Omit<Node, 'data'> {
  data: Partial<CustomNode['data']>;
}

export interface ModalStateEditions {
  open: boolean;
  state: NodeState | RelatedNode[] | CustomNode[] | null;
  type: 'nodeEdition' | 'connectionOptions' | '';
  lastNodeId?: string | null;
  lastPosition?: {x:number, y:number }  | null;
}

export interface RelatedNode extends Edge {
  data: {
    label: string;
    employees: number;
    isDefault: boolean;
    tierId: string;
    tierName: string;
    
  };
}

export interface TierNodeData {
  [key: string]: unknown; 
  handleUpdateTierHandler: (tierId: string) => void;
  tierName: string;
  tierId: string;
}


export interface DivisionOption {
  value: string;
  label: string;
}
