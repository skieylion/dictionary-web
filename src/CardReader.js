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

    let {cardId}=useParams();

    if(props.cardId) {
        cardId=props.cardId;
    }

    const [contextReader,setContextReader] = useState({});

    useEffect(() => {   
        axios.get("http://localhost:8081/cards/"+cardId)
        .then(response=>{
            console.log("context",response);
            let data=response.data;
            setContextReader({
                transcriptionValue: data.transcriptions&&data.transcriptions.length>0?data.transcriptions[0].value:null,
                transcriptionVariant: data.transcriptions&&data.transcriptions.length>0?data.transcriptions[0].variant:null,
                expression: data.expression,
                definition: data.definition,
                photoUrl: data.photoId!=null?"http://localhost:8082/Files/"+data.photoId:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png",
                partOfSpeech: data.partOfSpeech.name,
                exampleList: data.examples?data.examples:[]
            });
        });
    },[]);
    
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