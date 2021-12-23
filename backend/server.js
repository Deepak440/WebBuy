import  express from 'express';
import connectDB from './config/db.js';
import  products  from './data/products.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';


const app = express();
dotenv.config();
// Db connection
connectDB();

app.get('/' , (req ,res) => {
    res.send('API is runnning');
}
);

app.use( '/api/products' , productRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`));