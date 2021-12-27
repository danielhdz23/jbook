import { useEffect } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { Cell } from '../state';
import { useActions } from '../hooks/use-actions';
import { useTypedSelector } from '../hooks/use-typed-selector';
import './code-cell.css';

interface CodeCellProps {
  cell: Cell;
}
export const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();

  // @ts-ignore
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cell.content);
      return;
    }
    const timer = setTimeout(() => {
      createBundle(cell.id, cell.content);
    }, 750);
    return (): void => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: 'calc(100% -  8px)',
          display: 'flex',
          flexDirection: 'row'
        }}>
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={cell.content}
            onChange={(e) => updateCell(cell.id, e)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle?.code} err={bundle?.err} />
          )}
        </div>
      </div>
    </Resizable>
  );
};
