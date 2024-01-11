const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


// Imports sequelize connection.
 const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const hbs = exphbs.create({  });

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session({
  secret: 'super secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
  })
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const userRoutes = require('./controllers/userRoutes');
const postRoutes = require('./controllers/postRoutes');

app.use('/users', userRoutes);
app.use('/posts', postRoutes);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
