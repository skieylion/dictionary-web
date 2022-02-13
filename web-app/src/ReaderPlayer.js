import React,{Component,useState, useEffect} from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function ReaderPlayer(props) {

    const lastIndex=props.lastIndex;
    const index=props.index;

    const getIndex=function() {
        return index;
    }

    return (
        <Stack spacing={1}>
            <Stack direction={"row"} spacing={1}>
                {
                    getIndex()!=0 &&
                    <Button size="small" fullWidth onClick={props.clickPrev}  variant="contained">Предыдущее</Button>
                }
                {
                    getIndex()<lastIndex &&
                    <Button size="small" fullWidth onClick={props.clickNext}  variant="contained">Следующее</Button>
                }
            </Stack>
            <Stack sx={{display:getIndex()==lastIndex?"block":"none"}} >
                <Button fullWidth color="success" onDoubleClick={props.clickClose} variant="contained">Далее</Button>
            </Stack>
        </Stack>
    );
};