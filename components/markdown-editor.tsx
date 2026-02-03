"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

// Dynamically import to avoid SSR issues
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="h-[500px] bg-[#1a1a1f] border border-[#36343a] rounded-xl flex items-center justify-center">
        <div className="text-[#938f99]">Loading editor...</div>
      </div>
    ),
  }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: number;
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = "Write your content here using Markdown...",
  height = 500,
}: MarkdownEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div
        className="bg-[#1a1a1f] border border-[#36343a] rounded-xl flex items-center justify-center"
        style={{ height }}
      >
        <div className="text-[#938f99]">Loading editor...</div>
      </div>
    );
  }

  return (
    <div data-color-mode="dark" className="markdown-editor-wrapper">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || "")}
        preview="live"
        height={height}
        textareaProps={{
          placeholder,
        }}
        visibleDragbar={false}
      />
      <style jsx global>{`
        /* ============================================
           EDITOR CONTAINER
           ============================================ */
        .markdown-editor-wrapper {
          border-radius: 12px;
          overflow: hidden;
        }

        .markdown-editor-wrapper .w-md-editor {
          background-color: #1a1a1f !important;
          border: 1px solid #36343a !important;
          border-radius: 12px !important;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2) !important;
          display: flex !important;
          flex-direction: column !important;
        }

        /* ============================================
           FIX DUPLICATE TEXT ISSUE
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-text-pre {
          display: none !important;
        }

        .markdown-editor-wrapper .w-md-editor-text-input {
          -webkit-text-fill-color: #e6e1e9 !important;
          opacity: 1 !important;
        }

        /* ============================================
           TOOLBAR
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-toolbar {
          background-color: #211f24 !important;
          border-bottom: 1px solid #36343a !important;
          border-radius: 12px 12px 0 0 !important;
          padding: 8px 12px !important;
          min-height: 40px !important;
          flex-shrink: 0 !important;
        }

        .markdown-editor-wrapper .w-md-editor-toolbar li > button {
          color: #cac4cf !important;
          border-radius: 6px !important;
          margin: 0 2px !important;
          padding: 4px 8px !important;
        }

        .markdown-editor-wrapper .w-md-editor-toolbar li > button:hover {
          background-color: #36343a !important;
          color: #e6e1e9 !important;
        }

        .markdown-editor-wrapper .w-md-editor-toolbar li.active > button {
          background-color: #b5b5f6 !important;
          color: #141318 !important;
        }

        .markdown-editor-wrapper .w-md-editor-toolbar-divider {
          background-color: #36343a !important;
        }

        /* ============================================
           CONTENT AREA - MAIN FIX FOR SCROLLING
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-content {
          background-color: #1a1a1f !important;
          flex: 1 !important;
          display: flex !important;
          min-height: 0 !important;
          overflow: hidden !important;
        }

        /* ============================================
           EDITOR PANE (LEFT SIDE)
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-area {
          flex: 1 !important;
          overflow: hidden !important;
          display: flex !important;
          flex-direction: column !important;
        }

        .markdown-editor-wrapper .w-md-editor-text {
          flex: 1 !important;
          overflow: auto !important;
          min-height: 0 !important;
          position: relative !important;
        }

        .markdown-editor-wrapper .w-md-editor-text-input {
          color: #e6e1e9 !important;
          background-color: #1a1a1f !important;
          font-family: "Fira Code", "JetBrains Mono", Consolas, Monaco,
            "Courier New", monospace !important;
          font-size: 14px !important;
          line-height: 1.7 !important;
          caret-color: #b5b5f6 !important;
          padding: 16px !important;
          min-height: 100% !important;
          width: 100% !important;
          resize: none !important;
          border: none !important;
          outline: none !important;
        }

        .markdown-editor-wrapper .w-md-editor-text-input::placeholder {
          color: #938f99 !important;
          -webkit-text-fill-color: #938f99 !important;
        }

        /* ============================================
           PREVIEW PANE (RIGHT SIDE)
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-preview {
          flex: 1 !important;
          background-color: #211f24 !important;
          border-left: 1px solid #36343a !important;
          overflow-y: auto !important;
          overflow-x: hidden !important;
          min-height: 0 !important;
        }

        .markdown-editor-wrapper .w-md-editor-preview .wmde-markdown {
          padding: 16px !important;
          min-height: 100% !important;
        }

        /* ============================================
           SCROLLBAR STYLING - EDITOR
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-text::-webkit-scrollbar {
          width: 10px !important;
          height: 10px !important;
        }

        .markdown-editor-wrapper .w-md-editor-text::-webkit-scrollbar-track {
          background: #1a1a1f !important;
          border-radius: 5px !important;
        }

        .markdown-editor-wrapper .w-md-editor-text::-webkit-scrollbar-thumb {
          background: #36343a !important;
          border-radius: 5px !important;
          border: 2px solid #1a1a1f !important;
        }

        .markdown-editor-wrapper
          .w-md-editor-text::-webkit-scrollbar-thumb:hover {
          background: #4a4852 !important;
        }

        .markdown-editor-wrapper .w-md-editor-text::-webkit-scrollbar-corner {
          background: #1a1a1f !important;
        }

        /* ============================================
           SCROLLBAR STYLING - PREVIEW
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-preview::-webkit-scrollbar {
          width: 10px !important;
          height: 10px !important;
        }

        .markdown-editor-wrapper .w-md-editor-preview::-webkit-scrollbar-track {
          background: #211f24 !important;
          border-radius: 5px !important;
        }

        .markdown-editor-wrapper .w-md-editor-preview::-webkit-scrollbar-thumb {
          background: #36343a !important;
          border-radius: 5px !important;
          border: 2px solid #211f24 !important;
        }

        .markdown-editor-wrapper
          .w-md-editor-preview::-webkit-scrollbar-thumb:hover {
          background: #4a4852 !important;
        }

        .markdown-editor-wrapper
          .w-md-editor-preview::-webkit-scrollbar-corner {
          background: #211f24 !important;
        }

        /* Firefox Scrollbar */
        .markdown-editor-wrapper .w-md-editor-text,
        .markdown-editor-wrapper .w-md-editor-preview {
          scrollbar-width: thin !important;
          scrollbar-color: #36343a #1a1a1f !important;
        }

        /* ============================================
           PREVIEW CONTENT STYLES
           ============================================ */
        .markdown-editor-wrapper .wmde-markdown {
          background-color: transparent !important;
          color: #e6e1e9 !important;
          font-size: 15px !important;
          line-height: 1.7 !important;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
            sans-serif !important;
        }

        /* Headings */
        .markdown-editor-wrapper .wmde-markdown h1 {
          color: #e6e1e9 !important;
          font-size: 1.8em !important;
          font-weight: 700 !important;
          border-bottom: 2px solid #36343a !important;
          padding-bottom: 0.3em !important;
          margin-top: 1.2em !important;
          margin-bottom: 0.6em !important;
        }

        .markdown-editor-wrapper .wmde-markdown h2 {
          color: #e6e1e9 !important;
          font-size: 1.4em !important;
          font-weight: 600 !important;
          border-bottom: 1px solid #36343a !important;
          padding-bottom: 0.2em !important;
          margin-top: 1.2em !important;
          margin-bottom: 0.5em !important;
        }

        .markdown-editor-wrapper .wmde-markdown h3,
        .markdown-editor-wrapper .wmde-markdown h4,
        .markdown-editor-wrapper .wmde-markdown h5,
        .markdown-editor-wrapper .wmde-markdown h6 {
          color: #e6e1e9 !important;
          margin-top: 1em !important;
          margin-bottom: 0.4em !important;
        }

        /* Paragraphs */
        .markdown-editor-wrapper .wmde-markdown p {
          margin-bottom: 1em !important;
          color: #e6e1e9 !important;
        }

        /* Links */
        .markdown-editor-wrapper .wmde-markdown a {
          color: #b5b5f6 !important;
          text-decoration: none !important;
        }

        .markdown-editor-wrapper .wmde-markdown a:hover {
          text-decoration: underline !important;
          color: #cebdfe !important;
        }

        /* Inline Code */
        .markdown-editor-wrapper .wmde-markdown code:not(pre code) {
          background-color: #2b292f !important;
          color: #f7bff4 !important;
          padding: 2px 6px !important;
          border-radius: 4px !important;
          font-family: "Fira Code", Consolas, monospace !important;
          font-size: 0.9em !important;
          border: 1px solid #36343a !important;
        }

        /* Code Blocks */
        .markdown-editor-wrapper .wmde-markdown pre {
          background-color: #0d1117 !important;
          border: 1px solid #30363d !important;
          border-radius: 8px !important;
          padding: 12px 16px !important;
          margin: 1em 0 !important;
          overflow-x: auto !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre code {
          background-color: transparent !important;
          color: #e6edf3 !important;
          padding: 0 !important;
          font-family: "Fira Code", Consolas, monospace !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
          border: none !important;
        }

        /* Syntax Highlighting */
        .markdown-editor-wrapper .wmde-markdown pre .token.comment,
        .markdown-editor-wrapper .wmde-markdown pre .comment {
          color: #8b949e !important;
          font-style: italic !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.keyword,
        .markdown-editor-wrapper .wmde-markdown pre .keyword {
          color: #ff7b72 !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.string,
        .markdown-editor-wrapper .wmde-markdown pre .string {
          color: #a5d6ff !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.function,
        .markdown-editor-wrapper .wmde-markdown pre .function {
          color: #d2a8ff !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.number,
        .markdown-editor-wrapper .wmde-markdown pre .number {
          color: #79c0ff !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.operator,
        .markdown-editor-wrapper .wmde-markdown pre .operator {
          color: #ff7b72 !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.punctuation,
        .markdown-editor-wrapper .wmde-markdown pre .punctuation {
          color: #c9d1d9 !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.property,
        .markdown-editor-wrapper .wmde-markdown pre .property {
          color: #79c0ff !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre .token.class-name,
        .markdown-editor-wrapper .wmde-markdown pre .class-name {
          color: #ffa657 !important;
        }

        /* Code block scrollbar */
        .markdown-editor-wrapper .wmde-markdown pre::-webkit-scrollbar {
          height: 8px !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre::-webkit-scrollbar-track {
          background: #0d1117 !important;
          border-radius: 4px !important;
        }

        .markdown-editor-wrapper .wmde-markdown pre::-webkit-scrollbar-thumb {
          background: #30363d !important;
          border-radius: 4px !important;
        }

        .markdown-editor-wrapper
          .wmde-markdown
          pre::-webkit-scrollbar-thumb:hover {
          background: #484f58 !important;
        }

        /* Blockquotes */
        .markdown-editor-wrapper .wmde-markdown blockquote {
          border-left: 4px solid #b5b5f6 !important;
          background: linear-gradient(
            90deg,
            rgba(181, 181, 246, 0.1) 0%,
            transparent 100%
          ) !important;
          color: #cac4cf !important;
          padding: 12px 16px !important;
          border-radius: 0 8px 8px 0 !important;
          margin: 1em 0 !important;
        }

        .markdown-editor-wrapper .wmde-markdown blockquote p {
          margin-bottom: 0 !important;
        }

        /* Unordered Lists */
        .markdown-editor-wrapper .wmde-markdown ul {
          list-style: none !important;
          padding-left: 0 !important;
          margin: 1em 0 !important;
        }

        .markdown-editor-wrapper .wmde-markdown ul li {
          position: relative !important;
          padding-left: 1.6em !important;
          margin: 0.5em 0 !important;
          line-height: 1.6 !important;
        }

        .markdown-editor-wrapper .wmde-markdown ul li::before {
          content: "" !important;
          position: absolute !important;
          left: 0.3em !important;
          top: 0.55em !important;
          width: 7px !important;
          height: 7px !important;
          background: linear-gradient(135deg, #b5b5f6 0%, #f7bff4 100%) !important;
          border-radius: 50% !important;
        }

        /* Nested unordered lists */
        .markdown-editor-wrapper .wmde-markdown ul ul li::before {
          width: 5px !important;
          height: 5px !important;
          background: transparent !important;
          border: 2px solid #b5b5f6 !important;
        }

        .markdown-editor-wrapper .wmde-markdown ul ul ul li::before {
          background: #938f99 !important;
          border: none !important;
          border-radius: 1px !important;
        }

        /* Ordered Lists */
        .markdown-editor-wrapper .wmde-markdown ol {
          list-style: none !important;
          padding-left: 0 !important;
          margin: 1em 0 !important;
          counter-reset: item !important;
        }

        .markdown-editor-wrapper .wmde-markdown ol li {
          position: relative !important;
          padding-left: 2em !important;
          margin: 0.5em 0 !important;
          line-height: 1.6 !important;
          counter-increment: item !important;
        }

        .markdown-editor-wrapper .wmde-markdown ol li::before {
          content: counter(item) !important;
          position: absolute !important;
          left: 0 !important;
          top: 0.05em !important;
          width: 1.5em !important;
          height: 1.5em !important;
          background: linear-gradient(135deg, #b5b5f6 0%, #f7bff4 100%) !important;
          color: #141318 !important;
          font-weight: 600 !important;
          font-size: 0.75em !important;
          border-radius: 50% !important;
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }

        /* Tables */
        .markdown-editor-wrapper .wmde-markdown table {
          border-collapse: collapse !important;
          width: 100% !important;
          margin: 1em 0 !important;
          border-radius: 8px !important;
          overflow: hidden !important;
          border: 1px solid #36343a !important;
        }

        .markdown-editor-wrapper .wmde-markdown table th {
          background-color: #2b292f !important;
          color: #e6e1e9 !important;
          font-weight: 600 !important;
          padding: 10px 14px !important;
          text-align: left !important;
          border-bottom: 2px solid #b5b5f6 !important;
        }

        .markdown-editor-wrapper .wmde-markdown table td {
          padding: 10px 14px !important;
          border-bottom: 1px solid #36343a !important;
          color: #cac4cf !important;
        }

        .markdown-editor-wrapper .wmde-markdown table tr:last-child td {
          border-bottom: none !important;
        }

        .markdown-editor-wrapper .wmde-markdown table tr:nth-child(even) {
          background-color: rgba(43, 41, 47, 0.4) !important;
        }

        /* Horizontal Rule */
        .markdown-editor-wrapper .wmde-markdown hr {
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
          margin: 2em 0 !important;
        }

        /* Images */
        .markdown-editor-wrapper .wmde-markdown img {
          border-radius: 8px !important;
          max-width: 100% !important;
          margin: 1em 0 !important;
          border: 1px solid #36343a !important;
        }

        /* Strong / Bold */
        .markdown-editor-wrapper .wmde-markdown strong {
          color: #e6e1e9 !important;
          font-weight: 700 !important;
        }

        /* Emphasis / Italic */
        .markdown-editor-wrapper .wmde-markdown em {
          color: #cebdfe !important;
        }

        /* Task Lists */
        .markdown-editor-wrapper .wmde-markdown .task-list-item {
          list-style: none !important;
          padding-left: 0.5em !important;
        }

        .markdown-editor-wrapper .wmde-markdown .task-list-item::before {
          display: none !important;
        }

        .markdown-editor-wrapper .wmde-markdown .task-list-item input {
          margin-right: 8px !important;
          accent-color: #b5b5f6 !important;
        }

        /* ============================================
           EDIT/PREVIEW MODE BUTTONS
           ============================================ */
        .markdown-editor-wrapper .w-md-editor-bar {
          display: none !important;
        }

        /* Full width when in edit-only or preview-only mode */
        .markdown-editor-wrapper .w-md-editor-show-edit .w-md-editor-area {
          width: 100% !important;
        }

        .markdown-editor-wrapper .w-md-editor-show-preview .w-md-editor-preview {
          width: 100% !important;
          border-left: none !important;
        }
      `}</style>
    </div>
  );
}