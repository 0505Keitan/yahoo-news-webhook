const fs = require("fs");
const axios = require('axios');
const cron = require('node-cron');
const client  = require('cheerio-httpcli');
const moment = require('moment');
const RSS_URL = "http://news.yahoo.co.jp/pickup/rss.xml";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
const logFileName = './log.json'
let list = [];

const saveLog = () => {
  fs.writeFileSync(
    logFileName,
    JSON.stringify(list),
    'utf8'
  );
}
const loadLog = () => {
  try {
    const data = fs.readFileSync(logFileName, 'utf8');
    list = JSON.parse(data);
  } catch (e) {
    console.log('loadLog Error:');
    console.log(e);
    console.log('空のLogを利用します');
  }
}

/*
  ┌────────────── second (optional)
  │ ┌──────────── minute
  │ │ ┌────────── hour
  │ │ │ ┌──────── day of month
  │ │ │ │ ┌────── month
  │ │ │ │ │ ┌──── day of week
  │ │ │ │ │ │
  │ │ │ │ │ │
  * * * * * *
  cronについて
*/

// 1分に一回
cron.schedule('0 */1 * * * *', () => getNews());
console.log('<< Yahoo! topics >>');

const getNews = () => {
  loadLog();
  client.fetch(RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children('guid').text().split('/')[3]
      if(list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('DISCORD_WEBHOOK', msg);
        list.push(id);
        saveLog();
        sleep(1000);
      }
    });
  });
}

const post = (URL, MSG) => {
  const postData = {
    avatar_url: "https://pbs.twimg.com/profile_images/875506779743895552/jqN_tEe4_400x400.jpg",
    username: 'Yahoo! News Pickup',
    content: MSG
  }
  axios.post(URL, postData, {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    }
  });
}