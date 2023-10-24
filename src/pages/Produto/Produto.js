import React from 'react'
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Rating from '@mui/material/Rating';
import { Divider } from '@mui/material';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import IphoneX from '../../assets/iphone.png'
import Robot from '../../assets/robot.png'
import SmartWatch from '../../assets/robot.png'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Produto = () => {
    const { state } = useLocation();

    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0);
    const [ratingProduct, setRatingProduct] = useState(0)
    const [messages, setMessages] = useState([])
    const [open, setOpen] = useState(false);
    const [severity, setSeverity] = useState("")
    const [message, setMessage] = useState("")

    const getImage = () => {
        switch(state.propriedade) {
            case "Iphone X":
                return IphoneX
            case "Robô aspirador":
                return Robot
            case "SmartWatch":
                return SmartWatch
            default:
                return;
        }
    }

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

    const geraComentario = async () => {
        const novoComentario = {
            descricao: comment,
            idUsuario: JSON.parse(sessionStorage.getItem("idUsuario")),
            nomeUsuario: JSON.parse(sessionStorage.getItem("nomeUsuario")),
            nota: +rating
        };
          
        const req = await fetch(`http://localhost:3000/produtos?produto=${state.propriedade}`)
        const produto = await req.json();

        produto[0].comentarios.push(novoComentario);

        const dataJson = JSON.stringify(produto[0])

        await fetch(`http://localhost:3000/produtos/${produto[0].id}`, {
            method: "PUT",
            headers: {"Content-type": "application/json"},
            body: dataJson
        }).then((result) => {
            getMessages()
            showMessage("success", "Review adicionada com sucesso")
        }).catch((err) => {
            showMessage("error", "Erro ao adicionar review, tente novamente!")
        })
    }

    const getMessages = async () => {
        const req = await fetch(`http://localhost:3000/produtos`)
        const result = await req.json();
        const messages = result.filter((message) => {
            return message.produto === state.propriedade
        })

        let media = 0

        messages[0].comentarios.map((comentario) => {
            media += comentario.nota
        })

        setRatingProduct(media / messages[0].comentarios.length)

        setMessages(messages[0].comentarios)
    }

    useEffect(() => {
        getMessages()
    }, [])

  return (
    <>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={severity} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        <Box sx={{ pb: 7 }}>
            <CssBaseline />
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                <Card sx={{ width: '100%' }}>
                    <CardMedia
                        component="img"
                        height="180"
                        width="300"  
                        image={getImage()}
                        alt={state.propriedade}
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {state.propriedade}
                        </Typography>
                        <Grid mt={1}>
                            <Rating name="read-only" value={ratingProduct} readOnly />
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
            <Box display="flex" alignItems="center" padding="20px" gap="30px">
                <Avatar alt="Avatar" />
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Insira seu comentário aqui..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <Rating
                    name="rating"
                    value={+rating}
                    onChange={(e) => setRating(e.target.value)}
                />
                <Button variant="contained" color="error" onClick={geraComentario}>
                    Enviar
                </Button>
            </Box>
            <Divider variant="inset" component="li" />
            <List>
                {messages.map((message) => (
                    <ListItem key={message.id}>
                        <ListItemAvatar>
                            <Avatar alt="Profile Picture" />
                        </ListItemAvatar>
                        <ListItemText primary={message.nomeUsuario} secondary={message.descricao} />
                        <Rating name="read-only" value={message.nota} readOnly />
                    </ListItem>
                ))}
            </List>
        </Box>
    </>
  )
}

export default Produto