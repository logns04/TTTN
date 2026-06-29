import { Render } from "@measured/puck";
import puckConfig from "../admin-puck-config";

import homepage from "../data/homepage.json";

export default function Home(){

const data =
JSON.parse(localStorage.getItem("homepage"))
||
homepage;

return(

<Render
config={puckConfig}
data={data}
/>

);

}