import { body, param } from 'express-validator';
import { comparePasswords, findByUsername } from '../lib/users.js';


const isPatchingAllowAsOptional = (value, { req }) => {
  if (!value && req.method === 'PATCH') return false;
  return true;
};

export const nameValidator = body('name')
  .if(isPatchingAllowAsOptional)
  .isLength({ min: 2, max: 64 })
  .withMessage('Nafn er nauðsynlegt, hámarkslengd 64 stafir');

export const usernameValidator = body('username')
  .if(isPatchingAllowAsOptional)
  .isLength({ min: 2, max: 64 })
  .withMessage('Notendanafn er nauðsynlegt, hámarkslengd 64 stafir');

export const passwordValidator = body('password')
  .if(isPatchingAllowAsOptional)
  .isLength({ min: 10, max: 256 })
  .withMessage('Lykilorð er nauðsynlegt, Á milli 10 til 256 stafir að lengd');

export const idValidator = param('id')
  .isInt()
  .withMessage('Id verður að vera heiltala');

export const usernameAndPaswordValidValidator = body('username')
  .custom(async (username, { req: { body: reqBody } = {} }) => {
    const { password } = reqBody;
    console.log('password :>> ', password);
    if (!username || !password) {
      return Promise.reject(new Error('skip'));
    }

    let valid = false;
    try {
      const user = await findByUsername(username);
      console.log("🚀 ~ file: validation.js ~ line 40 ~ .custom ~ user", user)
      valid = await comparePasswords(password, user.password);
    } catch (e) {
      // Hér er hægt að fylgjast með ógildum innskráningum
      console.info(`Ógild inskráning fyrir notendann ${username}`);
    }

    if (!valid) {
      return Promise.reject(new LoginError('vitlaust notendanafn eða lykilorð'));
    }
    req.user = user;
    return Promise.resolve();
  });
