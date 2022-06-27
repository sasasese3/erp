const POPdfDeifinition = {

    pageSize: 'A4',
    content: [
        { text: 'บริษัท ERP', fontSize: 20, margin: [400, 2, 5, 2] },
        { text: 'ที่อยู่ : สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพ 10520', fontSize: 12, margin: [350, 2, 5, 2] },
        { text: 'เบอร์โทร์ : 0 2329 8000', fontSize: 12, margin: [350, 2, 5, 2] }, ///1 ย่อหน้า
        { text: 'ใบสำคัญสั่งซื้อ PO', fontSize: 18, margin: [20, 2] },
        { text: 'เลขที่ : 0000000000000', fontSize: 12 },
        { text: 'ชื่อ : นางสาวปิยะวิทย์  ตาบุดดา', fontSize: 12 },
        { text: 'เบอร์ติดต่อ : 0973348548', fontSize: 12 },
        { text: 'อีเมลล์ : sasasese3@hotmail.com', fontSize: 12 },

        { text: 'วันที่ออก :', fontSize: 10, margin: [350, 2, 5, 2], bold: true },
        { text: 'วันที่อนุมัติ :', fontSize: 10, margin: [350, 2, 5, 2], bold: true },




        {
            layout: "lightHorizontalLines", // optional
            table: {


                // headers are automatically repeated if the table spans over multiple pages
                // you can declare how many rows should be treated as headers
                headerRows: 1,
                widths: ["*", 250, 100, "*"],

                body: [

                    ["ลำดับ", "ชื่อสินค้า", "จำนวน", "ราคา"],
                    ["1", "Value 2", "Value 3", "Value 4"],
                    ["2", "Value 2", "Value 3", "Value 4"],
                    ["3", "Value 2", "Value 3", "Value 4"],
                    ["4", "Value 2", "Value 3", "Value 4"],
                    ["5", "Value 2", "Value 3", "Value 4"],
                    ["6", "Value 2", "Value 3", "Value 4"],
                    ["7", "Value 2", "Value 3", "Value 4"],
                    ["8", "Value 2", "Value 3", "Value 4"],
                    ["9", "Value 2", "Value 3", "Value 4"],
                    ["10", "Value 2", "Value 3", "Value 4"],
                    [{ text: "ยอดรวม", bold: true }, "", "Val 3", { text: "ยอดรวม", fontSize: 16 }],
                ],
            },

        },
        { text: 'ยอดรวม : ', fontSize: 18, margin: [350, 2, 5, 2], bold: true },
        { text: 'VAT :                            7%', margin: [350, 2, 5, 2] },
        { text: 'ยอดรวมสุทธิ :                 7%', margin: [350, 2, 5, 2] },


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

module.exports = { POPdfDeifinition };

