// V1.0 VENUESCANNER ADMIN PANEL
///////////////////////////////////
// DEPENDENCIES
var express               = require('express'),
    mongoose              = require('mongoose'),
    any_index             = require('mongoose-any-index'),
    flash                 = require('connect-flash'),
    passport              = require('passport'),
    bodyParser            = require('body-parser'),
    User                  = require('./models/user'),
    Client                = require('./models/client'),
    methodOverride        = require('method-override'),
    LocalStrategy         = require('passport-local'),
    passportLocalMongoose = require('passport-local-mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://dev:dev@ds241677.mlab.com:41677/vs-adminpanel', { config: {autoIndex: false} });

// mongoose.connect('mongodb://localhost/vs_adminpanel', { useMongoClient: true });
// mongoose.connect('mongodb://admin:admin@ds235877.mlab.com:35877/vs-adminpanel');

var app = express();
app.set('view engine', 'ejs'); // EJS FILE EXTENSION
app.use(bodyParser.urlencoded({extended:true}));
app.set('port', process.env.PORT || 3000); // SERVER PORT
app.use(express.static(__dirname + '/public')); // CONNECTS CSS FILE
app.use(methodOverride("_method")); // EDIT + DELETE ROUTES
app.use(flash()); // Feedback Messages for User

// Client.create({
//     firstname: 'Sara',
//     surname: 'Sampaio',
//     email: 'sara@sampaio.com',
//     password: 'sarasampaio'
// });
// Client.create({
//     firstname: 'Sofia',
//     surname: 'Escobar',
//     email: 'sofia@escobar.com',
//     password: 'sofiaescobar'
// });


// PASSPORT CONFIG
app.use(require('express-session')({
    secret: 'VenueScanner 2018 Admin Panel by Frederico Alves, LONDON',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

///////////////////////////////////
// RESTFUL ROUTES

// name       url           verb   desc.
//===================================================
// INDEX      /index            GET    Display a list of all clients
// NEW        /clients/new      GET    Display form to make a new client
// CREATE     /clients          POST   Add new client to DB
// SHOW       /clients/:id      GET    Show info about one client
// UPDATE     /clients/:id/edit GET    Edits info about one client

// LAND --PAGE --------(show Admin login)---------
app.get('/', function(req, res){
    res.render('admin_login');
});
// ====================
// CLIENTS ROUTES
// ====================
// INDEX --ROUTE --------(show all clients)---------
app.get('/index', adminMustBeLoggedIn, function(req, res){
    // Get all clients from DB
    Client.find({}, function(err, allClients){
        if(err){
            console.log(err);
        } else {
            res.render('index', {clients:allClients});      
        }
    })
});

// NEW --ROUTE --------(show form to create new client)---------
app.get('/clients/new', adminMustBeLoggedIn, function(req, res){
    //displays form to create a new campground
    res.render('clients_new');
});

// CREATE --ROUTE --------(add client to db)---------
app.post('/clients', adminMustBeLoggedIn, function(req, res){
    // get data from form and add to clients array
    var firstname = req.body.firstname;
    var surname = req.body.surname;
    var email = req.body.email;
    var password = req.body.password;
    var newClient = {firstname:firstname, surname:surname, email:email, password:password};
    // Create a new client and save to DB
    Client.create(newClient, function(err, newlyCreated){
        if(err){
            req.flash('error', 'Something went wrong');
            console.log(err);
        } else {
            //redirect back to panel page
            req.flash('success', 'User successfully created');
            res.redirect("/index");
        }
    });
});

// SHOW --ROUTE --------(show specific client)---------
app.get('/clients/:id', adminMustBeLoggedIn, function(req, res){
    // find the campground with provided ID
    Client.findById(req.params.id).populate('clients').exec(function(err, foundClient){
        if(err){
            req.flash('error', 'User not found');
            console.log(err);
        } else {
            // render show page with details
            res.render('clients_show', {client: foundClient});
        }
    });
});

// EDIT --ROUTE --------(show form to edit client)---------
app.get("/clients/:id/edit", adminMustBeLoggedIn, function(req, res){
    Client.findById(req.params.id, function(err, foundClient){
        res.render("clients_edit", {client: foundClient});
    });
});

// UPDATE --ROUTE --------(updated client to db)---------
app.put("/clients/:id", adminMustBeLoggedIn, function(req, res){
    // find and update the correct client
    Client.findByIdAndUpdate(req.params.id, req.body.client, function(err, updatedClient){
       if(err){
           req.flash('error', 'Something went wrong');
           res.redirect("/index");
       } else {
           //redirect somewhere(show page)
           req.flash('success', 'User successfully updated');
           res.redirect("/clients/" + req.params.id);
       }
    });
});

// DESTROY --ROUTE --------(deletes client from db)---------
app.delete("/clients/:id", adminMustBeLoggedIn, function(req, res){
    Client.findByIdAndRemove(req.params.id, function(err){
       if(err){
           req.flash('error', 'Something went wrong');
           res.redirect("/index");
       } else {
           req.flash('success', 'User successfully deleted');
           res.redirect("/index");
       }
    });
 });

///////////////////////////////////
// AUTH ROUTES
// Show sign up form
app.get('/admin/register', adminMustBeLoggedIn, function(req, res){
    res.render('admin_register');
});
// Handling user sign up
app.post('/admin/register', adminMustBeLoggedIn, function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash('error', err.message);
            console.log(err);
            return res.redirect('admin/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', user.username + ' registered as a new Administrator');
            res.redirect('/index');
        });
    });
});

// LOG IN --ROUTE ----------------------
// Show login form
app.get('/admin/login', function(req, res){
    res.redirect('/');
});

// Login Logic Middleware
app.post('/login', passport.authenticate('local', {
    successRedirect: '/index',
    failureRedirect: '/admin/login',
}), function(req, res){
});

// LOG OUT --ROUTE ----------------------
// It just stops keep tracking the user login
app.get('/admin/logout', function(req, res){
    req.logout();
    req.flash('success', 'Logged Out!');
    res.redirect('/');
});


// Features --ROUTE ----------------------
// Show features page
app.get('/features', adminMustBeLoggedIn, function(req, res){
    res.render('features');
});


// MIDDLEWARE TO CHECK IF USER IS LOGGED IN
function adminMustBeLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return  next();
    }
    req.flash('error', 'Permition denied');
    res.redirect('/');
}

///////////////////////////////////
// SERVER RUNNING
app.listen(app.get('port'), function(){
    console.log('VenueScanner --v.1 | Server running... on http://localhost:' + app.get('port'));
});