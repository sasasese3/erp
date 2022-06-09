import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import TextField from '@mui/material/TextField';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TableMenu from "./components/Table"
import { Link } from '@mui/material';
import MenuData from "./MenuData";
import { useNavigate } from "react-router-dom";




function IB() {

  const [productTable, setProductTable] = React.useState([]);
  const navigate = useNavigate();

  const format_ib_detail = (productTable)=>{
    const ib_detail = productTable.reduce((prev,cur)=>{
      prev.IB_DETAIL += `${cur.id},`
      prev.IB_AMOUNTPRODUCT += `${cur.user_amount},`
      return prev
    },{IB_DETAIL:'',IB_AMOUNTPRODUCT:''})
    ib_detail.IB_DETAIL = ib_detail.IB_DETAIL.slice(0,-1)
    ib_detail.IB_AMOUNTPRODUCT = ib_detail.IB_AMOUNTPRODUCT.slice(0,-1)
    return ib_detail
  }

  const handleSummitButton = ()=>{
    const po_detail = format_ib_detail(productTable)
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
             <Grid item xs={6} >
             
             <TextField
        id="IB_DATE"
        label="วันที่จัดทำ"
        type="IB_DATE"
        defaultValue="2017-05-24"
        sx={{ width: 220 }}
        InputLabelProps={{
          shrink: true,
        }}
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
