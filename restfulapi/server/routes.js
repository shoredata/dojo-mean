import { readAll } from "./controllers";

// get = "/api/tasks" readAll
const readAll = require("body-parser");

function router(app) {
    app.use(bp.json())
    applicationCache.get("/api/tasks", readAll);
}

module.exports = { router };