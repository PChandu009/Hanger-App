
var express = require("express");
var app = express();
var User = require("../models/user.js");
var Movies = require("../models/movie.js");
var Screen = require("../models/screen.js");

app.get("/", function (request, response) {

Movies.find({"public":true})
      .sort({"release_date":-1})
      .limit(10)
      .exec(function(err,mv_results){
          Screen.find(function(err,scrn_results){
          if (!err){
              let movies = mv_results.map(function(mv){
                                      let shows = mv.shows.map(function(show){
                                                        var newShow = {}
                                                        
                                                        for(let i=0; i<scrn_results.length;i++){
                                                          console.log(scrn_results[i]._id, show.screen);
                                                            if(scrn_results[i]._id.equals(show.screen)){
                                                                console.log(JSON.stringify(scrn_results[i]));
                                                                //return scrn_results[i].name;
                                                                //newShow = scrn_results[i]
                                                                show.screenDetails = scrn_results[i]
                                                                return show
                                                                // console.log("screen-data", scrn_results[i]);
                                                                //return newShow;
                                                            }
                                                        }
                                                  });
                                                  mv.shows = shows;
                                                  return mv;
                                    });
              console.log("movies data", movies);
              // response.send(movies);
              response.render("index", {layout:"layout1", movies:movies});
            }
        });
      });
});


//Anil
app.get("/movies",function(req,res){
    
Movies.find({"public":true})
      .sort({"release_date":-1})
      .limit(10)
      .exec(function(err,mv_results){
          Screen.find(function(err,scrn_results){
          if (!err){
              let movies = mv_results.map(function(mv){
                                      let shows = mv.shows.map(function(show){
                                                        var newShow = {}
                                                        
                                                        for(let i=0; i<scrn_results.length;i++){
                                                          console.log(scrn_results[i]._id, show.screen);
                                                            if(scrn_results[i]._id.equals(show.screen)){
                                                                console.log(JSON.stringify(scrn_results[i]));
                                                                //return scrn_results[i].name;
                                                                //newShow = scrn_results[i]
                                                                show.screenDetails = scrn_results[i]
                                                                return show
                                                                // console.log("screen-data", scrn_results[i]);
                                                                //return newShow;
                                                            }
                                                        }
                                                  });
                                                  mv.shows = shows;
                                                  return mv;
                                    });
              console.log("movies data", movies);
              // response.send(movies);
              res.render("movies", {layout:"layout", movies:movies});
            }
        });
      });
//   res.render("movies");
});
app.get("/lounge",function(req,res){
  res.render("lounge");
});
//Anil
app.get("/events",function(req,res){
  res.render("events");
});
//Anil
app.get("/events/book-event", function (request, response) {
    response.render("bookEvent", {layout:"layout1"});
});

app.get("/movies/select-seats/:mid/:sname/:shwtime", function (request, response) {
    let date = response.locals.date;
    Movies.find({"_id": request.params.mid, "public":true})
        .exec(function(err,mv_results){
          Screen.find(function(err,scrn_results){
          if (!err){
              let movies = mv_results.map(function(mv){
                                      let shows = mv.shows.map(function(show){
                                                        var newShow = {}
                                                        
                                                        for(let i=0; i<scrn_results.length;i++){
                                                          console.log(scrn_results[i]._id, show.screen);
                                                            if(scrn_results[i]._id.equals(show.screen)){
                                                                console.log(JSON.stringify(scrn_results[i]));
                                                                show.screenDetails = scrn_results[i]
                                                                return show
                                                            }
                                                        }
                                                  }).filter(function(show){
                                                      if(request.params.sname == show.screenDetails.name && date.format(show.time,"MMDDYYYYHHMM") == request.params.shwtime){
                                                          return true;
                                                      }
                                                      else{
                                                          return false;
                                                      }
                                                  })
                                                  mv.shows = shows;
                                                  return mv;
                                    });
              console.log("movies data", movies);
              // response.send(movies);
              response.render("bookMovie", {layout:"layout1", movies:movies});
            }
        });
      });
    
});

app.get("/movies/select-screen", function (request, response) {
    response.render("selectscreen1", {layout:"layout1"});
});


app.get("/movies/select-screen/:id", function (request, response) {
    
Movies.find({"_id": request.params.id, "public":true})
      .exec(function(err,mv_results){
          Screen.find(function(err,scrn_results){
          if (!err){
              let movies = mv_results.map(function(mv){
                                      let shows = mv.shows.map(function(show){
                                                        var newShow = {}
                                                        
                                                        for(let i=0; i<scrn_results.length;i++){
                                                          console.log(scrn_results[i]._id, show.screen);
                                                            if(scrn_results[i]._id.equals(show.screen)){
                                                                console.log(JSON.stringify(scrn_results[i]));
                                                                show.screenDetails = scrn_results[i]
                                                                return show
                                                            }
                                                        }
                                                  });
                                                  mv.shows = shows;
                                                  return mv;
                                    });
              console.log("movies data", movies);
              // response.send(movies);
              response.render("selectscreen", {layout:"layout1", movies:movies});
            }
        });
      });
});


app.get("/movies/select-screen/:id/:dt", function (request, response) {
    let mMovies = {}
    mMovies.dates = []
    mMovies.shws = []
    mMovies.shows = {}
    let dates = []
    let date = response.locals.date;
    let dt = request.params.dt;
Movies.find({"_id": request.params.id, "public":true})
      .exec(function(err,mv_results){
          Screen.find(function(err,scrn_results){
          if (!err){
              let movies = mv_results.map(function(mv){
                                      let shows = mv.shows.map(function(show){
                                                        var newShow = {}
                                                    if(date.format(show.time,"MMDDYYYY") >= date.format((new Date()),"MMDDYYYY") ){
                                                        let sDate = {
                                                          dd: date.format(show.time,"DD"),
                                                          mon: date.format(show.time,"MMM"),
                                                          date: date.format(show.time,"MMDDYYYY"),
                                                          selected: date.format(show.time,"MMDDYYYY") == dt?true:false
                                                        };
                                                        if(dt=="latest"){
                                                          sDate.selected = true;
                                                          dt = sDate.date;
                                                        }
                                                        dates.push(sDate);
                                                      }
                                                        
                                                        for(let i=0; i<scrn_results.length;i++){
                                                          console.log(scrn_results[i]._id, show.screen);
                                                            if(scrn_results[i]._id.equals(show.screen)){
                                                                console.log(JSON.stringify(scrn_results[i]));
                                                                show.screenDetails = scrn_results[i]
                                                                if(date.format(show.time,"MMDDYYYY") == dt){
                                                                    mMovies.shws.push(show);
                                                                    if(mMovies.shows[show.screenDetails.name]){
                                                                      mMovies.shows[show.screenDetails.name].push(show)
                                                                    }
                                                                    else{
                                                                      mMovies.shows[show.screenDetails.name] = []
                                                                      mMovies.shows[show.screenDetails.name].push(show);
                                                                    }
                                                                }
                                                                return show;
                                                            }
                                                        }
                                                  });
                                                  mv.shows = shows;
                                                  return mv;
                                    });
              let checks = [];
              for (let i = 0; i < dates.length; i++) {
                  if (!checks[dates[i].date]) {
                      mMovies.dates.push(dates[i]);
                  }
                  checks[dates[i].date] = true;
              }
              console.log("movies data", movies);
              console.log("mMovies", mMovies);
              // response.send(movies);
              response.render("selectscreen", {layout:"layout1", movies:movies, mMovie:mMovies});
            }
        });
      });
});


app.get("/payment", function (request, response) {
    response.render("payment", {layout:"layout"});
});

app.get("/payment-status", function (request, response) {
    response.render("payment-confiramtion", {layout:"layout"});
});

app.get("/login",function(err,res){
  res.render("signin");
});

app.post("/login", function(req, res){
    var user = {};
    user.username = req.body.username || "ravvavamsi"
    user.password = req.body.password
    User.find(user)
        .select({username:1,email:1,phonenum:1,role:1})
        .exec(function(err,result){
        if(err){
          console.log(err);
          res.send(err);
        }
        else{
          console.log(result);
          if(result.length>0){
            req.session.user = result[0];
            res.app.locals.userid = result[0];
            console.log(req.session);
            res.send({success:true,message:"login success",data:result});
          }
          else{
            res.send({success:false,message:"Invalid Credentials", data:"Invalid Credentials"});
          }
        }
    });
})

app.get("/signup",function(req,res){
  res.render("signup");
});

app.get("/logout",function(req,res){
  req.session.user = null;
  res.redirect("/");
});

app.get("/about",function(req,res){
  res.render("about");
});

app.post("/signup", function(req, res){
    var user = {};
    user.username = req.body.username || "ravvavamsi"
    user.email = req.body.email
    user.password = req.body.password
    user.phonenum = req.body.phonenum
    user.role = req.body.role || "user"
    var newUser = User(user);
    newUser.save(function(err,result){
        if(err){
          res.send({success:false,message:"signup failed due to unknow reason",data:result})
        }
        else{
          res.send({success:true,message:"login success",data:result});
        }
    })
})

module.exports = app;