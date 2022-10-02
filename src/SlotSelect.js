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

import FileAttach from './FileAttach';

const axios=require('axios').default;

export default function SlotSelect(props) {

    useEffect(() => {
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

    // props.fill(function(slots) {
        
    // });

    const [cardListIds, setCardListIds] = useState([]);
    const [defSlots,setDefSlots]=useState([]);
    const [cardList, setCardList] = useState([]);

    const onChange=function(event,newValue) {
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
    };

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
        //setCardListIds(slots);
        setDefSlots(slotList);

        console.log("slotList",slotList);
    };

    return (
        <span>
            <Autocomplete multiple id="tags-outlined" options={cardList} value={defSlots}
                onChange={(event, newValue) => {onChange(event,newValue);}}
                getOptionLabel={(option) => option.title} filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="slots"
                        placeholder="..."
                    />
                )}
            />
        </span>
    );
};