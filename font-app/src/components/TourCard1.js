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
                        image="https://s.isanook.com/ca/0/rp/r/w728/ya0xa0m1w0/aHR0cHM6Ly9zLmlzYW5vb2suY29tL2NhLzAvdWQvMjc4LzEzOTE0MjUvaXN0b2NrLTg1ODUwODAwOC5qcGc=.jpg"
                        component="img"
                        height="300"
                        alt="Paella dish"
                    />
                         
                       
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            ใบสำคัญขาย
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            เอกสารที่ใช้เป็นหลักฐานในการจ่ายเงิน จัดทำโดยพนักงานในแผนกบัญแล้วส่งไปให้ผู้มีหน้าที่ตรวจสอบ ก่อนที่ผู้มีอำนาจจ่ายเงินจะลงนามอนุมัติการจ่ายเงิน
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