import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import TableMenu from "./components/Table"



function PV() {

  const [productTable, setProductTable] = React.useState([]);

  const handleClickAddButton = ()=>{
    setProductTable([...productTable,{}])
  }

  return (
  <div className="PV">
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
          ใบสำคัญสั่งจ่าย PV
          </Typography>
        <Box sx={{ flexGrow: 1 }}  >
            
        <Grid container spacing={2}>
             <Grid item xs={4} >
             
                <TextField
                    
                  name="PV_DATE"
                  
                  required
                  id="PV_DATE"
                  label="วันที่จัดทำ"
                  
                />
              </Grid>
              <Grid item xs={4} >
                <TextField
                  name="PV_DATE"
                  
                  required
                  id="PV_DATE"
                  label="เดือนที่จัดทำ"
                  
                />
              </Grid>
             <Grid item xs={4} >
                <TextField
                  name="PV_DATE"
                  
                  required
                  id="PV_DATE"
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
                  id="PV_CREATOR"
                  label="ผู้จัดทำใบสำคัญ"
                  name="PV_CREATOR"
                  
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
                  id="PV_ID"
                  label="เลขที่ใบสั่งขาย PV"
                  name="PV_ID"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="SUPPLIER_ID"
                  label="รหัสผู้ผลิต"
                  name="SUPPLIER_ID"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="PV_DETAIL"
                  label="รายละเอียด"
                  name="PV_DETAIL"
                  
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
export default PV;
