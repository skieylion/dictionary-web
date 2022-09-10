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

const axios=require('axios').default;



export default function CardWriter(props) {

    const [partOfSpeechList, setPartOfSpeechList] = useState([]);
    const [guid, setGuid] = useState([]);
    const [cardList, setCardList] = useState([]);
    const [cardListIds, setCardListIds] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [defValue,setDefValue]=useState('');
    const [isSearch,setIsSearch]=React.useState(false);
    const [isPicture,setIsPicture]=React.useState(false);
    const [translateText,setTranslateText]=useState('');
    const [defSlots,setDefSlots]=useState([]);

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
        Rest.getCardList(function(response){
            let data=[];
            for(const d of response.data){
                data.push({
                    id:d.id,
                    title:d.name
                });
            }
            setCardList(data);
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

    const setSlots=function(card){
        let slots=[];
        let slotList=[];
        for(let i=0;i<card.slots.length;i++) {
            slots.push(card.slots[i].id);
            slotList.push({
                title: card.slots[i].name,
                id: card.slots[i].id
            });
        }
        setCardListIds(slots);
        setDefSlots(slotList);

        console.log("slotList",slotList);
    }


    const fillCard=function(card) {

        console.log("card = ", card);
        setWordList([]);
        setExprValue(card.expression);
        setDefValue(card.definition);
        setPartOfSpeechId(card.partOfSpeech.id);
        setExamplesFromCard(card);
        setTranscriptionsFromCard(card);
        setTranslateText(card.translate);
        setSlots(card);

        //setCardImage ...
        //setCurrentWord(e); ?
    }

    
    
    

    

    
    const [examples,setExamples]=React.useState([
        {
            key:1,
            text:React.useRef(''),
            value:""
        }
    ]);
    

    

    const [partOfSpeechId,setPartOfSpeechId]=React.useState(-1);

    const expressionValue=React.useRef('');
    const definitionValue=React.useRef('');
    const translateValue=React.useRef('');
    const [exprValue,setExprValue]=React.useState('');
    
    
    const [photoFile,setPhotoFile]=React.useState('');
    const [photoFileFormat,setPhotoFileFormat]=React.useState('');

    

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
        
        setExamples(newArr);
    }

    

    

    //примеры
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
    //транскрипция
    
    const getCard=function(photoId) {
        return {
            photoId:photoId,
            partOfSpeechId:partOfSpeechId,
            expression:expressionValue.current.value,
            definition:definitionValue.current.value,
            translate:translateValue.current.value,
            transcriptionList:Utils.getTranscriptionDtoList(transcriptionArrayList),
            exampleList:[],
            slotIds:cardListIds
        };
    };

    const fillExamples=function(card) {
        let exampleList=[...examples];
        for(let e of exampleList){
            card.exampleList.push(e.text.current.value);
        }
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
        Rest.saveFileListToServer([...transcriptionArray],"mp3",loaded,()=>{
            if(photoFile&&photoFile!=""){
                Rest.saveFileV2(new File([Utils.base64ToArrayBuffer(photoFile)], "photo"),function(photoId){
                    saveCard(loaded, photoId);
                });
            } else {
                saveCard(loaded.at, null);
            }
        },(err)=>{
            console.log(err);
            alert("error. transciption files aren't saved. try again");
        });
    }

    const partOfSpeechOnChange=function(e){
        console.log(e.target.value)
        setPartOfSpeechId(e.target.value);
    }

    let query=function(expr){
        return expressionValue;
    }

    const getPhoto=function(){
        var request = new XMLHttpRequest();
        request.open('GET', "https://unsplash.com/photos/rJ236eQHXGA/download?ixid=MnwzNTEyNjB8MHwxfHNlYXJjaHwxfHxjdXR8ZW58MHx8fHwxNjU5NTU4NjM0", true);
        request.responseType = 'blob';
        request.onload = function() {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload =  function(e){
                console.log('DataURL:', e.target.result);
            };
        };
        request.send();
    }


    

    return (
        <Stack justifyItems="center" alignItems="center">
            <Stack spacing={1} sx={{width:650}}>
                <Stack spacing={1} direction="row" fullWidth>
                    <TextField size="small" fullWidth  label="Выражение" id="standard-basic31" inputRef={expressionValue} value={exprValue} variant="outlined" 
                        onKeyDown={function(e){
                            if(e.code=="Enter") {
                                if(exprValue && exprValue.length>2) {
                                    console.log(exprValue);
                                    setIsPicture(true);
                                    setIsSearch(true);
                                    query(exprValue);
                                    Rest.find(exprValue)
                                    .then(res=>{
                                        setIsSearch(false);
                                        setWordList(res);
                                    });
                                }
                                console.log(exprValue);
                            }
                        }}
                         onChange={
                            function(e) {
                                setExprValue(e.target.value);
                            }
                        }
                    />
                    {
                        isSearch &&
                        <Box sx={{ display: 'flex' }}>
                            <CircularProgress />
                        </Box>
                    }
                    <FormControl sx={{ width: 200 }}>
                        <InputLabel id="demo-simple-select-label">Часть речи</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={partOfSpeechId}
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
                <Stack>
                {
                    wordList && wordList.length>0 &&
                    <Box
                        overflow="auto"
                        sx={{
                            display: 'flex',
                            border: '1px dashed grey',
                            maxHeight:'300px'
                        }}
                    >
                        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                            {
                                wordList.map((e,index)=>(
                                    <div>
                                        <ListItem>
                                            <Typography>
                                                <Grid container >
                                                    <Grid >
                                                            <b><span title={e.text}>{Utils.cut(e.text,10)} </span> <span title={e.lexicalCategoryText}>({Utils.cut(e.lexicalCategoryText.toLowerCase(),6)}) </span></b> : <span title={e.definition}> {Utils.cut(e.definition,50)} </span>
                                                            <br />
                                                            {e.examples && e.examples.length>0 && <i><span title={e.examples[0]}> {Utils.cut(e.examples[0],70)} </span></i>}
                                                    </Grid>
                                                    <Grid >
                                                    <IconButton  sx={{m:0,p:0}}>
                                                        <AddCircleIcon  sx={{m:0,p:0}} onClick={function(){
                                                            console.log(e);
                                                            setExprValue(e.text);
                                                            setCurrentWord(e);
                                                            setWordList([]);
                                                            setDefValue(e.definition);
                                                            setPartOfSpeechId(Rest.getCatIdByValue(e.lexicalCategoryId));
                                                            setExampleList(e.examples);
                                                            setTranscription(e.transcriptionList);
                                                        }} />
                                                    </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Typography>
                                        </ListItem>
                                        <Divider  sx={{ width: '100%' }}  />
                                    </div>
                                ))
                            }
                        </List>
                    </Box>
                }
                </Stack>
                <Stack spacing={0} sx={{ display: isPicture?'block':'none' }}>
                    <Stack justifyItems="center" alignItems="center">
                        <Stack spacing={1} sx={{width:650}}>
                            <CardImage role="writer" 
                                query={function(f){
                                    query=f;
                                }}

                                changeActiveStep={function(img){
                                    if(img && img !=""){
                                        Rest.getPhoto(img,function(res,format){
                                            setPhotoFile(res);
                                            setPhotoFileFormat(format);
                                        });
                                    }
                                    console.log(img);
                                }}

                                pasteImage={function(res,format){
                                    let str=res.replace(res.substring(0,res.indexOf("base64,")+7),"");
                                    setPhotoFile(str);
                                    setPhotoFileFormat(format);
                                }}
                            />
                        </Stack>
                    </Stack>
                </Stack>
                <TextField size="small" fullWidth  label="Определение" id="standard-basic222" variant="outlined"
                    inputRef={definitionValue} 
                    value={defValue} 
                    onChange={(newValue) => {
                        setDefValue(newValue.target.value);
                    }}
                />
                <Stack spacing={1}>
                    {
                        examples.map((e,index)=>(
                            <Stack spacing={1} direction="row">
                                <TextField 
                                    size="small" 
                                    fullWidth 
                                    key={e.key}
                                    value={e.value}  
                                    defaultValue={e.text.current.value} 
                                    inputRef={e.text}  
                                    label={"Пример"} 
                                    variant="outlined" 
                                    onChange={(newValue) => {
                                        e.value=newValue.target.value;
                                    }}
                                />
                                {
                                    examples.length>1 && index<examples.length-1 && <Button size="small" onClick={function(){clickRemoveExample(e)}} variant="contained">-</Button>
                                }
                                {
                                    !(index<examples.length-1) && <Button size="small"  variant="contained" onClick={clickAddExample}>+</Button>
                                }
                            </Stack>   
                        ))
                    }
                 
                    
                </Stack>
                
                <hr noshade/>
                <Stack spacing={1}>
                    //Transciption
                </Stack>
                <TextField size="small" inputRef={translateValue} value={translateText} fullWidth  label="Перевод" id="standard-basic222" variant="outlined" 
                    onChange={(newValue) => {
                        setTranslateText(newValue.target.value);
                    }}
                />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={cardList}
                    value={defSlots}
                    onChange={(event, newValue) => {
                        let arr=[];
                        let arr2=[];
                        if(newValue) {
                            for(let i=0;i<newValue.length;i++) {
                                arr.push(newValue[i].id);
                                arr2.push({
                                    id:newValue[i].id,
                                    title:newValue[i].title
                                });
                            }
                        }
                        setCardListIds(arr);
                        setDefSlots(arr2);
                        console.log("event",event);
                        console.log("newValue",newValue);
                    }}
                    getOptionLabel={(option) => option.title}
                    filterSelectedOptions
                    //defaultValue={[top100Films[13]]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            //variant="standard"
                            label="sets"
                            placeholder="..."
                        />
                    )}
                />
                <Stack spacing={1} direction="row">
                    <Button fullWidth size="small" onClick={clickSaveContext}  variant="contained">Сохранить</Button>
                    <Button fullWidth size="small" component={Link} to={"/"} variant="contained">Отменить</Button>
                </Stack>
            </Stack>
        </Stack>
    );
};