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
const axios=require('axios').default;

export default function CardEditor(props) {
    const {contextListId,contextId}=useParams();

    const [partOfSpeechList, setPartOfSpeechList] = useState([]);

    const role=props.role;

    const [contextReader,setContextReader] = useState({});

    

    useEffect(() => {
        if(role=="writer") {
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
        } else if (role=="reader") {
            axios.get("http://localhost:8081/ContextList/"+contextListId+"/Context/"+contextId)
            .then(response=>{
                console.log("context",response);
                let data=response.data;
                setContextReader({
                    expression:data.expressionValue,
                    partOfSpeech:data.partOfSpeech.name,
                    exampleList:data.exampleList?data.exampleList:[]
                });
            });
        }


        
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
            //setExamples([]);
            setExamples(newExamples);
        } else {
            //alert("Контекст должен содержать не менее 1 примера")
        }
    }



    const clickAddExample=function(){
        console.log("role",{
            role:props.role,
            contextId:contextId,
            contextListId:contextListId    
        });
        
        let newExamples=[...examples];
        //setKeyIndex(keyIndex+1);
        //console.log("keyIndex",keyIndex);
        let v={};
        Object.assign(v,buffer)
        newExamples.push({
            key:getKeyIndex(),
            text:v
        });
        setExamples(newExamples);
        console.log("add",newExamples);
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
                    {
                        role=="reader" && 
                        <Typography variant="body1" gutterBottom>
                            {contextReader.expression}
                        </Typography>
                    }
                    {
                        role=="writer" &&
                        <TextField size="small" fullWidth  label="Выражение" id="standard-basic31" inputRef={expressionValue} variant="outlined" />
                    }
                    
                    {
                        role=="reader" &&
                        <Typography variant="body1" gutterBottom>
                            ({contextReader.partOfSpeech})
                        </Typography>
                    }
                    {
                        role=="writer" &&
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
                    }
                </Stack>
                <Stack spacing={1}>
                    {
                        role=="writer" &&
                        examples.map((e,index)=>(
                            <Stack spacing={1} direction="row">
                                <TextField size="small" fullWidth key={e.key} defaultValue={e.text.current.value} inputRef={e.text}  label={"Пример"} variant="outlined" />
                                <Button size="small" onClick={function(){clickRemoveExample(e)}} variant="contained">Удалить</Button>
                            </Stack>   
                        ))
                    }
                    {
                        role=="reader" && contextReader.exampleList && contextReader.exampleList.length>0 &&
                        contextReader.exampleList.map((e,index)=>(
                            <li>
                                <Typography variant="body1" gutterBottom>
                                    {e.text}
                                </Typography>
                            </li>
                        ))
                       
                    }
                    {
                        role=="writer" &&
                        <Button size="small"  variant="contained" onClick={clickAddExample} >Добавить</Button>
                    }
                </Stack>
                <Stack spacing={0}>
                    <Box
                        sx={{
                            width: 650,
                            height: 360
                            }
                        }
                    >
                        <img style={{width:650,height:360}} src="https://avatars.mds.yandex.net/i?id=ed5752593d20584af46e71b0c239b7ac-5870379-images-thumbs&n=13"></img>
                    </Box>
                    <Box
                        sx={{
                            width: 650,
                            height: role=="writer"?30:0,
                            backgroundColor: 'primary.dark',
                            '&:hover': {
                            backgroundColor: 'primary.main',
                            opacity: [0.9, 0.8, 0.7],
                            },
                        }}
                    >
                        {
                            role=="writer" &&
                            <input type="text" placeholder='click here and press Ctrl+V to paste an image' style={{width:650,height:30}}></input>
                        }
                        
                    </Box>
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