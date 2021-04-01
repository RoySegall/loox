const express = require('express');
import {resolve, join} from 'path';
import {getAllPets, getPet} from "./utils/views";
const app = express();
const port = 3000;

// Set up the engine template.
app.set('view engine', 'pug');
app.set('views', resolve('src', 'templates'));

// Set up the static library.
app.use(express.static(join(__dirname, 'public')));

// Views. Like, duh 💪!
app.get('/', getAllPets)
app.get('/pet/:id', getPet);

app.listen(port, () => {
  console.log(`Running the server at port ${port} 🚀`)
});
