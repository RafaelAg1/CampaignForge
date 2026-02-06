import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";

// Componentes fuera del render
const ToolbarButton = ({ onClick, isActive, children, title }) => (
    <button
        type="button"
        onClick={onClick}
        title={title}
        className={`px-3 py-1.5 rounded-md border transition-all duration-200 font-medium text-sm
            ${isActive
            ? 'bg-amber-500 border-amber-400 text-white shadow-md shadow-amber-500/30'
            : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600 hover:border-slate-500'
        }`}
    >
        {children}
    </button>
);

const ToolbarDivider = () => (
    <div className="w-px h-6 bg-slate-600"></div>
);

export default function TiptapEditor({ value, onChange }) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link.configure({
                openOnClick: false,
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

        if (url === null) return;
        if (url === "") {
            editor.chain().focus().unsetLink().run();
            return;
        }

        editor.chain().focus().setLink({ href: url }).run();
    };

    return (
        <div className="w-full border border-slate-600 rounded-lg bg-slate-900/50 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-2 p-3 border-b border-slate-600 bg-slate-800/80">
                {/* Headings */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                    title="Encabezado 1"
                >
                    H1
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                    title="Encabezado 2"
                >
                    H2
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    isActive={editor.isActive("heading", { level: 3 })}
                    title="Encabezado 3"
                >
                    H3
                </ToolbarButton>

                <ToolbarDivider />

                {/* Text Formatting */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                    title="Negrita"
                >
                    <span className="font-bold">B</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                    title="Cursiva"
                >
                    <span className="italic">I</span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    isActive={editor.isActive("underline")}
                    title="Subrayado"
                >
                    <span className="underline">U</span>
                </ToolbarButton>

                <ToolbarDivider />

                {/* Lists */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                    title="Lista con viñetas"
                >
                    • Lista
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                    title="Lista numerada"
                >
                    1. Lista
                </ToolbarButton>

                <ToolbarDivider />

                {/* Links */}
                <ToolbarButton
                    onClick={setLink}
                    isActive={editor.isActive("link")}
                    title="Insertar enlace"
                >
                    🔗 Link
                </ToolbarButton>
                {editor.isActive("link") && (
                    <ToolbarButton
                        onClick={() => editor.chain().focus().unsetLink().run()}
                        isActive={false}
                        title="Quitar enlace"
                    >
                        ✕ Link
                    </ToolbarButton>
                )}

                <ToolbarDivider />

                {/* Text Alignment */}
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("left").run()}
                    isActive={editor.isActive({ textAlign: "left" })}
                    title="Alinear a la izquierda"
                >
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h10M4 18h16" />
                        </svg>
                    </span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("center").run()}
                    isActive={editor.isActive({ textAlign: "center" })}
                    title="Centrar texto"
                >
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M7 12h10M4 18h16" />
                        </svg>
                    </span>
                </ToolbarButton>
                <ToolbarButton
                    onClick={() => editor.chain().focus().setTextAlign("right").run()}
                    isActive={editor.isActive({ textAlign: "right" })}
                    title="Alinear a la derecha"
                >
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M10 12h10M4 18h16" />
                        </svg>
                    </span>
                </ToolbarButton>
            </div>

            {/* Editor Content */}
            <div className="p-4 text-slate-100">
                <EditorContent
                    editor={editor}
                    className="min-h-[160px] focus:outline-none
                        [&_.ProseMirror]:outline-none
                        [&_.ProseMirror]:min-h-[160px]
                        [&_.ProseMirror_h1]:text-2xl
                        [&_.ProseMirror_h1]:font-bold
                        [&_.ProseMirror_h1]:text-amber-400
                        [&_.ProseMirror_h1]:mb-3
                        [&_.ProseMirror_h2]:text-xl
                        [&_.ProseMirror_h2]:font-bold
                        [&_.ProseMirror_h2]:text-amber-300
                        [&_.ProseMirror_h2]:mb-2
                        [&_.ProseMirror_h3]:text-lg
                        [&_.ProseMirror_h3]:font-semibold
                        [&_.ProseMirror_h3]:text-amber-200
                        [&_.ProseMirror_h3]:mb-2
                        [&_.ProseMirror_p]:text-slate-300
                        [&_.ProseMirror_p]:mb-2
                        [&_.ProseMirror_strong]:text-amber-300
                        [&_.ProseMirror_strong]:font-semibold
                        [&_.ProseMirror_em]:text-slate-200
                        [&_.ProseMirror_em]:italic
                        [&_.ProseMirror_u]:underline
                        [&_.ProseMirror_ul]:list-disc
                        [&_.ProseMirror_ul]:ml-6
                        [&_.ProseMirror_ul]:mb-2
                        [&_.ProseMirror_ul]:text-slate-300
                        [&_.ProseMirror_ol]:list-decimal
                        [&_.ProseMirror_ol]:ml-6
                        [&_.ProseMirror_ol]:mb-2
                        [&_.ProseMirror_ol]:text-slate-300
                        [&_.ProseMirror_li]:mb-1
                        [&_.ProseMirror_a]:text-blue-400
                        [&_.ProseMirror_a]:underline
                        [&_.ProseMirror_a:hover]:text-blue-300"
                />
            </div>
        </div>
    );
}