import express, { json, urlencoded } from 'express';

// Routes
import { userRouter } from './api/routes/user-routes';
import { tokenRouter } from './api/routes/token-routes';

// Middlewares
import { authenticator } from './api/middleware/authenticator';

const app = express();

app.use(urlencoded());
app.use(json())

app.use('/users/', authenticator);
app.use('/tokens/', authenticator);






