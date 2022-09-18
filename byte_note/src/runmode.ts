import { highlightTree } from "@lezer/highlight";
import { languages } from "@codemirror/language-data";
import { oneDarkHighlightStyle } from "@codemirror/theme-one-dark";
import type { Language, LanguageDescription } from "@codemirror/language";

type RunModeCallback = (text: string, style: string | null, from: number, to: number) => void;

function runMode(
  text: string,
  language: Language,
  callback: RunModeCallback
): void {
    const tree = language.parser.parse(text);
    let pos = 0;
    highlightTree(tree, oneDarkHighlightStyle, (from, to, style) => {
        if(from > pos) callback(text.slice(pos, from), null, pos, from);
        callback(text.slice(from, to), style, from, to);
        pos = to;
    })
    if(pos !== tree.length) callback(text.slice(pos, tree.length), null, pos, tree.length);
}

export function findLanguage(langName: string){
    const i = languages.findIndex((lang: LanguageDescription) => {
        if(lang.alias.indexOf(langName) >= 0) return true;
        return false;
    })
    if(i >= 0){
        return languages[i];
    }
    return null;
}

export async function getLanguage(langName: string){
    const language = findLanguage(langName);
    if(language){
        const langSupport = await language.load()
        return langSupport.language;
    }
    return null;   
}

export default runMode;