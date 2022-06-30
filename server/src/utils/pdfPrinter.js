const path = require('path');
const PdfPrinter = require('pdfmake');
const { POPdfDeifinition } = require("./erp/POPdfDefinition");
const { PVPdfDeifinition } = require("./erp/PVPdfDefinition");
const { RVPdfDeifinition } = require("./erp/RVPdfDefinition");
const { createWriteStream } = require('fs');
const { AP3PdfDeifinition } = require("./erp/AP3PdfDefinition");

const font = {
    THSarabun: {
        normal: path.join(__dirname, "..", "..", 'font', 'THSarabunNew.ttf'),
        bold: path.join(__dirname, "..", "..", 'font', 'THSarabunNew-Bold.ttf'),
        italics: path.join(__dirname, "..", "..", 'font', 'THSarabunNew-Italic.ttf'),
        bolditalics: path.join(__dirname, "..", "..", 'font', 'THSarabunNew-BoldItalic.ttf')
    }
};
const pdfFolder = path.join(__dirname, "..", "..", "pdf");

const printer = new PdfPrinter(font);

const createPDF = (type, data, create, filePath) => {
    let doc;
    switch (type) {
        case 'po':
            doc = printer.createPdfKitDocument(POPdfDeifinition(data, create));
            break;
        case 'rv':
            doc = printer.createPdfKitDocument(RVPdfDeifinition(data, create));
            break;
        case 'pv':
            doc = printer.createPdfKitDocument(PVPdfDeifinition(data, create));
            break;
        case 'ap3':
            doc = printer.createPdfKitDocument(AP3PdfDeifinition(data, create));
        default:
            break;
    }
    if (!filePath) {
        filePath = path.join(pdfFolder, type, `${(new Date()).getTime()}.pdf`);
    }
    doc.pipe(createWriteStream(filePath));
    doc.end();

    return filePath;
};

module.exports = { createPDF, pdfFolder };
