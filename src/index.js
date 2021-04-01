import express from 'express';
import {resolve, join} from 'path';
import {getAllPets, getPet} from "./utils/views";
import {PORT} from "./utils/config";

const app = express();

// Set up the engine template.
app.set('view engine', 'pug');
app.set('views', resolve('src', 'templates'));

// Set up the static library.
app.use(express.static(join(__dirname, 'public')));

// Views. Like, duh 💪!
app.get('/', getAllPets)
app.get('/pet/:id', getPet);

app.listen(PORT, () => {
  console.log(`Running the server at port ${PORT} 🚀`);
});
