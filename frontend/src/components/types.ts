import { CustomNode, NodeState, RelatedNode } from "../globalTypes/typesNodes";


export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: NodeState | RelatedNode[] | CustomNode[] | null;
  handleUpdateNodeHandler?: (id: string, label: string, employees: number) => void; 
  handleClickReconnection?: (selectedNode: RelatedNode) => void;  
}
