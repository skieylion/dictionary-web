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

export default function CardReader(props) {
    const {contextListId,contextId}=useParams();

    const [partOfSpeechList, setPartOfSpeechList] = useState([]);

    const [contextReader,setContextReader] = useState({});

    useEffect(() => {   
        axios.get("http://localhost:8081/ContextList/"+contextListId+"/Context/"+contextId)
        .then(response=>{
            console.log("context",response);
            let data=response.data;
            setContextReader({
                transcriptionValue:data.transcription&&data.transcription.length>0?data.transcription[0].value:null,
                transcriptionVariant:data.transcription&&data.transcription.length>0?data.transcription[0].variant:null,
                expression:data.expressionValue,
                definition:data.definition,
                photoUrl:"http://localhost:8081/File/"+data.photoId,
                partOfSpeech:data.partOfSpeech.name,
                exampleList:data.exampleList?data.exampleList:[]
            });
        });
    },[]);
    
    const [keyIndex,setKeyIndex]=React.useState(3);

    
    
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


    return (
        <Stack justifyItems="center" alignItems="center">
            <Stack spacing={1} sx={{width:650}}>
                <CardImage role="reader" photoUrl={contextReader.photoUrl} />
                <Stack spacing={0}  fullWidth>
                    <Typography variant="h4" gutterBottom spacing={0}>
                        {contextReader.expression} ({contextReader.partOfSpeech})
                    </Typography>
                </Stack>
                <Stack spacing={1}  direction="row">
                    <a target="_blank" href={"https://youglish.com/pronounce/"+contextReader.expression+"/english/uk"}>🔎 youglish</a>
                    <a target="_blank" href={"https://dictionary.cambridge.org/dictionary/english/"+contextReader.expression}>🔎 dictionary</a>
                    <a target="_blank" href={"https://translate.google.com/?sl=en&tl=ru&op=translate&text="+contextReader.expression}>🔎 translate</a>
                    <a target="_blank" href={"https://www.google.com/search?tbm=isch&tbs=il:cl&hl=en&sa=X&q="+contextReader.expression}>🔎 images</a>
                    
                </Stack>
                
                <Stack spacing={0} fullWidth>
                    <Typography variant="subtitle1" gutterBottom >
                        [ {contextReader.transcriptionValue} ({contextReader.transcriptionVariant}) ]
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {contextReader.definition}
                    </Typography>
                </Stack>
                <Stack spacing={0}>
                    {
                        contextReader.exampleList && contextReader.exampleList.length>0 &&
                        contextReader.exampleList.map((e,index)=>(
                            <Typography variant="body1" gutterBottom>
                                - {e.text}
                            </Typography>
                        ))
                    }
                    <a target="_blank" href={"https://context.reverso.net/translation/english-russian/"+contextReader.expression}>🔎 ещё примеры</a>
                </Stack>
            </Stack>
        </Stack>
    );
};