var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var queen_controller = require('../controllers/queen');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// queen ROUTES ///
// POST request for creating a queen.
router.post('/queens', queen_controller.queen_create_post);
// DELETE request to delete queen.
router.delete('/queens/:id', queen_controller.queen_delete);
// PUT request to update queen.
router.put('/queens/:id', queen_controller.queen_update_put);
// GET request for one queen.
router.get('/queens/:id', queen_controller.queen_detail);
// GET request for list of all queen items.
router.get('/queens', queen_controller.queen_list);
module.exports = router;
