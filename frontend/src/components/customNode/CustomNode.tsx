import { Position } from "@xyflow/react"
import { Plus, Trash2, Settings, AlertCircle } from 'lucide-react'
import React, { useState } from "react"

import { 
  ActionButton, 
  ActionButtons, 
  AddButton, 
  DivisionSelect, 
  EmployeeCount, 
  NodeWrapper, 
  StyledHandle, 
  TierLabel, 
  Title, 
  AlertIconWrapper 
} from "./styled"
import { DivisionOption } from "../../globalTypes/typesNodes"

interface CustomNodeProps {
  data: {
    tierName: string;
    label: string;
    employees: number;
    handlerCreateGroupNodesCallback: (id: string, division: string) => void;
    onDeleteNodeHandler: (id: string) => void;
    isDefault: boolean;
    handleEditNode: (id: string) => void;
    parentId: string;
  }
  id: string;
}


const DIVISION_OPTIONS: DivisionOption[] = [
  { value: "operations", label: "Operations" },
  { value: "development", label: "Development" },
  { value: "marketing", label: "Marketing" },
];



const  CustomNode: React.FC<CustomNodeProps>  = ( { data, id }) => {
  const [selectedDivision, setSelectedDivision] = useState<string>("")
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const handleAddNode = () => {
    if (!selectedDivision && data.isDefault) {
      setShowAlert(true) 
      return
    }
    setShowAlert(false) 
    data.handlerCreateGroupNodesCallback(id, selectedDivision)
  }

  return (
    <NodeWrapper>
      <TierLabel title={data.tierName}>{data.tierName}</TierLabel> 
      <Title>{data.label}</Title>
      <EmployeeCount>
        {`${data.employees || 0} / ${data.employees || 0} employees`}
      </EmployeeCount>

      {data.isDefault && (
        <>
          <DivisionSelect 
            value={selectedDivision} 
            onChange={(e) => {
              setSelectedDivision(e.target.value)
              setShowAlert(false) 
            }}
          >
            <option value="" disabled>
              Division...
            </option>
            {DIVISION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </DivisionSelect>
          {showAlert && (
            <AlertIconWrapper>
              <AlertCircle color="red" size={16} />
              <span>Please select a division before adding.</span> 
            </AlertIconWrapper>
          )}
        </>
      )}

      <ActionButtons>
        <ActionButton>
          <Settings onClick={() => data.handleEditNode(id)} size={14} />
        </ActionButton>
        {!data.isDefault && (
          <ActionButton onClick={() => data.onDeleteNodeHandler(id)}>
            <Trash2 size={14} />
          </ActionButton>
        )}
      </ActionButtons>

      <AddButton onClick={handleAddNode}>
        <Plus />
      </AddButton>

      <StyledHandle type="source" position={Position.Bottom} />
      <StyledHandle type="target" position={Position.Top} />
    </NodeWrapper>
  )
}
  

export default CustomNode