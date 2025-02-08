import { toast } from "react-toastify";

import { Edge } from "react-flow-renderer";
import { SetStateAction } from "react";
import { useFetchMutation } from "./useFetchMutation";
import { ERROR_MESSAGES } from "../constants";
import { CustomNode } from "../globalTypes/typesNodes";
import { deleteNodes, newNodesCreate, updateNode, updateNodePosition, updateTier } from "../services/api";

export const useNodeMutations = (setNodes: (nodes: SetStateAction<CustomNode[]>) => void, setEdges: (edges: Edge[]) => void) => {

  
  const { mutate: updateTierMutate } = useFetchMutation(updateTier, {
    onSuccess: (res) => setNodes(res.nodes),
    onError: () => toast.error(ERROR_MESSAGES.UPDATE_TIER_ERROR),
  });

  const { mutate: deleteNodeMutate } = useFetchMutation(deleteNodes, {
    onSuccess: (res) => {
      setNodes(res.nodes);
      setEdges(res.edges);
    },
    onError: () => toast.error(ERROR_MESSAGES.DELETE_NODE_ERROR),
  });

  const { mutate: updateNodeMutate } = useFetchMutation(updateNode, {
    onSuccess: (res) => {
      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === res.node.id
            ? { ...node, data: { ...node.data, label: res.node.data.label, employees: res.node.data.employees } }
            : node
        )
      );
    },
    onError: () => toast.error(ERROR_MESSAGES.UPDATE_NODE_ERROR),
  });

  const { mutate: createNodeMutate } = useFetchMutation(newNodesCreate, {
    onSuccess: (res) => {
      setNodes(res.nodes);
      setEdges(res.edges);
    },
    onError: () => toast.error(ERROR_MESSAGES.CREATE_NODE_ERROR),
  });

  const { mutate: updateNodeGroupMutate } = useFetchMutation(updateNodePosition, {
    onSuccess: (res) => {
      const updateNode = res.node;
      setNodes((prevNodes) => prevNodes.map((n) => (n.id === updateNode.id ? updateNode : n)));
      setEdges(res.edges);
    },
    onError: () => toast.error(ERROR_MESSAGES.UPDATE_GROUP_ERROR),
  });

  return {
    updateTierMutate,
    deleteNodeMutate,
    updateNodeMutate,
    createNodeMutate,
    updateNodeGroupMutate,
  };
};
