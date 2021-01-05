const express = require ('express');
const morgan = require ('morgan');
const exphbs = require ('express-handlebars');
const path = require ('path');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlsession = require('express-mysql-session');
const {database} = require('./keys');
//Initials
const app = express();

//settings
app.set ('port', process.env.PORT || 4000);
app.set ('views', path.join (__dirname, 'views'));
app.engine ('.hbs', exphbs ({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get ('views'), 'layouts'),
    partialsDir: path.join (app.get ('views'), 'partials'),
    extname: '.hbs',
    helpers: require ('./lib/handlebars')
}));
app.set ('view engine', '.hbs');

//Middlewares
app.use(session({
    secret: 'NaviTEC',
    resave: false,
    saveUninitialized: false,
    store: new mysqlsession(database)
}));
app.use(flash());
app.use (morgan('dev'));
app.use (express.urlencoded({extended: true}));
app.use (express.json());


//Global variables
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    next();
});
//Routes
app.use (require ('./routes'));
app.use (require ('./routes/authentication'));
app.use (require ('./routes/santa_view'));
app.use ('/santas_assistant', require ('./routes/santas_assistant'));
app.use ('/behavior', require ('./routes/behavior'));
app.use ('/category', require ('./routes/category'));
app.use ('/letter', require ('./routes/letter'));
app.use ('/function_assistant', require ('./routes/function_assistant'));
app.use ('/needs_kid', require ('./routes/needs_kid'));
app.use ('/person', require ('./routes/person'));
app.use ('/toy', require ('./routes/toy'));
app.use ('/santa_view', require ('./routes/santa_view'));
app.use ('/user', require ('./routes/user'))


//Public files
app.use (express.static(path.join (__dirname, 'public')));

//Start server
app.listen (app.get ('port'), () => {
    console.log ('Server on port', app.get ('port'));
});