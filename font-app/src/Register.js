import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const jsonData = {
        EMPLOYEE_ID: data.get("EMPLOYEE_ID"),
        EMPLOYEE_PERSONAL_ID: data.get("EMPLOYEE_PERSONAL_ID"),
        EMPLOYEE_FNAME:data.get("EMPLOYEE_FNAME"),
        EMPLOYEE_LNAME:data.get("EMPLOYEE_LNAME"),
        DEPARTMENT:data.get("DEPARTMENT"),
        POSITION:data.get("POSITION"),
        BIRTHDATE:data.get("BIRTHDATE"),
        AGE:data.get("AGE"),
        ADDRESS:data.get("ADDRESS"),
        PHONE_NUM:data.get("PHONE_NUM"),
        EMAIL:data.get("EMAIL"),
        USERNAME:data.get("USERNAME"),
        PASSWORD:data.get("PASSWORD"),

    
      };


    fetch("http://localhost:3333/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === "ok") {
            alert("register sucess");
            window.location = "/Login";
          } else {
            alert("register failed");
          }
          console.log("Success:", data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

 
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            สมัครสมาชิก
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
            <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="USERNAME"
                  label="ชื่อผู้ใช้งาน/Username"
                  name="USERNAME"
                  autoComplete="username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="PASSWORD"
                  label="รหัสผ่าน/Password"
                  type="password"
                  id="PASSWORD"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="EMPLOYEE_FNAME"
                  required
                  fullWidth
                  id="EMPLOYEE_FNAME"
                  label="ชื่อ"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="EMPLOYEE_LNAME"
                  label="นามสกุล"
                  name="EMPLOYEE_LNAME"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="EMPLOYEE_ID"
                  label="รหัสพนักงาน"
                  name="EMPLOYEE_ID"
                  autoComplete="EMPLOYEE_ID"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="EMAIL"
                  label="อีเมล"
                  name="EMAIL"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="PHONE_NUM"
                  label="เบอร์โทรติดต่อ"
                  name="PHONE_NUM"
                  autoComplete="contract"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="EMPLOYEE_PERSONAL_ID"
                  label="เลขบัตรประจำตัวประชาชน"
                  name="EMPLOYEE_PERSONAL_ID"
                  autoComplete="contract"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="ADDRESS"
                  label="ที่อยู่"
                  name="ADDRESS"
                  autoComplete="contract"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="AGE"
                  label="อายุ"
                  name="AGE"
                  autoComplete="contract"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="DEPARTMENT"
                  label="แผนก"
                  name="DEPARTMENT"
                  autoComplete="department"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="POSITION"
                  label="ตำแหน่ง"
                  name="POSITION"
                  autoComplete="position"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="BIRTHDATE"
                  label="วัน/เดือน/ปีเกิด"
                  type="date"
                  name="BIRTHDATE"
                  defaultValue="2022-05-24"
                  sx={{ width: 220 }}
                  InputLabelProps={{
                  shrink: true,
                }}
                />
                    
                </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="ข้าพเจ้าเข้าใจและตกลงตาม เงื่อนไขการให้บริการ และ นโยบายความเป็นส่วนตัว"
                />
              </Grid>
            </Grid>
            <Button
              type="submid"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              สมัครสมาชิก
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  ลืมรหัสผ่าน
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}