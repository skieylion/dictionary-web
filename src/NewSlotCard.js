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
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea, CardActions } from '@mui/material';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import FileButtonLoader from './FileButtonLoader';
import Rest from './Rest';

const axios=require('axios').default;
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(0),
    textAlign: 'left',
    color: theme.palette.text.secondary
  }));

export default function NewSlotCard() {

    const [mode, setMode] = useState("new");
    const title=React.useRef('');
    const [dataSoruce, setDataSoruce] = useState("");
    

    const [newImage, setNewImage] = useState({});

    let clear=null;

    useEffect(() => {   
        
    },[]);

    return (
      <div>
          {
            mode=="new" && 
            <Box
                justifyContent="center"
                alignItems="center"
                display="flex"
                sx={{
                    width: 300,
                    height: 300,
                    border: '1px dashed grey'
                }}
            >
              <Button variant="outlined" onClick={function(){setMode("edit");}} >new</Button>
            </Box>
          }
          
          {
            mode=="edit" &&
            <Card  sx={{ width: 300, height:300, border: '1px dashed grey' }}> 
                    <Box
                        justifyContent="center"
                        alignItems="center"
                        display="flex"
                        
                        sx={{
                            width: 280,
                            height: 170,
                            border: '1px dashed grey',
                            m:1,
                            p:1
                        }}
                        src={dataSoruce}
                    >
                      <FileButtonLoader label="IMAGE" onLoad={function(obj){
                        console.log(obj)
                        if(obj.type=="dataurl") {
                          setDataSoruce(obj.file);
                          setNewImage(obj.file);
                        }
                      }} />
                    </Box>
                    <CardContent  sx={{ m:1,p:0 }}>
                      <TextField sx={{ width: '100%', }} id="outlined-basic" size="small" label="title" variant="outlined"  inputRef={title} />
                    </CardContent>
                    <CardActions sx={{ m:0,pt:3 }}>
                      <Button variant="outlined" size="small" onClick={function(){
                        let save=function(guid){
                          axios({
                              method:"POST",
                              url:"http://localhost:8081/slots",
                              headers: { 
                                  "Content-Type": "application/json",
                                  "Access-Control-Allow-Origin":"*"
                              },
                              data:{
                                name:title.current.value,
                                fileId:guid
                              }
                          }).then(response=>{
                              console.log("response",response);
                             window.location.reload();
                          }).catch(error=>{
                              console.log(error);
                          });
                        }

                        if(title&&title.current.value&&title.current.value!=""){
                          if(newImage){
                            Rest.saveFile(newImage,save);
                          } else {
                            save(null);
                          }
                          
                        } else {
                          alert("The title is empty");
                        }
                      }}>save</Button>
                      <Button variant="outlined" size="small" onClick={function(){setMode("new");}} >
                        cancel
                      </Button>
                    </CardActions>
            </Card>
          }
      </div>
    );
};