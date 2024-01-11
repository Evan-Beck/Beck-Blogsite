const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sequelize = require('./config/connection');
// Imports sequelize connection.

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}));

const routes = require('./controllers');
app.use(routes);
// const userRoutes = require('./controllers/userRoutes');
// const postRoutes = require('./controllers/postRoutes');
// const commentRoutes = require('./controllers/commentRoutes');

// app.use('/users', userRoutes);
// app.use('/posts', postRoutes);
// app.use(commentRoutes);

app.get('/', (req, res) => {
  res.render('home', { title: "The Tech Blog" }); // Replace with your actual homepage template
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
