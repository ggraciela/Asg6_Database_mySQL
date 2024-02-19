// node

// REQUIRES
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");

//mapping file system paths to the app's virtual paths
app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));
app.use("/font", express.static("./public/font"));  

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/index.html", "utf8");
    res.send(doc);
});







app.get("/moreinfo", function (req, res) {

    let formatOfResponse = req.query["format"]; 
    if (formatOfResponse == "html") {
        // MIME type
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/moreinfo3quebec.html", "utf8"));

    } else {
        // just send JSON message
        res.send({ status: "fail", msg: "Wrong format!" });
    }
});


app.get("/moreinformation", function (req, res) {

    let formatOfResponse = req.query["format"]; 
    if (formatOfResponse == "html") {
        // MIME type
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/moreinfo4cntower.html", "utf8"));

    } else {
        // just send JSON message
        res.send({ status: "fail", msg: "Wrong format!" });
    }
});



app.get("/moreinfojs", function (req, res) {

    let doc = fs.readFileSync("./app/data/moreinfo1niagara.js", "utf8");
    res.setHeader("Content-Type", "application/json");
    // just send the text stream
    res.send(doc);
});

app.get("/moreinfojstoo", function (req, res) {

    let doc = fs.readFileSync("./app/data/moreinfo2whistler.js", "utf8");
    res.setHeader("Content-Type", "application/json");
    // just send the text stream
    res.send(doc);
});


app.get("/table-async", function (req, res) {

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        // 127.0.0.1
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment6"
    });
    let myResults = null;
    connection.connect();
    // this could be from the req.body.user
    let usr = "ggraciela";
    let pwd = "threeTierWebpage";
    connection.execute(
        "SELECT * FROM a01304196_user WHERE a01304196_user.user_name = ? AND a01304196_user.password = ?",
        [usr, pwd],
        function (error, results, fields) {
            // results is an array of records, in JSON format
            // fields contains extra meta data about results
            console.log("results:", results);
            //console.log("Results from DB", results, "and the # of records returned", results.length);
            // hmm, what's this?
            myResults = results;
            if (error) {
                // in production, you'd really want to send an email to admin
                // or in the very least, log it. But for now, just console
                console.log(error);
            }
            // let's get the data but output it as an HTML table
            let table = "<table><tr><th>User Name</th><th>First Name</th><th>Last Name</th><th>Email</th></tr>";
            for (let i = 0; i < results.length; i++) {
                table += "<tr><td>" + results[i].user_name + "</td><td>" + results[i].first_name + "</td><td>"
                    + results[i].last_name + "</td><td>" + results[i].email + "</td></tr>";
            }
            // don't forget the '+'
            table += "</table>";
            res.send(table);
            connection.end();
        }
    );
    console.log(myResults);
});



app.get("/table-join", function (req, res) {

    const mysql = require("mysql2");
    const connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "assignment6"
    });
    let myResults = null;
    connection.connect();  // bgian ni yg make or break
    // this could be from the req.body.user
    let usr = "ggraciela";
    connection.execute(
        "SELECT a01304196_user_timeline.date_of_post, a01304196_user_timeline.article_title, a01304196_user_timeline.time_of_post, a01304196_user_timeline.number_of_views FROM a01304196_user_timeline INNER JOIN a01304196_user ON a01304196_user_timeline.user_id = a01304196_user.ID AND a01304196_user.user_name = ?",
        [usr],
        function (error, results, fields) {
            // results is an array of records, in JSON format
            // fields contains extra meta data about results
            console.log("results:", results);
            if (error) {
                // in production, you'd really want to send an email to admin
                // or in the very least, log it. But for now, just console
                console.log(error);
            }
            // let's get the data but output it as an HTML table
            let table = "<table><tr><th>Date of Post</th><th>Article Title</th><th>Time of Post</th><th>Number of Views</th>";
            for (let i = 0; i < results.length; i++) {
                table += "<tr>"
                for (const property in results[i]) {
                    table += "<td>" + results[i][property] + "</td>";
                }
                table += "</tr>";
            }
            // don't forget the '+'
            table += "</table>";
            res.send(table);
            connection.end();
        }
    );
});



app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Listening on port " + port + "!");
});
