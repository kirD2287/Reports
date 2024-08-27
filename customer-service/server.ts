
import express from 'express';
import router from './router';

const app = express();

const PORT = process.env.PORT || 3000

app.use(express.json());
app.use('/report', router);

async function start () {
    try {
        await app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
        process.exit(1);
    }
}


start() 