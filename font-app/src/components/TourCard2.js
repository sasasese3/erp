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
                        image="https://image.ezymar.com/article/20190901/12/2035d300-4877-42bb-abe5-e7ac32480409.jpg"
                        component="img"
                        height="300"
                        alt="Paella dish"
                    />
                         
                       
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            ใบสำคัญรับสินค้า
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            ใช้บันทึกรายการซื้อผลิตผล/สินค้าจากสมาชิก ซึ่งไม่มีใบเสร็จรับเงินหรือใบกำกับสินค้าออกให้แก่สหกรณ์ไม่ว่าจะเป็นการซื้อเงินสดหรือเงินเชื่อ
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