import Users, { User } from'@/models/User';
import Products, { Product } from '@/models/Product';
import Orders, { Order, OrderItem} from '@/models/Order';
import dotenv from'dotenv';

 import mongoose from'mongoose';
 dotenv.config({ path: `.env.local`, override:true});
 const MONGODB_URI = process.env.MONGODB_URI;
 async function seed() {
 if(!MONGODB_URI) {
 throw new Error('Please define the MONGODB_URI environment variable inside .env.local'
 );
 }
 const opts= { bufferCommands: false };
 const conn= await mongoose.connect(MONGODB_URI, opts);
 if(conn.connection.db===undefined) {
 throw new Error('Could not connect');
 }

const products: Product[] = [
  {
  name: 'Earthen Bottle',
  price: 39.95,
  img: '/img/ecommerce-images/image-card-01.jpg',
  description: 'What a bottle!',
  },
  {
  name: 'Nomad Tumbler',
  price: 39.95,
  img: '/img/ecommerce-images/image-card-02.jpg',
  description: 'Yet another item',
  },
 {
  name: 'M5 CS F90',
  price: 175000,
  img: 'public/img/m5',
  description: 'Best german sedan and maybe the last not hybrid 5 series model',
 },
 {
  name: 'CLS 63s W218',
  price: 55000,
  img: 'public/img/cls63s',
  description: 'Most iconic Mercedes sport coupe luxury car',
 },
 {
  name: 'M6 Grand Coupe f06',
  price: 75000,
  img: 'public/img/m6',
  description: 'Last 6 Series model before 8 series beginning',
 },
 {
  name: 'Q7 V12 TDI',
  price: 80000,
  img: 'public/img/q7',
  description: 'Most unusual V12 engine with diesel fuel ',
 },
 {
  name: 'Phaeton V12',
  price: 67000,
  img: 'public/img/phaeton',
  description: 'At the same time the best and worse VW model',
 }
 ];

 //await conn.connection.db.dropDatabase();
 // Do things here.
 //const insertedProducts= await Products.create(products);
  const insertedProducts= await Products.find();
 console.log(JSON.stringify(insertedProducts, null, 2));
 console.log('Producto id =>', insertedProducts[0]._id)


 const orders: Order[] = [
  {
   date: new Date('2025-06-07'),
   address: 'Valle de los caidos nr.15',
   cardHolder: '0123456789',
   cardNumber: '1234',
   orderItems: [
    {
     product: insertedProducts[2]._id,
     qty: 1,
     price:175000
    },
    {
     product: insertedProducts[3]._id,
     qty: 1,
     price:55000
    }
   ]
  },
  {
   date: new Date('2024-12-12'),
   address: 'Valle de los caidos nr.27',
   cardHolder: '9876543210',
   cardNumber: '2345',
   orderItems: [
    {
     product: insertedProducts[3]._id,
     qty: 1,
     price:55000
    },
    {
     product: insertedProducts[4]._id,
     qty: 1,
     price:75000
    }
   ]
  },
  {
   date: new Date('2024-12-12'),
   address: 'Valle de los caidos nr.27',
   cardHolder: '9876543210',
   cardNumber: '2345',
   orderItems: [
    {
     product: insertedProducts[5]._id,
     qty: 1,
     price:75000
    },
    {
     product: insertedProducts[6]._id,
     qty: 1,
     price:85000
    }
   ]
  },
  {
   date: new Date('2025-01-08'),
   address: 'Valle de los caidos nr.3',
   cardHolder: '9876543210',
   cardNumber: '2345',
   orderItems: [
    {
     product: insertedProducts[6]._id,
     qty: 1,
     price:67000
    }
   ]
  }
 ]

 //const insertedOrders = await Orders.create(orders);
  const insertedOrders = await Orders.find();
 console.log('Orders created in local_mongoDB');
 console.log(JSON.stringify(insertedOrders, null, 2));
 const user: User= {
  email: 'johndoe@example.com',
  password:'1234',
  name: 'John',
  surname:'Doe',
  address:'123 Main St, 12345 New York, United States',
  birthdate:new Date('1970-01-01'),
  cartItems: [
  {
  product: insertedProducts[0]._id,
  qty:2,
  },
  {
  product: insertedProducts[1]._id,
  qty:5,
  },
  ],
  orders:[
    insertedOrders[0]._id, insertedOrders[1]._id
  ],
  };

 //const res= await Users.create(user);
  const res= await Users.find();
 console.log('User created in local_mongoDB');
 console.log(JSON.stringify(res, null, 2));


  const userProjection = {
 name: true,
 surname: true,
 };
 const productProjection = {
 name: true,
 price: true,
 };

 const retrievedUser = await Users
 .findOne({ email: 'johndoe@example.com' }, userProjection)
 .populate('cartItems.product', productProjection);

 const userOrders =
   await Users.findById('68dffc3c7762a61205b89356')
     .populate({path: 'orders', select: '-__v'})
     .select('-_id orders')
     .lean();
 console.log("ORDERS")
  const resu = await Orders.find();
 console.log(JSON.stringify(resu, null, 2));
 console.log(mongoose.modelNames())
 await conn.disconnect();
 }
 seed().catch(console.error);