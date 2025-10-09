import Orders, { Order } from '@/models/Order';
import Products, { Product } from '@/models/Product';
import Users, { User, CartItem} from'@/models/User';
import bcrypt from 'bcrypt';

import connect from '@/lib/mongoose';
import mongoose, { Types } from 'mongoose';

console.log('Modelo Order registrado como:', Orders.modelName);
//mongoose.model('Order'); // fuerza el registro

console.log('Modelos registrados en handler.ts:', mongoose.modelNames());
export interface GetProductsResponse {
  products: (Product & { _id: Types.ObjectId })[];
}

export interface GetOrderResponse {
  orders: Order[];
}
export interface GetOrderByIdResponse {
  order: Order;
}
export interface ErrorResponse {
 error: string
 message: string
}
export interface CreateUserResponse {
 _id: Types.ObjectId
}

export interface GetUserResponse
  extends Pick<User, 'email' | 'name'| 'surname' | 'address' | 'birthdate'> {
  _id: Types.ObjectId
}

export interface GetProductResponse extends Pick<Product, 'name' | 'description' | 'img' | 'price'> {
  _id: Types.ObjectId
}
export interface CartItem2 {
  product: GetProductResponse;
  qty: number
}
export interface GetUserCartResponse {
  cartItems: CartItem[];
}

export interface CheckCredentialsResponse {
  _id: Types.ObjectId;
}







export async function checkCredentials(
  email: string,
  password: string,
  ): Promise<CheckCredentialsResponse | null>
{
  await connect();

  console.log("Dentro del handler")
  console.log("CONTRASEÑA")
  console.log(password)
  console.log("CORREO")
  console.log(email)
  const user = await Users.findOne({email:email});
  console.log("Contenido de user");
  console.log(user);

  console.log('COMPARACION DE CONTRASEÑAS')
  const match = await bcrypt.compare(password, user.password)
  console.log(match)
  if( match) return { _id: user._id}
  return null;
}


export async function createUser(user: {
  email: string
  password: string
  name: string
  surname: string
  address: string
  birthdate: Date
}): Promise<CreateUserResponse | null> {
  await connect()

  const prevUser = await Users.find({ email: user.email })
  if (prevUser.length !== 0) {
    return null
  }

  const hash = await bcrypt.hash(user.password, 10)

  const doc: User = {
    ...user,
    password: hash,
    birthdate: new Date(user.birthdate),
    cartItems: [],
    orders: [],
  }

  const newUser = await Users.create(doc)

  return {
    _id: newUser._id,
  }
}



export async function deleteCartItem(
  userId: Types.ObjectId | string,
  productId: Types.ObjectId | string,):
  Promise<GetUserCartResponse | ErrorResponse | null>
{

  const userCart = await Users.findById(userId);
  if(!userCart){
    return null
  }
  const index = userCart.cartItems.findIndex(
    item => item.product.equals(productId),
  )

  if(index !== -1) {
    userCart.cartItems.splice(index, 1);
  }
  await userCart.save();
  return await getUserCart(userId)
}

export async function putCartItem(
  userId: Types.ObjectId | string,
  productId: Types.ObjectId | string,
  qty: number):
  Promise<[boolean, GetUserCartResponse | ErrorResponse | null]>
{

  const userCart = await Users.findById(userId);
  if(!userCart){
    return [false, null]
  }
  const index = userCart.cartItems.findIndex(
    item => item.product.equals(productId),
  )
  if(index !== -1) {
    userCart.cartItems[index].qty = qty;
  }else{
    userCart.cartItems.push({
      product: new Types.ObjectId(productId),
      qty: qty,
    })
  }

  await userCart.save();
  return [index === -1, await getUserCart(userId)]
}

export async function getProducts():
  Promise<GetProductsResponse| null> {
  await connect();

  const productsProjection = {
    __v: false,
  };
  const products = await Products.find({}, productsProjection);

  return {
    products: products,
  };
}
export async function getProduct(productId: Types.ObjectId | string): Promise<GetProductResponse | null>{
  await connect();

  const productProjection ={
    name: true,
    description: true,
    img: true,
    price: true,
  }

  const product = await Products.findById(productId, productProjection);
  if(!product){
    return null;
  }
  return {
    _id: product._id,
    name: product.name,
    description: product.description,
    img: product.img,
    price: product.price,
  }
}

export async function getUser(
  userId: Types.ObjectId | string ):
  Promise<GetUserResponse | null> {
  await connect()
  const userProjection = {
    _id: true,
    email:true,
    name: true,
    surname:true,
    address:true,
    birthdate:true,
  }
  
  const user= await Users.findById(userId, userProjection)
  return user
}



export async function getOrder(
  userId: Types.ObjectId | string
): Promise<GetOrderResponse | ErrorResponse | null> {
  await connect();
  const result = await Users.findById(userId)
    .populate({ path: 'orders', select: '-__v' })
    .select('-_id orders')
    .lean();
  if (!result) return null;
  return {
    orders: result.orders as unknown as Order[]
  };
}

export async function getOrderById(
  userId: Types.ObjectId | string,
  orderId: Types.ObjectId | string
): Promise<Order | ErrorResponse | null> {
  await connect();
  const result = await Users.findById(userId)
    .populate(
      { path: 'orders',
        match: { _id: new mongoose.Types.ObjectId(orderId) },
        select: '-__v' })
    .select('-_id orders')
    .lean();
  if (!result || !result.orders || result.orders.length === 0) return null;

  return result.orders[0] as unknown as Order;
}

export async function createOrder
(userId: Types.ObjectId | string,
 order:
 {
   address: string,
   cardHolder: string,
   cardNumber: string,
 })
  :Promise< {_id: Types.ObjectId} | ErrorResponse >
  {
    await connect();
    const doc:Order = {
      ...order,
      date: new Date(),
      orderItems: []
    }
    const newOrder = await Orders.create(doc)

    const user = await Users.findById(userId)

    if(!user) throw new Error("User not found");

    user.orders.push(newOrder._id);
    await user.save();
    return {
      _id: newOrder._id
    };
  }





export async function getUserCart(
  userId: Types.ObjectId | string
): Promise<GetUserCartResponse | null> {
  await connect();

  const userCart = await Users.findById(userId)
    .select('-_id cartItems')
    .populate({
      path: 'cartItems.product',
      select: '_id name description img price'
    })
    .lean();

  if (!userCart) return null;

  return userCart;
}

