import React, { useEffect, useState } from "react";
import runMode, { getLanguage } from "./runmode";

interface Tokens {
  text: string;
  style: string | null;
}

export const Code: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = (props: any) => {
  const [spans, setSpans] = useState<Tokens[]>([]);
  const { className } = props;
  const langName = (className || "").replace(/language-/, "");

  useEffect(() => {
    getLanguage(langName).then((lang) => {
      if (lang) {
        const body =
          props.children instanceof Array ? props.children[0] : props.children;
        const tokens: Tokens[] = [];
        runMode(body as string, lang, (text, style, _from, _to) => {
          console.log("text", text);
          tokens.push({ text, style });
        });
        setSpans(tokens);
      }
    });
    console.log("spans: ", spans);
  }, [props.children]);

  if (spans.length >= 0) {
    return (
      <code className="break-words">
        {spans.map((token, index) => (
          <span key={index} className={token.style ?? ""}>
            {token.text}
          </span>
        ))}
      </code>
    );
  }
  return <code>{props.children}</code>;
};
