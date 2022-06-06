import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';


export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ลำดับ</TableCell>
            <TableCell align="right">วันที่จัดทำ</TableCell>
            <TableCell align="right">เลขที่ใบสำคัญบัญชี&nbsp;</TableCell>
            <TableCell align="right">ประเภทธุรกรรม&nbsp;</TableCell>
            <TableCell align="right">ชื่อลูกค้า/ผู้ขาย&nbsp;</TableCell>
            <TableCell align="right">สถานะ&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >1</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">
                <Button color="secondary" size="large">กำลังดำเนินการ</Button>
              </TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >2</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">
              <Button variant="contained" color="success">ผ่านการอนุมัติ</Button>
              </TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >3</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">
              <Button variant="outlined" color="error" >ไม่ผ่านการอนุมัติ</Button>

              </TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >4</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >5</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >6</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >7</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >8</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >9</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>

            </TableRow>
            <TableRow
              
              sx={{ minWidth: 650 }} aria-label="simple table"
            >
              <TableCell >10</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>
              <TableCell align="right">Data</TableCell>

            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}