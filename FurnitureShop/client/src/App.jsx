import { BrowserRouter } from "react-router-dom";
import ClientLayout from "./layouts/ClientLayout";

function App() {
  return (
    <BrowserRouter>
      <ClientLayout />
    </BrowserRouter>
  );
}

export default App;