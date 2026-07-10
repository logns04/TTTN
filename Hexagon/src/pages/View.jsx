import { useMemo } from "react";
import { Render } from "@puckeditor/core";
import "@puckeditor/core/puck.css";

import { config } from "../puck/config";

export default function View({
  page,
  pages,
  setCurrentPage,
}) {
  if (!page) return null;

  const renderConfig = useMemo(() => {
    return {
      ...config,

      components: {
        ...config.components,

        Header: {
          ...config.components.Header,

          render: (props) => (
            <config.components.Header.render
              {...props}
              pages={pages}
              currentPage={page}
              setCurrentPage={setCurrentPage}
            />
          ),
        },
      },
    };
  }, [page, pages, setCurrentPage]);

  return (
    <div className="min-h-screen bg-white">
<Render
  key={page.id}
  config={renderConfig}
  data={page.data}
/>
    </div>
  );
}