import {getPets, getPetsFromFile} from "./utils/pets";

const express = require('express');
import {resolve, join} from 'path';
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', resolve('src', 'templates'));

app.use(express.static(join(__dirname, 'public')));

app.get('/', (req, res) => {
  const pets = getPets({driver: 'files'});
  res.render('index', { title: 'Hessy', message: 'Hello there!' })
})

app.get('/pet/:id', (req, res) => {
  const pets = getPets({driver: 'files', excludePet: req.params.id});

  // Get all the pets and exclude on on the left.
});

app.listen(port, () => {
  console.log(`Running the server at port ${port}`)
});
