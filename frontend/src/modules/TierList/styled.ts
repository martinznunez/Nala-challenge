import styled from "styled-components";

export const TierContainer = styled.div`
  width: 40px;
  height: 250px;
  display:flex;
align-items:center;
justify-content:center;
`;

export const TierRow = styled.div`
  height: 95%;
  border-bottom: 1px solid #e5e7eb;
  background-color: gray;
  display: flex;
  align-items: start;
  padding: 0px;
  
`;


export const TierName = styled.div`
  font-size: 13px;
  color: #374151;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: auto;
  font-weight: 500;
  height: 100%;
  
  p {
    line-height: 70px;
    transform: rotate(-90deg);
    transform-origin: right start;
    white-space: nowrap;
    color: #fff;
    width: 45px; 
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;


export const EditButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 0px;


  &:hover {
    color: #6b7280;
  }
`;
