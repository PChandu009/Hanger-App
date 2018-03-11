

var express = require("express");
var app = express.Router();
var User = require("../models/user.js");
var Movie = require("../models/movie.js");
var Screen = require("../models/screen.js");



app.get("/",function(req,res){
  res.render("admin/dashboard");
});
app.get("/new-movie",function(req,res){
  Screen.find()
        .sort({"release_date":-1})
        .exec(function(err,results){
      if (!err){
        res.render("admin/new-movie", {screens:results });
      }
  });
});
app.post("/new-movie", function(req,res){
    let body = req.body;
    let movie = new Movie();
    console.log("req body", body);
    movie.name = body.inputMovieTitle;
    movie.desc = body.inputMovieDesc;
    movie.dur_hr = body.inputMovieDurationHours;
    movie.dur_min = body.inputMovieDurationMinutes;
    movie.release_date = body.inputMovieReleaseDate;
    movie.language = body.inputMovieLanguage;
    movie.genre = body.inputMovieGenre;
    movie.certificate = body.inputMovieCertificate;
    movie.public = body.optionsRadiosPubToPblc;
    movie.booking = body.optionsRadiosEnBkng;
    movie.cpic = body.cvrPic || "/uploads/defaultCvpPic.png";
    movie.dpic = body.dspPic || "/uploads/defaultDspPic.png";
    movie.trailer = body.inputMovieTrailer;
    let shows = [];
    for(let i=0; i<body.showScreen.length; i++){
      console.log(new Date(body.showdate[i]+" "+body.showtime[i]));
        shows.push({
          screen:body.showScreen[i],
          time: new Date(body.showdate[i]+" "+body.showtime[i]),
          price: body.inputMovieShowPrice
        })
    }
    movie.shows = shows;
    movie.save(function(err,result){
        if(err){
          // res.redirect("/");
          res.send({success:false, message:"Movie is not added", data:err});
        }else{
          res.redirect("/");
          // res.send({success:true, message:"New Movie is added", data:result});
        }
    })
});

app.get("/edit-screens",function(req,res){
  Screen.find(function(err,results){
      if (!err){
        res.render("admin/edit-screens", {screens:results });
      }
  });
});

app.get('/edit-movies', function(req,res){
  Movie.find(function(err,results){
      if (!err){
        res.render("admin/edit-movies",{movies:results});
      }
  });
});

app.get('/edit-events', function(req,res){
    res.render("admin/edit-events");
});

app.get('/screens', function(req,res){
  Screen.find(function(err,results){
      if (!err){
        res.send(results);
      }
  });
});

/** Swetha */
app.get("/new-user",function(req,res){
  res.render("admin/new-user");
});

app.get("/edit-user",function(req,res){
  User.find(function(err,results){
      if(!err){
        res.render("admin/edit-user", {users:results});
      }
  })
  
});

/**Swetha */
app.get("/new-event",function(req,res){
  res.render("admin/new-event");
});

app.post("/new-screen",function(req,res){
  let screen = new Screen()
  screen.name = req.body.screenName;
  screen.seats = req.body.screenSeats;

  screen.save(function(err,result){
    if(err){
      res.send({success:false, message:"Screen is not added", data:err});
    }else{
      res.send({success:true, message:"New Screen is added", data:result});
    }
  });
});

app.post("/update-screen/:id",function(req,res){
  
  let screenId = req.params.id;
  let screenName = req.body.screenName;
  let screenSeats = parseInt(req.body.screenSeats);

  Screen.update({_id: screenId},{
      name: screenName,
      seats: screenSeats
  }, function(err,result){
    if(err){
      res.send({success:false, message:"Screen Details Not Updated", data:err});
    }else{
      res.send({success:true, message:"Updated Screen Details", data:result});
    }
  });
});


app.post("/delete-screen/:id",function(req,res){
  
  let screenId = req.params.id;
  
  Screen.remove({_id: screenId}, function(err,result){
    if(err){
      res.send({success:false, message:"Screen is Not Deleted", data:err});
    }else{
      res.send({success:true, message:"Screen is Deleted", data:result});
    }
  });
});

app.post('/upload', function(req,res){
  console.log(req.files.foo.name);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let File = req.files.foo;
  let destPath = '/uploads/images/'+File.name;
  // Use the mv() method to place the file somewhere on your server 
  File.mv('./assets'+destPath, function(err) {
    if (err)
      return res.status(500).send(err);
 
    res.send({success:true, message:"File Uploaded", data:destPath});
  });
});

app.post('/new-movie', function(req,res){
  
});
module.exports = app;