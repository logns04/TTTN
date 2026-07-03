import { Render } from "@puckeditor/core";
import { config } from "../config/puckConfig";
import { loadPage } from "../services/storageService";

export default function RenderPage() {
  const data = loadPage();

  return <Render config={config} data={data} />;
}
