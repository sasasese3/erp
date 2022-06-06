
import { Button } from "@mui/material";
import React, {Component} from "react";
import { jsPDF } from "jspdf-invoice-template";



class Document extends Component {
    pdfGenerate=() => {
        var doc=new jsPDF('portrait','px','a4','false');
        doc.text( 'This text is normally\raligned.', 140, 50 );
    
    doc.text( 'This text is centered\raround\rthis point.', 140, 120, 'center' );
    
    doc.text( 'This text is rotated\rand centered around\rthis point.', 140, 300, 45, 'center' );
    
    doc.text( 'This text is\raligned to the\rright.', 140, 400, 'right' );
    
    doc.text( 'This text is\raligned to the\rright.', 140, 550, 45, 'right' );
    
    doc.text( 'This single line is centered', 460, 50, 'center' );

    doc.text( 'This right aligned text\r\rhas an empty line.', 460, 200, 'right' );
        doc.save('a.pdf')
    }
    render() {
        return (
            <div style={{textAlign : 'center'}}><br/>
                <Button variant="contained" onClick={this.pdfGenerate}>ดาวน์โหลด PDF</Button>
            </div>
        )
    }
}

export default Document;