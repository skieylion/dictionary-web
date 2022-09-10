//import * as React from 'react';
import React,{Component,useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Tooltip from '@mui/material/Tooltip';
import Rest from './Rest';
import { useParams } from 'react-router-dom';
import Utils from './Utils';


export default function AudioButton(props) {

  let {source,type}=useParams();
  source=props.source;
  type=props.type;
  const audioId='audio_'+Utils.uuidv4();
  const click=function(){
    document.getElementById(audioId).play();
    
    console.log("props",props)
  };

  

  return (
    <span>
      {
        type=="Button" &&
        <Button 
          component="label" 
          variant="contained"
          sx={{height:'100%'}}
          onClick={click}
        >
          <VolumeUpIcon></VolumeUpIcon>
          <audio id={audioId} controls preload="none" hidden>
              <source src={source} type="audio/mpeg" />
          </audio>
        </Button>
      }
      {
        type=="VolumeUpIcon" &&
        <Tooltip title="listen to" sx={{m:0,p:0}}>
          <IconButton  
            sx={{m:0,p:0}}
            onClick={click}
          >
            <VolumeUpIcon  sx={{m:0,p:0}} />
            <audio id={audioId} controls preload="none" hidden>
                <source src={source} type="audio/mpeg" />
            </audio>
          </IconButton>
        </Tooltip>
      }
    </span>
  );
}
