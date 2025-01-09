const fs = require("fs");
const axios = require('axios');
const cron = require('node-cron');
const client  = require('cheerio-httpcli');
const moment = require('moment');
const TOP_PICKS_RSS_URL = "https://news.yahoo.co.jp/rss/topics/top-picks.xml";
const DOMESTIC_RSS_URL = "https://news.yahoo.co.jp/rss/topics/domestic.xml";
const WORLD_RSS_URL = "https://news.yahoo.co.jp/rss/topics/world.xml";
const BUSINESS_RSS_URL = "https://news.yahoo.co.jp/rss/topics/business.xml";
const ENTERTAINMENT_RSS_URL = "https://news.yahoo.co.jp/rss/topics/entertainment.xml";
const SPORTS_RSS_URL = "https://news.yahoo.co.jp/rss/topics/sports.xml";
const IT_RSS_URL = "https://news.yahoo.co.jp/rss/topics/it.xml";
const SCIENCE_RSS_URL = "https://news.yahoo.co.jp/rss/topics/science.xml";
const sleep = msec => new Promise(resolve => setTimeout(resolve, msec));
let news_list = [];

const saveLog = () => {
  fs.writeFileSync(
    './news_log.json',
    JSON.stringify(news_list),
    'utf8'
  );
}
const loadLog = () => {
  try {
    const news_data = fs.readFileSync('./news_log.json', 'utf8');
    news_list = JSON.parse(news_data);
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
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - 主要');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - 主要');
        //if(title.match(/LINE/)) post('https://discord.com/api/webhooks/826046963555500032/Q5zu7NBLjJcQ-8o3x_Dl5LWqQ8a3L5ss1itA_9GQ-gaV6zd4TP51yjIhNTIf-jrDR_k3', msg);
        sleep(1000);
      }
    });
  });

  console.log('国内')
  client.fetch(DOMESTIC_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - 国内');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - 国内');
        sleep(1000);
      }
    });
  });

  console.log('国際')
  client.fetch(WORLD_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - 国際');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - 国際');
        sleep(1000);
      }
    });
  });

  console.log('経済')
  client.fetch(BUSINESS_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - 経済');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - 経済');
        sleep(1000);
      }
    });
  });

  console.log('エンタメ')
  client.fetch(ENTERTAINMENT_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - エンタメ');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - エンタメ');
        sleep(1000);
      }
    });
  });

  console.log('スポーツ')
  client.fetch(SPORTS_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - スポーツ');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - スポーツ');
        sleep(1000);
      }
    });
  });

  console.log('IT')
  client.fetch(IT_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - IT');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - IT');
        sleep(1000);
      }
    });
  });

  console.log('科学')
  client.fetch(SCIENCE_RSS_URL, {}, function(err, $, res, body){
    if(err){console.log("error");return}
    $("item").each(function(){
      const id = $(this).children("link").text().split('/')[4].split('?')[0];
      if(news_list.indexOf(id) <= -1){
        const title = $(this).children("title").text();
        const link = $(this).children("link").text();
        const date = moment(new Date($(this).children("pubDate").text())).format("YYYY/MM/DD HH:mm");
        console.log(`-----------------------------------------------`);
        console.log(`ID    : ${id}`);
        console.log(`title : ${title}`);
        console.log(`date  : ${date}`)
        console.log(`link  : ${link}`);
        console.log(`-----------------------------------------------`);
        news_list.push(id);
        const msg  = `-----------------------------------------------\nID    : ${id}\ntitle : ${title}\ndate : ${date}\nlink  : <${link}>\n-----------------------------------------------`;
        post('https://discordapp.com/api/webhooks/734646961579491358/bMaJ87SlzY8u_x7Y660Iax7QbQdOXTbqKYN1m_WB05GE4_3kTf9r_WVyilhS8-7K9FYa', msg, 'Yahoo! News Pickup - 科学');
        post('https://discordapp.com/api/webhooks/734734649896599552/59QG3-l2nYMDpzEM4smbLd_ZO1mpl2m8ntkCjOXOmqugQ40pcBZA_q-8VQKzQNWD8WNw', msg, 'Yahoo! News Pickup - 科学');
        sleep(1000);
      }
    });
  });
  saveLog();
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
