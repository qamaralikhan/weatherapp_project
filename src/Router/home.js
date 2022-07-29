const { render } = require('ejs');
const axios = require('axios');
let express = require('express');
let homeRouter = express.Router();
let math = require('math')
let apiManager=require('../Helper/apiManager')

homeRouter.route('/')
            .get(async(req,res)=>{
                
                var apiResponse = await apiManager.getCurrentLocationWeather("Flower Mound") 
                
                weatherData = {
                    city :"Flower Mound",
                    weather: apiResponse.weather[0].main,
                    icon : `http://openweathermap.org/img/wn/${apiResponse.weather[0].icon}.png`,
                    temp : apiResponse.main.temp
                }         
                var newsResponse = await apiManager.NewFeed();             
                var uiData = {
                                localWeather:weatherData,  
                                newsData:newsResponse                              
                              }                  
                
               // console.log(newsResponse)
                res.render('Home',{uiInfo:uiData})
})

module.exports = homeRouter