import {  DragEvent, SetStateAction } from "react"
import { CustomNode } from "../../../globalTypes/typesNodes";

export const getFlowPosition = (event: DragEvent<Element>, viewport: { x: number; y: number; zoom: number; }) => {
    const { x, y, zoom } = viewport;
    return {
        x: (event.clientX - x) / zoom,
        y: (event.clientY - y) / zoom
    };
    
};

export const restoreNodePosition = (
    setNodes: (value: SetStateAction<CustomNode[]>) => void,
    nodeId: string,
    originalPosition: { x: number; y: number }
  ) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId ? { ...node, position: originalPosition } : node
      )
    );
  };
  