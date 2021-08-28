
const {ObjectId,MongoClient} = require('mongodb');
// const url = 'mongodb://localhost:27017'
const url = 'mongodb+srv://dungna0912:naz69abc@cluster0.vuqmk.mongodb.net/test'
const DATABASE_NAME = 'GCH0803DB'
async function getDB() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}

async function searchStudent(searchInput) {
    const dbo = await getDB();
    const allStudents = await dbo.collection("students").find({ name: searchInput }).toArray();
    return allStudents;
}

async function deleteStudent(deleteInput) {
    const dbo = await getDB();
    return dbo.collection("students").deleteOne({ _id: ObjectId(deleteInput) });
}

async function insertStudent(newstudent) {
    const dbo = await getDB();
    await dbo.collection('students').insertOne(newstudent);
}

async function editStudent(editInput) {
    const dbo = await getDB();
    return dbo.collection("students").findOne({ _id: ObjectId(editInput) });
}

async function updateStudent(id,nameInput,tuoiInput) {
    const dbo = await getDB();
    dbo.collection("students").updateOne({_id:ObjectId(id)},{$set:{name:nameInput,tuoi:tuoiInput}})
}


module.exports = {getDB,searchStudent,deleteStudent,insertStudent,editStudent,updateStudent}