import passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { findByUsername } from './users.js';


const {
  JWT_SECRET: jwtSecret,
  TOKEN_LIFETIME: tokenLifetime = 3600,
  TEST: test,
} = process.env


const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  jwtSecret,
  tokenLifetime
};

export const tokenOptions = {
  expiresIn: parseInt(tokenLifetime, 10),
}

if (!jwtSecret) {
  console.error('Vantar .env gildi');
  process.exit(1);
}


/**
 * Athugar hvort username og password sé til í notandakerfi.
 * Callback tekur við villu sem fyrsta argument, annað argument er
 * - `false` ef notandi ekki til eða lykilorð vitlaust
 * - Notandahlutur ef rétt
 *
 * @param {string} username Notandanafn til að athuga
 * @param {string} password Lykilorð til að athuga
 * @param {function} done Fall sem kallað er í með niðurstöðu
 */
async function strat(data, next) {
  console.log('data :>> ', data);
  // fáum id gegnum data sem geymt er í token
  const user = await findByUsername(data.username);
  if (!user) { return next(false); }
  return next(null, user);
}

export function requireAdmin(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      const error = info.name == 'TokenExpiredError' ? 'expired token' : 'invalid token';
      return res.status(401).json({ error });
    }

    if (!user.admin) {
      return res.status(403).json({ error: 'forbidden' });
    }

    req.user = user;
    return next();
  })(req, res, next);
}

export function requireLoggedIn(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    console.log('LoggedInUser :>> ', user);
    if (err) {
      return next(err);
    }
    if (!user) {
      const error = info.name === 'TokenExpiredError'
        ? 'expired token' : 'invalid token';

      return res.status(401).json({ error });
    }
    res.user = user;
    return next();
  })(req, res, next);
}

export function addUserIfAuthenticated(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err);
    }
    res.user = user;
    return next();
  })(req, res, next);
}

export function requireOwnershipOrAdmin(req, res, next) {
  return passport.authenticate('jwt', { session: false }, (err, user, event) => {
    if (err) {
      next(err);
    }
    if (user.id === event.userId || user.admin) {
      return next();
    } else {
      return res.status(403).json({ error: 'forbidden' });
    }
  })(req, res, next);
}

export const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
};

passport.use(new Strategy(jwtOptions, strat));

export default passport;
