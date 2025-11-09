// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { LoginPage } from './pages/LoginPage'; 
import { DashboardLayout } from './layout/DashboardLayout';

import { ProductoPage } from './pages/ProductoPage';
import { PagoPage } from './pages/PagoPage';
import { TableroPage } from './pages/TableroPage';
import { MatriculaPage } from './pages/ClientePage';

function App() {
  return (
    // CORRECCIÓN: BrowserRouter DEBE envolver a AuthProvider
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Rutas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<DashboardLayout />}>
              {/* Ruta para "/" */}
              <Route index element={<TableroPage />} />
              {/* Ruta para "/dashboard" (redirección de Stripe) */}
              <Route path="dashboard" element={<TableroPage />} /> 
              
              <Route path="clientes" element={<MatriculaPage />} />
            
              <Route path="pagos" element={<PagoPage />} />
            </Route>
          </Route>
          
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;