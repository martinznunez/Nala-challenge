import React from "react"
import { Container, ModalHeader, OptionButton, OptionsList } from "./styled"
import type { RelatedNode } from "../../../../globalTypes/typesNodes"

interface ConnectionManagerProps {
  onClose: () => void
  state: RelatedNode[]
  handleClickReconnection: (selectedNode: RelatedNode) => void
}

const ConnectionManager: React.FC<ConnectionManagerProps> = ({ onClose, state, handleClickReconnection }) => {

  const handleClick = (node: RelatedNode) => {
    handleClickReconnection(node)
    onClose()
  }

  return (
    <Container>
      <ModalHeader>
        <h2>Manage Connections</h2>
      </ModalHeader>
      <OptionsList>
        {state?.map((node) => (
          <OptionButton key={node.id} onClick={() => handleClick(node)}>
            <span>{node.data.label}</span>
            <span>{node.data.tierName}</span>
            <span>{node.data.employees}</span>
          </OptionButton>
        ))}
      </OptionsList>
    </Container>
  )
}

export default ConnectionManager

