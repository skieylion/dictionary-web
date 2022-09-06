import React,{useState, useEffect} from 'react';
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
import CheckPlayer from './CheckPlayer';
import ReaderPlayer from './ReaderPlayer';
import DefExamModule from './DefExamModule';
import Service from './Service';
import DefinitionModule from './DefinitionModule';
import ExampleModule from './ExampleModule';
import AudioModule from './AudioModule';

const axios=require('axios').default;
const config={
    containerList:[],
    listContext:[]
};

export default function Student(props) {

    const {contextListId}=useParams();
    const [contextList, setContextList] = useState([]);
    const [containerList, setContainerList] = useState([]);
    const maxCountInit=2;
    const [lastModule, setLastModule] = useState("reader");
    const [defExamModuleCounter, setDefExamModuleCounter] = useState(0);

    const clickStep=function(index,step) {
        let list=[...containerList];
        //console.log("step",index,step,list);

        list[index].isDisplay=false;
        let stepIndex=index+1*step;
        if(stepIndex<list.length && stepIndex>=0) {
            list[stepIndex].isDisplay=true;
        }
        //console.log("step",index,step,list);
        setContainerList(list);
    }

    const generate=function(module,listContext) {
        let listContainer=[];

        let flagDefExam=true;

        for(let i=0;i<listContext.length;i++) {
            let context=listContext[i];
            let container={};
            container.module=module;
            container.isDisplay=false;
            container.image=context.photoId && context.photoId!=""?"http://localhost:8081/Files/"+context.photoId:null;
            
            if(module=="reader") {
                container.contextId=context.id;
                container.contextListId=contextListId;
            } else if (module=="example") {
                container.expressionValue=context.expression;
                container.examples=context.examples ? [...context.examples].splice(0,3):[];
                container.check=(check)=>{
                    container.checkPlayer=check;
                };
            } else if (module=="def") {
                container.expressionValue=context.expression;
                container.text=context.definition ;
                container.check=(check)=>{
                    container.checkPlayer=check;
                };
            } else if (module=="audio") {
                container.expressionValue=context.expression;
                container.source=context.transcriptions && context.transcriptions[0].fileId ? "http://localhost:8081/Files/"+context.transcriptions[0].fileId:null;
                container.check=(check)=>{
                    container.checkPlayer=check;
                };
            } else if (module=="defexam" && flagDefExam) {
                flagDefExam=false;
                container.contextList=[...listContext];
                container.check=(check)=>{
                    container.checkPlayer=check;
                };
                listContainer.push(container);
            } 

            if(module!="defexam") listContainer.push(container);
        }

        

        listContainer[0].isDisplay=true;

        return listContainer;
    }

    const close=(isReader,isRightDefExam)=>{

        let container=config.containerList[config.module];
        if(isReader){
            setContainerList(config.containerList[config.module].listContainer);
            return;
        }
        let listContainerNew=[];
        let listContextNew=[];
        let listReaderNew=[];
        for(let i=0;i<container.listContainer.length;i++) {
            if(config.containerList[config.module].moduleName=="defexam") {
                for(let j=0;j<container.listReader.length;j++) {
                    let reader=container.listReader[j];
                    reader.isDisplay=false;
                    let context=container.listContext[j];
                    listContextNew.push(context);
                    listReaderNew.push(reader);
                }
                let cont=container.listContainer[0];
                cont.isDisplay=false;
                cont.isRight=false;
                listContainerNew.push(cont);
            } else if(!container.listContainer[i].isRight){
                let reader=container.listReader[i];
                reader.isDisplay=false;
                let context=container.listContext[i];
                let cont=container.listContainer[i];
                cont.isDisplay=false;
                cont.isRight=false;
                listContainerNew.push(cont);
                listContextNew.push(context);
                listReaderNew.push(reader);
            }
        }

        console.log("listContainerNew",listContainerNew);
        console.log("listContextNew",listContextNew);
        console.log("listReaderNew",listReaderNew);
        console.log("isRightDefExam",isRightDefExam);
        
        console.log("defExamModuleCounter",defExamModuleCounter);
        if(listContainerNew.length==0 || (isRightDefExam==true && defExamModuleCounter==0)) {
            console.log("6");
            //переключаемся на другой контейнер
            if(config.module<config.containerList.length-1) {
                console.log("7");
                ++config.module;
                console.log("list",config.containerList[config.module].listContainer);
                setContainerList([]);

                setTimeout(()=>{
                    setContainerList(config.containerList[config.module].listContainer);
                },0);
                
            } else {
                console.log("8");
                let listContext=config.listContext;

                let e=()=>{
                    alert("the end");
                    window.location="/collection/my";
                };

                let rec=(z)=>{
                    Rest.setRepeatContext(listContext[z].id,()=>{
                        ++z;
                        if(z<listContext.length) {
                            rec(z);
                        } else {
                            e();
                        }
                    });
                };
                rec(0);
            }
            return;
        };

        listReaderNew[0].isDisplay=true;
        listContainerNew[0].isDisplay=true;

        container.listReader=listReaderNew;
        container.listContext=listContextNew;
        container.listContainer=listContainerNew;
        config.containerList[config.module]=container;
        setDefExamModuleCounter(0);
        //console.log("listReader",config.containerList[config.module].listReader);
        setContainerList(config.containerList[config.module].listReader);
    };

    const start=(listContext)=>{
        console.log("start",[...listContext]);
        config.containerList=[];
        let listReader=generate("reader",[...listContext]);
        config.listContext=[...listContext];
        
        config.containerList.push({
            moduleName:"defexam",
            listReader:[...listReader],
            listContext:[...listContext],
            listContainer:generate("defexam",[...listContext])
        });

        config.containerList.push({
            listReader:[...listReader],
            listContext:[...listContext],
            listContainer:generate("example",[...listContext])
        });

        let flag=true;
        for(let i=0;i<listContext.length;i++) {
            let context=listContext[i];
            let isSource=context.transcriptions && context.transcriptions[0] && context.transcriptions[0].fileId && context.transcriptions[0].fileId!="";
            flag=isSource;
            if (!isSource) break;
        }
        if(flag) {
            config.containerList.push({
                listReader:[...listReader],
                listContext:[...listContext],
                listContainer:generate("audio",[...listContext])
            });
        }

        config.containerList.push({
            listReader:[...listReader],
            listContext:[...listContext],
            listContainer:generate("def",[...listContext])
        });

        

        config.module=0;
        setContainerList(config.containerList[0].listReader);
    };

    useEffect(() => {   
        Rest.getStudentCards(contextListId,maxCountInit).then(function(list){
            console.log("start",list);
            start(list);
        });
    },[]);

    return (
        <Stack justifyItems="center" alignItems="center">
            <Stack spacing={1} sx={{width:650}}>
               { 
                    containerList.map((container,index)=>(
                        <Stack sx={{display:container.isDisplay?"block":"none"}}>
                            <Stack alignItems="center">
                                {
                                    container.module=="reader" &&
                                    <Typography variant="h3">Изучите выражения</Typography>
                                }
                                {
                                    (container.module=="example" || container.module=="def") &&
                                    <Typography variant="h3">Подберите выражение</Typography>
                                }
                            </Stack>
                            <Stack spacing={1}>
                                {
                                    container.module=="reader" &&
                                    <CardReader cardId={container.contextId}  />
                                }
                                {
                                    container.module=="def" &&
                                    <DefinitionModule  check={container.check} expressionValue={container.expressionValue} text={container.text} image={container.image} />
                                }
                                {
                                    container.module=="example" &&
                                    <ExampleModule examples={container.examples} check={container.check} expressionValue={container.expressionValue} />
                                }
                                {
                                    container.module=="audio" &&
                                    <AudioModule source={container.source} check={container.check} expressionValue={container.expressionValue} />
                                }
                                {
                                    container.module=="defexam" &&
                                    <DefExamModule contextList={container.contextList} check={container.check} />
                                }
                            </Stack>
                            <Stack spacing={1}>
                                {
                                    container.module=="reader" &&
                                    <ReaderPlayer
                                        clickPrev={function(){ clickStep(index,-1); }}
                                        clickNext={function(){ clickStep(index,+1); }}
                                        clickClose={()=>{
                                            close(true);
                                        }}
                                        index={index}
                                        lastIndex={containerList.length-1}
                                    />
                                }
                                {
                                    (container.module=="example" || container.module=="def" || container.module=="audio" || container.module=="defexam") &&
                                    <CheckPlayer 
                                        clickCheck={function(){ 
                                            let isRight=container.checkPlayer();
                                            if(!isRight) {
                                                setDefExamModuleCounter(defExamModuleCounter+1);
                                            }
                                            console.log("isRight===",isRight);
                                            return isRight; 
                                        }} 
                                        clickSkip={function(){clickStep(index,+1);}} 
                                        clickNext={()=> {
                                            config.containerList[config.module].listContainer[index].isRight=true;
                                            clickStep(index,+1);
                                        }}
                                        clickClose={(isRight)=>{
                                            console.log("isRight2",isRight);
                                            
                                            config.containerList[config.module].listContainer[index].isRight=isRight;
                                            close(false,isRight);
                                        }} 
                                        index={index}
                                        lastIndex={containerList.length-1}
                                    />
                                }
                            </Stack>
                        </Stack>
                    ))
               }
            </Stack>
        </Stack>
    );
};