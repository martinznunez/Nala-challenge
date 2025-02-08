import React from "react"
import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import type { NodeState } from "../../../../globalTypes/typesNodes"
import { Container, Title, InputGroup, Label, Input, ButtonGroup, SaveButton, CancelButton } from "./styled"

interface EditNodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: NodeState;
  handleUpdateNodeHandler: (id: string, label: string, employees: number) => void;
}

const EditNode: React.FC<EditNodeModalProps> = ({  onClose, state, handleUpdateNodeHandler }) => {
  const [label, setLabel] = useState(state?.data?.label || "")
  const [employees, setEmployees] = useState(state?.data?.employees || 0)

  useEffect(() => {
    if (state?.data) {
      setLabel(state.data.label || "")
      setEmployees(state.data.employees || 0)
    }
  }, [state])

  const handleSave = () => {
    if (!label.trim() || !state) {
      toast.error("Label cannot be empty")
      return
    }

    handleUpdateNodeHandler(state?.id, label, employees)
    onClose()
  }

  return (
    <Container>
      <Title>Edit Node</Title>
      <InputGroup>
        <Label htmlFor="label">Label:</Label>
        <Input
          id="label"
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="Enter node label"
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="employees">Employees:</Label>
        <Input
          id="employees"
          type="number"
          value={employees}
          onChange={(e) => setEmployees(Number(e.target.value))}
          placeholder="Enter number of employees"
        />
      </InputGroup>
      <ButtonGroup>
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </ButtonGroup>
    </Container>
  )
}

export default EditNode

