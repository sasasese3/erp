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
                        image="https://mpics.mgronline.com/pics/Images/559000013114301.JPEG"
                        component="img"
                        height="300"
                        alt="Paella dish"
                    />
                         
                       
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            เรียกดูใบสำคัญ
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            เรียกดูใบสำคัญที่กำลังดำเนินการอยู่ และยังสามารถนำกลับมาแก้ไขได้หลังจากยื่นไปแล้วจนกว่าจะถึงระยะเวลาที่จะทำการเซ็นอนุมัติ
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