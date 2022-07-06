import 'reflect-metadata';

import dotenv from 'dotenv';
dotenv.config();

import app from './app';

const port = process.env.PORT! || 5001;
app.listen(port, () => {
    console.log(`Library application is running on port ${port}.`);
});
