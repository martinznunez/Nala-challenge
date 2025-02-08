import { Controls } from "@xyflow/react"
import styled from "styled-components"

export const WorkflowWrapper = styled.div`
 flex: 1;
  width: 100%;
  height: 100vh;
  background-color: #f3f4f6;
  display: flex;
  overflow: hidden;
  margin:auto;
  display:flex;
  align-items:start;
  justify-content:start;
`

export const TiersPanel = styled.div`
  width: 100px;
  background-color: #fff;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 5;
`


export const ControlsContainer = styled.div`
  position: fixed;
  top: 10px;
  right: 0;
 
`;

export const StyledControls = styled(Controls)`
  background: rgba(0, 0, 0, 0.8); 
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    background: #1e1e1e; 
    border: none;
    border-radius: 8px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);

    &:hover {
      background: #333; 
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }

    svg {
      width: 22px;
      height: 22px;
      fill: #fff; 
    }
  }
`;
