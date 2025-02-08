import React  from "react";
import Workflow from "./modules/Workflow/Workflow";
import { ReactFlowProvider } from "@xyflow/react";
import { ToastContainer } from "react-toastify";

function App() {



  return (
    <div >
      <ReactFlowProvider>
      <ToastContainer />
        <Workflow  />
      
      </ReactFlowProvider>
   

    </div>
  );
}

export default App;
