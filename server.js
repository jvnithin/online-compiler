import express, { json, urlencoded } from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import registerRoute from "./routes/register.js"
import loginRoute from "./routes/login.js"
import cors from 'cors'
import folderRoutes from './routes/folders.js';
import fileRoutes from './routes/files.js';

const app=express();
dotenv.config();

// app.use(json()); // Parses JSON
app.use(urlencoded({ extended: true })); 
// app.use(cors());
app.use(express.json()); // Parse JSON bodies



const port=process.env.PORT || 8080;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB successfully!!');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

// Start MongoDB connection
connectToMongoDB();
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow DELETE requests
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true, // Allow required headers
}));


app.use('/register',registerRoute)
app.use('/login',loginRoute)
app.use('/api/folders', folderRoutes);
app.use('/api/play',fileRoutes)

app.listen(port,()=>{
    console.log(`app is listening at port ${port}`)
})