import { useEffect, useState } from "react";

import Admin from "./pages/Admin";
import Editor from "./pages/Editor";
import View from "./pages/View";

export default function App() {
  

  const [pages, setPages] = useState(() => {
    const saved = localStorage.getItem("pages");
    return saved ? JSON.parse(saved) : [];
  });
  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);

  const [screen, setScreen] = useState("admin");

  const [currentPage, setCurrentPage] = useState(null);

  const openEditor = (page = null) => {
    setCurrentPage(page);
    setScreen("editor");
  };
  const openView = (page) => {
    setCurrentPage(page);
    setScreen("view");
  };

  const savePage = (page) => {
    const index = pages.findIndex((p) => p.id === page.id);

    if (index >= 0) {
      const newPages = [...pages];
      newPages[index] = page;
      setPages(newPages);
    } else {
      setPages([...pages, page]);
    }

    setCurrentPage(page);

    setScreen("admin");
  };
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
        pages={pages}
        setCurrentPage={setCurrentPage}
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