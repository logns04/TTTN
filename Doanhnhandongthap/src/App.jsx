import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import EditorPage from "./editor/EditorPage";
import RenderPage from "./render/RenderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<RenderPage />}
        />

        <Route
          path="/editor"
          element={<EditorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;