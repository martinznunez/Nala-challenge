
import React from 'react';
import { CloseButton, ModalContainer, ModalHeader, Overlay } from './styled';
import { X } from 'lucide-react'; 
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContainer>
      <ModalHeader>
          <CloseButton onClick={onClose}>
            <X size={24} color="gray" />
          </CloseButton>
        </ModalHeader>

        {children}
      </ModalContainer>
    </Overlay>
  );
};

export default Modal;
