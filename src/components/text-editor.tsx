import MDEditor from '@uiw/react-md-editor';
import { useState, useEffect, useRef } from 'react';
import './text-editor.css';
import { useActions } from '../hooks/use-actions';
import { Cell } from '../state';

interface TextEditorProps {
  cell: Cell;
}

const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { updateCell } = useActions();

  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const listener = (event: any) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        return;
      }
      setIsEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () =>
      document.removeEventListener('click', listener, { capture: true });
  }, []);

  if (isEditing) {
    return (
      <div ref={ref} className='text-editor'>
        <MDEditor
          value={cell.content}
          onChange={(v) => updateCell(cell.id, v ?? '')}
        />
      </div>
    );
  }

  return (
    <div onClick={() => setIsEditing(true)} className='text-editor card'>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
};

export default TextEditor;
