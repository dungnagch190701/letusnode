
const {ObjectId,MongoClient} = require('mongodb');
const url = 'mongodb://localhost:27017'
// const url = 'mongodb+srv://dungna0912:naz69abc@cluster0.vuqmk.mongodb.net/test'
const DATABASE_NAME = 'GCH0803DB'
async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function searchProduct(searchInput) {
    const dbo = await getDB();
    const allStudents = await dbo.collection("products").find({ name: searchInput }).toArray();
    return allStudents;
}

async function deleteProduct(deleteInput) {
    const dbo = await getDB();
    return dbo.collection("products").deleteOne({ _id: ObjectId(deleteInput) });
}

async function insertProduct(newproduct) {
    const dbo = await getDB();
    await dbo.collection('products').insertOne(newproduct);
}

async function editProduct(editInput) {
    const dbo = await getDB();
    return dbo.collection("products").findOne({ _id: ObjectId(editInput) });
}

async function updateProduct(id,nameInput,priceInput,picture) {
    const dbo = await getDB();
    dbo.collection("products").updateOne({_id:ObjectId(id)},{$set:{name:nameInput,price:priceInput,picture:picture}})
}


module.exports = {getDB,searchProduct,deleteProduct,insertProduct,editProduct,updateProduct}