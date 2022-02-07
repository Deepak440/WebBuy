import  express from 'express';
import connectDB from './config/db.js';
import path from 'path';
import morgan from 'morgan';
import  products  from './data/products.js';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadsRoutes from './routes/uploadsRoutes.js';
import { notFound , errorHandler } from './middleware/errorMiddleware.js';



const app = express();

// Inbuilt middleware to parse data from body of request
app.use(express.json());

dotenv.config();
// Db connection
connectDB();


if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}



// Make uploads folder static so that it can be accessible
const __dirname = path.resolve();  // to make below line working with es module
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

//Routes
app.use( '/api/products' , productRoutes);

app.use('/api/users' , userRoutes );

app.use('/api/orders' , orderRoutes);
app.use('/api/upload' , uploadsRoutes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
  
    app.get('*', (req, res) =>
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    )
  } else {
    app.get('/', (req, res) => {
      res.send('API is running....')
    })
  }
  


app.use(notFound)
app.use(errorHandler)


const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} at port ${PORT}`));