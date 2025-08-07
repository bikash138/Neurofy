'use client'
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { useEffect, useRef } from 'react';
import axios from 'axios'
import debounce from 'lodash.debounce';

const NotePage = ({ noteId, note }: { noteId: string, note: any }) => {
    const editor = useEditor({
        extensions: [
        StarterKit,
        Placeholder.configure({
            placeholder: 'Start writing your neuros...',
            emptyEditorClass:
            'text-muted-foreground before:content-[attr(data-placeholder)] before:absolute before:opacity-50 before:text-base before:text-gray-400 before:font-normal before:pl-[0.25rem]',
        }),
        ],
        content: note?.content || '',
        onUpdate({ editor }) {
        debouncedSave();
        },
        editorProps: {
        attributes: {
            spellcheck: 'false',
        },
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (titleRef.current && note?.title) {
            titleRef.current.innerText = note.title;
        }
    }, [note?.title]);


  console.log(note)

  //@ts-ignore
  const saveNote = async () => {
    const content = editor?.getJSON()
    const title = titleRef.current?.innerText || 'Untitled';
    const payload = {
      content: content,
      title: title
    }
    const response = await axios.put(`http://localhost:4000/api/v1/update-note/${noteId}`, payload)
    console.log(response.data?.message)
};

  const debouncedSave = debounce(saveNote, 1000); 

  const titleRef = useRef<HTMLDivElement>(null)


  return (
    <div className="pr-3">
      {/* Title Section */}
      <div
        ref={titleRef}
        contentEditable
        className="title min-h-[40px] mb-2 text-[1.5rem] pl-[0.25rem] font-bold outline-none"
        aria-placeholder="Untitled Neuro"
        data-placeholder="Untitled Neuro"
        onInput={debouncedSave}
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