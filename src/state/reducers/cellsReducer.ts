import produce from 'immer';
import { ActionType } from '../action-types';
import { Action } from '../actions';
import { Cell } from '../cell';

interface CellsState {
  loading: boolean;
  error: string | null;
  order: string[];
  data: {
    [key: string]: Cell;
  };
}

const initialState: CellsState = {
  loading: false,
  error: null,
  order: [],
  data: {}
};

const reducer = produce((state: CellsState = initialState, action: Action) => {
  switch (action.type) {
    case ActionType.UPDATE_CELL:
      const { id, content } = action.payload;
      state.data[id].content = content;
      return state;
    case ActionType.DELETE_CELL:
      delete state.data[action.payload];
      state.order = state.order.filter((id) => id !== action.payload);
      return state;
    case ActionType.MOVE_CELL:
      const { direction } = action.payload;
      const index = state.order.findIndex((id) => id === action.payload.id);
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex > state.order.length - 1) {
        return state;
      }
      state.order[index] = state.order[targetIndex];
      state.order[targetIndex] = action.payload.id;
      return state;
    case ActionType.INSERT_CELL_BEFORE:
      const cell: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      };
      state.data[cell.id] = cell;
      const k = state.order.findIndex((id) => id === action.payload.id);
      if (k < 0) {
        state.order.push(cell.id);
      } else {
        state.order.splice(k, 0, cell.id);
      }
      return state;
    case ActionType.INSERT_CELL_AFTER:
      const c: Cell = {
        content: '',
        type: action.payload.type,
        id: randomId()
      };
      state.data[c.id] = c;
      const i = state.order.findIndex((id) => id === action.payload.id);
      if (i < 0) {
        state.order.unshift(c.id);
      } else {
        state.order.splice(i + 1, 0, c.id);
      }
      return state;
    default:
      return state;
  }
});

const randomId = () => Math.random().toString(36).substr(2, 5);

export default reducer;
