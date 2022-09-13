import { useEffect, useState, useRef } from "react";
import { EditorState } from "@codemirror/state";
import { EditorView } from "codemirror";
import { defaultKeymap, historyKeymap } from "@codemirror/commands";
import {
  indentOnInput,
  LanguageSupport,
  syntaxHighlighting,
} from "@codemirror/language";
import { bracketMatching } from "@codemirror/language";
import { keymap, highlightActiveLine, lineNumbers } from "@codemirror/view";
import { highlightActiveLineGutter } from "@codemirror/view";
import {
  defaultHighlightStyle,
  HighlightStyle,
  TagStyle,
} from "@codemirror/language";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { oneDark } from "@codemirror/theme-one-dark";
import { javascript } from "@codemirror/lang-javascript";
import { tags } from "@lezer/highlight";
import { languages } from "@codemirror/language-data";

export const transparentTheme = EditorView.theme({
  "&": {
    backgroundColor: "transparent !important",
    height: "100%",
  },
});

const syntaxHighlighting1 = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: "1.5em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading2,
    fontSize: "1.25em",
    fontWeight: "bold",
  },
  {
    tag: tags.heading3,
    fontSize: "1.125em",
    fontWeight: "bold",
  },
]);

import type React from "react";

interface Props {
  initialDoc: string;
  onChange: (state: EditorState) => void;
}

export const useEditor = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorState?] => {
  const [editorView, setEditorView] = useState<EditorView>();
  const editorRef = useRef<T>(null);
  const { onChange } = props;

  useEffect(() => {
    if (!editorRef.current) return;

    const initialState = EditorState.create({
      doc: props.initialDoc,
      extensions: [
        indentOnInput(),
        bracketMatching(),
        //defaultHighlightStyle(),
        highlightActiveLine(),
        lineNumbers(),
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        oneDark,
        transparentTheme,
        syntaxHighlighting(syntaxHighlighting1),
        highlightActiveLineGutter(),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
        EditorView.lineWrapping,
      ],
    });
    const view = new EditorView({
      state: initialState,
      parent: editorRef.current,
    });

    setEditorView(view);
  }, [editorRef]);

  return [editorRef, editorView?.state];
};
