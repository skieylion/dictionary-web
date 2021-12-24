import React,{Component} from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import { getBottomNavigationUtilityClass } from '@mui/material';

const axios=require('axios').default;

export default class ContextList extends Component{
  constructor(props) {
    super(props);

    this.state={
      contextList:[]
    }
  }

  componentDidMount(){
    console.log("hello Context List");
    fetch('http://localhost:8081/ContextList')
    .then(response => response.json())
    .then(data => {
      console.log("data:",data);
      this.setState({
        contextList:data
      });
    }).catch(error=>{
      console.log(error);
    });
  }

  render() {
    const _this=this;
    const {contextList}=this.state;

    const clickNew=function(){
      var cl={};
      cl.name="a name";
      cl.description="a description";
      cl.isNew=true;
      contextList.unshift(cl);
      _this.forceUpdate();
    }

    const clickEdit=function(cl){
      cl.oldName=cl.name;
      cl.oldDescription=cl.description;
      cl.isEdit=true;
      _this.forceUpdate();
    }
    const clickCancel=function(cl){
      if(cl.isEdit) {
        cl.name=cl.oldName;
        cl.description=cl.oldDescription;
        cl.isEdit=false;
      } else if(cl.isNew){
        contextList.shift();
      }
      _this.forceUpdate();
    }
    const changeName=function(cl,e){
      cl.name=e.target.value;
      _this.forceUpdate();
    }

    const changeDescription=function(cl,e){
      cl.description=e.target.value;
      _this.forceUpdate();
    }

    const clickSave=function(cl){
      let clist={
        name:cl.name,
        description:cl.description
      };
      if(cl.isEdit){
        clist.id=cl.id;
        cl.isEdit=false;
      }
      
      _this.forceUpdate();
      
      axios.post("http://localhost:8081/ContextList",clist)
      .then(response=>{
        if(cl.isNew) {
          window.location.reload();
        };
      }).catch(error=>{
        console.log(error);
      });

      
     

      //_this.forceUpdate();
    }

    return (
      <Stack spacing={1}>
        <Stack spacing={2} direction="row">
          <Button onClick={clickNew}  variant="contained">Добавить</Button>
          <Button disabled variant="contained">Объединить</Button>
        </Stack>
        <Stack spacing={1}>
          {
            contextList.map((cl)=>(
              <Stack spacing={1} direction="row" >
                  <Paper variant="outlined" elevation={0} square>
                    <Box
                      sx={{
                        width: 150,
                        height: 150,
                        backgroundColor: 'primary.dark',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          opacity: [0.9, 0.8, 0.7],
                        },
                      }}
                    >
                      <Checkbox   color="default" />
                    </Box>
                  </Paper>
                  <Stack spacing={1}>
                    <Grid container spacing={2}>
                      <Grid item xs={0} md={12}>
                        <TextField disabled={(cl.isEdit||cl.isNew)?false:true} value={cl.name} onChange={function(e){changeName(cl,e)}} variant="standard" id="standard-basic" />
                      </Grid>
                      <Grid item xs={0} md={12}>
                        <TextField fullWidth onChange={function(e){changeDescription(cl,e)}} disabled={(cl.isEdit||cl.isNew)?false:true}  value={cl.description} id="standard-basic2" variant="standard" />
                      </Grid>
                      <Grid item xs={0} md={12}>
                        
                        {
                          (cl.isEdit||cl.isNew)?
                            <Stack spacing={2} direction="row">
                              <Button variant="contained" onClick={function(){clickCancel(cl)}}>Отменить</Button>
                              <Button variant="contained" onClick={function(){clickSave(cl)}}>Сохранить</Button>
                            </Stack>
                          :
                            <Stack spacing={2} direction="row" hidden>
                              <Button variant="contained">Просмотр</Button>
                              <Button variant="contained" onClick={function(){clickEdit(cl)}}>Редактировать</Button>
                              <Button variant="contained">Изучать</Button>
                            </Stack>
                        }
                        
                      </Grid>
                    </Grid>
                  </Stack>
                </Stack>
            ))
          }
          
        </Stack>
      </Stack>
    );
  }
};
