"use client";

import dynamic from "next/dynamic";
import "@uiw/react-markdown-preview/markdown.css";

// Dynamically import to avoid SSR issues
const MarkdownPreviewComponent = dynamic(
  () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownPreviewProps {
  content: string;
  className?: string;
}

export function MarkdownPreview({
  content,
  className = "",
}: MarkdownPreviewProps) {
  return (
    <div
      data-color-mode="dark"
      className={`markdown-preview-wrapper ${className}`}
    >
      <MarkdownPreviewComponent
        source={content}
        style={{
          backgroundColor: "transparent",
          color: "#e6e1e9",
          padding: 0,
        }}
        rehypeRewrite={(node, index, parent) => {
          // Add custom classes for better styling
          if (
            node.type === "element" &&
            node.tagName === "a" &&
            parent &&
            /^h[1-6]$/.test((parent as any).tagName)
          ) {
            parent.children = parent.children.slice(1);
          }
        }}
      />
      <style jsx global>{`
        /* Base Markdown Styles */
        .markdown-preview-wrapper .wmde-markdown {
          background-color: transparent !important;
          color: #e6e1e9 !important;
          font-size: 16px !important;
          line-height: 1.8 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            Oxygen, Ubuntu, Cantarell, sans-serif !important;
        }

        /* Headings */
        .markdown-preview-wrapper .wmde-markdown h1 {
          color: #e6e1e9 !important;
          font-size: 2em !important;
          font-weight: 700 !important;
          border-bottom: 2px solid #36343a !important;
          padding-bottom: 0.4em !important;
          margin-top: 1.5em !important;
          margin-bottom: 0.8em !important;
        }

        .markdown-preview-wrapper .wmde-markdown h2 {
          color: #e6e1e9 !important;
          font-size: 1.5em !important;
          font-weight: 600 !important;
          border-bottom: 1px solid #36343a !important;
          padding-bottom: 0.3em !important;
          margin-top: 1.5em !important;
          margin-bottom: 0.6em !important;
        }

        .markdown-preview-wrapper .wmde-markdown h3 {
          color: #e6e1e9 !important;
          font-size: 1.25em !important;
          font-weight: 600 !important;
          margin-top: 1.5em !important;
          margin-bottom: 0.5em !important;
        }

        .markdown-preview-wrapper .wmde-markdown h4,
        .markdown-preview-wrapper .wmde-markdown h5,
        .markdown-preview-wrapper .wmde-markdown h6 {
          color: #cac4cf !important;
          font-weight: 600 !important;
          margin-top: 1.2em !important;
          margin-bottom: 0.4em !important;
        }

        /* Paragraphs */
        .markdown-preview-wrapper .wmde-markdown p {
          margin-bottom: 1.2em !important;
          color: #e6e1e9 !important;
        }

        /* Links */
        .markdown-preview-wrapper .wmde-markdown a {
          color: #b5b5f6 !important;
          text-decoration: none !important;
          border-bottom: 1px solid transparent !important;
          transition: all 0.2s ease !important;
        }

        .markdown-preview-wrapper .wmde-markdown a:hover {
          color: #cebdfe !important;
          border-bottom-color: #cebdfe !important;
        }

        /* Inline Code */
        .markdown-preview-wrapper .wmde-markdown code:not(pre code) {
          background-color: #2b292f !important;
          color: #f7bff4 !important;
          padding: 3px 8px !important;
          border-radius: 6px !important;
          font-size: 0.9em !important;
          font-family: "Fira Code", "JetBrains Mono", Consolas, Monaco,
            "Courier New", monospace !important;
          border: 1px solid #36343a !important;
        }

        /* Code Blocks */
        .markdown-preview-wrapper .wmde-markdown pre {
          background-color: #0d1117 !important;
          border: 1px solid #30363d !important;
          border-radius: 12px !important;
          padding: 16px !important;
          overflow-x: auto !important;
          margin: 1.5em 0 !important;
          position: relative !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre code {
          background-color: transparent !important;
          color: #e6edf3 !important;
          padding: 0 !important;
          font-size: 14px !important;
          line-height: 1.6 !important;
          font-family: "Fira Code", "JetBrains Mono", Consolas, Monaco,
            "Courier New", monospace !important;
          border: none !important;
        }

        /* Syntax Highlighting - GitHub Dark Theme */
        .markdown-preview-wrapper .wmde-markdown pre .token.comment,
        .markdown-preview-wrapper .wmde-markdown pre .token.prolog,
        .markdown-preview-wrapper .wmde-markdown pre .token.doctype,
        .markdown-preview-wrapper .wmde-markdown pre .token.cdata {
          color: #8b949e !important;
          font-style: italic !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre .token.punctuation {
          color: #c9d1d9 !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre .token.property,
        .markdown-preview-wrapper .wmde-markdown pre .token.tag,
        .markdown-preview-wrapper .wmde-markdown pre .token.boolean,
        .markdown-preview-wrapper .wmde-markdown pre .token.number,
        .markdown-preview-wrapper .wmde-markdown pre .token.constant,
        .markdown-preview-wrapper .wmde-markdown pre .token.symbol,
        .markdown-preview-wrapper .wmde-markdown pre .token.deleted {
          color: #79c0ff !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre .token.selector,
        .markdown-preview-wrapper .wmde-markdown pre .token.attr-name,
        .markdown-preview-wrapper .wmde-markdown pre .token.string,
        .markdown-preview-wrapper .wmde-markdown pre .token.char,
        .markdown-preview-wrapper .wmde-markdown pre .token.builtin,
        .markdown-preview-wrapper .wmde-markdown pre .token.inserted {
          color: #a5d6ff !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre .token.operator,
        .markdown-preview-wrapper .wmde-markdown pre .token.entity,
        .markdown-preview-wrapper .wmde-markdown pre .token.url,
        .markdown-preview-wrapper .wmde-markdown pre .language-css .token.string,
        .markdown-preview-wrapper .wmde-markdown pre .style .token.string {
          color: #ff7b72 !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre .token.atrule,
        .markdown-preview-wrapper .wmde-markdown pre .token.attr-value,
        .markdown-preview-wrapper .wmde-markdown pre .token.keyword {
          color: #ff7b72 !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre .token.function,
        .markdown-preview-wrapper .wmde-markdown pre .token.class-name {
          color: #d2a8ff !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre .token.regex,
        .markdown-preview-wrapper .wmde-markdown pre .token.important,
        .markdown-preview-wrapper .wmde-markdown pre .token.variable {
          color: #ffa657 !important;
        }

        /* Additional syntax colors */
        .markdown-preview-wrapper .wmde-markdown pre .code-line {
          color: #c9d1d9 !important;
        }

        .markdown-preview-wrapper
          .wmde-markdown
          pre
          code[class*="language-javascript"],
        .markdown-preview-wrapper
          .wmde-markdown
          pre
          code[class*="language-js"] {
          color: #c9d1d9 !important;
        }

        .markdown-preview-wrapper
          .wmde-markdown
          pre
          code[class*="language-typescript"],
        .markdown-preview-wrapper
          .wmde-markdown
          pre
          code[class*="language-ts"] {
          color: #c9d1d9 !important;
        }

        .markdown-preview-wrapper
          .wmde-markdown
          pre
          code[class*="language-python"] {
          color: #c9d1d9 !important;
        }

        .markdown-preview-wrapper
          .wmde-markdown
          pre
          code[class*="language-css"] {
          color: #c9d1d9 !important;
        }

        .markdown-preview-wrapper
          .wmde-markdown
          pre
          code[class*="language-html"] {
          color: #c9d1d9 !important;
        }

        /* Blockquotes */
        .markdown-preview-wrapper .wmde-markdown blockquote {
          border-left: 4px solid #b5b5f6 !important;
          background: linear-gradient(
            90deg,
            rgba(181, 181, 246, 0.1) 0%,
            transparent 100%
          ) !important;
          color: #cac4cf !important;
          padding: 16px 20px !important;
          border-radius: 0 12px 12px 0 !important;
          margin: 1.5em 0 !important;
          font-style: italic !important;
        }

        .markdown-preview-wrapper .wmde-markdown blockquote p {
          margin-bottom: 0 !important;
          color: #cac4cf !important;
        }

        .markdown-preview-wrapper .wmde-markdown blockquote code {
          background-color: rgba(181, 181, 246, 0.2) !important;
        }

        /* Unordered Lists */
        .markdown-preview-wrapper .wmde-markdown ul {
          color: #e6e1e9 !important;
          padding-left: 0 !important;
          margin: 1em 0 !important;
          list-style: none !important;
        }

        .markdown-preview-wrapper .wmde-markdown ul li {
          position: relative !important;
          padding-left: 1.8em !important;
          margin: 0.6em 0 !important;
          line-height: 1.7 !important;
        }

        .markdown-preview-wrapper .wmde-markdown ul li::before {
          content: "" !important;
          position: absolute !important;
          left: 0.4em !important;
          top: 0.65em !important;
          width: 8px !important;
          height: 8px !important;
          background: linear-gradient(135deg, #b5b5f6 0%, #f7bff4 100%) !important;
          border-radius: 50% !important;
        }

        /* Nested unordered lists */
        .markdown-preview-wrapper .wmde-markdown ul ul {
          margin: 0.4em 0 !important;
        }

        .markdown-preview-wrapper .wmde-markdown ul ul li::before {
          width: 6px !important;
          height: 6px !important;
          background: transparent !important;
          border: 2px solid #b5b5f6 !important;
          top: 0.7em !important;
        }

        .markdown-preview-wrapper .wmde-markdown ul ul ul li::before {
          width: 6px !important;
          height: 6px !important;
          background: #938f99 !important;
          border: none !important;
          border-radius: 2px !important;
        }

        /* Ordered Lists */
        .markdown-preview-wrapper .wmde-markdown ol {
          color: #e6e1e9 !important;
          padding-left: 0 !important;
          margin: 1em 0 !important;
          list-style: none !important;
          counter-reset: item !important;
        }

        .markdown-preview-wrapper .wmde-markdown ol li {
          position: relative !important;
          padding-left: 2.2em !important;
          margin: 0.6em 0 !important;
          line-height: 1.7 !important;
          counter-increment: item !important;
        }

        .markdown-preview-wrapper .wmde-markdown ol li::before {
          content: counter(item) !important;
          position: absolute !important;
          left: 0 !important;
          top: 0.1em !important;
          width: 1.6em !important;
          height: 1.6em !important;
          background: linear-gradient(135deg, #b5b5f6 0%, #f7bff4 100%) !important;
          color: #141318 !important;
          font-weight: 600 !important;
          font-size: 0.75em !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        /* Nested ordered lists */
        .markdown-preview-wrapper .wmde-markdown ol ol {
          margin: 0.4em 0 !important;
        }

        .markdown-preview-wrapper .wmde-markdown ol ol li::before {
          background: #2b292f !important;
          color: #b5b5f6 !important;
          border: 2px solid #b5b5f6 !important;
        }

        /* Task Lists / Checkboxes */
        .markdown-preview-wrapper .wmde-markdown .task-list-item {
          list-style: none !important;
          padding-left: 0.5em !important;
        }

        .markdown-preview-wrapper .wmde-markdown .task-list-item::before {
          display: none !important;
        }

        .markdown-preview-wrapper .wmde-markdown .task-list-item input {
          margin-right: 10px !important;
          width: 18px !important;
          height: 18px !important;
          accent-color: #b5b5f6 !important;
          cursor: pointer !important;
        }

        /* Tables */
        .markdown-preview-wrapper .wmde-markdown table {
          border-collapse: separate !important;
          border-spacing: 0 !important;
          width: 100% !important;
          margin: 1.5em 0 !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          border: 1px solid #36343a !important;
        }

        .markdown-preview-wrapper .wmde-markdown table th {
          background: linear-gradient(
            180deg,
            #2b292f 0%,
            #252329 100%
          ) !important;
          color: #e6e1e9 !important;
          font-weight: 600 !important;
          padding: 14px 16px !important;
          text-align: left !important;
          border-bottom: 2px solid #b5b5f6 !important;
        }

        .markdown-preview-wrapper .wmde-markdown table td {
          padding: 12px 16px !important;
          border-bottom: 1px solid #36343a !important;
          color: #cac4cf !important;
        }

        .markdown-preview-wrapper .wmde-markdown table tr:last-child td {
          border-bottom: none !important;
        }

        .markdown-preview-wrapper .wmde-markdown table tr:nth-child(even) {
          background-color: rgba(43, 41, 47, 0.5) !important;
        }

        .markdown-preview-wrapper .wmde-markdown table tr:hover {
          background-color: rgba(181, 181, 246, 0.1) !important;
        }

        /* Horizontal Rule */
        .markdown-preview-wrapper .wmde-markdown hr {
          border: none !important;
          height: 2px !important;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #b5b5f6 20%,
            #f7bff4 50%,
            #b5b5f6 80%,
            transparent 100%
          ) !important;
          margin: 2.5em 0 !important;
          border-radius: 2px !important;
        }

        /* Images */
        .markdown-preview-wrapper .wmde-markdown img {
          border-radius: 12px !important;
          max-width: 100% !important;
          margin: 1.5em 0 !important;
          border: 1px solid #36343a !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3) !important;
        }

        /* Strong / Bold */
        .markdown-preview-wrapper .wmde-markdown strong {
          color: #e6e1e9 !important;
          font-weight: 700 !important;
        }

        /* Emphasis / Italic */
        .markdown-preview-wrapper .wmde-markdown em {
          color: #cebdfe !important;
          font-style: italic !important;
        }

        /* Strikethrough */
        .markdown-preview-wrapper .wmde-markdown del {
          color: #938f99 !important;
          text-decoration: line-through !important;
        }

        /* Keyboard */
        .markdown-preview-wrapper .wmde-markdown kbd {
          background-color: #2b292f !important;
          border: 1px solid #36343a !important;
          border-bottom: 3px solid #36343a !important;
          border-radius: 6px !important;
          color: #e6e1e9 !important;
          font-family: "Fira Code", Consolas, monospace !important;
          font-size: 0.85em !important;
          padding: 3px 8px !important;
        }

        /* Definition Lists */
        .markdown-preview-wrapper .wmde-markdown dl {
          margin: 1em 0 !important;
        }

        .markdown-preview-wrapper .wmde-markdown dt {
          font-weight: 600 !important;
          color: #e6e1e9 !important;
          margin-top: 1em !important;
        }

        .markdown-preview-wrapper .wmde-markdown dd {
          margin-left: 2em !important;
          color: #cac4cf !important;
        }

        /* Footnotes */
        .markdown-preview-wrapper .wmde-markdown .footnotes {
          margin-top: 2em !important;
          padding-top: 1em !important;
          border-top: 1px solid #36343a !important;
          font-size: 0.9em !important;
          color: #938f99 !important;
        }

        /* Selection */
        .markdown-preview-wrapper .wmde-markdown ::selection {
          background-color: rgba(181, 181, 246, 0.3) !important;
          color: #e6e1e9 !important;
        }

        /* Scrollbar for code blocks */
        .markdown-preview-wrapper .wmde-markdown pre::-webkit-scrollbar {
          height: 8px !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre::-webkit-scrollbar-track {
          background: #1a1a1f !important;
          border-radius: 4px !important;
        }

        .markdown-preview-wrapper .wmde-markdown pre::-webkit-scrollbar-thumb {
          background: #36343a !important;
          border-radius: 4px !important;
        }

        .markdown-preview-wrapper
          .wmde-markdown
          pre::-webkit-scrollbar-thumb:hover {
          background: #4a4852 !important;
        }
      `}</style>
    </div>
  );
}