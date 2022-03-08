import express from 'express';
import { body, param } from 'express-validator';
import xss from 'xss';
import { catchErrors } from '../lib/catch-errors.js';
import { requireAdmin, requireLoggedIn } from '../lib/login.js';
import {
  idValidator,
  nameValidator,
  passwordValidator,
  usernameAndPaswordValidValidator,
  usernameValidator
} from '../lib/validation.js';
import { getUser, getUsers, login, registerUser } from './user-logic.js';
export const usersRouter = express.Router();


const xssCreateUserSanitizationMiddleware = [
  body('name').customSanitizer((v) => xss(v)),
  body('username').customSanitizer((v) => xss(v)),
  body('password').customSanitizer((v) => xss(v)),
];

const xssSanitizeParametersMiddleware = [
  param('id').customSanitizer((v) => xss(v))
];


usersRouter.get('/', requireAdmin, catchErrors(getUsers));
usersRouter.get('/me',
  requireLoggedIn,
  (req, res) => {
    res.json({
      message: 'Þínar upplýsingar',
      user: req.user
    });
  }
);
usersRouter.post('/register',
  xssCreateUserSanitizationMiddleware,
  nameValidator,
  usernameValidator,
  passwordValidator,
  usernameAndPaswordValidValidator,
  catchErrors(registerUser)
);

usersRouter.post('/login',
  xssCreateUserSanitizationMiddleware,
  nameValidator,
  usernameValidator,
  passwordValidator,
  usernameAndPaswordValidValidator,
  catchErrors(login)
);

usersRouter.get('/:id',
  xssSanitizeParametersMiddleware,
  requireAdmin,
  idValidator,
  catchErrors(getUser));


