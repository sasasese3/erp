import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
export default function BasicSelect({index,data,handleProductChange}) {

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">รายการสินค้า</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={data.product}
          label="Age"
          onChange={(event)=> handleProductChange(event,index)}
        >
          <MenuItem value={'โต๊ะ'}>โต๊ะ</MenuItem>
          <MenuItem value={'เก้าอี้'}>เก้าอี้</MenuItem>
          <MenuItem value={'จาน'}>จาน</MenuItem>
          <MenuItem value={'โทรศัพท์มือถือ'}>โทรศัพท์มือถือ</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
