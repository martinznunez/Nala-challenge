/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, type ReactNode } from "react"
import { useNodesState, useEdgesState, type Edge, NodeChange } from "@xyflow/react"
import { CustomNode } from "../globalTypes/typesNodes"
import {useFetchMutation} from '../hooks/useFetchMutation'
import { getOrg } from "../services/api"


interface NodesContextType {
  nodes: CustomNode[];
  edges: Edge[];
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  setNodes: React.Dispatch<React.SetStateAction<CustomNode[]>>;  
  onNodesChange: (changes: NodeChange<CustomNode>[]) => void;
}

const initialContextValue: NodesContextType = {
  nodes: [],
  edges: [],
  setEdges: () => {},
  setNodes: () => {},
  onNodesChange: () => {}
}

export const NodesContext = createContext<NodesContextType>(initialContextValue)

export const NodesProvider = ({ children }: { children: ReactNode }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [edges, setEdges] = useEdgesState<Edge>([])
  const {data} =  useFetchMutation(getOrg, {autoFetch:true} )


  useEffect(() => {
    if (data) {
     
      setNodes(data.nodes)
      setEdges(data.edges)
    }
  }, [setNodes, setEdges, data])

 

  return (
    <NodesContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        onNodesChange,   
      }}
    >
      {children}
    </NodesContext.Provider>
  )
}

export const useNodesContext = (): NodesContextType => {
  const context = useContext(NodesContext)
  if (!context) {
    throw new Error("useNodes must be used within a NodesProvider")
  }
  return context
}


