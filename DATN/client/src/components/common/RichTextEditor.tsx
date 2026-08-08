import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';
import { Bold, Italic, List, ListOrdered, Redo2, Undo2 } from 'lucide-react';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
}

const ToolbarButton = ({
  active,
  onClick,
  title,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  title: string;
  children: React.ReactNode;
}) => (
  <button
    type="button"
    onClick={onClick}
    title={title}
    className={cn(
      'rounded p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-4',
      active && 'bg-primary/15 text-primary',
    )}
  >
    {children}
  </button>
);

/** Editor cho nội dung tin tức. Lưu HTML, render lại bằng class .prose-noithat. */
export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose-noithat min-h-52 px-3 py-2 outline-none',
        'aria-label': placeholder ?? 'Nội dung',
      },
    },
    onUpdate: ({ editor: instance }) => onChange(instance.getHTML()),
  });

  // Form load dữ liệu về sau (sửa bài viết) thì phải đẩy vào editor. So sánh
  // trước khi set để không phá vị trí con trỏ khi người dùng đang gõ.
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [value, editor]);

  if (!editor) return <div className="h-56 animate-pulse rounded-md bg-muted" />;

  return (
    <div className="overflow-hidden rounded-md border border-input bg-card focus-within:border-primary">
      <div className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/40 px-2 py-1">
        <ToolbarButton
          title="In đậm"
          active={editor.isActive('bold')}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold />
        </ToolbarButton>
        <ToolbarButton
          title="In nghiêng"
          active={editor.isActive('italic')}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic />
        </ToolbarButton>
        <ToolbarButton
          title="Tiêu đề mục"
          active={editor.isActive('heading', { level: 3 })}
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <span className="px-0.5 text-xs font-semibold">H3</span>
        </ToolbarButton>
        <ToolbarButton
          title="Danh sách dấu đầu dòng"
          active={editor.isActive('bulletList')}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List />
        </ToolbarButton>
        <ToolbarButton
          title="Danh sách số"
          active={editor.isActive('orderedList')}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered />
        </ToolbarButton>

        <div className="ml-auto flex gap-0.5">
          <ToolbarButton title="Hoàn tác" onClick={() => editor.chain().focus().undo().run()}>
            <Undo2 />
          </ToolbarButton>
          <ToolbarButton title="Làm lại" onClick={() => editor.chain().focus().redo().run()}>
            <Redo2 />
          </ToolbarButton>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
};
