var express = require('express');
const queen_controller = require('../controllers/queen');
var router = express.Router();

/* GET home page. */
/*
router.get('/', function(req, res, next) {
  res.render('queens', { title: 'Search Results' });
});
*/
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  req.session.returnTo = req.originalUrl;
  res.redirect("/login");
}

/* GET costumes */
router.get('/', queen_controller.queen_view_all_Page );
/* GET detail queen page */
router.get('/detail', queen_controller.queen_view_one_Page);
/* GET create queen page */
router.get('/create', secured, queen_controller.queen_create_Page);
/* GET create update page */
router.get('/update', secured, queen_controller.queen_update_Page);
/* GET delete queen page */
router.get('/delete', secured, queen_controller.queen_delete_Page);

module.exports = router;
