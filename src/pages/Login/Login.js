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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("")
  const [password, setPassword]= useState("")
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("")
  const [message, setMessage] = useState("")

  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const showMessage = (severity, message) => {
    setSeverity(severity)
    setMessage(message)
    setOpen(true)
  }

  const login = async () => {
    if(email !== "" && password !== "") {
      const req = await fetch(`http://localhost:3000/usuarios?email=${email}`)
      const usuario = await req.json();
      if(usuario.length > 0) {
        if(usuario[0].senha === password) {
          navigate("/")
        }
        else {
          showMessage("error", "Senha incorreta")
        }
      }
      else {
        showMessage("error", "Email não encontrado, por favor cadastre-se")
      }
    }
    else {
      showMessage("error", "Preencha todos os campos")
    }
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
      <DivPrincipal>
        <Grid container justifyContent='center' gap={3}>
          <FormBox>
            <Box
              sx={{
                width: '100%',
                maxWidth: 500
              }}
            >
              <TextField id="outlined-basic" fullWidth label="Email" variant="outlined" sx={{ marginBottom: 2 }} required={true} onChange={(e) => setEmail(e.target.value)} />
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  required={true}
                  onChange={(e) => setPassword(e.target.value)}
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
                  <Button variant="contained" color="error" endIcon={<LoginIcon />} onClick={login}>
                    Entrar
                  </Button>
              </Grid>
            </Box>
          </FormBox>
        </Grid>
      </DivPrincipal>
    </>
  );
}