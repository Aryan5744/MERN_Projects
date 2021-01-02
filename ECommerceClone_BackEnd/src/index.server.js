const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

const uploadPath = require('path');

const cors = require('cors');

//environment variables or constants
env.config();

// mongo DB connection string
// mongodb+srv://root:<password>@cluster0.gmqcy.mongodb.net/<dbname>?retryWrites=true&w=majority

mongoose.connect(
    'mongodb+srv://'+ process.env.MONGO_DB_USER +':'+process.env.MONGO_DB_PASSWORD+'@cluster0.gmqcy.mongodb.net/'+process.env.MONGO_DB_DATABASE+'?retryWrites=true&w=majority', 
    {
        useNewUrlParser : true,
        useUnifiedTopology : true,
        useCreateIndex : true
    }
).then( () => {
    console.log('Database connected')
});

//middleware is to manipulate data in between making request n handling requests
app.use(cors());
app.use(express.json());
app.use('/public',express.static(uploadPath.join(__dirname , 'uploads')));
app.use('/api' , authRoutes);
app.use('/api' , adminRoutes);
app.use('/api' , categoryRoutes);
app.use('/api' , productRoutes);
app.use('/api' , cartRoutes);

app.listen(process.env.PORT, () => {
    console.log('Server is running on PORT ' + process.env.PORT);
});
