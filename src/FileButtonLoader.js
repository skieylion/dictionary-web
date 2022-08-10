import React,{Component,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { getBottomNavigationUtilityClass } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import SlotCard from './SlotCard';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea, CardActions } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

const axios=require('axios').default;
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }));

export default function FileButtonLoader(props) {

    let {label}=useParams();
    label=props.label && props.label!=""?props.label:"";
    const [colorButton,setColorButton]=React.useState("primary");
    if(props.clear){
      props.clear(function(){
        setColorButton("primary");
      });
    }

    const fileRead=function(f,type){
      let reader = new FileReader();
      if(type=="dataurl") {
        reader.readAsDataURL(f);
      } else {
        reader.readAsArrayBuffer(f);
      }
      reader.onload = function() {
        if(props.onLoad){
          props.onLoad({
            file:reader.result,
            type:type
          });
          setColorButton("success");
        }
      };
      reader.onerror = function() {
          console.log(reader.error);
      };
    }
    
    return (
        <Button component="label" variant="contained" color={colorButton}>
          <AttachFileOutlinedIcon></AttachFileOutlinedIcon>
          <input type="file" onChange={function(event) {
            fileRead(event.target.files[0],"dataurl");
            fileRead(event.target.files[0],"array");
          }} hidden />
          {label}
        </Button>
    );
};