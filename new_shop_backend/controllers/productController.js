const ProductModel = require('../models/Product');
const ProductModelInstance  = new ProductModel();

exports.addProduct = async (req, res) => {
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
    
        const product = new ProductModelInstance({
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
        next(error);
    }
};

exports.deleteProduct = async (req, res) => {
    try{
        await Product.findOneAndDelete({ id: req.body.id });
        res.json({ success: true, name: req.body.name });
    } catch (error) {
        next(error);
    }
};

exports.getAllProducts = async (req, res) => {
    try{
        let products = await ProductModel.find({});
        res.send(products);
    } catch (error) {
        next(error)
    }
};

exports.getNewCollection = async (req, res) => {
    try{
        let products = await ProductModel.find({});
        let newCollection = products.slice(-8);
        res.send(newCollection);
    } catch (error) {
        next(error);
    }
};

exports.getPopularProducts = async (req, res) => {
    try{
        let products = await ProductModel.find({ category: "category1" });
        let popularProducts = products.slice(0, 4);
        res.send(popularProducts);
    } catch (error) {
        next(error)
    }
};
