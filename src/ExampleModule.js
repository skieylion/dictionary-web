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
import TextMystery from './TextMystery';

const axios=require('axios').default;

export default function ExampleModule(props) {
    
    const [examples,setExamples]=useState([]);

    useEffect(()=>{
        setExamples(props.examples);
    },[]);

    return (
        <Stack>
            <br/>
            {
                examples.map((example,index)=>(
                    <Stack>
                        <Typography variant="h5">
                            <i><b>{index+1}.</b> {Service.replaceSubtextBySymbols(example.text,props.expressionValue,"_")}</i>
                        </Typography>
                        <br/>
                    </Stack>
                ))
            }
            <TextMystery  check={props.check} expressionValue={props.expressionValue} text={""} />
        </Stack>
    );
};