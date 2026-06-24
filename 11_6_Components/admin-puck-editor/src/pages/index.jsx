import React from "react";
import { Render } from "@measured/puck";
import { puckConfig } from "../admin-puck-config";

export default function HomePage() {

  const data =
    JSON.parse(
      localStorage.getItem("homepage")
    ) || {
      content:[]
    };

  return (
    <Render
      config={puckConfig}
      data={data}
    />
  );
}