import { Editor } from "./Editor";
import { useCallback, useState } from "react";

const App: React.FC = () => {
  const [doc, setDoc] = useState<string>("# Hello World\n");

  const handleDocChange = useCallback((newDoc: string) => {
    setDoc(newDoc);
  }, []);
  return (
    <>
      <Editor onChange={handleDocChange} initialDoc={doc} />
    </>
  );
};

export default App;
