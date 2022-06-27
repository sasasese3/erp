const path = require('path');
const PdfPrinter = require('pdfmake');
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

module.exports = { printer, pdfFolder };
