import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
 
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  width: 350px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  transform: translateY(-20px);
  opacity: 0;
  animation: fadeIn 0.3s forwards;

  @keyframes fadeIn {
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;


export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: start;

`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: gray;
  

`;