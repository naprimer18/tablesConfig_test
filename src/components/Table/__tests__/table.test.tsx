import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Table } from '../Table';
import { RowType, TableColumn } from '../types';

describe('Table component', () => {
    const columns = [
        { key: '1', dataIndex: 'name' },
        { key: '2', dataIndex: 'age' },
    ] as TableColumn<RowType>[];

  const data = [
    { id: '1', name: 'John', age: 30 },
    { id: '2', name: 'Jane', age: 25 },
  ];

  test('renders table correctly', () => {
    render(<Table data={data} columns={columns} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Jane')).toBeInTheDocument();
  });

  test('calls onCopyTable when Copy Table button is clicked', () => {
    const onCopyTable = jest.fn();
    render(<Table parentTable data={data} columns={columns} onCopyTable={onCopyTable} />);
    
    fireEvent.click(screen.getByRole('copy-table'));
    
    expect(onCopyTable).toHaveBeenCalled();
  });

});