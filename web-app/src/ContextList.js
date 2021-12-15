import React,{Component} from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';

export default class ContextList extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack spacing={1}>
        <Stack spacing={2} direction="row">
          <Button  variant="contained">Добавить</Button>
          <Button disabled variant="contained">Объединить</Button>
        </Stack>
        <Stack spacing={1}>
          {
            ["1","2"].map((contextList,index)=>(
              <Stack spacing={1} direction="row">
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
                          <TextField id="standard-basic"  disabled variant="standard" defaultValue="Name"  />
                        </Grid>
                        <Grid item xs={0} md={12}>
                          <TextField fullWidth  id="standard-basic2"  defaultValue="Description"  variant="standard" />
                        </Grid>
                        <Grid item xs={0} md={12}>
                          <Stack spacing={2} direction="row">
                            <Button variant="contained">Просмотр</Button>
                            <Button variant="contained">Редактировать</Button>
                            <Button  variant="contained">Изучать</Button>
                          </Stack>
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
