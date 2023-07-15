const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello World! It\'s me, cautious-bassoon!'));

app.listen(port, () => console.log(`cautious-bassoon app listening on port ${port}!`));