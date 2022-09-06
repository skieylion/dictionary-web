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
import Divider from '@mui/material/Divider';

const axios=require('axios').default;

const letters=["A","B","C","D","E","F","G","H"];

export default function DefExamModule(props) {
    
    const [contextList,setContextList]=useState([]);

    const random=function(min, max) {
        return Math.random() * (max - min) + min;
    };

    const mix=function(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    };

    let answers=[];

    const changeAnswer=function(e,index){
        console.log(e.target.value," - ",index);
        answers[index]=e.target.value;
        console.log("answers",answers);
    };
    props.check(()=>{
        console.log("sadfsd");
        let count=0;

        next: for(let i = 0; i < contextList.length; i++) {
            let example1=contextList[i].randomExample;
            for(let j = 0; j < contextList.length; j++) {
                if(answers[i]==letters[j]) {
                    let example2=contextList[j].example;
                    if(example1==example2) {
                        count++;
                        continue next;
                    }
                }
            }
        }
        return contextList.length==count;
    });


    useEffect(()=>{
        let arr=[];
        let exampleList=[];
        if(props.contextList){
            for(let i=0;i<props.contextList.length;i++){
                let examples=props.contextList[i].examples;
                let index=random(0,examples.length-1);
                arr.push({
                    definition:props.contextList[i].definition,
                    example:examples[index].text
                });
                exampleList.push(examples[index].text);
            }
            exampleList=mix(exampleList);
            for(let i=0;i<arr.length;i++){
                arr[i].randomExample=exampleList.pop();
            }

        }

        setContextList(arr);

    },[]);

    return (
        <Stack>
            <br/>
            {
                contextList.map((context,index)=>(
                    <Stack>
                        <Stack sx={{m:0,p:1, width:'100%'}} direction={"row"} >
                            <Stack   sx={{width:'49%'}}>
                                <Typography variant="h5">
                                    <b>{index+1}.</b> <i>{context.definition}</i>
                                </Typography>
                            </Stack>
                            <Stack sx={{width:'49%'}}>
                                <Typography variant="h5">
                                    <b>{letters[index]}.</b> <i> {context.randomExample}</i>
                                </Typography>
                            </Stack>
                        </Stack>
                        <Divider  sx={{ width: '100%' }}  />
                    </Stack>
                ))
            }
            <Stack direction={"row"}  sx={{m:0,p:1, width: '100%' }}>
            {  
                contextList.map((context,index)=>(
                    <Stack direction={"row"}   sx={{m:0,p:2}} >
                        <Typography variant="h5">{index+1}. </Typography>
                        <Select sx={{width: '60px' }}
                            labelId={"demo-simple-select-label-"+index}
                            id={"demo-simple-select"+index}
                            onChange={function(e){changeAnswer(e,index)}}
                            //defaultValue={1}
                            label=""
                            size="small"
                        >
                            {contextList.map((ps,index2)=>(
                                <MenuItem key={"answers_index_"+index+"_index2_"+index2}  value={letters[index2]} >{letters[index2]}</MenuItem>
                            ))}
                        </Select>
                    </Stack>
                ))
                
            }
            </Stack>
        </Stack>
    );
};