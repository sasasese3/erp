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



function PV() {

  const [productTable, setProductTable] = React.useState([]);
  const navigate = useNavigate();

  const format_pv_detail = (productTable)=>{
    const pv_detail = productTable.reduce((prev,cur)=>{
      prev.PV_DETAIL += `${cur.id},`
      prev.PV_AMOUNTPRODUCT += `${cur.user_amount},`
      return prev
    },{PV_DETAIL:'',PV_AMOUNTPRODUCT:''})
    pv_detail.PV_DETAIL = pv_detail.PV_DETAIL.slice(0,-1)
    pv_detail.PV_AMOUNTPRODUCT = pv_detail.PV_AMOUNTPRODUCT.slice(0,-1)
    return pv_detail
  }

  const handleSummitButton = ()=>{
    const pv_detail = format_pv_detail(productTable)
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
             <Grid item xs={6} >
             
             <TextField
        id="PV_DATE"
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
              <Grid item xs={6} >
                <TextField
                  required
                  value={productTable.reduce((prev,cur)=>{return prev + (parseInt(cur.user_amount) * parseInt(cur.peramount))},0)}
                  id="PV_PRICETOTAL"
                  label="จำนวนเงิน"
                  name="PV_PRICETOTAL"
                  onInput = {(e) =>{
                    e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
                }}
                  
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
export default PV;
