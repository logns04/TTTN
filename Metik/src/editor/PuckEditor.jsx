import { useState } from "react";
import { Puck } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { config } from "../config/puckConfig";
import { loadPage, savePage } from "../services/storageService";

export default function PuckEditor() {
  const [data, setData] = useState(loadPage());

  return (
    <Puck
      config={config}
      data={data}
      onPublish={(newData) => {
        savePage(newData);
        setData(newData);

        alert("Publish thành công!");
      }}
    />
  );
}
