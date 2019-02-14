const express = require("express");
const lodash = require("lodash");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

// mongoose.connect("mongodb://localhost:27017/userForSiteDB", {useNewUrlParser: true});
mongoose.connect("mongodb+srv://portfolio:skippy24@cluster0-hgsfo.mongodb.net/userForSiteDB", {
  useNewUrlParser: true });

const userSchema = new mongoose.Schema ({
  email: String,
  subject: String,
  message: String
});

const User = new mongoose.model("User", userSchema);



app.get("/", function(req, res){
  res.render("index");
});

app.get("/mymessages", function(req, res){
  User.find({}, function(err, post){
    res.render("mymessages", {
      posts: post
    });
  });
});

app.post("/", function(req, res){
  const email = req.body.email;
  const subject = req.body.subject;
  const message = req.body.message;
  const user = new User ({
    email: email,
    subject: subject,
    message: message
  });
  user.save(function(err){
    if(err) {
      console.log(err);
      res.render("failure");
    } else {
      res.render("success");
    }
  });
});

app.post("/mymessages/delete", function(req, res){
  const checkedItemId = req.body.checkbox;
  User.findByIdAndRemove(checkedItemId, function(err) {
      if (!err) {
        console.log("Succesful");
        res.redirect("/myMessages");
    }
  });
});





















app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port ");
});
