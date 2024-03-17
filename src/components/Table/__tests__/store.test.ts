import { TABLE_ACTIONS } from '../consts';
import { editTableAction, deleteTableRow, addTableRow } from '../store/tableActions';
import { reducer } from '../store/tableReducer';

describe('Actions', () => {
  it('creates edit table action', () => {
    const payload = { id: '1', name: 'John', age: 30, city: 'New York' };
    const action = editTableAction(payload);
    expect(action).toEqual({ type: TABLE_ACTIONS.EDIT, payload });
  });

  it('creates delete table row action', () => {
    const payload = { id: '1', name: 'John', age: 30, city: 'New York' };
    const action = deleteTableRow(payload);
    expect(action).toEqual({ type: TABLE_ACTIONS.DELETE, payload });
  });

  it('creates add table row action', () => {
    const payload = { name: 'John', age: 30, city: 'New York' };
    const action = addTableRow(payload);
    expect(action).toEqual({ type: TABLE_ACTIONS.ADD, payload });
  });
});

describe('Reducer', () => {
  it('handles edit action', () => {
    const initialState = [
      { id: '1', name: 'John', age: 30, city: 'New York' },
      { id: '2', name: 'Alice', age: 25, city: 'Los Angeles' },
    ];

    const action = editTableAction({ id: '2', name: 'Bob' });
    const newState = reducer(initialState, action);

    expect(newState).toEqual([
      { id: '1', name: 'John', age: 30, city: 'New York' },
      { id: '2', name: 'Bob', age: 25, city: 'Los Angeles' },
    ]);
  });

  it('handles delete action', () => {
    const initialState = [
      { id: '1', name: 'John', age: 30, city: 'New York' },
      { id: '2', name: 'Alice', age: 25, city: 'Los Angeles' },
    ];

    const action = deleteTableRow({ id: '2' });
    const newState = reducer(initialState, action);

    expect(newState).toEqual([{ id: '1', name: 'John', age: 30, city: 'New York' }]);
  });

  it('handles add action', () => {
    const initialState = [
      { id: '1', name: 'John', age: 30, city: 'New York' },
    ];

    const action = addTableRow({ name: 'Alice', age: 25, city: 'Los Angeles', id: '1' });
    const newState = reducer(initialState, action);

    expect(newState.length).toBe(2);
    expect(newState[1]).toEqual({ name: 'Alice', age: 25, city: 'Los Angeles', id: expect.any(String) });
  });

});