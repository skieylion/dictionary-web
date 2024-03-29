import React,{Component,useState, useEffect} from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import ListSubheader from '@mui/material/ListSubheader';
import ListItemButton from '@mui/material/ListItemButton';
import Collapse from '@mui/material/Collapse';
//import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Badge from '@mui/material/Badge';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'

import Container from '@mui/material/Container';

//import Component from ''
import Context from './Context';
import ContextList from './ContextList';
import CardWriter from './CardWriter';
import CardReader from './CardReader';
import CardEditor from './CardEditor';
import Student from './Student';
import Audio from './Audio';
import ListSlotCard from './ListSlotCard';
import ListCardMini from './ListCardMini';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const axios=require('axios').default;


function PersistentDrawerLeftList() {

  const [open, setOpen] = React.useState(true);
  const [open2, setOpen2] = React.useState(true);
  const [overdueCount, setOverdueCount] = useState(0);


  useEffect(() => {   
    axios.get("http://localhost:8081/slots")
    .then(response=>{
        let sum=0;
        for(let slot of response.data){
          sum+=slot.slotStat.overdueCount;
        }
        setOverdueCount(sum);
        //console.log("response = ", response);
    });
},[]);
  

  const handleClick = () => {
    setOpen(!open);
  };
  const handleClick2 = () => {
    setOpen2(!open2);
  };

  let state=0;

  const clickListItem=(index)=>{
    state=index;
  }

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      {/* <ListItemButton onClick={handleClick2}>
        <ListItemText primary="Контекст" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link to="/context/search">
              <ListItemText primary="Поиск" />
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link to="/context/new">
              <ListItemText primary="Новый" />
            </Link>
          </ListItemButton>
        </List>
      </Collapse>
      <ListItemButton onClick={handleClick}>
        <ListItemText primary="Коллекции" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <Link to="/collection/my">
              <ListItemText primary="Мои" />
            </Link>
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <Link to="/collection/std">
              <ListItemText primary="Стандартные" />
            </Link>
          </ListItemButton>
        </List>
      </Collapse> */}
      <ListItemButton>
        <Link to="/writer">
          <ListItemText primary="new" />
        </Link>
      </ListItemButton>
      <ListItemButton>
        <Link to="/slots">
        <Badge color="error" badgeContent={overdueCount}><ListItemText primary="slots" /></Badge>
        </Link>
      </ListItemButton>
      {/* <ListItemButton>
        <Link to="/correction">
          <ListItemText primary="Корректировки" />
        </Link>
      </ListItemButton> */}
      {/* <ListItemButton>
        <Link to="/listening">
          <ListItemText primary="Аудирование" />
        </Link>
      </ListItemButton> */}
    </List>
  );
}


export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              !!!
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <PersistentDrawerLeftList />
          <Divider />
          {/* <List>
            {['Статистика', '?', '?'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List> */}
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
          <Routes>
            <Route path="/slots" element={<ListSlotCard />} />
            <Route path="/slots/:slotId/cards" element={<ListCardMini />} />
            <Route path="/writer" element={<CardWriter />} />
            <Route path="/context/search" element={<Context />} />
            <Route path="/cards" element={<ContextList />} />
            <Route path="/contextlist/:contextListId/context" element={<Context />} />
            <Route path="/contextlist/:contextListId/card/writer" element={<CardWriter />} />
            <Route path="/cards/:cardId/reader" element={<CardReader />} />
            <Route path="/contextlist/:contextListId/card/:contextId/editor" element={<CardEditor />} />
            <Route path="/slots/:contextListId/student" element={<Student />} />
            <Route path="/listening" element={<Audio />} />

          </Routes>
        </Main>
      </Box>
    </Router>
  );
}
