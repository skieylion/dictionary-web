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
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import FileAttach from './FileAttach';

const axios=require('axios').default;

export default function Transciption(props) {

    const buffer=React.useRef('');

    props.init((transciptions)=>{
        let arr=[];
        for(let i=0;i<transciptions.length;i++) {
            let tr=transciptions[i];
            let value=Utils.getAddArray([],buffer);
            value.key=Utils.getKeyIndex();
            value.text='';
            value.transcription='UK';
            value.spelling=tr.spelling;
            value.file=tr.file;
            value.isFile=tr.isFile;
            value.isURL=tr.isURL;
            value.fileId=tr.fileId;
            arr.push(value);
        };
        setTranscriptionArray(arr);
    });
    const [transcriptionArray,setTranscriptionArray]=React.useState([{
        key:Utils.getKeyIndex(),
        text:React.useRef(''),
        transcription:React.useRef('UK'),
        spelling:"",
        link:""
    }]);
    const handleChangeTranscriptionSound = (event,index) => {
        let listNew=[...transcriptionArray];
        listNew[index].transcription=event.target.value;
        setTranscriptionArray(listNew);
    };
    const clickRemoveTranscription=function(e) {
        if(transcriptionArray.length>1) {
            setTranscriptionArray(Utils.getRemoveArray(transcriptionArray,e.key));
        } else {
            //alert("Контекст должен содержать не менее 1 примера")
        }
    };
    const addTranscription=function(){
        if(checkTranscriptionArray()) {
            setTranscriptionArray(Utils.getAddArray(transcriptionArray,buffer));
        }
    };
    const checkTranscriptionArray=function(){
        let transcriptionArrayList=[...transcriptionArray];
        for(let tr of transcriptionArrayList){
            if(tr.transcription!="US" && tr.transcription!="UK") {
                console.log(tr.transcription)
                alert("Укажите акцент");
                return false;
            }
            if(!(tr.text && tr.text.current && tr.text.current.value && tr.text.current.value!="")) {
                alert("Определите транскрипцию");
                return false;
            }
        }
        return true;
    };

    return (
        <span>
            {
                transcriptionArray.map((e,index)=>(
                    <Stack direction="row" spacing={1} key={e.key}>
                        <FormControl size="small" sx={{width:120}}>
                            <InputLabel id={"demo-simple-select-label"+index}>ts</InputLabel>
                            <Select
                                labelId={"demo-simple-select-label"+index}
                                id={"demo-simple-select"+index}
                                value={e.transcription}
                                label="ts"
                                onChange={function(ev) {handleChangeTranscriptionSound(ev,index)}}
                            >
                                <MenuItem value={"UK"}>UK</MenuItem>
                                <MenuItem value={"US"}>US</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField 
                            size="small" 
                            fullWidth 
                            inputRef={e.text} 
                            value={e.spelling}  
                            label="Транскрипция" 
                            id={"standard-basic3"+index} 
                            variant="outlined"
                            onChange={(newValue) => {e.spelling=newValue.target.value;}}
                        />
                        {
                            (e.isFile==true || e.isURL==true) &&
                            <AudioButton source={e.isFile==true?Utils.getSource(e.file):Rest.file(e.fileId)} type={"Button"} />
                        }
                        <FileAttach onChange={ function(file) {
                            e.isFile=true;
                            e.file=file;
                            setTranscriptionArray([...transcriptionArray]);
                        }} />
                        {
                            transcriptionArray.length>1 && index<transcriptionArray.length-1 && 
                            <Button size="small" onClick={function(){clickRemoveTranscription(e)}} variant="contained">-</Button>
                        }
                        {
                            !(index<transcriptionArray.length-1) && 
                            <Button size="small" onClick={addTranscription} variant="contained">+</Button>
                        }
                    </Stack>
                ))
            }
        </span>
    );
};