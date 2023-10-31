import express from "express";
import mongoose from "mongoose";
import User from "./models/user.js";
import Product from "./models/product.js";
import Order from "./models/order.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    if (conn) {
        console.log(`MongoDB connected successfully`)
    }
}

// user signup 
app.post('/signup', async (req, res) => {
    const { name, address, mobile, email, password, gender } = req.body;
    try {
        const newUser = new User({
            name,
            address,
            mobile,
            email,
            password,
            gender

        })

        const savedUser = await newUser.save();


        res.json({
            success: true,
            data: savedUser,
            message: 'successfully SignUp'
        })
    }
    catch (err) {
        res.json({
            success: false,
            message: err.message
        })

    }
});


// user login
app.get('/login', async (req, res) => {
    const { email, password, mobile, name } = req.body;

    const user = await User.findOne({ email, password }).select('email name mobile');


    if (user == null) {
        return res.json({
            success: false,
            message: 'Login failed ! Please SignUp first'
        })
    }

    res.json({
        success: true,
        data: user,
        message: 'Login Sucessfully '
    })
});

// post (create data)
app.post('/product', async (req, res) => {
    const { name, description, price, brand, productImage } = req.body;
    try {
    if(!name || !description || !price || !brand || !productImage) {
        return res.json(
            {
                sucess: false,
                message: 'Enter all feilds                      '
            }
        );
    };

    const product = new Product({
        name,
        description,
        price,
        brand,
        productImage
    });

   

        const savedProduct = await product.save();

        res.json({
            success: true,
            data: savedProduct,
            message: "Successfully added new product"
        });

    }
    catch (err) {
        console.log(err.message);
    }
});



// get data
app.get('/products', async (req, res) => {
    const products = await Product.find();

    res.json({
        success: true,
        data: products,
        message: "Successfully fetched all products"
    });

})

// find data
app.get('/product/:_id', async (req, res) => {
    const { _id } = req.params;
    const product = await Product.findOne({ _id: _id });

    if (product == null) {
        return res.json({
            success: false,
            message: " Product not found"
        });
    }

    res.json({
        success: true,
        data: product,
        message: "Successfully found product"
    });

})

// put (update data)
app.put('/product/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price, brand, productImage } = req.body;

    await Product.updateOne({ _id: id },
        {
            $set: {
                name: name,
                brand: brand,
                description: description,
                price: price,
                productImage: productImage
            }
        }
    );

    const updatedProduct = await Product.findOne({ _id: id });

    res.json(
        {
            success: true,
            data: updatedProduct,
            message: "Sucessfully Updated Product"
        }
    )
});

// delete data 
app.delete('/product/:_id', async (req, res) => {
    const { _id } = req.params;
     await Product.deleteOne({ _id : _id });

    res.json({
        success: true,
        message: `Successfully deleted product ${_id}`
    });

})

// search data by query
app.get('/products/search', async (req, res) => {
    const { name } = req.query;
    const products = await Product.find({ name:{$regex: name, $options: "i"} });

    if (products == null) {
        res.json({
            success: false,
            message: " Product not found"
        });
    }

    res.json({
        success: true,
        data: products,
        message: "Successfully found product"
    });

})

// post order
app.post('/order', async (req, res) => {
    const { user, product, status, shippingAddress, deliveryCharges, quantity } = req.body;
    
    const order = new Order({
        user,
        product,
        deliveryCharges,
        shippingAddress,
        quantity,
        status
    });
   
    try {
        const savedOrder = await order.save();

        res.json({
            success: true,
            data: savedOrder,
            message: "Order created"
        });
    }

    catch (err) {
        console.log(err.message);
    }
});

// get orders
app.get('/orders', async (req, res) => {
    const orders = await Order.find();


    res.json({
        success: true,
        data: orders,
        message: "Successfully fetched all orders"
    });

});

// find by orderId
app.get('/order/:_id', async (req, res) => {
    const { _id } = req.params;
    const order = await Order.findById(_id).populate("user product");
    order.user.password = undefined;

    if (order == null) {
        return res.json({
            success: false,
            message: " Product not found"
        });
    }

    res.json({
        success: true,
        data: order,
        message: "Successfully found product"
    });
});

// get orders/user/:id (by orderID)
app.get("/orders/user/:id", async(req, res)=>{
    const {id} = req.params;
    const orders = await Order.find({user:id}).populate("user product");

    res.json({
        success:true,
        data:orders,
        message:"orders fetched successfully"
        })

});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
    connectDB();
});