import React from 'react';
import EditNode from '../../modules/Workflow/components/EditNode/EditNode';
import ConnectionManager from '../../modules/Workflow/components/ConnectionManager/ConnectionManager';
import { ModalProps } from '../types';
import { RelatedNode } from '../../globalTypes/typesNodes';



const ModalFactory = {
  createModal: (type: string, props: ModalProps): JSX.Element | null => {
    const { state,onClose, handleUpdateNodeHandler, handleClickReconnection, ...rest } = props;

    switch (type) {
      case "nodeEdition":
        if (state && 'data' in state && handleUpdateNodeHandler ) {
          return <EditNode {...rest} state={state} onClose={onClose} handleUpdateNodeHandler={handleUpdateNodeHandler} />;
        }
        return null;
        
      case "connectionOptions":
        if ( state && handleClickReconnection ) {
          return <ConnectionManager {...rest}  onClose={onClose} state={state as RelatedNode[]} handleClickReconnection={handleClickReconnection} />;
        }
        return null;
        
      default:
        return null;
    }
  },
};

export default ModalFactory;
