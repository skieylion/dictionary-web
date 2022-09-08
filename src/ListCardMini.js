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
import NewSlotCard from './NewSlotCard';
import CardMini from './CardMini';
import Typography from '@mui/material/Typography';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Rest from './Rest';
import CircularProgress from '@mui/material/CircularProgress';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ImageDefault from './ImageDefault';

const axios=require('axios').default;
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(0),
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

const cardData={
  expression:"wait for",
  definition: "to do something",
  speechPart:"verb",
  example:"I am waiting for a taxi",
  image:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Test-Logo.svg/783px-Test-Logo.svg.png"
};

const imageDefault=ImageDefault.imageModule;

export default function ListCardMini() {

  let {slotId}=useParams();
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);

  const [cardList, setCardList] = useState([]);

  const loadCards=()=>{
    setLoading(true);
    Rest.getCardsBySlotId(slotId,offset,25,function(response){
      if(response && response.data) {
        let arr = [...cardList];
        for(let card of response.data) {
          arr.push({
            cardId: card.id,
            expression: card.expression,
            definition: card.definition,
            speechPart: card.partOfSpeech.name,
            example: card.examples && card.examples.length?card.examples[0].text:"",
            image: card.photoId!=null?"http://localhost:8081/Files/"+card.photoId:imageDefault,
            audioFile:card.transcriptions && card.transcriptions[0] && card.transcriptions[0].fileId ? "http://localhost:8081/Files/"+card.transcriptions[0].fileId:null
          });
        }
        setCardList(arr);
        setLoading(false);
        setOffset(offset+1);
      }
    });
  }

  useEffect(() => {   
    loadCards();
  },[]);

  return (
      <Grid container spacing={3}>
          <Grid item xs="auto">
              <Item>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 220,
                    height: 220,
                    border: '1px dashed grey'
                  }}
                >
                  <Button size="small" variant="outlined" onClick={function(){
                    Rest.toLink("/writer");
                  }} >new</Button>
                </Box>
              </Item>
          </Grid>
          {
              cardList.map((card,index)=>(
                  <Grid item xs="auto">
                      <Item>
                          <CardMini card={card} 
                            delete={function(cardId){
                              let arr = [...cardList];
                              let newArr=[];
                              for(let i=0;i<arr.length;i++) {
                                if(arr[i].cardId!=cardId){
                                  newArr.push(arr[i]);
                                }
                              }
                              setCardList(newArr);
                            }} 
                          />
                      </Item>
                  </Grid>
              ))
          }
          <Grid item xs="auto">
              <Item>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 220,
                    height: 220,
                    
                  }}
                >
                  {
                    loading==false && 
                    <Tooltip title="yet" sx={{m:0,p:0}}>
                      <IconButton  sx={{m:0,p:0}} onClick={function(){
                        
                        loadCards();
                      }} >
                          <AutorenewIcon sx={{width:100,height:100}}  />
                      </IconButton>
                    </Tooltip>
                  }
                  {
                    loading==true && <CircularProgress />
                  }
                  
                  
                </Box>
              </Item>
          </Grid>
          
      </Grid>
  );
};