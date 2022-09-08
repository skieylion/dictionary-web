import React,{Component,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { getBottomNavigationUtilityClass } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import { makeStyles } from '@material-ui/core/styles';
import Rest from './Rest';
import AudioButton from './AudioButton';


const theme = createTheme({
    typography: {
        subtitle1: {
            fontSize: 14,
        },
        body1: {
            fontWeight: 500,
        },
        button: {
            fontStyle: 'italic',
        },
    },
});


const axios=require('axios').default;

export default function CardMini(props) {

    let {card}=useParams();
    card=props.card;
    
    return (
        <Card  sx={{ width: 220, height:220, border:2 }}>
            <CardMedia
                component="img"
                height="110"
                image={card.image}
                alt="green iguana"
                sx={{borderBottom: 1 }}
            />
            <CardContent sx={{m:0,p:0,ml:1,mr:1, }}>
                <ThemeProvider theme={theme}>
                    <Typography variant="subtitle1" sx={{lineHeight: 1}}>
                        <b><span title={card.expression}>{Rest.cut(card.expression,12)}</span></b> (<span title={card.speechPart}>{Rest.cut(card.speechPart,5)}</span>) &nbsp;&nbsp;
                        
                        {
                            card.audioFile &&
                            <AudioButton source={card.audioFile} type={"VolumeUpIcon"} />
                        }
                        
                        <Typography sx={{
                            display: '-webkit-box',
                            overflow: 'hidden',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 2,
                        }}>
                            <span title={card.example}>{card.example}</span>
                            <br /><br />
                        </Typography>
                        
                        <Divider light />
                    </Typography>
                </ThemeProvider>
            </CardContent>
            <CardActions sx={{m:0,p:0,ml:1,mt:1}}>
                <Tooltip title="View" sx={{m:0,p:0}}>
                    <IconButton  sx={{m:0,p:0}} onClick={function(){
                      Rest.toLink("/cards/"+card.cardId+"/reader");
                    }} >
                        <RemoveRedEyeIcon  sx={{m:0,p:0}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Edit" sx={{m:0,p:0}}>
                    <IconButton  sx={{m:0,p:0}}>
                        <EditIcon  sx={{m:0,p:0}}  onClick={function(){
                            Rest.toLink("/writer?mode=edit&cardId="+card.cardId);
                        }} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" sx={{m:0,p:0}}>
                    <IconButton  sx={{m:0,p:0}} onClick={function(){
                        if(window.confirm("Would You like to delete this card ?")) {
                            Rest.deleteCard(card.cardId);
                            if(props.delete) props.delete(card.cardId);
                        }
                        
                    }} >
                        <DeleteIcon  sx={{m:0,p:0}} />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};