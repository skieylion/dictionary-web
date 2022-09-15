//import * as React from 'react';
import React from 'react';
import Button from '@mui/material/Button';
import Utils from './Utils';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

export default function FileAttach(props) {
  return (
    <span>
      <Button sx={{height:'100%'}} component="label" size="small" variant="contained" >
        <AttachFileOutlinedIcon></AttachFileOutlinedIcon>
        <input type="file" onChange={function(event) {
          let metaFile=event.target.files[0];
          Utils.setArrayBufferFile(metaFile, function(result) {
            props.onChange({
              metaFile:metaFile,
              data8:result
            });
          });
        }} hidden />
      </Button>
    </span>
  );
}