import express  from "express";
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoute from "./routes/productRoutes.js"

import cors from "cors";

const PORT = process.env.PORT || 8080;
const app = express();

dotenv.config();

//databse  configuration
connectDB();

// Allow specific origins
// const allowedOrigins = ['http://localhost:8081'];
// app.use(cors({
//   origin: function (origin, callback) {
//     if (allowedOrigins.includes(origin) || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// }));
//middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//routes
app.use("/api/v1/products",productRoute)

app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode and on port ${PORT}`);
})