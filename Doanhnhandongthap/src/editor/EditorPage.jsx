import { Puck } from "@measured/puck";
import "@measured/puck/puck.css";

import config from "../config/puckConfig";
import { pageData } from "../data/pageData";

export default function EditorPage() {
  return (
    <Puck
      config={config}
      data={pageData}
      onPublish={(data) => {
        localStorage.setItem(
          "doanhnhan-data",
          JSON.stringify(data)
        );

        console.log("Saved:", data);
      }}
    />
  );
}