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
import AudioButton from './AudioButton';
import Utils from './Utils';

import FileAttach from './FileAttach';

const axios=require('axios').default;

export default function Examples(props) {

    const buffer=React.useRef('');

    props.fill(function(exampleList) {
        examples.pop();
        for(let i=0;i<exampleList.length;i++) {
            let example=exampleList[i];
            examples.push({
                key:Utils.getKeyIndex(),
                value:example
            });
        }
    });

    const [examples,setExamples]=React.useState([
        {
            key:1,
            text:React.useRef(''),
            value:""
        }
    ]);

    const clickRemoveExample=function(e){
        console.log(e);
        if(examples.length>1) {
            setExamples(Utils.getRemoveArray(examples,e.key));
        } else {
            //alert("Контекст должен содержать не менее 1 примера")
        }
    }

    const clickAddExample=function(){
        setExamples(Utils.getAddArray(examples,buffer));
    }

    

    return (
        <span>
            {
                examples.map((e,index)=>(
                    <Stack spacing={1} sx={{m:1}}  direction="row">
                        <TextField  size="small" fullWidth key={e.key} value={e.value}  inputRef={e.text}  label={"an example"} variant="outlined"  
                            onChange={(newValue) => {
                                e.value=newValue.target.value;
                            }}
                        />
                        {
                            examples.length>1 && index<examples.length-1 && <Button size="small" onClick={function(){clickRemoveExample(e)}} variant="contained">-</Button>
                        }
                        {
                            !(index<examples.length-1) && <Button size="small"   variant="contained" onClick={clickAddExample}>+</Button>
                        }
                    </Stack>   
                ))
            }
        </span>
    );
};