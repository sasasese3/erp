import Container from '@mui/material/Container';
import { Grid} from "@mui/material";
import SearchAppBar from "./components/Appbar";
import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { FormControlLabel, Checkbox,Radio } from '@mui/material';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from '@mui/material';


const Input = styled('input')({
  display: 'none',
});

const jsonData = {
   AP3_ID:"001"

  };

fetch("http://localhost:3333/uploadAP3", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(jsonData),
////  body: File.get("fileupload")
})


function Preview() {
  const [choice,setChoice] =  React.useState('');

  const handleChoiceChange = (event)=>{
    setChoice(event.target.value)
  }

    return (
    <div className="Preview">
      <SearchAppBar />
      <React.Fragment>
      <CssBaseline />
      <Container md={{marginY: 5}} 
      >
      <Box sx={{ flexGrow: 1 }}>
        
         
         <Typography variant="h4"
          component="h2"
          marginTop={5}
          marginBottom={3}>
              ผลการอนุมัติ
            </Typography>
            <Grid>
            <FormControlLabel
                  control={<Radio value="allow" checked={choice === 'allow'} onChange={handleChoiceChange} color="primary" />}
                  label="อนุมัติ"  
            />
            </Grid>
            <Grid>
            <FormControlLabel
                  control={<Radio value="deny" checked={choice === 'deny'} onChange={handleChoiceChange} color="primary" />}
                  label="ไม่อนุมัติ"  
            />
            </Grid>
            <Typography>
              หมายเหตุ
            </Typography>
            <TextareaAutosize
                    aria-label="minimum height"
                    minRows={3}
                    placeholder=""
                    style={{ width: 200 }}
            />
            <Typography>
              เซ็นชื่อ
            </Typography>
            <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" id="contained-button-file" name="fileupload" multiple type="file" />
                    <Button variant="contained" component="span">
                    Upload
                    </Button>
                </label>
                <label htmlFor="icon-button-file">
                    <Input accept="image/*" id="icon-button-file" type="file" />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                </label>
            </Stack>
            <Grid container spacing={2}>
            <Grid item xs={6}>
              <Link href="/Inspector">
                <Button 
                type="back"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              ย้อนกลับ
                </Button>
              </Link>

                </Grid>
                <Grid item xs={6}>
                <Link href="/Inspector">
                <Button 
                type="submid"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              บันทึกเอกสาร
                </Button>
                </Link>
                </Grid>
                </Grid>
            
  
      </Box>
      </Container>
      
      
      </React.Fragment>
    </div>
    );
  }
  export default Preview;