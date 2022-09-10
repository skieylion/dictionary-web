//import * as React from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Utils from './Utils';

export default function FileAttach(props) {
  return (
    <span>
      <Button component="label" size="small" variant="contained" >
        <AttachFileOutlinedIcon></AttachFileOutlinedIcon>
        <input type="file" onChange={function(event) {
          Utils.setArrayBufferFile(event.target.files[0], function(result){
            props.onChange(result);
          });
        }} hidden />
      </Button>
    </span>
  );
}