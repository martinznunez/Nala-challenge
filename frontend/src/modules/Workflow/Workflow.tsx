
import React from "react";
import { 
  ReactFlow, 
  Background, 
  ConnectionMode,  
  useReactFlow 
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useWorkflowManager } from "./hooks/useWorkflowLogic/useWorkflowManager";
import { StyledControls, WorkflowWrapper } from "./styled";
import { nodeTypes } from "../nodeTypesConfig/nodeTypesConfig";
import {  Modal } from "../../components";
import ModalFactory from "../../components/modal/ModalFactory";
import { restoreNodePosition } from "../utils/flowPosition/flowPositionUtils";

const Workflow: React.FC = () => {
  const { 
    nodes, 
    edges,   
    handleUpdateTierHandler, 
    onDeleteNodeHandler, 
    handlerCreateGroupNodesCallback,
    handleEditNode,
    setModalState,
    modalState,
    onNodesChange,
    handleUpdateNodeHandler,
    handleNodeDragStop,
    onNodeDragStart,
    handleClickReconnection,
    setNodes
  } = useWorkflowManager();

  const { fitView, zoomIn, zoomOut } = useReactFlow();  
  const closeModal = () => {
    
    if (modalState.lastNodeId && modalState.lastPosition) {
      restoreNodePosition(setNodes, modalState.lastNodeId, modalState.lastPosition);
    }
    setModalState({ open: false, state: null, type: "" });
    
  };
 
  const handleWheel = (event: React.WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault();
      const direction = event.deltaY > 0 ? "out" : "in";
      
      if (direction === "in") {
        zoomIn();
      } else {
        zoomOut();
      }

      fitView({ duration: 500 }); 
    }
  };

  return (
    <WorkflowWrapper >
      <ReactFlow
        nodes={nodes?.map((node) => ({
          ...node,
          data: {
            ...node.data,
            handlerCreateGroupNodesCallback,
            onDeleteNodeHandler,
            handleEditNode,
            handleUpdateTierHandler,
            parentId: node.parentId,
          },
        }))}
        onNodeDragStart={onNodeDragStart}
        edges={edges}
        zoomOnScroll={false}  
        zoomOnPinch={true}    
        onNodesChange={onNodesChange}
        onNodeDragStop={handleNodeDragStop}
        connectionMode={ConnectionMode.Loose}
        nodeTypes={nodeTypes}
        onWheel={handleWheel} 
        style={{ width: '100%', height: '100%' }} 
        >
      <StyledControls showInteractive={false} position="top-right" />
      <Background gap={6} color="#e5e7eb"  />
      </ReactFlow>
      <Modal onClose={closeModal }  isOpen={modalState.open}
       >  
      {ModalFactory.createModal(modalState.type, {
        isOpen: modalState.open,
        onClose: closeModal,
        state: modalState.state,
        handleUpdateNodeHandler,
        handleClickReconnection
      })}
      </Modal>
    </WorkflowWrapper>
  );
};

export default Workflow;
