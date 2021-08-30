const express = require('express')
const app = express();
const {getCurrentDate} = require('./Utils')
const {Int32} = require('mongodb');
const { getDB,searchProduct,deleteProduct,editProduct,updateProduct, insertProduct } = require('./databaseHandler');


app.use(express.urlencoded({extended:true}))
app.set('view engine','hbs')


app.get('/',async (req,res)=>{
    const dbo = await getDB();
    const allProducts = await dbo.collection('products').find({}).toArray()
    res.render('trangchu',{data:allProducts})
})

// app.get('/about',(req,res)=>{
//     res.setHeader('Content-Type','text/html')
//     res.end('About page');
// })

// app.post('/survey',(req,res)=>{
//     const nameInput = req.body.txtName;
//     const jobInput = req.body.Job;
//     res.render('survey',{name:nameInput,job:jobInput,now:getCurrentDate()})
 
// })

app.post('/insert',async (req,res)=>{
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const picture = req.body.picture;
    var err = {}
    var isErr = false;
    if(nameInput=="")
    {
        err.name='Nhap lai ten';
        isErr = true;

    }
    if(priceInput=="")
    {
        err.tuoi = 'Nhap lai gia'
        isErr=true;
    }
    if(isErr){
        dbo = await getDB()
        const allProducts = await dbo.collection('products').find({}).toArray()
        res.render('trangchu',{error:err,data:allProducts})
    }
    else{
        const newproduct = {name:nameInput,price:Int32(priceInput),picture:picture}
        await insertProduct(newproduct);
        res.redirect('/')
    }


})

app.post('/search',async (req,res)=>{
    const searchInput = req.body.txtSearch;
    const allProducts = await searchProduct(searchInput);
    res.render('trangchu',{data:allProducts});


})

app.get('/delete',async(req,res)=>{
    const deleteInput = req.query.id;
    await deleteProduct(deleteInput);
    res.redirect('/')

})

app.get('/edit',async(req,res)=>{
    const editInput = req.query.id;
    const edit = await editProduct(editInput)
    res.render('edit',{product:edit})



})

app.post('/update',async (req,res)=>{
    const id = req.body.id;
    const nameInput = req.body.txtName;
    const priceInput = req.body.txtPrice;
    const picture = req.body.picture;
    await updateProduct(id,nameInput,priceInput,picture);
    res.redirect('/');
})



const PORT = process.env.PORT || 5000
app.listen(PORT);
console.log('Server is running at ',PORT)








