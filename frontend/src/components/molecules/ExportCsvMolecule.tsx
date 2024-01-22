import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';

interface CsvExportMoleculeProps {
  data: any[];
  filename: string;
}

const CsvExportMolecule: React.FC<CsvExportMoleculeProps> = ({ data, filename }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExportCSV = (fullReport: boolean) => {
    try {
      let csvContent = '';

      if (fullReport) {
        csvContent = "id,title,description,likes,dislikes,views,commentsCount\n" +
          data.map((row) => `${row._id},"${row.props.title}","${row.props.description}",${row.props.likes},${row.props.dislikes},${row.props.views},${row.props.commentsCount}`).join("\n");
      } else {
        csvContent = "id,title,commentsCount\n" +
          data.map((row) => `${row._id},"${row.props.title}",${row.props.commentsCount}`).join("\n");
      }

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Erro ao exportar arquivo CSV:', error);
    }

    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={handleClick}
        style={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        Exportar CSV
      </Button>

      <Menu
        id="csv-export-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleExportCSV(false)}>Relatório Otimizado</MenuItem>
        <MenuItem onClick={() => handleExportCSV(true)}>Relatório Completo</MenuItem>
      </Menu>
    </>
  );
};

export default CsvExportMolecule;
