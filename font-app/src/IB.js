import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableMenu from "./components/Table"
import { Link } from '@mui/material';




function IB() {

  const [productTable, setProductTable] = React.useState([]);

  const handleClickAddButton = ()=>{
    setProductTable([...productTable,{}])
  }


  return (
  <div className="IB">
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
          ใบสำคัญรับสินค้า IB
          </Typography>
        <Box sx={{ flexGrow: 1 }}  >
            
        <Grid container spacing={2}>
             <Grid item xs={4} >
             
                <TextField
                    
                  name="IB_DATE"
                  
                  required
                  id="IB_DATE"
                  label="วันที่จัดทำ"
                  
                />
              </Grid>
              <Grid item xs={4} >
                <TextField
                  name="IB_DATE"
                  
                  required
                  id="IB_DATE"
                  label="เดือนที่จัดทำ"
                  
                />
              </Grid>
             <Grid item xs={4} >
                <TextField
                  name="IB_DATE"
                  
                  required
                  id="IB_DATE"
                  label="ปีที่จัดทำ"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="IB_CREATOR"
                  label="ชื่อบัญชี"
                  name="IB_CREATOR"
                  
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
                  id="SUPPLIER_ID"
                  label="ผู้ผลิต"
                  name="SUPPLIER_ID"
                  
                />
              </Grid>
              <Grid item xs={6} >
                <TextField
                  required
                  fullWidth
                  id="IB_ID"
                  label="เลขที่ใบสั่งขาย IB"
                  name="IB_ID"
                  
                />
              </Grid>
              <Grid item xs={12} >
                <TextField
                  fullWidth
                  id="IB_DATAIL"
                  label="รายละเอียด"
                  name="IB_DATAIL"
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
export default IB;
