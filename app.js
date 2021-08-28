const express = require('express')
const app = express();
const {getCurrentDate} = require('./Utils')
const {Int32} = require('mongodb');
const { getDB,searchStudent,deleteStudent,insertStudent,editStudent,updateStudent } = require('./databaseHandler');


app.use(express.urlencoded({extended:true}))
app.set('view engine','hbs')


app.get('/',async (req,res)=>{
    const dbo = await getDB();
    const allStudents = await dbo.collection('students').find({}).toArray()
    res.render('trangchu',{data:allStudents})
})

app.get('/about',(req,res)=>{
    res.setHeader('Content-Type','text/html')
    res.end('About page');
})

app.post('/survey',(req,res)=>{
    const nameInput = req.body.txtName;
    const jobInput = req.body.Job;
    res.render('survey',{name:nameInput,job:jobInput,now:getCurrentDate()})
 
})

app.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    const picture = req.body.picture;
    const newstudent = {name:nameInput,tuoi:Int32(tuoiInput),picture:picture}
    await insertStudent(newstudent);
    res.redirect('/')
    
})

app.post('/search',async (req,res)=>{
    const searchInput = req.body.txtSearch;
    const allStudents = await searchStudent(searchInput);
    res.render('trangchu',{data:allStudents});


})

app.get('/delete',async(req,res)=>{
    const deleteInput = req.query.id;
    await deleteStudent(deleteInput);
    res.redirect('/')

})

app.get('/edit',async(req,res)=>{
    const editInput = req.query.id;
    const edit = await editStudent(editInput)
    res.render('edit',{student:edit})



})

app.post('/update',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const tuoiInput = req.body.txtTuoi;
    await updateStudent(id,nameInput,tuoiInput);
    res.redirect('/');
})


const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log('Server is running at ',PORT)








