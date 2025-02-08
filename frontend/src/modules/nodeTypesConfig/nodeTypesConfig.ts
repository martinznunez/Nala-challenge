
import { CustomNode } from "../../components"; 
import TierNode from "../TierList/TierNode";  
import { NodeProps, NodeTypes } from "@xyflow/react";

export const nodeTypes: NodeTypes = {
  custom: CustomNode,
  tier: TierNode as React.ComponentType<NodeProps>
};
