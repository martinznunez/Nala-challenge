import styled from "styled-components";

export const Container = styled.div`
  background-color: #f8f9fa;
  padding: 4px;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

`;

export const ModalHeader = styled.div`
  text-align: center;
  margin-bottom: 24px;

  h2 {
    margin: 0;
    font-size: 28px;
    color: #333;
    font-weight: 600;
    
  }
`;

export const OptionsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const OptionButton = styled.button`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 16px;
  margin: 12px 0;
  background-color: #CEA6B7;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 500;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #b28c99;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  &:active {
    background-color: #9e7d8a;
    transform: translateY(0);
  }
`;
