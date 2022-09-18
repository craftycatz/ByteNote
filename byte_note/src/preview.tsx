import { unified } from "unified";
import { Code } from "./code";
import { defaultSchema } from "hast-util-sanitize";

import React from "react";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkReact from "remark-react/lib";

import "github-markdown-css/github-markdown.css";

interface Props {
  doc: string;
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code ?? []), "className"],
  },
};

export const Preview: React.FC<Props> = (props) => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    //@ts-ignore
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: Code,
      },
    })
    .processSync(props.doc).result as React.ReactElement;

  return (
    <div className="w-full">
      <div className="markdown-body p-3 bg-black/10 text-slate-400">{md}</div>
    </div>
  );
};
