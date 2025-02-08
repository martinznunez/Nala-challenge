import type { Node } from "@xyflow/react";
import { v4 as uuidv4 } from "uuid";
import { CustomNode, CustomNodeType, GroupNode, TierNode } from "../../../globalTypes/typesNodes";
import { getZebraStripedColor } from "../colorHelpers/colorHelpers";

const GROUPS_SPACING = 250;


export const findTierNode = (nodes: Node[], tierId: string): Node | undefined => 
  nodes.find((node) => node.data.tierId === tierId);

export const findParentNode = (nodes: Node[], parentId: string): Node | undefined => 
  nodes.find((node) => node.id === parentId);

export const findGroupIndex = (nodes: CustomNode[], groupId: string): number => 
  nodes.findIndex((group) => group.id === groupId);

export const findTargetGroup = (nodes: CustomNode[], flowPosition: { x?: number; y: number }): CustomNode | undefined => 
  nodes.find(group => {
    const groupTop = group.position.y;
    const groupBottom = group.position.y + (group.measured?.height || 250);
    return flowPosition.y >= groupTop && flowPosition.y <= groupBottom;
  });

export const calculateNewPosition = (existingCustomNodes: CustomNode[], customNode: Node) => ({
  x: existingCustomNodes.length 
    ? Math.max(...existingCustomNodes.map((n) => n.position.x)) + GROUPS_SPACING 
    : customNode.position.x + GROUPS_SPACING,
  y: 20,
});



export const createNewCustomNode = (
  parentId: string, 
  division: string,
  tierName: string,
  initialPosition: { x: number; y: number },
  tierId: string,
): CustomNodeType => ({ 
  id: uuidv4(),
  type: 'custom',
  connectable: true,
  parentId, 
  position: initialPosition || { x: 120, y: 40 }, 
  data: {
    label: division || 'new Position',
    tierName,
    isDefault: false,
    employees: 0,
    tierId
  },
});

export const createNewGroupWithNode = (nodes: Node[], division: string): { group: GroupNode; node: CustomNodeType; tier: TierNode } => { 
  const existingGroups = nodes.filter((node) => node.type === 'group');
  const lastGroup = existingGroups[existingGroups.length - 1];
  const newGroupYPosition = lastGroup ? lastGroup.position.y + GROUPS_SPACING : 0;

  const newGroupId = uuidv4();
  const newTierId = uuidv4();
  const tierId = uuidv4();
  const newNodeId = uuidv4();

  const newGroup: GroupNode = {
    id: newGroupId,
    type: 'group',
    position: { x: 0, y: newGroupYPosition }, 
    draggable: false,
    selectable: false,
    connectable: false,
    data: { 
      label: `GROUP ${existingGroups.length + 1}`, 
      children: [], 
      tierName: ''  
    }, 
    style: {
      width: '3000px',
      height: '250px',
      backgroundColor: getZebraStripedColor(existingGroups.length),
      border: 'none',
      zIndex: -1,
    },
  };

  const newNode: CustomNodeType = {
    id: newNodeId,
    type: 'custom',
    connectable: true,
    parentId: newGroupId, 
    position: { x: 120, y: 20 }, 
    data: {
      label: division || 'new Position',
      tierName: `TIER ${existingGroups.length + 1}`,
      isDefault: false,
      employees: 0,
      tierId,
    },
  };

  const newTier: TierNode = {
    id: newTierId,
    type: 'tier',
    parentId: newGroupId, 
    draggable: false,
    connectable: false,
    selectable: true, 
    position: { x: 0, y: 5 }, 
    data: {
      tierName: `TIER ${existingGroups.length + 1}`,
      tierId,
    },
  };

  return { group: newGroup, node: newNode, tier: newTier };
};


export const createNewEdge = (sourceId: string, targetId: string) => ({
  id: uuidv4(),
  source: sourceId,
  target: targetId,
  type: "smoothstep",
  animated: true,
  style: {
    stroke: "#475467", 
    strokeWidth: 3, 
    strokeDasharray: "5,5", 
    fill: "transparent", 
    zIndex: 1, 
  },
});

