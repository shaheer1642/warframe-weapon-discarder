import dotenv from 'dotenv';
dotenv.config();

import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import itemsController from './controllers/items.controller';
import path from 'path';

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemsController);

app.use(express.static(path.join(__dirname, '../../frontend', 'dist')))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'dist', 'index.html'))
});


// Start server
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
}); 