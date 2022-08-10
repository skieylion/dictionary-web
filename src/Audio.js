//import * as React from 'react';
import React,{Component,useState, useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import PauseRounded from '@mui/icons-material/PauseRounded';
import PlayArrowRounded from '@mui/icons-material/PlayArrowRounded';
import FastForwardRounded from '@mui/icons-material/FastForwardRounded';
import FastRewindRounded from '@mui/icons-material/FastRewindRounded';
import VolumeUpRounded from '@mui/icons-material/VolumeUpRounded';
import VolumeDownRounded from '@mui/icons-material/VolumeDownRounded';
import Button from '@mui/material/Button';
import ReplayIcon from '@mui/icons-material/Replay';
import SpeedIcon from '@mui/icons-material/Speed';
import Paper from '@mui/material/Paper';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import TextareaAutosize from '@mui/material/TextareaAutosize';
const WallPaper = styled('div')({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
  overflow: 'hidden',
  background: 'linear-gradient(rgb(255, 38, 142) 0%, rgb(255, 105, 79) 100%)',
  transition: 'all 500ms cubic-bezier(0.175, 0.885, 0.32, 1.275) 0s',
  '&:before': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    top: '-40%',
    right: '-50%',
    background:
      'radial-gradient(at center center, rgb(62, 79, 249) 0%, rgba(62, 79, 249, 0) 64%)',
  },
  '&:after': {
    content: '""',
    width: '140%',
    height: '140%',
    position: 'absolute',
    bottom: '-50%',
    left: '-30%',
    background:
      'radial-gradient(at center center, rgb(247, 237, 225) 0%, rgba(247, 237, 225, 0) 70%)',
    transform: 'rotate(30deg)',
  },
});

const Widget = styled('div')(({ theme }) => ({
  padding: 16,
  borderRadius: 16,
  width: '100%',
  maxWidth: '100%',
  margin: 'auto',
  position: 'relative',
  zIndex: 1,
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.4)',
  backdropFilter: 'blur(40px)',
}));

const CoverImage = styled('div')({
  width: 100,
  height: 100,
  objectFit: 'cover',
  overflow: 'hidden',
  flexShrink: 0,
  borderRadius: 8,
  backgroundColor: 'rgba(0,0,0,0.08)',
  '& > img': {
    width: '100%',
  },
});

const TinyText = styled(Typography)({
  fontSize: '0.75rem',
  opacity: 0.38,
  fontWeight: 500,
  letterSpacing: 0.2,
});

export default function Audio() {
  function getMedia(){
    return document.getElementById('audio');
  }
  function getDuration(){
    return getMedia().duration;
  }
  const theme = useTheme();
  //const duration = 200; // seconds
  const [duration, setDuration] = React.useState(1);
  const [position, setPosition] = React.useState(0);
  const [stepBack, setStepBack] = React.useState(5);
  const [paused, setPaused] = React.useState(true);
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 9 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = theme.palette.mode === 'dark' ? '#fff' : '#000';
  function initSound(){
    console.log("init duration");
    var dur=getDuration();
    if(dur>0) {
        dur=Math.floor(dur);
        console.log(dur);
        setDuration(dur);
        setPosition(0);
    } else {
        setTimeout(initSound,500);
    }
  }
  


  function getCurrentTime(){
      return getMedia().currentTime;
  }
  function getPaused(){
      return getMedia().paused;
  }
  function setCurrentTime(value){
    getMedia().currentTime=value;
  }
  function setRate(v) {
    getMedia().playbackRate = v;
  }

  function getBase64(file,f) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      f(reader.result);
      //console.log("------------------------------");
    };
    reader.onerror = function (error) {
      //console.log('Error: ', error);
    };
 }

 function getInputAudio(){
    return document.getElementById('input_audio');
 }

  function getAudioData(f){
    var fileInput = getInputAudio();
    var file=fileInput.files[0];
    getBase64(file,function(data){
        f(data);
    });
  }

  function initButton() {
    const input = getInputAudio();
    if(input){
        input.addEventListener('change', ()=>{
            getAudioData(function(data){
                getMedia().src=data;
                initSound();
            });
            
        });
    } else {
        setTimeout(initButton,500);
    }
  }

  function follow(){
      setInterval(function(){
          const pause=getPaused();
          if(!pause) {
            setPosition(getCurrentTime());
          } else {  
            setPaused(pause);
          }
      },100);
  }
  
  function valuetext(value) {
    return `${value}°C`;
  }

    useEffect(() => {   
        //initSound();
        initButton();
        follow();
        //setDuration(buff); // seconds
    },[]);

  const lightIconColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.4)';
  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
        
      <Widget>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button variant="contained" component="label" color="primary">
                {" "}
                Upload a file
                <input id='input_audio' type="file" hidden />
            </Button>
            <Box sx={{ ml: 1.5, minWidth: 0 }}>
                <audio id="audio" src="https://thenewcode.com/assets/audio/24-ghosts-III.mp3"></audio>
                <Typography variant="caption" color="text.secondary" fontWeight={500}>
                some name file .mp3
                </Typography>
            </Box>
        </Box>
        <Box>
        <Slider
          aria-label="time-indicator"
          size="small"
          value={position}
          min={0}
          step={1}
          max={duration}
          onChange={(_, value) => {
              setPosition(value);
              setCurrentTime(value);
          }}
          sx={{
            color: theme.palette.mode === 'dark' ? '#fff' : 'rgba(0,0,0,0.87)',
            height: 4,
            '& .MuiSlider-thumb': {
              width: 8,
              height: 8,
              transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
              '&:before': {
                boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
              },
              '&:hover, &.Mui-focusVisible': {
                boxShadow: `0px 0px 0px 8px ${
                  theme.palette.mode === 'dark'
                    ? 'rgb(255 255 255 / 16%)'
                    : 'rgb(0 0 0 / 16%)'
                }`,
              },
              '&.Mui-active': {
                width: 20,
                height: 20,
              },
            },
            '& .MuiSlider-rail': {
              opacity: 0.28,
            },
          }}
        />
        </Box>
        
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mt: -2,
          }}
        >
          <TinyText>{formatDuration(Math.floor(position))}</TinyText>
          <TinyText>-{formatDuration(Math.floor(duration - position))}</TinyText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mt: -1,
          }}
        >
          <IconButton aria-label="previous song" 
            onClick={() => {
                const media=getMedia();
                setCurrentTime(getCurrentTime()-stepBack);
                setPosition(getCurrentTime());
            }}
          >
            <ReplayIcon fontSize="large" htmlColor={mainIconColor} />
          </IconButton>
          
            
          <IconButton
            aria-label={paused ? 'play' : 'pause'}
            onClick={() => {
                const media=getMedia();
                if(paused) {
                    media.play();
                } else {
                    media.pause();
                }
                console.log(getDuration());
                setPaused(!paused);
            }}
          >
            {paused ? (
              <PlayArrowRounded
                sx={{ fontSize: '3rem' }}
                htmlColor={mainIconColor}
              />
            ) : (
              <PauseRounded sx={{ fontSize: '3rem' }} htmlColor={mainIconColor} />
            )}
          </IconButton>
            
            

            
        </Box>
        
        
        <Stack direction="row">
          <TextField
                id="outlined-number"
                label="back"
                size="small"
                type="number"
                onChange={(e)=>{
                  console.log("stepback")
                  console.log(e.target.value);
                  setStepBack(e.target.value);
                
                }}

                inputProps={{ min: 0, max: 15, step: 5, defaultValue: 2 }}
          />
            <FormControlLabel control={<Checkbox defaultChecked />} label="stopping" sx={{ml: +0}}  />
            <FormControlLabel control={<Checkbox defaultChecked />} label="repeating" />
            <TextField
                id="outlined-number"
                label="speed"
                size="small"
                type="number"
                inputProps={{ min: 0.5, max: 1, step: 0.25, defaultValue: 1 }}
                onChange={(e)=>{
                  console.log("speed")
                  console.log(e.target.value);
                  setRate(e.target.value);
                
                }}
            />
        </Stack>
        <Stack sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} >
      <TextareaAutosize
        aria-label="minimum height"
        minRows={15}
      
        style={{ width: 1500 }}
      />
      </Stack>
      </Widget>
      
      <WallPaper />
      
    </Box>
  );
}
