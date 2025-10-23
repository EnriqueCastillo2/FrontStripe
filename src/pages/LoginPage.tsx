import { Button, TextField, Container, Box, Typography, CssBaseline, Paper } from '@mui/material';
import { useAuth } from '../auth/AuthContext';

export const LoginPage = () => {
  const { login } = useAuth();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // En un caso real, aquí llamarías a tu API de login
    login();
  };

  return (
    <Container 
      component="main" 
      maxWidth={false}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh', 
        backgroundColor: (theme) => 
          theme.palette.mode === 'dark' ? '#121212' : '#f0f2f5',
      }}
    >
      <CssBaseline /> 
      <Paper 
        elevation={6} 
        sx={{
          padding: 4, 
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          maxWidth: '400px', 
        }}
      >
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ mt: 1, width: '100%' }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Acceder
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};