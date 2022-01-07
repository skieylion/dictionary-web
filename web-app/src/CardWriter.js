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
const axios=require('axios').default;

export default function CardWriter() {

    const {contextListId}=useParams();
    const [partOfSpeechList, setPartOfSpeechList] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:8081/PartOfSpeech")
        .then(response=>{
            let data=[];
            for(const d of response.data){
                data.push({
                    value:d.id,
                    name:d.name
                });
            }
            setPartOfSpeechList(data);
        });
    },[]);
    
    const [keyIndex,setKeyIndex]=React.useState(3);

    const getKeyIndex=function(){
        setKeyIndex(keyIndex+1);
        return keyIndex;
    }
    
    const [examples,setExamples]=React.useState([
        {
            key:1,
            text:React.useRef('')
            
        }
    ]);

    const [partOfSpeechId,setPartOfSpeechId]=React.useState(-1);

    const expressionValue=React.useRef('');
    const transcriptionValue=React.useRef('');
    const definitionValue=React.useRef('');
    const translateValue=React.useRef('');
    const buffer=React.useRef('');

    const clickRemoveExample=function(e){
        console.log(e);
        if(examples.length>1) {
            let newExamples=[...examples];
            for(let i=0;i<newExamples.length;i++){
                if(newExamples[i].key==e.key) {
                    newExamples.splice(i,1);
                    break;
                }
            }
            setExamples(newExamples);
        } else {
            //alert("Контекст должен содержать не менее 1 примера")
        }
    }

    const clickAddExample=function(){
        let newExamples=[...examples];
        let v={};
        Object.assign(v,buffer)
        newExamples.push({
            key:getKeyIndex(),
            text:v
        });
        setExamples(newExamples);
    }

    const clickSaveContext=function(){
        
        let contextDto={
            partOfSpeechId:partOfSpeechId,
            expressionValue:expressionValue.current.value,
            definition:definitionValue.current.value,
            translate:translateValue.current.value,
            transcription:transcriptionValue.current.value,
            exampleList:[]
        };

        let exampleList=[...examples];
        for(let e of exampleList){
            contextDto.exampleList.push(e.text.current.value);
        }
        console.log("contextDto",contextDto);
        axios.post("http://localhost:8081/ContextList/"+contextListId+"/Context",contextDto)
        .then(response=>{
            console.log("response",response);
        }).catch(error=>{
            console.log(error);
        });
    }

    const partOfSpeechOnChange=function(e){
        console.log(e.target.value)
        setPartOfSpeechId(e.target.value);
    }

    return (
        <Stack justifyItems="center" alignItems="center">
            <Stack spacing={1} sx={{width:650}}>
                <Stack spacing={1} direction="row" fullWidth>
                    <TextField size="small" fullWidth  label="Выражение" id="standard-basic31" inputRef={expressionValue} variant="outlined" />
                    <FormControl sx={{ width: 400 }}>
                        <InputLabel id="demo-simple-select-label">Часть речи</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            //defaultValue={1}
                            label="Часть речи"
                            size="small"
                            onChange={partOfSpeechOnChange}
                        >
                            {partOfSpeechList.map((ps)=>(
                                <MenuItem key={ps.value} value={ps.value}>{ps.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Stack>
                <Stack spacing={1}>
                    {
                        examples.map((e,index)=>(
                            <Stack spacing={1} direction="row">
                                <TextField size="small" fullWidth key={e.key} defaultValue={e.text.current.value} inputRef={e.text}  label={"Пример"} variant="outlined" />
                                <Button size="small" onClick={function(){clickRemoveExample(e)}} variant="contained">Удалить</Button>
                            </Stack>   
                        ))
                    }
                 
                    <Button size="small"  variant="contained" onClick={clickAddExample} >Добавить</Button>
                </Stack>
                <Stack spacing={0}>
                    <Stack justifyItems="center" alignItems="center">
                        <Stack spacing={1} sx={{width:650}}>
                            <CardImage role="writer" />
                        </Stack>
                    </Stack>
                </Stack>
                
                
                
                <TextField size="small" fullWidth inputRef={transcriptionValue}  label="Транскрипция" id="standard-basic3" variant="outlined" />
                <TextField size="small" inputRef={definitionValue} fullWidth  label="Определение" id="standard-basic222" variant="outlined" />
                <TextField size="small" inputRef={translateValue} fullWidth  label="Перевод" id="standard-basic222" variant="outlined" />
                <Stack spacing={1} direction="row">
                    <Button fullWidth size="small" onClick={clickSaveContext}  variant="contained">Сохранить</Button>
                    <Button fullWidth size="small" component={Link} to={"/ContextList/"+contextListId+"/Context"} variant="contained">Отменить</Button>
                </Stack>
            </Stack>
        </Stack>
    );
};