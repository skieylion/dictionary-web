import React,{useState, useEffect} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useParams } from 'react-router-dom';

const axios=require('axios').default;


const columns = [
  {field: 'id',headerName: 'Id',hide: true},
  {field: 'context', headerName: 'Выражение', width: 200},
  {field: 'example', headerName: 'Пример', width: 600},
  {field: 'definition', headerName: 'Определение', width: 600},
  {field: 'status', headerName: 'Статус'}
]

export default function Context() {
  const [tableData, setTableData] = useState([]);
  const {contextId,contextListId}=useParams();
  const [selectRows, setSelectRows] = useState([]);

  const [source, setSource] = React.useState('dictionary');

  const sourceChange = (event) => {
    setSource(event.target.value);
  };
  
  const clickStudied=function(){
    let recursive=function(index){
      if(index<selectRows.length){
        axios.post("http://localhost:8081/Context/"+selectRows[index]+"/ContextStatus/STUDIED")
        .then(response=>{
          recursive(++index);
        });
      } else {
        alert("Выбранные выражения отмечены как выученные");
        window.location.reload();
      }
    }
    recursive(0);
    
  }
  const clickNew=function(){
    let recursive=function(index){
      if(index<selectRows.length){
        axios.post("http://localhost:8081/Context/"+selectRows[index]+"/ContextStatus/NEW")
        .then(response=>{
          recursive(++index);
        });
      } else {
        alert("Выбранные выражения отмечены как новые");
        window.location.reload();
      }
    }
    recursive(0);
  }


  useEffect(() => {
    axios.get("http://localhost:8081/ContextList/"+contextListId+"/Context")
    .then(response=>{
      let data=[];
      for(const d of response.data){
        data.push({
          id:d.id,
          context:d.expressionValue,
          example:d.exampleList&&d.exampleList[0]?d.exampleList[0].text:"-",
          status:d.status.contextStatusType,
          definition:d.definition
        });
      }
      setTableData(data);
    });
  },[]);

  return (
    <Stack spacing={1}>
      <Stack spacing={1} direction={"row"}>
        <FormControl fullWidth sx={{ m: 0 }}>
            <InputLabel htmlFor="outlined-adornment-amount">Найти</InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              //value={values.amount}
              //onChange={handleChange('amount')}
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              label="Amount"
            />
        </FormControl>
        <Button variant="contained">Искать</Button>
      </Stack>
      <Stack>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          value={source}
          onChange={sourceChange}
        >
          <FormControlLabel value="dictionary" control={<Radio />} label="Словарь" />
          <FormControlLabel value="mycollections" control={<Radio />} label="Мои коллекции" />
        </RadioGroup>
      </Stack>
      {/* <Stack spacing={2} direction="row">
        <Button  variant="contained">Добавить</Button>
        <Button variant="contained">Редактировать</Button>
        <Button variant="contained">Открепить</Button>
        <Button  variant="contained" onClick={clickStudied} >Уже знаю</Button>
        <Button  variant="contained">Добавить к списку</Button>
        <Button  variant="contained" onClick={clickNew} >Сбросить прогресс</Button>
      </Stack> */}
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid 
          rows={tableData}
          columns={columns}
          pageSize={12}
          checkboxSelection
          onSelectionModelChange={(newSelectionModel) => {
            setSelectRows(newSelectionModel);
            console.log("sl",newSelectionModel);
          }}
        />
      </div>
    </Stack>
    
  );
};
