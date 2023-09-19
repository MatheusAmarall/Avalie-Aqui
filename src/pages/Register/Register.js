import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';

const FormBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#e3e3e3', 
  padding: '100px',
  borderRadius: '8px',
}));

const DivPrincipal = styled('div')(({ theme }) => ({
  height: '91vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export default function Register() {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <DivPrincipal>
      <Grid container justifyContent='center' gap={3}>
        <FormBox>
          <Box
            sx={{
              width: '100%',
              maxWidth: 500
            }}
          >
            <TextField id="outlined-basic" fullWidth label="Nome Completo" variant="outlined" sx={{ marginBottom: 2 }} />
            <TextField id="outlined-basic" fullWidth label="CPF" variant="outlined" sx={{ marginBottom: 2 }} />
            <TextField id="outlined-basic" fullWidth label="Email" variant="outlined" sx={{ marginBottom: 2 }} />
            <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
              <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Senha"
              />
            </FormControl>
            <Grid container justifyContent="flex-end">
                <Button variant="contained" color="error" endIcon={<LoginIcon />}>
                    Cadastrar
                </Button>
            </Grid>
          </Box>
        </FormBox>
      </Grid>
    </DivPrincipal>
  );
}