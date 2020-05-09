var express = require("express"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  bodyParser = require("body-parser"),
  app = express();

//App configuration
mongoose.connect("mongodb://localhost/restfull_blog_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method"));

//  Schema
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: { type: Date, default: Date.now }
});

// Model Configuration
var Blog = mongoose.model("Blog", blogSchema);

/*

*/


// ROUTES

app.get("/", function(req, res) {
  res.redirect("/blogs");
});
//INDEX route
app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//NEW route
app.get("/blogs/new", function (req, res) {
   res.render("new"); 
});

//CREATE route
app.post("/blogs",function (req, res) {
  //req.body.blog.body= req.sanitize(req.body.blog.body);
  Blog.create(req.body.blog , function(err, blogs) {
          if (err) {
           res.render("new");
          } else {
         
            res.redirect("/blogs");
        
      
          }
        }
      );    
})

//SHOW route  :id
app.get("/blogs/:id",function(req, res){
  Blog.findById(req.params.id, function(err, foundblog){
    if(err){
      res.redirect("/blogs");
    }
    else{
      res.render("show",{foundblog : foundblog});
    }
  })

});

// EDIT route
app.get("/blogs/:id/edit", function(req,res){
     Blog.findById(req.params.id , function (err, foundblog) {
       if(err){
         res.redirect("/blogs");
       }
       else{
        res.render("edit",{blog : foundblog});
       }
     })
});
// UPDATE route
app.post("/blogs/:id", function(req, res){
// req.body.blog.body= req.sanitize(req.body.blog.body);
  Blog.findByIdAndUpdate(req.params.id, req.body.blog, function (err, updateBlog) {
    if(err){
      res.send("errrrrrrrrrrr");
    }
    else{
      res.redirect("/blogs/" + req.params.id);
    }
  })
});
 
//DELETE route
app.delete("/blogs/:id", function(req, res){
    //Destroy by id 
  Blog.findByIdAndRemove(req.params.id, function (err, deleteBlog) {
      if(err){
        res.redirect("/blogs");
      } 
      else{
        res.redirect("/blogs");
      }   
  })
    //redirect somewhere
});


// Server

app.listen("3000", function() {
  console.log("Server Has been Started.......");
});
