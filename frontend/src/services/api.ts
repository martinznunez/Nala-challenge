import { CustomNodeType, GroupNode, TierNode, } from "../globalTypes/typesNodes";
import { type Edge } from "@xyflow/react";
import fetcher, { HttpMethod } from "../lib/fetcher";
import { DeleteNodeResponse, GetOrgResponse, NewNodesCreateResponse, UpdateNodePositionResponse, UpdateNodeResponse, UpdateTierResponse } from "./types";

const API_BASE_URL = "http://localhost:3001/api";


export const getOrg = async (): Promise<GetOrgResponse> => {
  return fetcher(`${API_BASE_URL}/nodes`);
};

export const updateNode = async (id: string, label: string, employees: number): Promise<UpdateNodeResponse> => {
  return fetcher(`${API_BASE_URL}/nodes/${id}`, {
    method: HttpMethod.PUT,
    body: { label, employees },
  });
};

export const updateTier = async (tierId: string, tierName: string): Promise<UpdateTierResponse> => {
  return fetcher(`${API_BASE_URL}/tier/${tierId}`, {
    method: HttpMethod.PUT,
    body: { tierName },
  });
};

export const deleteNodes = async (nodeId: string): Promise<DeleteNodeResponse> => {
  return fetcher(`${API_BASE_URL}/nodes/${nodeId}`, {
    method: HttpMethod.DELETE,
  });
};

export const newNodesCreate = async (group: GroupNode, node: CustomNodeType, tier: TierNode, edge: Edge): Promise<NewNodesCreateResponse> => {
  return fetcher(`${API_BASE_URL}/nodes`, {
    method: HttpMethod.POST,
    body: { group, node, tier, edge },
  });
};

export const updateNodePosition = async (
  nodeId: string,
  newGroupId: string,
  newPosition: { x: number; y: number },
  updatedEdges: Edge[]
): Promise<UpdateNodePositionResponse> => {
  return fetcher(`${API_BASE_URL}/nodes/${nodeId}/group`, {
    method: HttpMethod.PUT,
    body: { newGroupId, newPosition, updatedEdges },
  });
};
