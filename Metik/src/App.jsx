import { Puck, Render } from "@puckeditor/core";
import "@puckeditor/core/dist/index.css";
import { useState } from "react";

import config from "./admin-puck-config";
const initialData = {
  content: [],
  root: {},
};

function App() {
  const [data, setData] = useState(initialData);
  const [isEditMode, setIsEditMode] = useState(true);
  if (!isEditMode) {
    return (
      <div className="min-h-screen relative">
        <button 
          onClick={() => setIsEditMode(true)} 
          className="fixed bottom-6 right-6 z-[99999] bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-full shadow-2xl transition-transform hover:scale-105"
        >
          ⬅️ Quay lại trình kéo thả
        </button>
        <Render config={config} data={data} />
      </div>
    );
  }
  return (
    <div className="w-screen h-screen">
      <Puck 
        config={config} 
        data={data} 
        onPublish={(newData) => {
          setData(newData);
          setIsEditMode(false); 
        }} 
      />
    </div>
  );
}

export default App;