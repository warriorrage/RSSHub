const got = require('@/utils/got');
const cheerio = require('cheerio');

module.exports = async (ctx) => {
    const response = await got({
        method: 'get',
        url: 'https://sichuan.scol.com.cn/ggxw/',
    });

    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('div.page_left > ul > li');
    const itemPicUrl = 'https://sichuan.scol.com.cn/images/2013scol.jpg';

    ctx.state.data = {
        title: '四川日报-滚动新闻',
        link: 'https://sichuan.scol.com.cn/ggxw/',
        item:
            list &&
            list
                .map((index, item) => {
                    item = $(item);
                    return {
                        title: item.find('h1').text(),
                        description: item.find('i').text(),
                        link: item.find('a').attr('href'),
                    };
                })
                .get(),
    };
};
