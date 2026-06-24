import { Puck } from "@measured/puck";
import { puckConfig } from "../admin-puck-config";

export default function EditorPage() {
  return (
    <Puck
      config={puckConfig}
      data={{
        content: []
      }}
      onPublish={(data) => {
        localStorage.setItem(
          "homepage",
          JSON.stringify(data)
        );
      }}
    />
  );
}