const ProductModel = require('../models/Product');

exports.addProduct = async (req, res, next) => {
    try{
        let products = await ProductModel.find({});
        let id;
        if(products.length > 0) {
            let last_product_array = products.slice(-1)
            let last_product = last_product_array[0];
            id= last_product.id + 1;
        } else {
            id = 1;
        }
    
        const product = ProductModel({
            id,
            name: req.body.name,
            image: req.body.image,
            category: req.body.category,
            new_price: req.body.new_price,
            old_price: req.body.old_price,
        });

        await product.save();
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.deleteProduct = async (req, res, next) => {
    try {
        const deletedProduct = await ProductModel.findOneAndDelete({ id: req.body.id });
        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }
        res.json({ success: true, name: deletedProduct.name });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};


exports.getAllProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({});
        
        res.json({ success: true, products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getNewCollection = async (req, res, next) => {
    try {
        const products = await ProductModel.find({});
        const newCollection = products.slice(-8);
        res.json({ success: true, newCollection });
    } catch (error) {
        console.error('Error fetching new collection:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

exports.getPopularProducts = async (req, res, next) => {
    try {
        const products = await ProductModel.find({ category: "Road Bikes" });
        const popularProducts = products.slice(0, 4);
        res.json({ success: true, popularProducts });
    } catch (error) {
        console.error('Error fetching popular products:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
};

