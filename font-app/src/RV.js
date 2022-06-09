import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import TableMenu from "./components/Table"
import MenuData from "./MenuData";
import { useNavigate } from "react-router-dom";



function RV() {

  const [productTable, setProductTable] = React.useState([]);
  const navigate = useNavigate();

  const format_rv_detail = (productTable)=>{
    const rv_detail = productTable.reduce((prev,cur)=>{
      prev.RV_DETAIL += `${cur.id},`
      prev.RV_AMOUNTPRODUCT += `${cur.user_amount},`
      return prev
    },{RV_DETAIL:'',RV_AMOUNTPRODUCT:''})
    rv_detail.RV_DETAIL = rv_detail.RV_DETAIL.slice(0,-1)
    rv_detail.RV_AMOUNTPRODUCT = rv_detail.RV_AMOUNTPRODUCT.slice(0,-1)
    return rv_detail
  }

  const handleSummitButton = ()=>{
    const rv_detail = format_rv_detail(productTable)
    if (productTable.length >= 5){
      navigate('/Inspector')
    }
  }


  const handleClickAddButton = ()=>{
    setProductTable([...productTable,{...MenuData['โต๊ะ'],user_amount:0}])
  }

  const handleAmountChange = (event,index)=>{
    event.preventDefault()
    const new_product = [...productTable]
    new_product[index].user_amount = event.target.value
    setProductTable(new_product);
  }

  const handleProductChange = (event,index)=> {
    event.preventDefault()
    const category = event.target.value
    const result = MenuData[category]
    const new_product = [...productTable]
    new_product[index] = {...result,user_amount:new_product[index].user_amount}
    setProductTable(new_product);
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
             <Grid item xs={6} >
             
             <TextField
        id="RV_DATE"
        label="วันที่จัดทำ"
        type="date"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
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
              <Grid item xs={12} >
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
                return <TableMenu key={index} index={index} data={data} handleAmountChange={handleAmountChange} handleProductChange={handleProductChange}/>
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
                
                <Button
                onClick={handleSummitButton} 
                type="submid"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              บันทึกเอกสาร
                </Button>
                
                </Grid>
             
        </Grid>
        
      
        </Box>
        </>

        
      
    </Container>
  </div>
  );
}
export default RV;
