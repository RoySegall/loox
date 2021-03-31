const express = require('express');
const {resolve, join} = require('path');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', resolve( 'src', 'templates'));

app.use(express.static(join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hessy', message: 'Hello there!' })
})

app.listen(port, () => {
  console.log(`Running the server at port ${port}`)
});
