import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import { SOURCE_PATH } from './constants.js';
import HandelbarsHelpers from './lib/HandelbarsHelpers.js';

import {home} from './controllers/home.js'

// create express app
const app = express();

// serve static file
app.use(express.static('public'));

// ------------ HANDLEBARS -----------//

// create an instance of express-handlebars
const hbs = create({
    extname: 'hbs',
    helpers: HandelbarsHelpers,
    allowProtoProperties: true,
  });

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

// ---------- ROUTES ---------- //

app.get('/', home);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server started on port http://localhost:${PORT}`);
});

export default app;