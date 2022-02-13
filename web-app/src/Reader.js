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

export default function Reader(props) {

    const listMax=props.listContextIds.length;
    const listContextIds=props.listContextIds;
    const contextListId=props.contextListId;
    const clickNextFunc=props.clickNext;

    const [containerList, setContainerList] = useState([]);
    const [isReady, setIsReady] = useState(false);
    

    useEffect(() => {
        let arr=[];
        for(var i=0;i<listContextIds.length;i++){
            arr.push({
                isDisplay:i==0?true:false,
                id:listContextIds[i]
            });
        }
        setContainerList(arr);
    },[]);

    const clickStep=function(index,step){
        let list=[...containerList];
        list[index].isDisplay=false;
        let stepIndex=index+1*step;

        if(stepIndex<list.length && stepIndex>=0) {
            list[stepIndex].isDisplay=true;
        }
        if(stepIndex==list.length-1){
            setIsReady(true);
        }

        console.log("step",index,step,list);
    }


    
    const clickNext=function(){
        setContainerList([]);
        if(clickNextFunc) clickNextFunc();
    }

    return (
        <Stack spacing={1}>
            {
                containerList.map((ctx,index)=>(
                    <Stack sx={{display:ctx.isDisplay?"block":"none"}}>
                        <CardReader contextListId={contextListId} contextId={ctx.id}  />
                        <Stack direction={"row"} spacing={1}>
                            {
                                index!=0&&
                                <Button size="small" fullWidth onClick={function(){ clickStep(index,-1); }}  variant="contained">Предыдущее</Button>
                            }
                            {
                                index+1<listMax &&
                                <Button size="small" fullWidth onClick={function(){ clickStep(index,+1); }}  variant="contained">Следующее</Button>
                            }
                        </Stack>
                    </Stack>
                ))
            }
            <Stack sx={{display:isReady?"block":"none"}} >
                <Button fullWidth color="success" onDoubleClick={clickNext} variant="contained">Далее</Button>
            </Stack>
        </Stack>
    );
};