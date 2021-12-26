import  express from 'express';
import connectDB from './config/db.js';
import  products  from './data/products.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';


const app = express();

// Inbuilt middleware to parse data from body of request
app.use(express.json());

dotenv.config();
// Db connection
connectDB();

app.get('/' , (req ,res) => {
    res.send('API is runnning');
}
);


//Routes
app.use( '/api/products' , productRoutes);

app.use('/api/users' , userRoutes );




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`));