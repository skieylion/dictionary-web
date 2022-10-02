//import * as React from 'react';
import React,{Component,useState, useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import Tooltip from '@mui/material/Tooltip';
import Rest from './Rest';
import { useParams } from 'react-router-dom';
import Utils from './Utils';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function SearchExpression(props) {

  const [topList,setTopList]=React.useState([
    { name: 'The Shawshank Redemption', value: 1 },
    { name: 'The Godfather', value: 2 }
  ]);
  

  return (
    <span>
      <Autocomplete size="small" freeSolo id="search_expression" disableClearable
        onKeyUp={function(event) {
          let query=event.target.value;
          if(event.code=="Enter") {
            props.selected({
              name: query,
              isApi:false
            });
          } else if(query && query.length>2) {
            Rest.search(query).then(res=>{
              setTopList(res);
            });
          }
        }}
        onChange={function(e,name){
          for(let i=0;i<topList.length;i++) {
            if(topList[i].name==name) {
              props.selected({
                name: name,
                value: topList[i].value,
                isApi:true
              });
              break;
            }
          }
        }}
        options={topList.map((option) => option.name)}
        renderInput={(params) => (
          <TextField size="small"
            {...params}
            label="search"
            InputProps={{
              ...params.InputProps,
              type: 'search'
            }}
          />
        )}
      />
    </span>
  );
}
