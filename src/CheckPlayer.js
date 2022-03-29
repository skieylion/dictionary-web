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


const axios=require('axios').default;

export default function CheckPlayer(props) {

    const clickCheckIn=props.clickCheck;
    const clickNextIn=props.clickNext;
    const clickCloseIn=props.clickClose;
    const clickSkipIn=props.clickSkip;
    const currentIndex=props.index;
    const lastIndex=props.lastIndex;
    const [isWrong, setIsWrong] = useState(false);

    const clickCheck=function() {
        let isRight=clickCheckIn();
        if(isRight==true){
            setIsWrong(false);
            if(lastIndex==currentIndex){
                clickCloseIn(true);
            } else {
                clickNextIn();
            }
        } else {
            setIsWrong(true);
            //alert("It's wrong");
        }
    }

    const clickSkip=function(){
        if(lastIndex==currentIndex){
            clickCloseIn(false);
        } else {
            clickSkipIn();
        }
    }

    return (
        <Stack direction={"row"} spacing={1}>
            <Button size="small" fullWidth onClick={clickSkip}  variant="contained">Пропустить</Button>
            <Button size="small" fullWidth onClick={clickCheck} color={isWrong?"error":"primary"}  variant="contained">Проверить</Button>
        </Stack>
    );
};