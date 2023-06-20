const path = require('path')

const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const hbs = require('hbs')
const { runInNewContext } = require('vm')
const app = express()
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.use(express.static(publicDirPath))

app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.get('',(req, res)=>{
    res.render('index',{
        title:'weather',
        name:'meet'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'meet jadhav'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        message:'this is a help message',
        name:'meet jadhav'
    })
})


app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        message:"help page not found",
        name:'meet jadhav'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"address was not provided"
        })
    }
    geocode(req.query.address,(error,{lattitude,longitude,location}={})=>{
        if (error){
            return res.send({
                error
            })
        }
        forecast(longitude, lattitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error
                })
            }
            
            res.send({
                location,
                forecast:forecastData,
                
            })
          })
    })
    
})


app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        message:"page not found",
        name:'meet jadhav'
    })
})
app.listen(3000,()=>{
    console.log('running')
})