var express = require('express');
var router = express.Router();
var apicache = require('apicache');
var Scraper = require('./services/Scraper');

var scraper = new Scraper();
var cache = apicache.middleware;

// JSON.stringify(obj, null, 2)
router.get('/', cache('1 hour'), async (req, res, next) => {
    const data = await scraper.getNews();
    res.render('pages/index', {
        news: data
    })
})

module.exports = router;
