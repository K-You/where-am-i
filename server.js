const app = require("express")();
const port = process.env.port || 3000;
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


let routes = require("./api/routes/locationRoutes");
routes(app);
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});


app.listen(port);
