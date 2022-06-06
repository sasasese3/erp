import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import TableMenu from "./components/Table"



function RV() {

  const [productTable, setProductTable] = React.useState([]);

  const handleClickAddButton = ()=>{
    setProductTable([...productTable,{}])
  }

  return (
  <div className="RV">
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
          ใบสำคัญรับเงิน RV
          </Typography>
        <Box sx={{ flexGrow: 1 }}  >
            
        <Grid container spacing={2}>
             <Grid item xs={4} >
             
                <TextField
                    
                  name="RV_DATE"
                  
                  required
                  id="RV_DATE"
                  label="วันที่จัดทำ"
                  
                />
              </Grid>
              <Grid item xs={4} >
                <TextField
                  name="RV_DATE"
                  
                  required
                  id="RV_DATE"
                  label="เดือนที่จัดทำ"
                  
                />
              </Grid>
             <Grid item xs={4} >
                <TextField
                  name="RV_DATE"
                  
                  required
                  id="RV_DATE"
                  label="ปีที่จัดทำ"
                  
                />
              </Grid>
                <Grid item xs={6} >
                <TextField
                  name="CUSTOMER_ID"
                  fullWidth
                  required
                  id="CUSTOMER_ID"
                  label="ชื่อลูกค้า"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth 
                  id="EMPLOYEE_ID_CREATOR"
                  label="พนักงานขาย"
                  name="EMPLOYEE_ID_CREATOR"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="RV_CREATOR"
                  label="ชื่อบัญชี"
                  name="RV_CREATOR"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="RV_ID"
                  label="เลขที่ใบสั่งขาย RV"
                  name="RV_ID"
                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="RV_DATAIL"
                  label="รายละเอียด"
                  name="RV_DATAIL"
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  
                  id="RV_PRICETOTAL"
                  label="จำนวนเงิน"
                  name="RV_PRICETOTAL"
                  
                />
              </Grid>
              
              <Grid item xs ={12}>
              {productTable.map((data,index) =>{
                console.log(index)
                return <TableMenu key={index} no={index} data={data}/>
              })}
              <Button onClick={handleClickAddButton}> Click to add product</Button>
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
export default RV;
