import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDB } from './db.config/initDB.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initDB();

app.get('/', (req, res) => {
    res.send('Contact Management API is running...');
});

app.use('/api/contacts', contactRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found',
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

