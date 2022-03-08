import express from 'express';
import { catchErrors } from '../lib/catch-errors.js';
import { requireLoggedIn, requireOwnershipOrAdmin } from '../lib/login.js';
import {
  changeEvent,
  getEvent,
  getEvents,
  registerEvent,
  registerForEvent,
  removeEvent,
  unregisterFromEvent
} from './event-logic.js';

export const eventRouter = express.Router();

eventRouter.get('/', catchErrors(getEvents));
eventRouter.post('/',
  requireLoggedIn, //TODO sanitize
  catchErrors(registerEvent));

eventRouter.get('/:id', catchErrors(getEvent));
eventRouter.patch('/:id',
  requireLoggedIn,
  requireOwnershipOrAdmin,
  catchErrors(changeEvent));

eventRouter.delete(
  '/:id',
  requireOwnershipOrAdmin,
  catchErrors(removeEvent));

eventRouter.post('/:id/register',
  catchErrors(registerForEvent)); //TODO sanitize

eventRouter.delete('/:id/register', catchErrors(unregisterFromEvent));
