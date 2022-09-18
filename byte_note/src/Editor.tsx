import { useEditor } from "./hooks/useEditor";
import { useCallback, useEffect } from "react";
import { EditorState } from "@codemirror/state";

interface Props {
  initialDoc: string;
  onChange: (doc: string) => void;
}

export const Editor: React.FC<Props> = (props: Props) => {
  const { onChange } = props;
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );

  const [editorRef, editorView] = useEditor<HTMLDivElement>({
    initialDoc: props.initialDoc,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // NOTHING
    }
  }, [editorView]);

  return <div className="h-screen w-full overflow-hidden" ref={editorRef}></div>;
};
