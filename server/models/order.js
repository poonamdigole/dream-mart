import {model , Schema} from 'mongoose';

const orderSchema = new Schema (
    {
      user :{
        type : Schema.Types.ObjectId,
         ref:"user"
      },

      product : {
        type : Schema.Types.ObjectId,
         ref:"product"
      },

      shippingAddress : {
        type : String,
        required : true
      },

     deliveryCharges : {
        type :Number,
        default:0
      },

     status : {
        type : String,
        default: 'pending'
      },

      quantity :{
        type : Number,
       default:1
      }
    }
) ;

const Order = model("order" ,orderSchema);
export default Order;