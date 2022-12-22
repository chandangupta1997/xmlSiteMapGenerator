


const express = require("express")
const fs = require("fs")

const app  =express()

const bodyParser =require('body-parser')
const SitemapGenerator = require('sitemap-generator');

app.set('view engine','ejs')


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


app.listen(3000,function(req,res){
    console.log("server is running om port 3000")
})


app.get('/test', function(req,res){
    res.send(" app is working  ")
})

app.get('/',(req,res)=>{
    res.render('xmlsitemapgenerator')


    
})


app.post('/form',(req,res)=>{

    let outputFile=Date.now()+"output.xml"



    let url  =req.body.url
    console.log(url)
    // create generator
const generator = SitemapGenerator(url, {
    stripQuerystring: false,
    filepath:outputFile
  });
   
  // register event listeners
  generator.on('done', () => {
    // sitemaps created

    res.download(outputFile,(err)=>{
        if (err){
            res.send(err)
             fs.unlinkSync(outputFile)
        }
        fs.unlinkSync(outputFile)
    })
  });
   
  // start the crawler
  generator.start();

})

