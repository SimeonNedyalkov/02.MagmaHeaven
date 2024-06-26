const { register, login } = require('../services/userService');
const { createToken } = require('../services/jwt');
const { parseError } = require('../config/errorConfig');
const { validationResult, body } = require('express-validator');
const userRouter = require('express').Router();
const { isGuest, isUser } = require('../middlewares/guards');

// Login Routes
userRouter.get('/login', isGuest(), (req, res) => {
    res.render('login');
});

userRouter.post('/login',
    isGuest(),
    body('email').trim().isEmail().withMessage('Incorrect Email'),
    body('password').isAlphanumeric().isLength({ min: 6 }).withMessage('Incorrect Password'),
    async (req, res) => {
        const { email, password } = req.body;
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                throw result.array();
            }
            const user = await login(email, password);
            const token = createToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/');
        } catch (err) {
            res.render('login', { data: { email }, errors: parseError(err).errors });
        }
    });

// Register Routes
userRouter.get('/register', isGuest(), (req, res) => {
    res.render('register');
});

userRouter.post('/register',
    isGuest(),
    body('username').trim().isLength({ min: 3 }).withMessage('Incorrect Username'),
    body('email').trim().isEmail().withMessage('Incorrect Email'),
    body('password').isAlphanumeric().isLength({ min: 6 }).withMessage('Incorrect Password'),
    async (req, res) => {
        const { username, email, password } = req.body;
        try {
            const result = validationResult(req);
            if (!result.isEmpty()) {
                throw result.array();
            }
            const user = await register(email, username, password);
            const token = createToken(user);
            res.cookie('token', token, { httpOnly: true });
            res.redirect('/login');
        } catch (err) {
            res.render('register', { data: { username, email }, errors: parseError(err).errors });
        }
    });

// Logout Route
userRouter.get('/logout', isUser(), (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
});

module.exports = {
    userRouter
};