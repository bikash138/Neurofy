'use client'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';

const NotePage = ({ params }: { params: { noteId: string } }) => {

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: 'Start writing your neuros...',
        emptyEditorClass:
        'text-muted-foreground before:content-[attr(data-placeholder)] before:absolute before:opacity-50 before:text-base before:text-gray-400 before:font-normal before:pl-[0.25rem]',
      }),
    ],
    content: '',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
    },
    editorProps: {
      attributes: {
        spellcheck: 'false',
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="pr-3">
      {/* Title Section */}
      <div
        contentEditable
        className="title min-h-[40px] mb-2 text-[1.5rem] pl-[0.25rem] font-bold outline-none"
        aria-placeholder="Untitled Neuro"
        data-placeholder="Untitled Neuro"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault()
            editor?.commands.focus();
          }
        }}
      >
      </div>

      <div onClick={(e)=>{
          e.preventDefault() 
          editor?.commands.focus()
        }} 
        className="dark:bg-background cursor-text bg-white min-h-screen"
      >
        <EditorContent editor={editor} className="prose dark:prose-invert max-w-full outline-none" />
      </div>
    </div>
  );
};

export default NotePage;