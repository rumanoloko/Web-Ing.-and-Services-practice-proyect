import Users, { User } from'@/models/User';
import Products, { Product } from '@/models/Product';
import Orders, { Order, OrderItem} from '@/models/Order';
import dotenv from'dotenv';

 import mongoose, { Types } from 'mongoose'
import bcrypt from 'bcrypt'
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
  name: 'M5 CS F90',
  price: 175000,
  img: '/img/m5.png',
  description: 'Best german sedan and maybe the last not hybrid 5 series model',
 },
 {
  name: 'CLS 63s W218',
  price: 55000,
  img: '/img/cls63s.png',
  description: 'Most iconic Mercedes sport coupe luxury car',
 },
 {
  name: 'M6 Grand Coupe f06',
  price: 75000,
  img: '/img/m6.png',
  description: 'Last 6 Series model before 8 series beginning',
 },
 {
  name: 'Q7 V12 TDI',
  price: 80000,
  img: '/img/q7.png',
  description: 'Most unusual V12 engine with diesel fuel ',
 },
 {
  name: 'VW Phaeton V12',
  price: 67000,
  img: '/img/phaeton.png',
  description: 'At the same time the best and worse VW model',
 },
 {
  name: 'VW Arteon',
  price: 70000,
  img: '/img/arteon.png',
  description: 'No description',
 },
 {
  name: 'Toyota Century V12',
  price: 35000,
  img: '/img/century_v12.png',
  description: 'No description',
 },
 {
  name: 'Chrysler 300',
  price: 50000,
  img: '/img/chrysler300.png',
  description: 'No description',
 },
 {
  name: 'Alfa Romeo Giulia',
  price: 80000,
  img: '/img/giulia.png',
  description: 'No description',
 },
 {
  name: 'Bentley GT Continental',
  price: 110000,
  img: '/img/gt_continental.png',
  description: 'No description',
 }
 ,{
  name: 'Toyota Land Cruiser 300',
  price: 90000,
  img: '/img/landcruiser.png',
  description: 'No description',
 },
 {
  name: 'Mercedes W140',
  price: 23000,
  img: '/img/mercedes_w140.png',
  description: 'No description',
 },
 {
  name: 'Audi R8',
  price: 180000,
  img: '/img/r8.png',
  description: 'No description',
 },
 {
  name: 'Range Rover STR',
  price: 145000,
  img: '/img/range_rover_sport.png',
  description: 'No description',
 },
 {
  name: 'Ford Raptor',
  price: 118000,
  img: '/img/raptor.png',
  description: 'No description',
 },
 {
  name: 'Audi RS6',
  price: 120000,
  img: '/img/rs6.png',
  description: 'No description',
 },
 {
  name: 'Audi RS7',
  price: 127000,
  img: '/img/rs7.png',
  description: 'No description',
 },
 {
  name: 'Audi RSQ8',
  price: 135000,
  img: '/img/rsq8.png',
  description: 'No description',
 },
 {
  name: 'Audi S8',
  price: 155000,
  img: '/img/s8.png',
  description: 'No description',
 },
 {
  name: 'Alfa Romeo Stelvio',
  price: 76000,
  img: '/img/stelvio.png',
  description: 'No description',
 },
 {
  name: 'Jeep TrackHawk',
  price: 112000,
  img: '/img/trackhawk.png',
  description: 'No description',
 },
 {
  name: 'VW Tuareg',
  price: 89000,
  img: '/img/tuareg.png',
  description: 'No description',
 },
 {
  name: 'Land Rover Velar',
  price: 78000,
  img: '/img/velar.png',
  description: 'No description',
 },
 {
  name: 'BWW X6',
  price: 158000,
  img: '/img/x6.png',
  description: 'No description',
 },
 {
  name: 'Ultimate Torreto\'s Shopping Cart RT Deluxe Ultima Edition',
  price: 158000,
  img: '/img/x6.png',
  description: 'No description',
 }
 ];

 await conn.connection.db.dropDatabase();
 // Do things here.
 const insertedProducts= await Products.create(products);
 //const insertedProducts= await Products.find();


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

 const insertedOrders = await Orders.create(orders);
  //const insertedOrders = await Orders.find();
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
 const hash = await bcrypt.hash(user.password, 10)
  user.password = hash
 const res= await Users.create(user);
  //const res= await Users.find();


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
 await conn.disconnect();
 }
seed().catch(console.error);