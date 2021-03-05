const vlog = require('../models/vlog');

class RootController {
    static async root(req, res) {
        const entries = await vlog.getAllVlogs();
        res.render('index', {
            entries
        });
    }
}

module.exports = RootController;
