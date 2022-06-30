const IBPdfDeifinition = (data, create) => {
    const employee = data.Employee;
    const products = data.Products;
    const supplier = data.Supplier;
    const createdAt = new Date(data.createdAt);
    const updatedAt = new Date(data.updatedAt);

    const body = products.map((product) => {
        return [
            product.IB_Product.no,
            product.name,
            product.IB_Product.amount,
            { text: product.IB_Product.price.toLocaleString(), alignment: 'right' },
        ];
    });

    const total_amount = products.reduce((prev, curr) => {
        return prev + curr.IB_Product.amount;
    }, 0);


    return {

        pageSize: 'A4',
        content: [
            { text: 'บริษัท ERP', fontSize: 20, margin: [400, 2, 5, 2] },
            { text: 'ที่อยู่ : สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง ถนนฉลองกรุง เขตลาดกระบัง กรุงเทพ 10520', fontSize: 12, margin: [350, 2, 5, 2] },
            { text: 'เบอร์โทร์ : 0 2329 8000', fontSize: 12, margin: [350, 2, 5, 2] }, ///1 ย่อหน้า

            { text: 'ใบสำคัญรับสินค้า IB', fontSize: 18, margin: [20, 2], bold: true },
            { text: `เลขที่ : ${data.id}`, fontSize: 12 },
            { text: `โรงงาน : ${supplier.name}`, fontSize: 12 },
            { text: `ชื่อพนักงาน : ${employee.firstname} ${employee.lastname}`, fontSize: 12 },
            { text: `สถานที่รับสินค้า : ${data.companyName}`, fontSize: 12 },
            { text: `เบอร์ติดต่อ : ${employee.phone_no}`, fontSize: 12 },
            { text: `อีเมลล์ : ${employee.email}`, fontSize: 12 },

            { text: `วันที่ออก : ${createdAt.toLocaleDateString('en-GB')}`, fontSize: 10, margin: [350, 2, 5, 2], bold: true },
            { text: `วันที่อนุมัติ : ${!create ? updatedAt.toLocaleDateString('en-GB') : ''}`, fontSize: 10, margin: [350, 2, 5, 2], bold: true },
            {
                layout: "lightHorizontalLines", // optional
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ["*", 250, 100, "*"],

                    body: [

                        ["ลำดับ", "ชื่อสินค้า", "จำนวน", { text: "ราคา", alignment: 'right' }],
                        ...body,
                        [{ text: "ยอดรวม", bold: true }, "", total_amount, { text: data.total_price.toLocaleString(), fontSize: 16, alignment: 'right' }],
                    ],
                },
            },
            { text: `ยอดรวม : \t\t${(data.total_price * 1.07).toLocaleString()}`, fontSize: 18, margin: [350, 2, 5, 2], bold: true },
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
};

module.exports = { IBPdfDeifinition };

