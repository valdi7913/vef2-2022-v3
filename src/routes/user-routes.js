import express from 'express';
import { catchErrors } from '../lib/catch-errors.js';
import passport, { ensureLoggedIn } from '../lib/login.js';
import { createUser, findById, listUsers } from "../lib/users.js";

export const usersRouter = express.Router();

async function getUser(req, res) {
  const user = await findById(req.params.id);
  if (user) {
    res.json({
      message: 'Notandi fundinn',
      user
    });
  } else {
    res.json({
      title: 'Ekki tókst að finna notanda',
      user
    });
  }
}

async function getUsers(req, res) {
  const users = await listUsers();
  if (users) {
    res.json({
      title: 'Notendur: ',
      users,
    });
  } else {
    res.json({
      title: 'Ekki tókst að sækja notendur',
      users,
    });
  }
}

async function registerUser(req, res) {
  const { name, username, password } = req.body;
  const user = await createUser(name, username, password);
  if (user) {
    res.json({
      message: 'Notandi hefur verið búinn til',
      user
    });
  } else {
    res.json({
      title: 'Ekki tókst að búa til notanda',
      user
    });
  }
}

async function logout(req, res) {
  req.logout();
  res.send('Þú hefur verið skráð/ur út');
}

usersRouter.get('/', ensureLoggedIn, catchErrors(getUsers));
usersRouter.get('/:id', ensureLoggedIn, catchErrors(getUser));
usersRouter.post('/register',
  //TODO: bæta við sanitation
  catchErrors(registerUser)
);

usersRouter.post('/login',
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
  }),
  (req, res) => {
    res.json({ message: "Successfully Logged In!" });
  });

usersRouter.post('/logout', catchErrors(logout));

usersRouter.get('/test', (req, res) => {
  res.json({ message: 'Test' });
});
