import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';


const theme = createTheme ({
    components: {
        MuiTypography: {
            variants: [
                {
                    props: {
                        variant: "body2",
                    },
                    style: {
                        frontsize: 11,
                    },
                },
                {
                    props: {
                        variant: "body3",
                    },
                    style: {
                        frontsize: 9,
                    },
                },
            ],
        },
    },
});

const TourCard = () => {
    return ( 
    <Grid  item md>
        <ThemeProvider theme={theme}>
        <Paper elevation={3} > 
            <Card md>
                <CardActionArea >
                    <CardMedia 
                        image="https://inwfile.com/s-cu/tl5xvh.png"
                        component="img"
                        height="300"
                        alt="Paella dish"
                    />
                         
                       
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            ใบสำคัญซื้อ
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            ระบบที่ใช้ควบคุมการจ่ายเงินที่มีเอกสารประกอบ โดยนำทั้งหมดมาตรวจสอบ และเก็บข้อมูล จดบันทึก ไว้เป็นหลักฐาน โดยกระบวนการทั้งหมด จะต้องมีการเซ็นอนุมัติจ่ายเงิน และจัดเก็บไว้ในทะเบียนใบสำคัญจ่ายอย่างครบถ้วน
                            </Typography>
                        </CardContent>
                </CardActionArea>
            </Card>
            
        </Paper>
        </ThemeProvider>
    </Grid>
    );
};
export default TourCard;