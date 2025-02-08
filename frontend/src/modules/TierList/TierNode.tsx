
import React from "react";
import { NodeProps } from "@xyflow/react";

import { Pencil } from "lucide-react";
import { EditButton, TierContainer, TierName, TierRow } from "./styled";
import { TierNodeData } from "../../globalTypes/typesNodes";


interface TierNodeProps extends NodeProps {
  type: "tier";  
  parentId: string;  
  draggable: boolean;
  selectable: boolean; 
  connectable: boolean; 
  position: { x: number; y: number }; 
  data: TierNodeData;  
}



const TierNode: React.FC<TierNodeProps> = ({ data }) => {
  const { handleUpdateTierHandler, tierName,tierId } = data; 
 


  return (
    <TierContainer  onClick={ ()=> handleUpdateTierHandler(tierId) } >
      <TierRow >
        <TierName>
          <EditButton >
           
               <Pencil style={{color:'#ffff'}} size={12} />
          </EditButton>
          <p> {tierName}</p>
        </TierName>
      </TierRow>
    </TierContainer>
  );
};

export default TierNode;
