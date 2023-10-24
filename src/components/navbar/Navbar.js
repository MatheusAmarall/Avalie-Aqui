import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Link } from '@mui/material';
import { useState } from 'react'
import { useUserContext } from '../../context/UserContext';
import { useEffect } from 'react';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));


const redTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#930000',
      },
    },
  });

export default function Navbar() {
    const [pesquisa, setPesquisa] = useState("")
    const [userName, setUsername] = useState("")

    const { nomeUsuario, setNomeUsuario } = useUserContext();
    

    const navigate = useNavigate();

    const handleNavigate = (route) => {
      navigate(route);
      setPesquisa("")
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        navigate('/produto', { state: { propriedade: pesquisa } });
      }
    };

    const logout = () => {
      sessionStorage.removeItem("idUsuario")
      sessionStorage.removeItem("nomeUsuario")
      setNomeUsuario("")
      setUsername("")
    }

    useEffect(() => {
      setUsername(JSON.parse(sessionStorage.getItem("nomeUsuario")))
    }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
        <ThemeProvider theme={redTheme}>
            <AppBar position="static">
                <Toolbar>
                    <Link onClick={() => handleNavigate('/')} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ cursor: 'pointer' }}
                        >
                            Avalie Aqui
                        </Typography>
                    </Link>
                    <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ 'aria-label': 'search' }}
                      value={pesquisa}
                      onChange={(e) => setPesquisa(e.target.value)}
                      onKeyPress={handleKeyPress}
                    />
                    </Search>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                      {nomeUsuario || userName ? (
                        <Button color="inherit" onClick={() => logout()}>Logout</Button>
                      ) : (
                        <>
                          <Button color="inherit" onClick={() => handleNavigate('/login')}>Entre</Button>
                          <Button color="inherit" onClick={() => handleNavigate('/register')}>Crie sua conta</Button>
                        </>
                      )}
                    </Box>
                </Toolbar>
            </AppBar>
        </ThemeProvider>
    </Box>
  );
}