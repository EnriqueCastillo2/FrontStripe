import axios from 'axios';

// Endpoint de la API para crear una matrícula
const API_BASE_URL = `${import.meta.env.VITE_API_URL}/matricula`;

// Tipo de datos que se enviarán para crear la matrícula
export type Matricula = {
  carnet: string;
  estudiante: string;
  mes: string;
  semestre: string;
  anio: string;
  monto: string;
  transaccion: string;
  status: string;
};

// Función para crear la matrícula en el backend
export const createMatricula = async (matricula: Matricula) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, matricula);
    return response.data;
  } catch (error) {
    console.error('Error al crear matrícula', error);
    throw error;
  }
  
};
export const getMatriculas = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data; // Debería devolver una lista de matrículas
  } catch (error) {
    throw new Error('Error al obtener las matrículas');
  }
};