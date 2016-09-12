"use strict";
let Segment = require('segment');
const schedule = require('node-schedule');
let request = require('request');
let Computer = require('./class/Computer.js');
const Browsers = require("./class/Browser");
class Codeness {
    constructor() {
        this.computers = [];
        this.segment = new Segment();
        this.segment.useDefault();
    }

    Init(key) {
        //加载现有slaves
        require('getmac').getMac(function (err, macAddress) {
            if (err)  throw err;
            Browsers.forEach((browser)=> {
                this.computers.push(new Computer({
                    id: browser.id,
                    cookieFile: `cookies/${macAddress}/${key}/${browser.id}.txt`,
                    width: browser.width,
                    height: browser.height,
                    userAgent: browser.userAgent,
                    url: `http://www.2345.com?${key}`
                }));
            });
        }.bind(this))
    }

    Start(proportion) {
        let ruleDay = new schedule.RecurrenceRule();
        ruleDay.dayOfWeek = [0, new schedule.Range(1, 6)];
        ruleDay.hour = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];//执行时间不能交叉，否则会出现phantomjs挂掉的情况。
        //ruleDay.hour = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22];//执行时间不能交叉，否则会出现phantomjs挂掉的情况。
        //ruleDay.hour = [8, 10, 12, 14, 16, 18];//执行时间不能交叉，否则会出现phantomjs挂掉的情况。
        ruleDay.minute = new Date().getMinutes();
        ruleDay.second = new Date().getSeconds() + 5;
        let i = schedule.scheduleJob(ruleDay, function () {
            request('http://news.baidu.com/n?m=rddata&v=hot_word', function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let sentences = Array.from(JSON.parse(body).data, x=>x.query_word).filter(x=>x != undefined);
                    // let words = sentences.map(x=> ((x) => {
                    //     let words = this.segment.doSegment(x, {
                    //         simple: true,
                    //         stripPunctuation: true
                    //     }).filter(x=>x.length > 1);
                    //     let randomValue = Math.round(Math.random() * words.length);
                    //     let wordString;
                    //     if (randomValue >= 2) {
                    //         wordString = words[randomValue - 2] + words[randomValue - 1];
                    //     } else {
                    //         wordString = words[0] + words[1];
                    //     }
                    //     return wordString;
                    // })(x));
                    console.log(`${new Date()}关键词获取成功,计划任务开始启动...`);
                    this.computers.filter(x=>Math.random() < proportion).map(x=>x.Start(sentences));
                }
            }.bind(this));
        }.bind(this));
    }
}

module.exports = new Codeness();

