import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import iphone from '../../assets/iphone.png'
import smartWatch from '../../assets/smartwatch.png'
import roboAspirador from '../../assets/robot.png'
import { useNavigate } from 'react-router-dom'; 
import Rating from '@mui/material/Rating';
import { useEffect, useState } from 'react';

const DivPrincipal = styled('div')(({ theme }) => ({
    height: '91vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

export default function Home() {
    const [messages, setMessages] = useState([])
    const navigate = useNavigate();

    const handleClickCard = (product) => {
        navigate('/produto', { state: { propriedade: product } });
    };

    const getMessages = async () => {
        const req = await fetch(`http://localhost:3000/produtos`)
        const messages = await req.json();

        setMessages(messages)
    }

    const getMedia = (product) => {
        if (messages.length > 0) {
            const message = messages.find((message) => message.produto === product);
    
            if (message && message.comentarios.length > 0) {
                const totalNotas = message.comentarios.reduce((total, comentario) => total + comentario.nota, 0);
                const media = totalNotas / message.comentarios.length;
                return media;
            }
        }
        
        return 0;
    }

    useEffect(() => {
        getMessages()
    }, [])

  return (
    <DivPrincipal>
        <Grid container gap={3} justifyContent="center">
            <Card sx={{ width: 300 }}>
                <CardActionArea onClick={() => handleClickCard("Iphone X")}>
                    <CardMedia
                        component="img"
                        height="180"    
                        image={iphone}
                        alt="Iphone X"
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Iphone X
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Um celular desnecessariamente caro :D
                        </Typography>
                        <Grid mt={1}>
                            <Rating name="read-only" value={getMedia("Iphone X")} readOnly />
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ width: 300 }}>
                <CardActionArea onClick={() => handleClickCard("Robô aspirador")}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={roboAspirador}
                        alt="Robô aspirador"
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Robô aspirador
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Um robô que limpa de montão
                        </Typography>
                        <Grid mt={1}>
                            <Rating name="read-only" value={getMedia("Robô aspirador")} readOnly />
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card sx={{ width: 300 }}>
                <CardActionArea onClick={() => handleClickCard("SmartWatch")}>
                    <CardMedia
                        component="img"
                        height="180"
                        image={smartWatch}
                        alt="smartWatch"
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            SmartWatch
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Um relógio super bacaninha
                        </Typography>
                        <Grid mt={1}>
                            <Rating name="read-only" value={getMedia("SmartWatch")} readOnly />
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    </DivPrincipal>
  );
}