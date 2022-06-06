import { Grid} from "@mui/material";
import SearchAppBar from "./components/Appbar";
import Container from '@mui/material/Container';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { Typography,Stack,TextField } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Admin() {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    
  <div className="Admin">
    <SearchAppBar />
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="m">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }} square>

        <Grid container justifyContent="center">
        <Grid item>
          
          <Tooltip title="Add" placement="top">
          <Typography
          variant="h4"
          component="h2"
          marginTop={5}
          marginBottom={3}
        >
          ข้อมูลผู้ใช้งาน
          </Typography>
          </Tooltip>
        
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={4} > </Grid>
            <Grid item xs={4}>
            <Stack direction='row' justifyContent='center'>
              <Avatar   alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </Stack>
              <Typography>
                ชื่อ - นามสกุล
              </Typography>
              <TextField fullWidth label="นางสาวปิยะวิทย์  ตาบุดดา" id="name" />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography>
                E - Mail
                <TextField fullWidth label="sasasese3@hotmail.com" id="e-mail" />
              </Typography>
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography>
                Username
              </Typography>
              <TextField fullWidth label="sasasese3" id="username" />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Typography>
                ตำแหน่ง
              </Typography>
              <FormControl fullWidth>
        <InputLabel id="position"></InputLabel>
        <Select
          labelId="position"
          id="position"
          value={age}
          label="Position"
          onChange={handleChange}
        >
          <MenuItem value={10}>ผู้ใช้งาน</MenuItem>
          <MenuItem value={20}>ผู้ตรวจใบสำคัญ</MenuItem>
        </Select>
      </FormControl>
              
            </Grid>
            
          
        </Grid>
        <Grid container spacing={3}>
        <Grid item xs={6}>
                <Button 
                type="back"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              ย้อนกลับ
                </Button>
                </Grid>
                <Grid item xs={6}>
                <Button 
                type="submid"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              บันทึกเอกสาร
                </Button>
                </Grid>
       </Grid>
        
      </Grid>


        </Box>
      </Container>
    </React.Fragment>
  </div>
  );
}
