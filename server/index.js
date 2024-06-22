// server.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoute from './routes/user.route.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 4000;
const mongoDBURI = process.env.MongoDBURI;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(mongoDBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((e) => {
    console.log('Error connecting to MongoDB:', e);
});

// Define routes
app.use('/user', userRoute);
  

app.get('/', (req, res) => {
    res.send('Hello! I am Bhanu Kumar Burman.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
