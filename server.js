const express = require('express');
const basicAuth = require('express-basic-auth');
const cors = require('cors');
const coookieParser = require('cookie-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = process.env.PORT || 3000;

const auth = basicAuth({
    users: {
        admin: '123',
        user: '456',
    },
});

app.use(cookieParser('987gfc432trdiojlkn876dxwa65uhlknoj'))

app.use(cors());

app.get('/', (req, res) => res.send('Hello World! It\'s me, cautious-bassoon!'));

app.post('/authenticate', auth, (req, res) => {
    const options = {
        httpOnly: true,
        signed: true,
    };

    if (req.auth.user === 'admin') {
        res.cookie('name', 'admin', options).send({ screen: 'admin' });
    } else if (req.auth.user === 'user') {
        res.cookie('name', 'user', options).send({ screen: 'user' });
    } else {
        res.status(401).send({ screen: 'login' });
    }
});

app.post('/read-cookie', (req, res) => {
    const name = req.signedCookies.name;
    if (name === 'admin') {
        res.send({ screen: 'admin' });
    } else if (name === 'user') {
        res.send({ screen: 'user' });
    } else {
        res.status(401).send({ screen: 'login' });
    }
});

app.post('/logout', (req, res) => {
    res.clearCookie('name').send({ screen: 'login' });
});

app.listen(port, () => console.log(`cautious-bassoon app listening on port ${port}!`));