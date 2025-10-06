import mongoose, { Schema, Types } from 'mongoose';
export interface CartItem {
  product: Types.ObjectId;
  qty: number
}

export interface User {
  email: string;
  password: string;
  name: string;
  surname: string;
  address: string;
  birthdate: Date;
  cartItems: CartItem[];
  orders: Types.ObjectId[]
}

const UserSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  surname:{
    type: String,
    required: true,
  },
  address:{
    type: String,
    required: true,
  },
  birthdate:{
    type: Date,
    required: true,
  },
  cartItems: [{
    _id: false,
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
    qty: {
      type: Number,
      min: 1,
      required: true,
    }
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: 'Order',
  }],
  // Fill with surname, address and birthdate here.
  // Skip cartItems and orders for now.
});
export default mongoose.models.User as mongoose.Model<User> ||
mongoose.model<User>('User', UserSchema);
