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
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';


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
        //BIRTHDATE:("23-08-1999"),
        //AGE:data.get("AGE"),
        //ADDRESS:data.get("ADDRESS"),
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
                  id="firstName"
                  label="ชื่อ"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
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
                    <FormControl>
                        <FormLabel>วัน/เดือน/ปี เกิด</FormLabel>
                        <select>
                            <option value="1-">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>
                        <select>
                            <option value="01-">มกราคม</option>
                            <option value="02">กุมภาพันธ์</option>
                            <option value="03">มีนาคม</option>
                            <option value="04">เมษายน</option>
                            <option value="05">พฤษภาคม</option>
                            <option value="06">มิถุนายน</option>
                            <option value="07">กรกฏาคม</option>
                            <option value="08">สิงหาคม</option>
                            <option value="09">กันยายน</option>
                            <option value="10">ตุลาคม</option>
                            <option value="11">พฤศจิกายน</option>
                            <option value="12">ธันวาคม</option>
                        </select>
                        <select>
                            <option value="2022">2022</option>
                            <option value="y1">2564</option>
                            <option value="y2">2563</option>
                            <option value="y3">2562</option>
                            <option value="y4">2561</option>
                            <option value="y5">2560</option>
                            <option value="y6">2559</option>
                            <option value="y7">2558</option>
                            <option value="y8">2557</option>
                            <option value="y9">2556</option>
                            <option value="y10">2555</option>
                            <option value="y11">2554</option>
                            <option value="y12">2553</option>
                            <option value="y13">2552</option>
                            <option value="y14">2551</option>
                            <option value="y15">2550</option>
                            <option value="y16">2549</option>
                            <option value="y17">2548</option>
                            <option value="y18">2547</option>
                            <option value="y19">2546</option>
                            <option value="y20">2545</option>
                            <option value="y21">2544</option>
                            <option value="y22">2543</option>
                            <option value="y23">2542</option>
                            <option value="y24">2541</option>
                            <option value="y25">2540</option>
                            <option value="y26">2539</option>
                            <option value="y27">2538</option>
                            <option value="y28">2537</option>
                            <option value="y30">2536</option>
                            <option value="y31">2535</option>
                            <option value="y32">2534</option>
                            <option value="y33">2533</option>
                            <option value="y34">2532</option>
                            <option value="y35">2531</option>
                            <option value="y36">2530</option>
                            <option value="y37">2529</option>
                            <option value="y38">2528</option>
                            <option value="y39">2527</option>
                            <option value="y40">2526</option>
                            <option value="y41">2525</option>
                            <option value="y42">2524</option>
                            <option value="y43">2523</option>
                            <option value="y44">2522</option>
                            <option value="y45">2521</option>
                            <option value="y46">2520</option>
                            <option value="y47">2519</option>
                            <option value="y48">2518</option>
                            <option value="y49">2517</option>
                            <option value="y50">2516</option>

                        </select>
                    </FormControl>
                    
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