import { Render } from "@measured/puck";
import config from "../config/puckConfig";

export default function RenderPage() {
  const data =
    JSON.parse(
      localStorage.getItem("doanhnhan-data")
    ) || {
      content: [],
    };

  return (
    <Render
      config={config}
      data={data}
    />
  );
}