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
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import AddCircleIcon from '@mui/icons-material/AddCircle';


export default function ExpressionList(props) {

  const [wordList, setWordList] = useState([]);

  props.init(function(wordId) {
    Rest.entries(wordId).then(res=>{
      console.log("res = ",res);
      setWordList(res);
    });
  });

  

  return (
    <span>
    {
      wordList && wordList.length>0 &&
      <Box overflow="auto" sx={{display: 'flex',border: '1px solid grey', maxHeight:'200px'}} >
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {
          wordList.map((e,index)=>(
            <div key={"expression_list_"+index}>
              <ListItem>
                  <Typography>
                      <Grid container >
                        <Grid >
                            <IconButton  sx={{m:1,p:0}}>
                              <AddCircleIcon  sx={{m:0,p:0}} onClick={function() {
                                console.log(e);
                                props.selected(e);
                              }} />
                            </IconButton>
                          </Grid>
                          <Grid>
                            <b><span title={e.text}>{Utils.cut(e.text,10)} </span> <span title={e.lexicalCategoryText}>({Utils.cut(e.lexicalCategoryText.toLowerCase(),6)}) </span></b> : <span title={e.definition}> {Utils.cut(e.definition,50)} </span>
                            <br />
                            {e.examples && e.examples.length>0 && <i><span title={e.examples[0]}> {Utils.cut(e.examples[0],70)} </span></i>}
                          </Grid>
                          
                      </Grid>
                  </Typography>
              </ListItem>
              <Divider  sx={{ width: '100%' }}  />
            </div>
          ))
        }
        </List>
      </Box>
    }
    </span>
  );
}
