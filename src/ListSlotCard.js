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
import NewSlotCard from './NewSlotCard';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import ImageDefault from './ImageDefault';

const axios=require('axios').default;
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }));

export default function ListSlotCard() {

    const [slotList, setSlotList] = useState([]);

    useEffect(() => {   
        axios.get("http://localhost:8081/slots")
        .then(response=>{
            let arr=[];
            for(let slot of response.data){
                arr.push({
                    slotId: slot.id,
                    name: slot.name,
                    image:slot.fileId && slot.fileId!=""? "http://localhost:8081/Files/"+slot.fileId:ImageDefault.defaultImage
                });
            }
            setSlotList(arr);
            //console.log("response = ", response);
        });
    },[]);

    return (
        <Grid container spacing={3}>
            <Grid item xs="auto">
                <Item>
                    <NewSlotCard />
                </Item>
            </Grid>
            {
                slotList.map((slot,index)=>(
                    <Grid item xs="auto">
                        <Item>
                            <SlotCard name={slot.name} image={slot.image} slotId={slot.slotId}  />
                        </Item>
                    </Grid>
                ))
            }
        </Grid>
    );
};