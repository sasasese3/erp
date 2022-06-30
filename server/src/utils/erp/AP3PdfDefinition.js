const AP3PdfDeifinition = (data, create) => {
    const employee = data.Employee;
    const createdAt = new Date(data.createdAt);
    const updatedAt = new Date(data.updatedAt);

    return {

        pageSize: 'A4',
        content: [
            { text: 'บริษัท ERP', fontSize: 20, margin: [400, 2, 5, 2] },
            { text: 'ที่อยู่ : สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพ 10520', fontSize: 12, margin: [350, 2, 5, 2] },
            { text: 'เบอร์โทร์ : 0 2329 8000\n\n\n\n', fontSize: 12, margin: [350, 2, 5, 2] }, ///1 ย่อหน้า

            { text: 'ใบสำคัญแจ้งหนี้ AP3', fontSize: 18, bold: true, alignment: 'center' },

            { text: `\n\nวันที่ออก : ${createdAt.toLocaleDateString('en-GB')}`, fontSize: 10, margin: [350, 2, 5, 2], bold: true },
            { text: `วันที่อนุมัติ : ${!create ? updatedAt.toLocaleDateString('en-GB') : ''}\n\n\n\n`, fontSize: 10, margin: [350, 2, 5, 2], bold: true },

            {
                columns: [
                    { text: `เลขที่ : ${data.id}`, margin: [50, 0] },
                    { text: `ชื่อลูกค้า : ${data.customerName}`, margin: [20, 0] },
                ]
            },

            {
                columns: [
                    { text: `ชื่อพนักงาน : ${employee.firstname} ${employee.lastname}`, margin: [50, 0] },
                    { text: `ประเภทภาษี : ${data.type}`, margin: [20, 0] },
                ]
            },
            {
                columns: [
                    { text: `เบอร์ติดต่อ : ${employee.phone_no}`, margin: [50, 0] },
                    { text: `จำนวนเงิน : ${data.price.toLocaleString()} บาท`, margin: [20, 0] },
                ]
            },
            {
                columns: [
                    { text: `อีเมลล์ : ${employee.email}`, margin: [50, 0] },
                    { text: `ภาษี : ${data.tax.toLocaleString()} บาท`, margin: [20, 0] },
                ]
            },

            { text: `\n\n\nหัก ณ ที่จ่าย\t${data.priceWithTax.toLocaleString()}\tบาท`, fontSize: 18, margin: [300, 2, 5, 2], bold: true },
        ],
        defaultStyle: {
            font: "THSarabun",
            fontSize: 14,
        },
        styles: {
            header: {
                fontSize: 22,
                bold: true
            },
            anotherStyle: {
                italics: true,
                alignment: 'right'
            }
        }
    };
};

module.exports = { AP3PdfDeifinition };

