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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
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
  const [idade, setIdade] = useState("")
  const [nome, setNome] = useState("")
  const [cpf, setCpf] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [genero, setGenero] = useState("")
  const [open, setOpen] = useState(false)
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

  const register = async () => {
    if(nome !== "" && idade !== "" && cpf !== "" && email !== "" && password !== "" && genero !== "") {
      const getByEmail = await fetch(`http://localhost:3000/usuarios?email=${email}`)
      const usuario = await getByEmail.json();
      if(usuario.length > 0) {
        showMessage("error", "Email já cadastrado")
        return;
      }

      const data = {
        nome: nome,
        idade: idade,
        cpf: cpf,
        email: email,
        senha: password,
        genero: genero
      }
  
      const dataJson = JSON.stringify(data)

      await fetch("http://localhost:3000/usuarios", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: dataJson
      })

      navigate("/")
    }
    else {
      showMessage("error", "Preencha todos os campos")
    }
  }

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
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
              <TextField fullWidth label="Nome Completo" variant="outlined" sx={{ marginBottom: 2 }} onChange={(e) => setNome(e.target.value)} />
              <TextField label="Idade" fullWidth type="number" variant="outlined" sx={{ marginBottom: 2 }} onChange={(e) => setIdade(e.target.value)} />
              <TextField label="CPF" fullWidth variant="outlined" sx={{ marginBottom: 2 }} onChange={(e) => setCpf(e.target.value)} />
              <TextField fullWidth type="email" label="Email" variant="outlined" sx={{ marginBottom: 2 }} onChange={(e) => setEmail(e.target.value)} />
              <FormControl fullWidth variant="outlined" sx={{ marginBottom: 2 }}>
                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
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
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Gênero</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    onChange={(e) => setGenero(e.target.value)}
                  >
                    <FormControlLabel value="Feminino" control={<Radio />} label="Feminino" />
                    <FormControlLabel value="Masculino" control={<Radio />} label="Masculino" />
                    <FormControlLabel value="Outro" control={<Radio />} label="Outro" />
                  </RadioGroup>
              </FormControl>
              <Grid container justifyContent="flex-end">
                  <Button variant="contained" color="error" endIcon={<LoginIcon />} onClick={register}>
                      Cadastrar
                  </Button>
              </Grid>
            </Box>
          </FormBox>
        </Grid>
      </DivPrincipal>
    </>
    
  );
}