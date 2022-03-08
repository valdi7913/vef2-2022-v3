import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import passport from './lib/login.js';
import { isInvalid } from './lib/template-helpers.js';
import { eventRouter } from './routes/event-routes.js';
import { usersRouter } from './routes/user-routes.js';

dotenv.config();

const {
  DATABASE_URL: connectionString,
  JWT_SECRET: jwtSecret,
  PORT: port = 3000,
} = process.env;

if (!connectionString || !jwtSecret) {
  console.error('Vantar gögn í env');
  process.exit(1);
}

const app = express();
app.use(express.json());
// Sér um að req.body innihaldi gögn úr formi
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: jwtSecret,
    resave: false,
    saveUninitialized: false,
    maxAge: 20 * 1000, // 20 sek
  })
);

app.use(passport.initialize());


app.locals = {
  isInvalid,
};

app.use('/users', usersRouter);
app.use('/events', eventRouter);


/** Middleware sem sér um 404 villur. */
app.use((req, res, next) => {
  const message = 'Síða fannst ekki';
  res.status(404).send(message);
});
/** Middleware sem sér um villumeðhöndlun. */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  const message = 'Villa kom upp';
  res.status(500).send(message);
});

app.listen(port, () => {
  console.info(`Server running at http://localhost:${port}/`);
});
