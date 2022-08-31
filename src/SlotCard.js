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


import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea, CardActions } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Divider from '@mui/material/Divider';
import Rest from './Rest';
import SchoolIcon from '@mui/icons-material/School';

const axios=require('axios').default;

export default function SlotCard(props) {

    let {name,image,slotId}=useParams();
    name=props.name;
    image=props.image;
    slotId=props.slotId;

    return (
        <Card  sx={{ width: 300, height:300, border:2 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                    alt="green iguana"
                    sx={{borderBottom: 1 }}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {name}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions >
                <Tooltip title="View" sx={{m:0,p:0}}>
                    <IconButton  sx={{m:0,p:0}} onClick={function(){
                        Rest.toLink("/slots/"+slotId+"/cards");
                    }} >
                        <RemoveRedEyeIcon  sx={{m:0,p:0}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Learn" sx={{m:0,p:0}}>
                    <IconButton  sx={{m:0,p:0}} onClick={function(){
                        Rest.toLink("/slots/"+slotId+"/student");
                    }} >
                        <SchoolIcon  sx={{m:0,p:0}} />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete" sx={{m:0,p:0}}>
                    <IconButton  sx={{m:0,p:0}} onClick={function(){
                        if(window.confirm("Would You like to delete this slot ?")) {
                            Rest.deleteSlot(slotId,function(){
                                document.location.reload();
                            });
                        }
                        
                    }} >
                        <DeleteIcon  sx={{m:0,p:0}} />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};