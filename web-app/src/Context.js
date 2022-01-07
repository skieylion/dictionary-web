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

import { useParams } from 'react-router-dom';

const axios=require('axios').default;


const columns = [
  {field: 'id',headerName: 'Id'},
  {field: 'context', headerName: 'Context', width: 300},
  {field: 'example', headerName: 'Example', width: 700}
]

export default function Context() {
  const [tableData, setTableData] = useState([]);
  const {contextId,contextListId}=useParams();


  useEffect(() => {
    axios.get("http://localhost:8081/ContextList/"+contextListId+"/Context")
    .then(response=>{
      let data=[];
      for(const d of response.data){
        data.push({
          id:d.id,
          context:d.expressionValue,
          example:d.exampleList&&d.exampleList[0]?d.exampleList[0].text:"-"
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
      <Stack spacing={2} direction="row">
        <Button  variant="contained">Добавить</Button>
        <Button variant="contained">Редактировать</Button>
        <Button variant="contained">Открепить</Button>
        <Button  variant="contained">Уже знаю</Button>
        <Button  variant="contained">Добавить к списку</Button>
        <Button  variant="contained">Сбросить прогресс</Button>
      </Stack>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid 
          rows={tableData}
          columns={columns}
          pageSize={12}
          checkboxSelection
        />
      </div>
    </Stack>
    
  );
};
