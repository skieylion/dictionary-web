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



const slotList=[
    {
      name:"Test1",
      image:"data:image/jpeg;base64,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"
    },
    {
      name:"Test2",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test3",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test4",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test5",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test6",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test2",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test2",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test2",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test2",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    },
    {
      name:"Test2",
      image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
    }
];


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
                    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
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