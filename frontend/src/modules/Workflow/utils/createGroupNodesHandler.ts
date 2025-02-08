import { Edge } from "react-flow-renderer";
import { CustomNode, CustomNodeType, GroupNode, TierNode } from "../../../globalTypes/typesNodes";
import { 
  calculateNewPosition, 
  createNewCustomNode, 
  createNewEdge, 
  createNewGroupWithNode, 
  findParentNode 
} from "../../utils/workflowHelpers/workflowHelpers";

type CreateCustomNodesFetchHandler = (group: GroupNode, node: CustomNodeType, tier: TierNode, edge: Edge) => Promise<void>;

export const handlerCreateGroupNodes = async (
  nodes: CustomNode[], 
  parentId: string, 
  division: string, 
  createCustomNodesFetchHandler: CreateCustomNodesFetchHandler
) => {
  const customNode = findParentNode(nodes, parentId);
  const labelToUseCustomNode: string = division || (customNode?.data.label as string);
  
  if (!customNode) return;

  const tierNodes = nodes.filter((node) => node.type === "tier");
  const parentTierIndex = tierNodes.findIndex((tier) => tier.data.tierId === customNode.data.tierId);
  const nextTier = tierNodes[parentTierIndex + 1];
  

  let customCreate: CustomNodeType | null = null;
  let groupFind: GroupNode | null = null;

  if (nextTier) {
    const existingCustomNodes = nodes.filter(
      (n) => n.type === "custom" && n.parentId === nextTier.parentId
    );
    
    const newPosition = calculateNewPosition(existingCustomNodes, customNode);
    const parentIdToUse = nextTier.parentId as string;
    const tierNameToUse = nextTier.data.tierName as string;
    const tierIdToUse = nextTier.data.tierId as string;

    customCreate = createNewCustomNode(parentIdToUse, labelToUseCustomNode, tierNameToUse, newPosition, tierIdToUse);
    groupFind = nodes.find((n) => n.type === "group" && n.id === nextTier.parentId) as GroupNode;
  }

  const { group, node, tier } = createNewGroupWithNode(nodes, labelToUseCustomNode);
  const nodeToUse = customCreate || node;
  const groupToUse = groupFind || group;
  const nextTierToUse = (nextTier || tier) as TierNode;
  const newEdge = createNewEdge(customNode.id, nodeToUse.id);

  await createCustomNodesFetchHandler(groupToUse, nodeToUse, nextTierToUse, newEdge);
};
