import { useTypedSelector } from '../hooks/use-typed-selector';
import CellListItem from './cell-list.item';
import AddCell from './add-cell';

const CellList: React.FC = () => {
  const cells = useTypedSelector(({ cells }) => {
    return cells?.order.map((id: string) => {
      return cells.data[id];
    });
  });

  const renderedCells = cells?.map((cell) => (
    <div key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </div>
  ));

  return (
    <div>
      <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  );
};

export default CellList;
