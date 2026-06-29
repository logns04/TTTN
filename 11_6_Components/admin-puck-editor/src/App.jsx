import { BrowserRouter, Routes, Route } from "react-router-dom";

import EditorPage from "./pages/editor";
import Home from "./pages/home";

export default function App(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/editor"
element={<EditorPage/>}
/>

</Routes>

</BrowserRouter>

);

}