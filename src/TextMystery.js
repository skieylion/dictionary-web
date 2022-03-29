import React,{Component,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
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
import {Link} from 'react-router-dom'
import CardImage from './CardImage';
import CardReader from './CardReader';
import Rest from './Rest';
import Service from './Service';


const axios=require('axios').default;

export default function TextMystery(props) {

    //id="standard-basic32"
    //const containerKey=
    const buffer=React.useRef('');
    let currentAnswer={};
    Object.assign(currentAnswer,buffer);

    const expressionValue=props.expressionValue;
    const [text,setText]=useState(props.text);

    const getRandomInt=function(max) {
        return Math.floor(Math.random() * max);
    }

    props.check(()=>{
        let rightAnswer=expressionValue; rightAnswer=rightAnswer?rightAnswer.toUpperCase():null;
        let curAnswer=currentAnswer.current.value; curAnswer=curAnswer?curAnswer.toUpperCase():null;
        
        if(curAnswer&&rightAnswer&&rightAnswer==curAnswer){
            return true;
        } else {
            return false;
        }
    });


    useEffect(()=>{
        setText(text);
    },[]);

    return (
        <Stack>
            <Typography variant="h4">
                {text}
            </Typography>
            <TextField fullWidth inputRef={currentAnswer}  label="Выражение"  variant="outlined" />
        </Stack>
    );
};