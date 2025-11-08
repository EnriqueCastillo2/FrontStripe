import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { CheckoutForm } from '../components/CheckoutForm';
import { Alert, Box, CircularProgress, Typography, TextField, Button } from '@mui/material';

// ⬇️ RECUERDA PONER TU CLAVE PÚBLICA REAL DE STRIPE ⬇️
const STRIPE_PUBLIC_KEY = 'pk_test_51SLBj3Cf4KizvED6FGm9bbwa4vKAMOnxpZbCsN0NjGvWEVDHU2q7AZH8rpFVDAXkuivArnuQ5vuDdUJQR81mupVP008EEbKhvU'; 
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const API_URL = `${import.meta.env.VITE_API_URL}/stripe/create-payment-intent`;

export const PagoPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [formData, setFormData] = useState({
    carnet: '',
    estudiante: '',
    mes: '',
    semestre: '',
    anio: '',
    monto: '',
    transaccion: '',
    status: 'Pagado', // Por defecto lo ponemos en "Pagado"
  });

  const handleCreatePaymentIntent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const amountInCents = Math.round(parseFloat(amount) * 100);

    if (isNaN(amountInCents) || amountInCents <= 0) {
      setError('Por favor, ingresa un monto válido.');
      setLoading(false);
      return;
    }

    try {
      // 1. Llamamos al backend ENVIANDO AMOUNT Y CURRENCY
      const response = await axios.post(API_URL, { 
        amount: amountInCents,
        currency: "usd" // Asegúrate que el backend lo espere
      });
      
      if (response.data && response.data.clientSecret) {
        setClientSecret(response.data.clientSecret);
      } else {
        throw new Error('Respuesta inválida del servidor');
      }
    } catch (err) {
      console.error(err);
      setError('No se pudo inicializar el pago. Revisa el backend.');
    } finally {
      setLoading(false);
    }
  };

  const appearance = {
    theme: 'stripe' as const,
  };

  const options = {
    clientSecret: clientSecret || undefined,
    appearance,
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Formulario de Pago</Typography>
      
      {/* 1. Muestra formulario de Monto */}
      {!clientSecret && (
        <Box component="form" onSubmit={handleCreatePaymentIntent} sx={{ maxWidth: 400 }}>
          
          <Typography variant="h6">Carnet</Typography>
          <TextField
            label="Carnet"
            variant="outlined"
            fullWidth
            type="string"
            name="carnet"
            value={formData.carnet}
            onChange={(e) => setFormData({ ...formData, carnet: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6">Estudiante</Typography>
          <TextField
            label="Estudiante"
            variant="outlined"
            fullWidth
            type="string"
            name="estudiante"
            value={formData.estudiante}
            onChange={(e) => setFormData({ ...formData, estudiante: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6">Mes</Typography>
          <TextField
            label="Mes"
            variant="outlined"
            fullWidth
            type="string"
            name="mes"
            value={formData.mes}
            onChange={(e) => setFormData({ ...formData, mes: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6">Semestre</Typography>
          <TextField
            label="Semestre"
            variant="outlined"
            fullWidth
            type="string"
            name="semestre"
            value={formData.semestre}
            onChange={(e) => setFormData({ ...formData, semestre: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6">Año</Typography>
          <TextField
            label="Año"
            variant="outlined"
            fullWidth
            type="string"
            name="anio"
            value={formData.anio}
            onChange={(e) => setFormData({ ...formData, anio: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6">Monto</Typography>
          <TextField
            label="Monto"
            variant="outlined"
            fullWidth
            type="string"
            name="monto"
            value={formData.monto}
            onChange={(e) => setFormData({ ...formData, monto: e.target.value })}
            margin="normal"
          />
         
          <Typography variant="h6">Estatus</Typography>
          <TextField
            label="Estatus"
            variant="outlined"
            fullWidth
            type="string"
            name="status"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6">Ingresa el monto a pagar (USD)</Typography>
          <TextField
            label="Monto"
            variant="outlined"
            fullWidth
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            margin="normal"
            InputProps={{ inputProps: { step: "0.01" } }}
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} /> : "Proceder al Pago"}
          </Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </Box>
      )}

      {/* 2. Muestra formulario de Stripe (cuando ya hay clientSecret) */}
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Box>
  );
};
