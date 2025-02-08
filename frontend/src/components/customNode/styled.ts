import { Handle } from "@xyflow/react"
import styled from "styled-components"


export const NodeWrapper = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px 16px 40px 16px; 
  width: 180px;
  height: 140px;
  position: relative;
  border: 2px solid #e5e7eb;
`


export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: #111827;
  margin: 8px 0 30px 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
  display: inline-block;
  text-transform: uppercase;
`;



export const EmployeeCount = styled.div`
  font-size: 11px;
  color: #ef4444;
  margin-left: 24px;
  margin-bottom: 8px;
`

export const DivisionSelect = styled.select`
  width: 90%;
  margin-left: 10px;
  padding: 4px 8px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
  font-size: 12px;
  color: #6b7280;
  background-color: white;
  outline: none;

  &:focus {
    border-color: #6366f1;
    right: 2px solid #6366f1;
  }
`
export const ActionButtons = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 3px 12px;
  background: linear-gradient(to right, #f8f9fa, #e9ecef);
  border-top: 1px solid #e5e7eb;
  border-radius: 0 0 4px 4px;
`


export const ActionButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  color: #6b7280;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    color: #4b5563;
    background-color: rgba(107, 114, 128, 0.1);
  }

  &:active {
    transform: scale(0.95);
  }
`

export const AddButton = styled.button`
  position: absolute;
  bottom: 0;
  top:100%;
  left: 50%;
  transform: translate(-50%, 50%);
  background-color: white;
  border: 1px solid #e5e7eb;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 10;

  &:hover {
    background-color: #f3f4f6;
  }

  svg {
    width: 14px;
    height: 14px;
    color: #6b7280;
  }
`

export const StyledHandle = styled(Handle)`
  width: 8px;
  height: 8px;
  background-color: white;
  border: 2px solid #9ca3af;
  visibility: hidden;
`

export const TierLabel = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  background-color: #4CAF50;
  color: white;
  font-size: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  max-width: 60px; 
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer; 

 
`
export const AlertIconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  color: red;
  margin-top: 4px;

  span{
    font-size:10px;
  }
`