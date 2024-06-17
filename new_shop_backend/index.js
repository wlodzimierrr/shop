const express = require('express');
const app = express();

const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const cors = require("cors")
const multer = require('multer');
const path = require('path');


app.use(express.json());
app.use(cors());

require('dotenv').config()

mongoose.connect(process.env.DATABASE_URL)

// Image storage engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})


const upload = multer({ storage: storage });

//  Endpoin for Images
app.use('/images', express.static('uploads/images'));
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${process.env.PORT || 3000}/images/${req.file.filename}`
    });
});

// Schema for creating products
const Product = mongoose.model("Product", {
    id: {
        type: Number,
        reuired: true,
    },
    name: {
        type: String,
        reuired: true,
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type:Number,
        required: true
    },
    created_at: {
        type:Date,
        default: Date.now
    },
    available: {
        type: Boolean,
        default: true,
    },
})

// Endpoint for adding products
app.post('/addproduct', async(req, res) => {
    let products = await Product.find({});
    let id;
    if(products.length > 0) {
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0];
        id= last_product.id + 1;
    } else {
        id = 1;
    }

    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("Saved")
    res.json({
        success: true,
        name: req.body.name,
    })
})

// Endpoint for deleteing products
app.post('/deleteproduct', async(req, res) => {
    await Product.findOneAndDelete({id: req.body.id});
    console.log('Product deleted');
    res.json({
        success: true,
        name: req.body.name
    });
})

// Endpoint for selecting all products
app.get('/allproducts', async(req, res) => {
    let products = await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

// Schema for creating users

const User = mongoose.model('User', {
    name:{
        type: String,
    },
    email:{
        type: String,
        unique:true,
        required: true,
    },
    password:{
        type: String,
    },
    cartData:{
        type: Object,
    },
    created_at:{
        type: Date,
        default: Date.now,
    },
});

// Endpoint ffor registering user
app.post('/signup', async(req, res) => {
    let check = await User.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({
            success: false,
            errors: "Email already registered",
        });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    })

    await user.save();
    const data = {
        user: {
            id: user.id,
        },
    };
    const token = jwt.sign(data, process.env.JWT_SECRET);
    res.json({success: true, token})
})

// Enpoint for user login

app.post('/login', async(req,res) => {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        const passMatch = req.body.password === user.password;
        if (passMatch) {
            const data = {
                user: {
                    id: user.id,
                },
            };
            const token = jwt.sign(data, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({success: false, errors: "Wrong Password"});
        }
    } else {
        res.json({ success: false, errors: "Wrong Email Address" })
    }
})

// Endpoint for new collection data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({ });
    let newcollection = products.slice(0).slice(-8);
    console.log("New Collection Fetched")
    res.send(newcollection)
})

// Endpoint for popular products data
app.get('/popularproducts', async (req, res) => {
    let products = await Product.find({ category: "category1" });
    let popular_products = products.slice(0, 4);
    console.log("Popular Products Fetched")
    res.send(popular_products)
})

// Middleweare to fetch users
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using valid token" });
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRETprocess.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        res.status(401).send({ errors: "Invalid token" });
    }
};

// Enpoint for cart data
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("Added", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id })
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({ _id: req.user.id }, {cartData: userData.cartData})
    res.json({ message: "Added" });
    });

// Endpoint for removing product
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("Removed", req.body.itemId);
    let userData = await User.findOne({ _id: req.user.id })
    if (userData.cartData[req.body.itemId] > 0)
    userData.cartData[req.body.itemId] -= 1;
    await User.findOneAndUpdate({ _id: req.user.id }, {cartData: userData.cartData})
    res.json({ message: "Removed" });
    });

app.post('/getcart', fetchUser, async (req, res) => {
    console.log("Get cart");
    let userData = await User.findOne({ _id: req.user.id });
    res.json(userData.cartData);
})

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
