const { PDFDocument } = require('pdf-lib');
const { font, pdfFolder } = require('../utils/pdfPrinter');
const fontkit = require('@pdf-lib/fontkit');
const { writeFileSync, readFileSync, unlinkSync } = require('fs');
const path = require('path');

const position = {
    po: {
        x: 425,
        y: 584,
    }
};


const pdfEditor = async (filePath, type, date) => {
    //read pdf
    const pdf = await PDFDocument.load(readFileSync(filePath));
    //custom font
    pdf.registerFontkit(fontkit);
    const fontBytes = readFileSync(font.THSarabun.bold);
    const customFont = await pdf.embedFont(fontBytes);

    const newFilePath = path.join(pdfFolder, type, `${date.getTime()}.pdf`);

    const page = pdf.getPage(0);

    const { x, y } = position[type];

    page.moveTo(x, y);
    page.drawText(date.toLocaleDateString('en-GB'), {
        font: customFont,
        size: 10
    });

    writeFileSync(newFilePath, await pdf.save());
    unlinkSync(filePath);

    return newFilePath;
};

module.exports = { pdfEditor };