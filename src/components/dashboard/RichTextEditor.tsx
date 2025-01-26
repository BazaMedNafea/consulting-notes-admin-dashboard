import React, { useState, useRef, useEffect } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaLink,
  FaUnlink,
} from "react-icons/fa";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<EditorProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isHeading, setIsHeading] = useState(false);
  const [isUnorderedList, setIsUnorderedList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  // Update the editor's content only when the `value` prop changes externally
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Focus the editor and execute a command
  const execCommand = (command: string, value?: string) => {
    if (editorRef.current) {
      editorRef.current.focus(); // Ensure the editor is focused
      document.execCommand(command, false, value || ""); // Execute the command
      updateToolbarState(); // Update the toolbar state
    }
  };

  // Update toolbar state based on the current selection
  const updateToolbarState = () => {
    if (editorRef.current) {
      setIsBold(document.queryCommandState("bold"));
      setIsItalic(document.queryCommandState("italic"));
      setIsUnderline(document.queryCommandState("underline"));
      setIsHeading(
        document.queryCommandState("formatBlock") &&
          document.queryCommandValue("formatBlock") === "h1"
      );
      setIsUnorderedList(document.queryCommandState("insertUnorderedList"));
      setIsOrderedList(document.queryCommandState("insertOrderedList"));
    }
  };

  // Handle keydown events (e.g., pressing Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      execCommand("insertParagraph");
      e.preventDefault();
    }
  };

  // Handle editor input
  const handleInput = () => {
    if (editorRef.current) {
      const newValue = editorRef.current.innerHTML;
      onChange(newValue); // Call the onChange function with the new value
    }
    updateToolbarState();
  };

  // Handle editor focus
  const handleFocus = () => {
    updateToolbarState();
  };

  // Handle link insertion
  const handleLink = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      setIsLinkModalOpen(true);
    }
  };

  // Insert a link
  const insertLink = () => {
    if (linkUrl) {
      execCommand("createLink", linkUrl);
      setIsLinkModalOpen(false);
      setLinkUrl("");
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden dark:border-gray-700">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
        {/* Bold */}
        <button
          type="button"
          onClick={() => execCommand("bold")}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
            isBold ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          title="Bold"
        >
          <FaBold
            className={`w-4 h-4 ${
              isBold
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        {/* Italic */}
        <button
          type="button"
          onClick={() => execCommand("italic")}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
            isItalic ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          title="Italic"
        >
          <FaItalic
            className={`w-4 h-4 ${
              isItalic
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        {/* Underline */}
        <button
          type="button"
          onClick={() => execCommand("underline")}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
            isUnderline ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          title="Underline"
        >
          <FaUnderline
            className={`w-4 h-4 ${
              isUnderline
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Heading */}
        <button
          type="button"
          onClick={() => execCommand("formatBlock", "<h1>")}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
            isHeading ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          title="Heading"
        >
          <FaHeading
            className={`w-4 h-4 ${
              isHeading
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Bullet List */}
        <button
          type="button"
          onClick={() => execCommand("insertUnorderedList")}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
            isUnorderedList ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          title="Bullet List"
        >
          <FaListUl
            className={`w-4 h-4 ${
              isUnorderedList
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        {/* Numbered List */}
        <button
          type="button"
          onClick={() => execCommand("insertOrderedList")}
          className={`p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors ${
            isOrderedList ? "bg-gray-200 dark:bg-gray-600" : ""
          }`}
          title="Numbered List"
        >
          <FaListOl
            className={`w-4 h-4 ${
              isOrderedList
                ? "text-blue-600 dark:text-blue-400"
                : "text-gray-600 dark:text-gray-300"
            }`}
          />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1" />

        {/* Insert Link */}
        <button
          type="button"
          onClick={handleLink}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Insert Link"
        >
          <FaLink className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>

        {/* Remove Link */}
        <button
          type="button"
          onClick={() => execCommand("unlink")}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Remove Link"
        >
          <FaUnlink className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>
      </div>

      {/* Editor Content */}
      <div
        ref={editorRef}
        contentEditable
        className="p-4 min-h-[200px] focus:outline-none prose dark:prose-invert max-w-none prose-sm sm:prose-base dark:bg-gray-800"
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        data-placeholder={placeholder}
      />

      {/* Link Modal */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium mb-4 dark:text-white">
              Insert Link
            </h3>
            <input
              type="url"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-2 border rounded-lg mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={insertLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichTextEditor;
