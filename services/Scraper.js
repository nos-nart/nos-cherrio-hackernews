var request = require('request');
var cheerio = require('cheerio');

class Scraper {
  getHTML(url) {
    return new Promise((resolve, reject) => {
      request.get(url, (error, _, body) => {
        if (error) return reject(error);
        resolve(cheerio.load(body));
      });
    });
  }

  async getNews() {
    const $ = await this.getHTML('https://news.ycombinator.com/');
    var res = [];
    $('span.comhead').each(function(i, element) {
      var ref = $(this).text();
      var a = $(this).prev();
      var title = a.text();
      var rank = a.parent().parent().text();
      var url = a.attr('href');
      var subtext = a.parent().parent().next().children('.subtext').children();
      var points = $(subtext).eq(0).text();
      var username = $(subtext).eq(1).text();
      var comments = $(subtext).eq(2).text();

      var metadata = {
        ref: ref,
        rank: parseInt(rank),
        title: title,
        url: url,
        points: parseInt(points),
        username: username,
        comments: parseInt(comments)
      };
      res = [...res, metadata];
    })
    return res;
  }
}

module.exports = Scraper;
