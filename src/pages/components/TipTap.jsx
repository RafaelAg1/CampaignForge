import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

export default function TiptapEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false, // para que no te abra el link al clickar mientras editas
                autolink: true,
                linkOnPaste: true,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: value,
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    if (!editor) return null;

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl || "");

        if (url === null) return; // cancel
        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div className="w-full border rounded">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-2 border-b bg-gray-50 text-white">
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`px-2 py-1 rounded border bg-black ${editor.isActive("heading", { level: 1 }) ? "bg-gray-200" : ""}`}
                >
                    H1
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`px-2 py-1 rounded border bg-black${editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}`}
                >
                    H2
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setParagraph().run()}
                    className="px-2 py-1 rounded border bg-black"
                >
                    P
                </button>

                {/* Marks */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={`px-2 py-1 rounded border bg-black font-bold ${editor.isActive("bold") ? "bg-gray-200" : ""}`}
                >
                    B
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={`px-2 py-1 rounded border bg-black italic ${editor.isActive("italic") ? "bg-gray-200" : ""}`}
                >
                    I
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    className={`px-2 py-1 rounded border bg-black underline ${editor.isActive("underline") ? "bg-gray-200" : ""}`}
                >
                    U
                </button>

                {/* Lists */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`px-2 py-1 rounded border bg-black ${editor.isActive("bulletList") ? "bg-gray-200" : ""}`}
                >
                    • Lista
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`px-2 py-1 rounded border bg-black ${editor.isActive("orderedList") ? "bg-gray-200" : ""}`}
                >
                    1. Lista
                </button>

                {/* Link */}
                <button
                    type="button"
                    onClick={setLink}
                    className={`px-2 py-1 rounded border bg-black ${editor.isActive("link") ? "bg-gray-200" : ""}`}
                >
                    Link
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().unsetLink().run()}
                    className="px-2 py-1 rounded border bg-black"
                >
                    Quitar link
                </button>

                {/* Align (opcional) */}
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    className="px-2 py-1 rounded border bg-black"
                >
                    ⬅
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    className="px-2 py-1 rounded border bg-black"
                >
                    ⬍
                </button>
                <button
                    type="button"
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    className="px-2 py-1 rounded border bg-black"
                >
                    ➡
                </button>
            </div>

            {/* Editor */}
            <div className="p-3">
                <EditorContent editor={editor} className="min-h-[160px] outline" />
            </div>
        </div>
    );
}
