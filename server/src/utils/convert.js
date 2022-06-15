//Function
//แปลง text col Detail เป็น SQL
function ConvertToDetailProductQuery(Data) {
    let TextDetail = Data; //รับ Detail_Product_id;
    const MakeArray = TextDetail.split(",");
    let QueryTextArray = [];
    let QueryText = " ";

    for (let i = 0; i < MakeArray.length; i++) {
        if (i === MakeArray.length - 1) {
            let ArrayProductDetail = MakeArray[i];
            let Query = "PRODUCT_ID=" + " " + ArrayProductDetail + " ";
            QueryTextArray.push(Query);
        } else if (i !== 0) {
            let ArrayProductDetail = MakeArray[i];
            let Query = "PRODUCT_ID=" + " " + ArrayProductDetail + " " + "OR" + " ";
            QueryTextArray.push(Query);
        } else {
            let ArrayProductDetail = MakeArray[i];
            let Query = " " + ArrayProductDetail + " " + "OR" + " ";
            QueryTextArray.push(Query);
        }
    }
    for (let i = 0; i < QueryTextArray.length; i++) {
        QueryText += QueryTextArray[i];
    }
    return QueryText;
}
//ส่ง text from "1,2,3,4" มาแปลงเป็น Array
function ConvertToArray(Data) {
    let TextDetail = Data; //รับ Detail_Product_id;
    const MakeArray = TextDetail.split(",");
    let AnsArray = [];
    for (let i = 0; i < MakeArray.length; i++) {
        let getAns = MakeArray[i];
        Number(getAns);
        AnsArray.push(getAns);
    }
    return AnsArray;
}

module.exports = { ConvertToDetailProductQuery, ConvertToArray };