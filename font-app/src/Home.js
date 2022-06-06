import Container from '@mui/material/Container';
import { Grid, Typography } from "@mui/material";
import SearchAppBar from "./components/Appbar";
import * as React from 'react';
import Button from '@mui/material/Button';
import Link from "@mui/material/Link";

function App() {
    return (
    <div className="LandingSell">
      <SearchAppBar />
      
      <Container md={{marginY: 5}} 
      >
          <img src="http://www.fmsconsult.com/images/5.jpg"
          alt=""
          className="img"
      />
      <Typography
          variant="h4"
          component="h2"
          marginTop={5}
          marginBottom={3}
        >
          ERP (Enterprise Resource Planning)
          </Typography>
        <Typography>
            ERP ย่อมาจาก Enterprise Resource Planning  หรือ การวางแผนทรัพย์กรขององค์กร ซึ่งระบบ ERP นั้นจะครอบคลุมตั้งแต่การวางแผนและการจัดการฐานข้อมูล โดย ERP จะเป็นการเชื่อมโยงระบบงานต่างๆ ขององค์กรไว้ในที่เดียวกัน เพื่อให้เป็นระบบมาตรฐานเดียวกัน  
        </Typography>
        <Typography>
        เพื่อให้การใช้งานที่รวดเร็วและไม่ยุ่งยากในการทำงานและหากมีปัญหาในการปฏิบัติงานเกิดขึ้นสามารถรู้ถึงผลกระทบที่จะเกิดขึ้นกับหน่วยงานของตนและสามารถวางแผน แก้ไขปัญหาได้อย่างรวดเร็ว เพื่อให้องค์กรนั้นมีการบริหารและการใช้ทรัพยากรร่วมกันอย่างมีประสิทธิภาพมากยิ่งขึ้น  
        </Typography>
        <Grid container spacing={3}>
        <Grid item xs={6}>
          <Link href="Register">
                <Button 
                type="register"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              สมัครสมาชิก
                </Button>
          </Link>
                </Grid>


                <Grid item xs={6}>
                  <Link href="/Login">
                <Button 
                type="login"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                >
              เข้าสู่ระบบ
                </Button>
                </Link>
                </Grid>

        
        </Grid>
      </Container>
    </div>
    );
  }
  export default App;