import React,{Component,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import {Link} from 'react-router-dom'
import CardImage from './CardImage';
import {v4 as uuidv4} from 'uuid';

import Rest from './Rest';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import AudioButton from './AudioButton';
import Utils from './Utils';
import Transciption from './Transcription';
import SearchExpression from './SearchExpression';
import ExpressionList from './ExpressionList';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Examples from './Examples';
import SlotSelect from './SlotSelect';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const axios=require('axios').default;



export default function CardWriter(props) {

    const [entryExpanded,setEntryExpanded]=React.useState(false);
    const [imageExpanded,setImageExpanded]=React.useState(false);
    const [defExpanded,setDefExpanded]=React.useState(false);
    const [exampleExpanded,setExampleExpanded]=React.useState(false);
    const [transactionExpanded,setTransactionExpanded]=React.useState(false);

    const collapseAll=function(state) {
        setEntryExpanded(state);
        setImageExpanded(state);
        setDefExpanded(state);
        setExampleExpanded(state);
        setTransactionExpanded(state);
    };

    const [partOfSpeechList, setPartOfSpeechList] = useState([]);
    const [guid, setGuid] = useState([]);
    
    const [currentWord, setCurrentWord] = useState({});
    const [defValue,setDefValue]=useState('');
    const [isSearch,setIsSearch]=React.useState(false);
    const [isPicture,setIsPicture]=React.useState(false);
    const [translateText,setTranslateText]=useState('');
    
    const mode=Utils.getParams("mode");
    const cardId=Utils.getParams("cardId");

    const buffer=React.useRef('');

    useEffect(() => {
        setGuid(uuidv4());
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

        console.log("mode = ",Utils.getParams("mode"));console.log("cardId = ",cardId);

        if(mode=="edit") {
            Rest.getCard(cardId)
            .then(function(card){
                fillCard(card);
            });
        };

    },[]);

    
    const setExamplesFromCard=function(card){
        let examples=[];
        for(let i=0;i<card.examples.length;i++) {
            examples.push(card.examples[i].text);
        }
        setExampleList(examples);
    }

    
    

    

    const [partOfSpeechId,setPartOfSpeechId]=React.useState(-1);

    const expressionValue=React.useRef('');
    const definitionValue=React.useRef('');
    const translateValue=React.useRef('');
    const [exprValue,setExprValue]=React.useState('');
    
    
    const [imageFile,setImageFile]=React.useState({file:{}});
    const updateImageFile=function(file) {
        imageFile.file=file;
        setImageFile(imageFile);
    }
    

    const setExampleList=function(listText) {
        let newArr=[];
        for(let i=0;i<listText.length;i++) {
            let text=listText[i];
            let v={};
            Object.assign(v,buffer)
            newArr.push({
                key:Utils.getKeyIndex(),
                text: v,
                value:text
            });
        }
        
        fillExamples(newArr);
    }
    
    const getCard=function(photoId) {
        return {
            photoId:photoId,
            partOfSpeechId:partOfSpeechId,
            expression:expressionValue.current.value,
            definition:definitionValue.current.value,
            translate:translateValue.current.value,
            //transcriptionList:Utils.getTranscriptionDtoList(transcriptionArrayList),
            exampleList:[],
            //slotIds:cardListIds
        };
    };

    const after=function(){
        window.confirm("Сохранено! Покинуть страницу ?");
        let isLeave=window.confirm("Сохранено! Покинуть страницу ?");
        if(isLeave){
            window.history.back();
        } else {
            window.location.reload();
        }
    }

    const saveCard=function(photoId, transcriptionArrayList) {
        let card=getCard(photoId);
        fillExamples(card);
        Rest.saveCard(card,function(response){
            after();
        });
    };

    const clickSaveContext=function() {
        let loaded=[];
        // Rest.saveFileListToServer([...transcriptionArray],"mp3",loaded,()=>{
        //     if(photoFile&&photoFile!=""){
        //         Rest.saveFileV2(new File([Utils.base64ToArrayBuffer(photoFile)], "photo"),function(photoId){
        //             saveCard(loaded, photoId);
        //         });
        //     } else {
        //         saveCard(loaded.at, null);
        //     }
        // },(err)=>{
        //     console.log(err);
        //     alert("error. transciption files aren't saved. try again");
        // });
    }

    

    

    let expr_list_init;
    let fillExamples;
    let fillTransactions;

    const partOfSpeechOnChange=function(e){
        setPartOfSpeechId(e.target.value);
    }
    let query=function(expr){
        return expressionValue;
    }
    const expr_list_buffer=function(f){
        expr_list_init=f;
    }
    const selected=function(word) {
        if(word.isApi==true) expr_list_init(word.value);
        query(word.name);
        collapseAll(true);
        setTimeout(function(){
            setImageExpanded(false);
        },100);
        setTimeout(function(){
            setImageExpanded(true);
        },400);
        
    }
    const changeActiveStep=function(file){
        if(file && file.type !="file") {
            Rest.getPhoto(file.source,function(image,format) {
                updateImageFile(file);
            });
        } else {
            updateImageFile(file);
        }
    }


    const expr_list_selected=function(e){
        console.log(e);
        setDefValue(e.definition);
        setPartOfSpeechId(Rest.getCatIdByValue(e.lexicalCategoryId));
        fillExamples(e.examples);
        fillTransactions(e.transcriptionList);
        setTimeout(function(){
            setTransactionExpanded(false);
        },100);
        setTimeout(function(){
            setTransactionExpanded(true);
        },400);
    };

    const fillCard=function(card) {

        console.log("card = ", card);
        //setWordList([]);
        setExprValue(card.expression);
        
        
        setExamplesFromCard(card);
        //setTranscriptionsFromCard(card);
        setTranslateText(card.translate);
        //setSlots(card);

        //setCardImage ...
        //setCurrentWord(e); ?
    }

    // setExprValue(e.text);
                                // setCurrentWord(e);
                                // setWordList([]);
                                // setDefValue(e.definition);
                                // setPartOfSpeechId(Rest.getCatIdByValue(e.lexicalCategoryId));
                                // setExampleList(e.examples);

                                // Rest.getAudio(e.transcriptionList[0].audioFile,function(result){
                                //     console.log("-----------------------")
                                //     console.log(result);
                                // });

                            
                                // console.log("e.transcriptionList",e.transcriptionList)
                                //setTranscription(e.transcriptionList);

    return (
        <Stack justifyItems="center" alignItems="center">
            <Stack spacing={1} sx={{width:650}}>
                <SearchExpression selected={selected}  />
                <span>
                    <Accordion expanded={entryExpanded} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={() => setEntryExpanded(!entryExpanded)} />} aria-controls="panel1d-content" id="panel1a-header">
                            <Typography>entries</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ExpressionList init={expr_list_buffer} selected={expr_list_selected} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={imageExpanded} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={() => setImageExpanded(!imageExpanded)} />} aria-controls="panel1d-content" id="panel2a-header">
                            <Typography>an image</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CardImage role="writer" 
                                query={function(f){query=f;}}
                                changeActiveStep={changeActiveStep}
                                pasteImage={function(file) {
                                    console.log("pasted")
                                    //setPhotoFile(Utils.getData64FromSource(file.source));
                                    //setPhotoFileFormat(file.format);
                                }}
                            />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion  expanded={defExpanded}  >
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={() => setDefExpanded(!defExpanded)} />} aria-controls="panel1d-content" id="panel3a-header">
                            <Typography>a definition</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack spacing={1}>
                                <TextField size="small" fullWidth  label="definition" id="standard-basic222" variant="outlined" multiline inputRef={definitionValue}  value={defValue} 
                                    onChange={(newValue) => {
                                        setDefValue(newValue.target.value);
                                    }}
                                />
                                <Stack spacing={1} direction="row" fullWidth>
                                    <FormControl sx={{ width: 200 }}>
                                        <InputLabel id="demo-simple-select-label">speach part</InputLabel>
                                        <Select labelId="demo-simple-select-label" id="demo-simple-select" value={partOfSpeechId} label="a speech part" size="small" onChange={partOfSpeechOnChange}>
                                            {partOfSpeechList.map((ps)=>(
                                                <MenuItem key={ps.value} value={ps.value}>{ps.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    <TextField size="small" inputRef={translateValue} value={translateText} fullWidth  label="translate" id="standard-basic222" variant="outlined" 
                                        onChange={(newValue) => {
                                            setTranslateText(newValue.target.value);
                                        }}
                                    />
                                </Stack>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={exampleExpanded}  >
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={() => setExampleExpanded(!exampleExpanded)} />} aria-controls="panel1d-content" id="panel4a-header">
                            <Typography>examples</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Examples fill={function(f){fillExamples=f;}} />
                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={transactionExpanded}  >
                        <AccordionSummary expandIcon={<ExpandMoreIcon onClick={() => setTransactionExpanded(!transactionExpanded)} />} aria-controls="panel1d-content" id="panel5a-header">
                            <Typography>transciptions</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Transciption fill={function(f){fillTransactions=f;}} />
                        </AccordionDetails>
                    </Accordion>
                </span>
                <SlotSelect />
                <Stack spacing={1} direction="row">
                    <Button fullWidth size="small" onClick={clickSaveContext}  variant="contained">save</Button>
                    <Button fullWidth size="small" component={Link} to={"/"} variant="contained">cancel</Button>
                </Stack>
            </Stack>
        </Stack>
    );
};