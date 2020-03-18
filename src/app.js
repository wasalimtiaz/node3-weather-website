const path=require('path')
const express= require('express')
const hbs=require('hbs')
const forecast=require('./utils/forecast')
const geocode=require('./utils/geocode')


// static call for index.html

const app=express()

// Define paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath= path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req,res)=>{
   res.render('index',{
       title:'Weather',
       name:'Wasal Imtiaz'
   })
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Wasal Imtiaz'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
        helptext:'This is some hopeful text',
        title:'Help',
        name:'Wasal Imtiaz'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send(
            {
                error:"you must add address."
            })
            }


            geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
                if(error){
                    return res.send({error})
                }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({error})
                }

                res.send({
                    forecast:forecastData,
                    location,
                    address:req.query.address
                })

            })

            })

    // res.send({
    //     forescast:'It is Snowing',
    //     location:'Philadelphia',
    //     address:req.query.addresskk
    // })
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
return res.send(
    {
        error:"you must provide some search term."
    })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404 Page',
        name:'Muhammad Wasal Imtiaz',
        errorMessage:'Help article not found.'
   })
})

app.get('*',(req,res)=>{

res.render('404',{
     title:'404 Page',
     name:'Muhammad Wasal Imtiaz',
     errorMessage:'Page not found.'
})
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.')
})