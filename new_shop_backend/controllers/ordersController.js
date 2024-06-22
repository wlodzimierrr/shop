const UserModel = require('../models/User');
const ProductModel = require('../models/Product');
const OrdersModel = require('../models/Orders')
const { STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY } = require('../config')
const stripe = require('stripe')(STRIPE_SECRET_KEY);

exports.getPublishableKey = (req, res) => {
  try {
    res.json({ publishable_key: STRIPE_PUBLISHABLE_KEY });
  } catch (error) {
    console.error('Error getting publishable key:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.createPaymentIntent = async (req, res) => {
  let { amount, currency } = req.body;
  amount = 100 * amount;

  if (!amount || !currency) {
    return res.status(400).json({ error: 'Amount and currency are required' });
  }

  const minimumAmount = 50;

  if (amount < minimumAmount) {
    return res.status(400).json({ error: 'Amount must be at least £0.30 GBP or equivalent in other currencies' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ['card'],
    });

    res.json({ client_secret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.saveOrder = async (req, res) => {
  let user = await UserModel.findById(req.user.id);
  const { paymentIntentId, items } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const products = await ProductModel.find({});
    
    if (paymentIntent.status === 'succeeded') {
      const itemsArray = Object.entries(items)
        .map(([key, value]) => ({
          id: parseInt(key),
          quantity: value
        }))
        .filter(item => item.id !== 0 && item.quantity > 0);

      const cart = itemsArray.map(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          return {
            id: item.id,
            name: product.name,
            quantity: item.quantity,
            price: product.new_price,
            total: item.quantity * product.new_price
          };
        } else {
          throw new Error(`Product with id ${item.id} not found`);
        }
      });

      const totalAmount = cart.reduce((total, item) => total + item.total, 0);

      const orderData = {
        orderId: paymentIntent.id,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method_types,
        status: paymentIntent.status,
        cart: cart,
        totalAmount: totalAmount,
        created_at: Date.now()
      };

      const emptyCart = {};
      for (let i = 1; i <= 300; i++) {
        emptyCart[i] = 0;
      }
    
      await UserModel.findByIdAndUpdate(
        req.user.id, 
        { 
          $push: { ordersData: orderData },
          cartData: emptyCart
        }
      );

      const order = new OrdersModel({
        orderId: paymentIntent.id,
        email:  user.email,
        personalDetails: user.personalDetails,
        orderData: orderData
    });

    await order.save();

      res.json({ success: true, orderId: paymentIntent.id });
    } else {
      res.status(400).json({ error: 'Payment not succeeded' });
    }
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.saveGuestOrder = async (req, res) => {

  const { paymentIntentId, items, personalDetails } = req.body;
 
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    const products = await ProductModel.find({});
    
    if (paymentIntent.status === 'succeeded') {
      const itemsArray = Object.entries(items)
        .map(([key, value]) => ({
          id: parseInt(key),
          quantity: value
        }))
        .filter(item => item.id !== 0 && item.quantity > 0);

      const cart = itemsArray.map(item => {
        const product = products.find(p => p.id === item.id);
        if (product) {
          return {
            id: item.id,
            name: product.name,
            quantity: item.quantity,
            price: product.new_price,
            total: item.quantity * product.new_price
          };
        } else {
          throw new Error(`Product with id ${item.id} not found`);
        }
      });

      const totalAmount = cart.reduce((total, item) => total + item.total, 0);

      const orderData = {
        orderId: paymentIntent.id,
        currency: paymentIntent.currency,
        paymentMethod: paymentIntent.payment_method_types,
        status: paymentIntent.status,
        cart: cart,
        totalAmount: totalAmount,
        created_at: Date.now()
      };

      const order = new OrdersModel({
        orderId: paymentIntent.id,
        email:  personalDetails.email,
        personalData: personalDetails,
        orderData: orderData
    });

    await order.save();

      res.json({ success: true, orderId: paymentIntent.id });
    } else {
      res.status(400).json({ error: 'Payment not succeeded' });
    }
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const userData = await UserModel.findById(req.user.id);
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, ordersData: userData.ordersData });
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
