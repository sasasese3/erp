import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';





function AP3() {
  return (
  <div className="AP3">
    <SearchAppBar />
    
    <Container md={{marginY: 5}} 
    >
      
     
        <>
          <Typography
          variant="h4"
          component="h2"
          marginTop={5}
          marginBottom={3}
        >
          ใบตั้งเจ้าหนี้ AP3
          </Typography>
        <Box sx={{ flexGrow: 1 }}  >
            
        <Grid container spacing={2}>
        <Grid item xs={6} >
             
        <TextField
        id="AP3_DATE"
        label="วันที่จัดทำ"
        type="date"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
          />
            </Grid>
                
                <Grid item xs={12} >
                <TextField
                  name="AP3_ID"
                  fullWidth
                  required
                  id="AP3_ID"
                  label="เลขที่ใบสำคัญบัญชี"
                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  fullWidth 
                  id="EMPLOYEE_ID_APPROVER"
                  label="ชื่อพนักงาน"
                  name="EMPLOYEE_ID_APPROVER"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="EMPLOYEE_ID_CREATOR"
                  label="ชื่อบัญชี"
                  name="EMPLOYEE_ID_CREATOR"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="CUSTOMER_ID"
                  label="ชื่อลูกค้า"
                  name="CUSTOMER_ID"
                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  required
                  id="AP3_PRICETOTAL"
                  label="จำนวนเงิน"
                  name="AP3_PRICETOTAL"
                  
                />
              </Grid>

              <Grid item xs={6}>
              <Link href="/App">
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
        </>
        
      
    </Container>
  </div>
  );
}
export default AP3;
