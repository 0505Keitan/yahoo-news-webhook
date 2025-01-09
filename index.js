const fs = require("fs");
const axios = require('axios');
const cron = require('node-cron');
const client  = require('cheerio-httpcli');
const moment = require('moment');
const TOP_PICKS_RSS_URL = "https://news.yahoo.co.jp/rss/topics/top-picks.xml";
const IT_RSS_URL = "https://news.yahoo.co.jp/rss/topics/it.xml";
const ENTERTAINMENT_RSS_URL = "https://news.yahoo.co.jp/rss/topics/entertainment.xml";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
let top_list = [];
let it_list = [];
let entertainment_list = [];

const saveLog = () => {
  fs.writeFileSync(
    './top-picks_log.json',
    JSON.stringify(top_list),
    'utf8'
  );
  fs.writeFileSync(
    './it_log.json',
    JSON.stringify(it_list),
    'utf8'
  );
  fs.writeFileSync(
    './entertainment_log.json',
    JSON.stringify(entertainment_list),
    'utf8'
  );
}
const loadLog = () => {
  try {
    const top_data = fs.readFileSync('./top-picks_log.json', 'utf8');
    top_list = JSON.parse(top_data);
  } catch (e) {
    console.log('loadLog Error:');
    console.log(e);
    console.log('空のLogを利用します');
  }
  try {
    const it_data = fs.readFileSync('./it_log.json', 'utf8');
    it_list = JSON.parse(it_data);
  } catch (e) {
    console.log('loadLog Error:');
    console.log(e);
    console.log('空のLogを利用します');
  }
  try {
    const entertainment_data = fs.readFileSync('./entertainment_log.json', 'utf8');
    entertainment_list = JSON.parse(entertainment_data);
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
  console.log('主要')
  client.fetch(TOP_PICKS_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(top_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        top_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup');
        //if(title.match(/LINE/)) post('https://discord.com/api/webhooks/826046963555500032/Q5zu7NBLjJcQ-8o3x_Dl5LWqQ8a3L5ss1itA_9GQ-gaV6zd4TP51yjIhNTIf-jrDR_k3', msg);
        sleep(1000);
        saveLog();
      }
    });
  });

  console.log('IT')
  client.fetch(IT_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(it_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        it_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - IT');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - IT');
        //if(title.match(/LINE/)) post('https://discord.com/api/webhooks/826046963555500032/Q5zu7NBLjJcQ-8o3x_Dl5LWqQ8a3L5ss1itA_9GQ-gaV6zd4TP51yjIhNTIf-jrDR_k3', msg);
        sleep(1000);
        saveLog();
      }
    });
  });

  console.log('エンタメ')
  client.fetch(ENTERTAINMENT_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(entertainment_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        entertainment_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - エンタメ');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - エンタメ');
        //if(title.match(/LINE/)) post('https://discord.com/api/webhooks/826046963555500032/Q5zu7NBLjJcQ-8o3x_Dl5LWqQ8a3L5ss1itA_9GQ-gaV6zd4TP51yjIhNTIf-jrDR_k3', msg);
        sleep(1000);
        saveLog();
      }
    });
  });
}

const post = (URL, MSG, USERNAME) => {
  const postData = {
    avatar_url: "https://pbs.twimg.com/profile_images/875506779743895552/jqN_tEe4_400x400.jpg",
    username: USERNAME,
    content: MSG
  }
  axios.post(URL, postData, {
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json',
    }
  });
}
