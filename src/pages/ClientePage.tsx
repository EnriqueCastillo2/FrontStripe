import { useEffect, useState } from 'react';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Box, Alert, Typography } from '@mui/material';
import { getMatriculas, type Matricula } from '../services/clienteApi';

// Suponiendo que tienes un servicio para obtener las matrículas
// Cambiar la importación a tus servicios

export const MatriculaPage = () => {
  const [matriculas, setMatriculas] = useState<Matricula[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Obtener las matrículas desde el backend
  const fetchMatriculas = async () => {
    try {
      setLoading(true);
      const response = await getMatriculas(); // Obtener las matrículas
      setMatriculas(response); // Suponiendo que el backend devuelve un arreglo de matrículas
      setError(null);
    } catch (err) {
      setError('Error al cargar las matrículas.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatriculas();
  }, []);

  // Definir las columnas para el DataGrid
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'carnet', headerName: 'Carnet', width: 150 },
    { field: 'estudiante', headerName: 'Estudiante', width: 200 },
    { field: 'mes', headerName: 'Mes', width: 150 },
    { field: 'semestre', headerName: 'Semestre', width: 150 },
    { field: 'anio', headerName: 'Año', width: 100 },
    { field: 'monto', headerName: 'Monto', width: 150 },
    { field: 'status', headerName: 'Estatus', width: 150 },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Gestión de Matrículas
      </Typography>

      {error && <Alert severity="error">{error}</Alert>}

      <DataGrid
        rows={matriculas}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 20]}
      />
    </Box>
  );
};
