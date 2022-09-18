import { Editor } from "./Editor";
import { Preview } from "./preview";
import { useCallback, useState } from "react";

const App: React.FC = () => {
  const [doc, setDoc] = useState<string>("# Hello World\n");

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);
  return (
    <>
      <div className="flex flex-row h-screen w-screen overflow-x-hidden overflow-y-auto">
        <Editor onChange={handleDocChange} initialDoc={doc} />
        <Preview doc={doc} />
      </div>
    </>
  );
};

export default App;
