import { useState } from "react";

import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import View from "./pages/View";

export default function App() {
  const [pages, setPages] = useState([]);

  const [screen, setScreen] = useState("admin");

  const [currentPage, setCurrentPage] = useState(null);

  // Mở Editor
  const openEditor = (page = null) => {
    setCurrentPage(page);
    setScreen("editor");
  };

  // Mở View
  const openView = (page) => {
    setCurrentPage(page);
    setScreen("view");
  };

  // Publish
  const savePage = (page) => {
    const exist = pages.find((p) => p.id === page.id);

    if (exist) {
      setPages(
        pages.map((p) =>
          p.id === page.id ? page : p
        )
      );
    } else {
      setPages([...pages, page]);
    }

    setScreen("admin");
  };

  // =========================

  if (screen === "editor") {
    return (
      <Editor
        page={currentPage}
        save={savePage}
        back={() => setScreen("admin")}
      />
    );
  }

  if (screen === "view") {
    return (
      <View
        page={currentPage}
        back={() => setScreen("admin")}
      />
    );
  }

  return (
    <Admin
      pages={pages}
      setPages={setPages}
      openEditor={openEditor}
      openView={openView}
    />
  );
}