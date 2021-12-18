import { useEffect, useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import { bundle } from '../bundler';
import Resizable from './resizable';

export const CodeCell = () => {
  const [text, setText] = useState('');
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(text);
      setCode(output.code);
      setErr(output.err);
    }, 750);
    return (): void => {
      clearTimeout(timer);
    };
  }, [text]);

  return (
    <Resizable direction='vertical'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue='const a = 1;'
            onChange={(e) => setText(e)}
          />
        </Resizable>
        <Preview code={code} err={err} />
      </div>
    </Resizable>
  );
};
