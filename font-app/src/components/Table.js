import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';
import Dropdown from './Dropdown';


export default function BasicTable({index,data,handleAmountChange,handleProductChange}) {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ลำดับ</TableCell>
            <TableCell align="right">ชื่อสินค้า</TableCell>
            <TableCell align="right">จำนวน&nbsp;</TableCell>
            <TableCell align="right">คงเหลือ&nbsp;</TableCell>
            <TableCell align="right">ราคาต่อหน่อย&nbsp;</TableCell>
            <TableCell align="right">ราคารวม&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >{index+1}</TableCell>
              <TableCell align="right">
              <Dropdown index={index} data={data} handleProductChange={handleProductChange}/>

              </TableCell>
              <TableCell align="right">
                 <Input
                    id="standard-adornment-amount"
                    value={data.user_amount}
                    onChange={(event)=> handleAmountChange(event,index)}
                    type='number'
                  />
              </TableCell>
              <TableCell align="right">{data.amount - data.user_amount}</TableCell>
              <TableCell align="right">{data.peramount}</TableCell>
              <TableCell align="right">{data.user_amount * data.peramount}</TableCell>

            </TableRow>
            
        </TableBody>
      </Table>
    </TableContainer>
  );
}