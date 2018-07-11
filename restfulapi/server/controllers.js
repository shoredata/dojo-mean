import { Tasks } from "./models";

function readAll(req, res) {
    Tasks.find({})
        .then(data=>res.json(data))
        .catch(errs=>res.json(errs));
}

module.exports = { readAll };