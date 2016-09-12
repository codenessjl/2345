/**
 * Created by jianglei on 2016-08-10.
 */
"use strict";
const Horseman = require('node-horseman');
class Computer {
    constructor(options) {
        this.userAgent = options.userAgent;
        this.url = options.url;
        this.id = options.id;
        this.width = options.width;
        this.height = options.height;
        this.cookieFile = options.cookieFile;
        this.horseman = new Horseman({
            cookiesFile: this.cookieFile,
            switchToNewTab: "true",
            timeout: 50000,
            loadImages: false,
        });
    }

    ClickUrl(domain) {
        let num = Math.round(Math.random() * 1500 + 300) * 1000;//5分钟~30分钟延时
        this.horseman = this.horseman

            .switchToTab(0)
            .click(`[href='http://${domain}']`)
            .log(`[${this.id}]点击访问[${domain}]完成等待${num / 1000}秒...`);
        return this.horseman;
    }

    ClickBlank() {
        let x = Math.round(Math.random() * this.width), y = Math.round(Math.random() * this.height);
        this.horseman = this.horseman.mouseEvent('click', x, y);
        return this.horseman;
    }

    ScrollTo() {
        let x = Math.round(Math.random() * this.width), y = Math.round(Math.random() * this.height);
        this.horseman = this.horseman.switchToTab(0)
            .scrollTo(x, y)
            .wait(2000)
            .scrollTo(0, 0);
        return this.horseman;
    }

    BaiduSearchAction(word) {
        let num = Math.round(Math.random() * 1500 + 300) * 1000;//5分钟~30分钟延时
        this.horseman = this.horseman.switchToTab(0)
            .clear('span.sch_inbox input')
            .log(`[${this.id}]百度访问[${word}]...`)
            .type('span.sch_inbox input', word)
            .keyboardEvent('keypress', 16777221)
            .log(`[${this.id}]百度访问[${word}]完成等待${num / 1000}秒...`)
            .wait(num)
            .log(`[${this.id}]等待完成,继续执行...`);
        return this.horseman;
    }

    Start(words) {

        let delay = Math.round(Math.random() * 1500 + 300) * 1000,
            num = Math.round(Math.random() * 10);//5分钟~30分钟延时
        this.horseman = this.horseman
            .userAgent(this.userAgent)
            .log(`[${this.id}][Action${num}]${delay / 1000}秒后开始访问[${this.url}]...`)
            .wait(delay)
            .log(`[${this.id}]等待完成,继续执行...`)
            .open(this.url)
            .log(`[${this.id}][${this.url}]访问完成,等待${delay / 1000}秒后继续执行...`)
            .wait(delay)
            .log(`[${this.id}]等待完成,继续执行...`)
            .viewport(this.width, this.height);
        switch (num) {
            case 1:
                this.Action1(words);
                break;
            case 2:
                this.Action2();
                break;
            case 3:
                this.Action3();
                break;
            case 4:
                this.Action4(words);
                break;
            case 5:
                this.Action5(words);
                break;
            case 6:
                this.Action6();
                break;
            case 7:
                this.Action7();
                break;
            case 8:
                this.Action8();
                break;
            case 9:
                this.Action9();
                break;
            default:
                break;
        }
    }

    End() {
        this.horseman.log(`[${this.id}]${new Date()}暂停等待下一次轮询...`).close();
		
    }

    Action1(words) {
        this.horseman
            .then(function () {
                this.ClickBlank().then(function () {
                    this.ScrollTo().then(function () {
                        this.ClickUrl("www.163.com").then(function () {
                            this.BaiduSearchAction(words[Math.round(Math.random() * words.length) - 1]).then(function () {
                                this.BaiduSearchAction(words[Math.round(Math.random() * words.length) - 1]).then(function () {
                                    this.BaiduSearchAction(words[Math.round(Math.random() * words.length) - 1]).then(function () {
                                        this.End();
                                    }.bind(this));
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
    }

    Action2() {
        this.horseman
            .then(function () {
                this.ClickBlank().then(function () {
                    this.ScrollTo().then(function () {
                        this.End();
                    }.bind(this));
                }.bind(this));
            }.bind(this));
    }

    Action3() {
        this.horseman
            .then(function () {
                this.ClickBlank().then(function () {
                    this.ScrollTo().then(function () {
                        this.ClickUrl("www.163.com").then(function () {
                            this.End();
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
    }

    Action4(words) {
        this.horseman
            .then(function () {
                this.ClickBlank().then(function () {
                    this.ScrollTo().then(function () {
                        this.ClickUrl("www.163.com").then(function () {
                            this.BaiduSearchAction(words[Math.round(Math.random() * words.length) - 1]).then(function () {
                                this.End();
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
    }

    Action5(words) {
        this.horseman
            .then(function () {
                this.ClickBlank().then(function () {
                    this.ScrollTo().then(function () {
                        this.ClickUrl("www.163.com").then(function () {
                            this.BaiduSearchAction(words[Math.round(Math.random() * words.length) - 1]).then(function () {
                                this.BaiduSearchAction(words[Math.round(Math.random() * words.length) - 1]).then(function () {
                                    this.End();
                                }.bind(this));
                            }.bind(this));
                        }.bind(this));
                    }.bind(this));
                }.bind(this));
            }.bind(this));
    }

    Action6() {
        this.horseman
            .then(function () {
                this.End();
            }.bind(this));
    }

    Action7() {
        this.horseman
            .then(function () {
                this.ClickBlank().then(function () {
                    this.End();
                }.bind(this));
            }.bind(this));
    }

    Action8() {
        this.horseman
            .then(function () {
                this.End();
            }.bind(this));
    }

    Action9() {
        this.horseman
            .reload()
            .then(function () {
                this.End();
            }.bind(this));
    }
}
module.exports = Computer;