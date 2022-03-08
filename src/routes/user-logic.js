import jwt from 'jsonwebtoken';
import passport, { jwtOptions, tokenOptions } from "../lib/login.js";
import { comparePasswords, createUser, findById, findByUsername, listUsers } from "../lib/users.js";

export async function getUser(req, res) {
  const user = await findById(req.params.id);
  if (user) {
    delete user.password;
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

export async function getUsers(req, res) {
  const users = await listUsers();
  if (users) {
    res.json({
      title: 'Notendur:',
      users,
    });
  } else {
    res.json({
      title: 'Ekki tókst að sækja notendur',
      users,
    });
  }
}

export async function registerUser(req, res) {
  const { name, username, password } = req.body;
  const existingUser = req.user;
  console.log("🚀 ~ file: user-logic.js ~ line 39 ~ registerUser ~ existingUser", existingUser)

  if (existingUser) {
    res.json({ message: `Notandi ${username} er nú þegar til` });
  }
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

export async function login(req, res) {
  const { username, password } = req.body;

  const user = await findByUsername(username);
  const passwordIsCorrect = await comparePasswords(password, user.password);

  if (!user || !passwordIsCorrect) {
    return res.json({
      message: 'Notandi eða lykilorðið er rangt',
    });
  }

  const payload = { username: username };
  const token = jwt.sign(payload, jwtOptions.secretOrKey, tokenOptions);
  delete user.password;
  passport.authenticate(
    "jwt",
    res.json({
      message: "Þú hefur verið skráður inn",
      token,
      expiresIn: tokenOptions.expiresIn,
      user
    })
  );
}
