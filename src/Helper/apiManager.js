const axios = require('axios');
let dotenv = require('dotenv');
let _ = require('underscore')
dotenv.config()

async function  getCurrentLocationWeather(city)
{
    url = `${process.env.URL}weather?q=${city}&appid=${process.env.APIKEY}&units=metric`
   
     var resp =  await axios.get(url);
    
  
     return resp.data;
}


async function  NewFeed()
{   
    url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=7b39f7a3313e4d499e21bf8eb2678fd1"
    newsCollection = []
    newsObject = {author:'',title:'',description:'',urlToImage:''}
    var resp =  await axios.get(url).catch((error)=>{
        console.log('Error from NewsFeed URL')
    });
    
    var newsObj = resp.data.articles[0];
    var topThree = _.toArray(resp.data.articles).slice(4,7);// Take 3 array

    _.each(topThree,function(article) {
         let news = {                        
                        author:article.author,
                        title:article.title,
                        description:article.description,
                        urlToImage:article.urlToImage,   
                        articleUrl:article.url,
                        content: article.content

                    }   
        newsCollection.push(news);       
    })
    return topThree;
}

module.exports = {getCurrentLocationWeather , NewFeed};