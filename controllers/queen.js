var Queen = require('../models/queen');
// List of all queens
exports.queen_list = async function (req, res) {
    try {
        theQueens = await Queen.find();
        res.send(theQueens);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// for a specific queen.
exports.queen_detail = async function (req, res) {
    console.log("detail" + req.params.id)
    try {
        result = await Queen.findById(req.params.id)
        res.send(result)
    } catch (error) {
        res.status(500)
        res.send(`{"error": document for id ${req.params.id} not found`);
    }
};
// Handle Queen create on POST.
exports.queen_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Queen();
    // We are looking for a body, since POST does not have query parameters.
    // Even though bodies can be in many different formats, we will be picky
    // and require that it be a json object
    // {"queen_name":"Mustang GT", "queen_country":"Lucid Red Pearl", "networth":37000}
    document.queen_name = req.body.queen_name;
    document.networth = req.body.networth;
    document.queen_country = req.body.queen_country;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};
// Handle queen delete form on DELETE.
exports.queen_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Queen.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle queen update form on PUT.
exports.queen_update_put = async function (req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
        let toUpdate = await Queen.findById(req.params.id)
        // Do updates of properties
        if (req.body.queen_name) toUpdate.queen_name = req.body.queen_name;
        if (req.body.networth) toUpdate.networth = req.body.networth;
        if (req.body.queen_country) toUpdate.queen_country = req.body.queen_country;
        let result = await toUpdate.save();
        console.log("Sucess " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

// VIEWS
// Handle a show all view
exports.queen_view_all_Page = async function (req, res) {
    try {
        theQueens = await Queen.find();
        res.render('queens', { title: 'Queen Search Results', results: theQueens });
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};

// Handle a show one view with id specified by query
exports.queen_view_one_Page = async function (req, res) {
    console.log("single view for id " + req.query.id)
    try {
        result = await Queen.findById(req.query.id)
        res.render('queendetail',
            { title: 'Queen Detail', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle building the view for creating a queen.
// No body, no in path parameter, no query.
// Does not need to be async
exports.queen_create_Page = function (req, res) {
    console.log("create view")
    try {
        res.render('queencreate', { title: 'Queen Create' });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};
// Handle building the view for updating a queen.
// query provides the id
exports.queen_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id)
    try {
        let result = await Queen.findById(req.query.id)
        res.render('queenupdate', { title: 'Queen Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

// Handle a delete one view with id from query
exports.queen_delete_Page = async function (req, res) {
    console.log("Delete view for id " + req.query.id)
    try {
        result = await Queen.findById(req.query.id)
        res.render('queendelete', {title: 'Queen Delete', toShow: result});
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};