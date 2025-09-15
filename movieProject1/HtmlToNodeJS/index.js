import express from 'express';
const app = express()

const port = 5040

app.use(express.urlencoded({extended:true}))
app.set('view engine','ejs')


app.get('/',(req,res)=>{
    return res.render('form')
})

app.post("/submit", (req, res) => {
  const { username, email } = req.body;

  res.send(`
    <h1>Form Submitted</h1>
    <p>Name: ${username}</p>
    <p>Email: ${email}</p>
  `);
});

app.listen(port,(err)=>{
    !err?
        console.log(`Server start on port ${port}`)
        :null;        
})