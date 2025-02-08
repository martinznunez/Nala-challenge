import styled from "styled-components"

export const Container = styled.div`
  background-color: #ffffff;
  padding: 4px;
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
`

export const Title = styled.h3`
  margin: 0 0 10px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #2d3748;
`

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
`

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 4px;
`

export const Input = styled.input`
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s ease-in-out;
  color: #2d3748; 
  background-color: #ffffff; 

  &::placeholder {
    color: #a0aec0; 
  }

  &:focus {
    border-color: #4299e1;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
  }
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
`

export const Button = styled.button`
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`

export const SaveButton = styled(Button)`
  background-color: #4299e1;
  color: white;

  &:hover {
    background-color: #3182ce;
  }
`

export const CancelButton = styled(Button)`
  background-color: #edf2f7;
  color: #4a5568;

  &:hover {
    background-color: #e2e8f0;
  }
`
