const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'http://news.chengdu.cn/xwsy/bd/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('div.main-fl.bef > ul > li');
    const itemPicUrl = 'http://img.chengdu.cn/templates/chengdu/i19/images/logo_cdtt.png';

    ctx.state.data = {
        title: '成都新闻-本地',
        link: 'http://news.chengdu.cn/xwsy/bd/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('a').text(),
                        description: item.find('span').text(),
                        link: item.find('a').attr('href'),
                    };
                })
                .get(),
    };
};
