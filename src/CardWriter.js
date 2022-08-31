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
import {v4 as uuidv4} from 'uuid';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import FileDownloadDoneOutlinedIcon from '@mui/icons-material/FileDownloadDoneOutlined';
import $ from "jquery";
import Rest from './Rest';
import AttachmentOutlinedIcon from '@mui/icons-material/AttachmentOutlined';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import CircularProgress from '@mui/material/CircularProgress';

const axios=require('axios').default;



export default function CardWriter() {

    const {contextListId}=useParams();
    const [partOfSpeechList, setPartOfSpeechList] = useState([]);
    const [guid, setGuid] = useState([]);
    const [transcriptionSound, setTranscriptionSound] = React.useState('UK');
    const [cardList, setCardList] = useState([]);
    const [cardListIds, setCardListIds] = useState([]);
    const [wordList, setWordList] = useState([]);
    const [currentWord, setCurrentWord] = useState({});
    const [defValue,setDefValue]=useState('');
    const [isSearch,setIsSearch]=React.useState(false);
    const [isPicture,setIsPicture]=React.useState(false);

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
    },[]);

    const fillCurrentWord=function(){

    }

    const buffer=React.useRef('');
    
    const [keyIndex,setKeyIndex]=React.useState(3);

    const getKeyIndex=function(){
        setKeyIndex(keyIndex+1);
        return keyIndex;
    }

    

    
    const [examples,setExamples]=React.useState([
        {
            key:1,
            text:React.useRef(''),
            value:""
        }
    ]);
    const [transcriptionArray,setTranscriptionArray]=React.useState([
        {
            key:1,
            text:React.useRef(''),
            transcription:React.useRef('UK'),
            spelling:"",
            link:""
        }
    ]);

    const handleChangeTranscriptionSound = (event,index) => {
        let listNew=[...transcriptionArray];
        listNew[index].transcription=event.target.value;
        setTranscriptionArray(listNew);
    };

    const [partOfSpeechId,setPartOfSpeechId]=React.useState(-1);

    const expressionValue=React.useRef('');
    const transcriptionValue=React.useRef('');
    const definitionValue=React.useRef('');
    const translateValue=React.useRef('');
    const [exprValue,setExprValue]=React.useState('');
    
    
    const [photoFile,setPhotoFile]=React.useState('');
    const [photoFileFormat,setPhotoFileFormat]=React.useState('');

    const getRemoveArray=function(list,key){
        let listNew=[...list];
        for(let i=0;i<listNew.length;i++){
            if(listNew[i].key==key) {
                listNew.splice(i,1);
                break;
            }
        }
        return listNew;
    }

    const getAddArray=function(list){
        let newArr=[...list];
        let v={};
        Object.assign(v,buffer)
        newArr.push({
            key:getKeyIndex(),
            text:v
        });
        return newArr;
    }

    const setExampleList=function(listText) {
        let newArr=[];
        for(let i=0;i<listText.length;i++) {
            let text=listText[i];
            let v={};
            Object.assign(v,buffer)
            newArr.push({
                key:getKeyIndex(),
                text: v,
                value:text
            });
        }
        
        setExamples(newArr);
    }

    const loadAudio=function(index, listTr,callback){
        if(index<listTr.length) {
            Rest.getAudio(listTr[index].audioFile,function(result){
                listTr[index].resultAudio=Rest.base64ToArrayBuffer(result);
                loadAudio(index+1,listTr,callback);
            });
        } else {
            callback(listTr);
        }
        
    }

    const setTranscription=function(listTr) {
        let newArr=[];

        loadAudio(0,listTr,function(listTr){
            for(let i=0;i<listTr.length;i++) {
                let tr=listTr[i];
                let v1={
                    current:{
                        value:''
                    }
                };

                Object.assign(v1,buffer);
                newArr.push({
                    key:getKeyIndex(),
                    text:v1,
                    value:tr.spelling,
                    transcription:'UK',
                    spelling:tr.phoneticSpelling,
                    link:tr.audioFile,
                    file:tr.resultAudio,
                    isFile:true
                });
            }
            if(newArr.length==0){
                let v={};
                Object.assign(v,buffer);
                newArr.push({
                    key:getKeyIndex(),
                    text:v
                });
            }
            setTranscriptionArray(newArr);
        });
    }

    //примеры
    const clickRemoveExample=function(e){
        console.log(e);
        if(examples.length>1) {
            setExamples(getRemoveArray(examples,e.key));
        } else {
            //alert("Контекст должен содержать не менее 1 примера")
        }
    }

    const clickAddExample=function(){
        setExamples(getAddArray(examples));
    }
    //транскрипция
    const clickRemoveTranscription=function(e){
        console.log(e);
        if(transcriptionArray.length>1) {
            setTranscriptionArray(getRemoveArray(transcriptionArray,e.key));
        } else {
            //alert("Контекст должен содержать не менее 1 примера")
        }
    }
    const clickAddTranscription=function(){
        if(checkTranscriptionArray()) {
            console.log("transcriptionArray",transcriptionArray);
            setTranscriptionArray(getAddArray(transcriptionArray));
        }
    }


    const dataURLtoFile=function(dataurl, filename) {
 
        var arr = dataurl.split(','),
            mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), 
            n = bstr.length, 
            u8arr = new Uint8Array(n);
            
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        
        return new File([u8arr], filename, {type:mime});
    }

    const addArrayBufferFile=function(file,e){
        let reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onload = function() {
            e.file=reader.result;
            e.isFile=true;
            setTranscriptionArray([...transcriptionArray]);
        };
        reader.onerror = function() {
            console.log(reader.error);
        };
    }

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
    }

    const saveFileToServer=(data8,mime,fsuccess,ferror)=>{
        var uid=uuidv4();
        var file= new File([data8], uid+"."+mime, {type:mime});
        var bodyFormData = new FormData();
        bodyFormData.append('file', file,file.name);
        axios({
            method:"POST",
            url:"http://localhost:8081/Files?fileId="+uid,
            data:bodyFormData,
            headers: { 
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin":"*"
            }
        }).then(response=>{
            fsuccess(uid);
        }).catch(error=>{
            ferror(error);
        });
    };

    const saveFile=function(f){
        var imageFile=document.getElementById("pastedImage");
        console.log("imageFile",imageFile);
        const file = dataURLtoFile(imageFile.src,guid+'.png');
        
        console.log(file);
        //console.log("image",imageFile);
        var bodyFormData = new FormData();
        bodyFormData.append('file', file);
        //bodyFormData.append('name', file.name);
        axios({
            method:"POST",
            url:"http://localhost:8081/Files?fileId="+guid,
            data:bodyFormData,
            headers: { 
                "Content-Type": "multipart/form-data",
                "Access-Control-Allow-Origin":"*"
            }
        }).then(response=>{
            console.log("response",response);
            f();
        }).catch(error=>{
            console.log(error);
        });
    }

    const saveTranscriptionFiles=(f,ferr,index)=>{
        let transcriptionArrayList=[...transcriptionArray];
        
        saveFileToServer(transcriptionArrayList[index].file,"mp3",(uid)=>{
            transcriptionArrayList[index].fileId=uid;
            setTranscriptionArray([...transcriptionArray]);
            if(index+1<transcriptionArrayList.length) {
                saveTranscriptionFiles(f,ferr,index+1);
            } else {
                f();
            }
        },(err)=>{
            console.log(err);
            ferr(err);
        });

    };


    const clickSaveContext=function(){

        const save_card=function(photoId){
            saveTranscriptionFiles(()=>{
                let transcriptionArrayList=[...transcriptionArray];
                let transcriptionDtoList=[];
                for(let tr of transcriptionArrayList){
                    if(tr.isURL && tr.link && tr.link!=""){
                        
                    }
                    transcriptionDtoList.push(
                        {
                            value:tr.text.current.value,
                            variant:tr.transcription,
                            fileId:tr.fileId
                        }
                    );
                }
    
                let card={
                    photoId:photoId,
                    partOfSpeechId:partOfSpeechId,
                    expression:expressionValue.current.value,
                    definition:definitionValue.current.value,
                    translate:translateValue.current.value,
                    transcriptionList:transcriptionDtoList,
                    exampleList:[],
                    slotIds:cardListIds
                };
    
                let exampleList=[...examples];
                for(let e of exampleList){
                    card.exampleList.push(e.text.current.value);
                }
                console.log("card",card);
                Rest.saveCard(card,function(response){
                    console.log("response",response);
                    window.confirm("Сохранено! Покинуть страницу ?");
                    let isLeave=window.confirm("Сохранено! Покинуть страницу ?");
                    if(isLeave){
                        window.history.back();
                    } else {
                        window.location.reload();
                    }
                });
            },(err)=>{
                console.log(err);
                alert("error. transciption files aren't saved. try again");
            },0);
        };

        if(photoFile&&photoFile!=""){
            let bytes=Rest.base64ToArrayBuffer(photoFile);
            //console.log("photoFileFormat",photoFileFormat);
            //photoFileFormat && photoFileFormat!=""?photoFileFormat:null
            Rest.saveFileV2(new File([bytes], "photo"),function(photoId){
                save_card(photoId);
            });
        } else {
            save_card(null);
        }

        

        

    }

    const partOfSpeechOnChange=function(e){
        console.log(e.target.value)
        setPartOfSpeechId(e.target.value);
    }

    const cut=(str,size)=>{
        if(str.length<size) return str;
        return str.substring(0,size)+"...";
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
                                                            <b><span title={e.text}>{cut(e.text,10)} </span> <span title={e.lexicalCategoryText}>({cut(e.lexicalCategoryText.toLowerCase(),6)}) </span></b> : <span title={e.definition}> {cut(e.definition,50)} </span>
                                                            <br />
                                                            {e.examples && e.examples.length>0 && <i><span title={e.examples[0]}> {cut(e.examples[0],70)} </span></i>}
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
                                <TextField size="small" fullWidth inputRef={e.text} value={e.spelling}  label="Транскрипция" id={"standard-basic3"+index} variant="outlined"
                                    onChange={(newValue) => {
                                        e.spelling=newValue.target.value;
                                    }}
                                />
                                {
                                    (e.isFile==true || e.isURL==true) &&
                                    <Button 
                                        component="label" 
                                        size="small" 
                                        variant="contained"
                                        onClick={function(){
                                            console.log(e);
                                            document.getElementById('audio_'+e.key).play();
                                        }}
                                    >
                                        <VolumeUpIcon></VolumeUpIcon>
                                        <audio id={"audio_"+e.key} controls preload="none" hidden>
                                            <source src={
                                                e.isFile==true?
                                                ("data:audio/mp3;base64,"+Buffer.from(e.file).toString('base64'))
                                                :(e.isURL==true && e.resultAudio?(
                                                    ("data:audio/mp3;base64,"+e.resultAudio)
                                                ):"")
                                            } type="audio/mpeg" />
                                        </audio>
                                    </Button>
                                }
                                <Button component="label" size="small" variant="contained" >
                                    <AttachFileOutlinedIcon></AttachFileOutlinedIcon>
                                    <input type="file" onChange={function(event) {
                                        addArrayBufferFile(event.target.files[0],e);
                                    }} hidden />
                                </Button>
                                {
                                    transcriptionArray.length>1 && index<transcriptionArray.length-1 && <Button size="small" onClick={function(){clickRemoveTranscription(e)}} variant="contained">-</Button>
                                }
                                {
                                    !(index<transcriptionArray.length-1) && <Button size="small" onClick={clickAddTranscription} variant="contained">+</Button>
                                }
                            </Stack>
                        ))
                    }
                    
                </Stack>
                <TextField size="small" inputRef={translateValue} fullWidth  label="Перевод" id="standard-basic222" variant="outlined" />
                <Autocomplete
                    multiple
                    id="tags-outlined"
                    options={cardList}
                    onChange={(event, newValue) => {
                        let arr=[];
                        if(newValue) {
                            for(let i=0;i<newValue.length;i++) {
                                arr.push(newValue[i].id);
                            }
                        }
                        setCardListIds(arr);
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
                    <Button fullWidth size="small" component={Link} to={"/ContextList/"+contextListId+"/Context"} variant="contained">Отменить</Button>
                </Stack>
            </Stack>
        </Stack>
    );
};