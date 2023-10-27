import {model, Schema} from 'mongoose';

const productSchema = new Schema(
    {
    name :{
        type :  String,
        required : true
    },
    price : {
        type :  Number,
        required : true
    },
    description:{
        type :  String,
        required : true
    },
    brand :{
        type :  String,
        required : true
    },
    productImage:{
        type :  String,
        required : true
    },
}, {
    timestamps : true
});

const Product = model('Product' , productSchema);

export default Product;