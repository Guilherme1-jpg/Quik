import React from 'react';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCellWrapper from 'components/atoms/TableCellWrapperAtom';
import CollapsibleRow from 'components/molecules/CollapseibleRow';

interface CollapsibleTableProps {
  rows: Array<{
    name: string;
    address: string;
    status: string;
  }>;
}

const CollapsibleTable = ({ rows }: CollapsibleTableProps) => {
  const handleEdit = (editedData: any) => {
    console.log('Editing:', editedData);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCellWrapper>Editar</TableCellWrapper>
            <TableCellWrapper>Nome</TableCellWrapper>
            <TableCellWrapper>Endereço</TableCellWrapper>
            <TableCellWrapper>Status Entrega</TableCellWrapper>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <CollapsibleRow key={row.name} row={row} onEdit={handleEdit} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CollapsibleTable;
