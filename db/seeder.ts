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
  name: 'BMW M5 CS F90',
  price: 175000,
  img: '/img/m5.png',
  description:'The M5 CS is BMW’s most powerful production sedan ever, boasting a 4.4L twin-turbo V8 with 635 hp. It features lightweight carbon fiber components, gold bronze accents, and a track-tuned suspension. With only four seats and blistering performance, it’s a rare blend of luxury and motorsport engineering.'},
 {
  name: 'Mercedes-Benz CLS 63s W218',
  price: 65000,
  img: '/img/cls63s.png',
  description: 'A sleek four-door coupe with AMG performance, the CLS 63s W218 delivers elegance and aggression. Its handcrafted V8 engine produces thunderous power with refined handling. The sculpted body and luxurious cabin make it a standout in Mercedes’ performance lineup.',
 },
 {
  name: 'BMW M6 Grand Coupe F06',
  price: 75000,
  img: '/img/m6.png',
  description: 'The M6 Gran Coupe combines the elegance of a four-door coupe with M-level performance. Powered by a twin-turbo V8, it offers thrilling acceleration and precise handling. Its long, low stance and premium interior make it both a grand tourer and a track weapon.',
 },
 {
  name: 'AUDI Q7 V12 TDI',
  price: 80000,
  img: '/img/q7.png',
  description: 'One of the rare diesel V12s ever made, the Q7 V12 TDI is a torque monster. With 500 hp and over 1,000 Nm of torque, it’s both powerful and smooth. Its spacious cabin and understated design hide supercar-level performance in SUV form.',
 },
 {
  name: 'VW Phaeton V12',
  price: 67000,
  img: '/img/phaeton.png',
  description: 'Volkswagen’s bold attempt at ultra-luxury, the Phaeton V12 was over-engineered and underappreciated. Featuring a 6.0L W12 engine and limousine-level comfort, it rivaled Mercedes and BMW. Though a commercial flop, it remains a cult classic among enthusiasts.',
 },
 {
  name: 'VW Arteon',
  price: 70000,
  img: '/img/arteon.png',
  description: 'The Arteon is Volkswagen’s flagship liftback sedan, blending sporty design with premium features. Its wide stance and frameless doors give it a coupe-like silhouette. Inside, it offers advanced tech, spacious comfort, and up to 300 hp in R-Line trims.',
 },
 {
  name: 'Toyota Century V12',
  price: 35000,
  img: '/img/century_v12.png',
  description: 'Japan’s ultimate luxury car, the Century V12 is hand-built and reserved for dignitaries and royalty. Powered by a silky-smooth 5.0L V12, it offers unmatched refinement and quietness. Its understated design hides a cabin filled with wool upholstery, real wood trim, and meticulous craftsmanship.',
 },
 {
  name: 'Chrysler 300',
  price: 50000,
  img: '/img/chrysler300.png',
  description: 'A bold American sedan with muscle car DNA, the Chrysler 300 offers V6 and HEMI V8 options. Its aggressive styling and spacious interior make it a favorite for comfort and power. It blends old-school charm with modern tech.',
 },
 {
  name: 'Alfa Romeo Giulia',
  price: 80000,
  img: '/img/giulia.png',
  description: 'The Giulia is a driver’s dream, combining Italian flair with razor-sharp handling. The Quadrifoglio variant features a Ferrari-derived V6 and track-ready dynamics. Its sculpted body and passionate performance make it a standout in the compact luxury segment.',
 },
 {
  name: 'Bentley GT Continental',
  price: 110000,
  img: '/img/gt_continental.png',
  description: 'The Continental GT blends British elegance with raw power, offering a handcrafted interior and a choice of V8 or W12 engines. Its grand touring capabilities make it ideal for long-distance luxury travel. With cutting-edge tech and timeless design, it’s a symbol of prestige and performance.',
 }
 ,{
  name: 'Toyota Land Cruiser 300',
  price: 90000,
  img: '/img/landcruiser.png',
  description: 'The Land Cruiser 300 is a modern evolution of Toyota’s legendary off-roader. With a twin-turbo V6 and advanced 4WD systems, it conquers any terrain. Its rugged capability is matched by a luxurious, tech-filled interior.',
 },
 {
  name: 'Mercedes-Benz W140',
  price: 23000,
  img: '/img/mercedes_w140.png',
  description: 'Known as the “S-Class tank,” the W140 was over-engineered for comfort and safety. It introduced innovations like double-glazed windows and soft-close doors. Built like a fortress, it remains a symbol of 1990s German excellence.',
 },
 {
  name: 'Audi R8',
  price: 180000,
  img: '/img/r8.png',
  description: 'Audi’s halo supercar, the R8 features a naturally aspirated V10 and quattro AWD. It offers exotic looks, blistering performance, and daily drivability. With motorsport roots and luxury refinement, it’s a true enthusiast’s machine.',
 },
 {
  name: 'Range Rover SVR',
  price: 145000,
  img: '/img/range_rover_sport.png',
  description: 'The Range Rover Sport STR blends off-road capability with high-performance V8 power. Its aggressive styling and dynamic handling make it a luxury SUV with attitude. Inside, it’s packed with tech and premium materials.',
 },
 {
  name: 'Audi RS6',
  price: 120000,
  img: '/img/rs6.png',
  description: 'The RS6 Avant is a supercar disguised as a family wagon, packing a 4.0L twin-turbo V8 with 600 hp. It rockets from 0–100 km/h in under 3.6 seconds and features Audi’s legendary quattro all-wheel drive. With aggressive styling and everyday practicality, it’s the ultimate sleeper performance car.',
 },
 {
  name: 'Audi RS7',
  price: 127000,
  img: '/img/rs7.png',
  description: 'The RS7 is a luxury sportback with coupe-like styling and supercar performance. Its 591 hp V8 and adaptive suspension deliver thrilling dynamics. It’s a perfect blend of elegance, tech, and raw power.',
 },
 {
  name: 'Audi RSQ8',
  price: 135000,
  img: '/img/rsq8.png',
  description: 'Sharing DNA with the Lamborghini Urus, the RSQ8 is a performance SUV with 591 hp. It offers aggressive styling, quattro AWD, and a luxurious cabin. A super-SUV that’s as comfortable on the autobahn as it is on twisty roads.',
 },
 {
  name: 'Audi S8',
  price: 155000,
  img: '/img/s8.png',
  description: 'The S8 is Audi’s flagship performance sedan, combining stealthy looks with 563 hp. It features predictive suspension, quattro AWD, and a tech-rich interior. Executive luxury meets thrilling speed in this understated powerhouse.',
 },
 {
  name: 'Alfa Romeo Stelvio',
  price: 76000,
  img: '/img/stelvio.png',
  description: 'The Stelvio is a sporty Italian SUV with sharp handling and distinctive design. The Quadrifoglio variant boasts a Ferrari-derived V6 and blistering performance. It’s a crossover that drives like a sports car.',
 },
 {
  name: 'Jeep Grand Cherokee Trackhawk',
  price: 112000,
  img: '/img/trackhawk.png',
  description: 'This SUV is powered by a supercharged 6.2L Hellcat V8 producing 707 hp, making it one of the fastest SUVs ever built. It combines brutal acceleration with Jeep’s off-road heritage and luxury interior. A true muscle car in SUV form, it’s as wild as it is refined.',
 },
 {
  name: 'VW Tuareg',
  price: 89000,
  img: '/img/tuareg.png',
  description: 'The Touareg is a premium midsize SUV sharing its platform with Porsche and Audi. It offers refined diesel or hybrid powertrains, a plush interior, and off-road capability. Understated yet sophisticated, it’s a hidden gem.',
 },
 {
  name: 'Land Rover Velar',
  price: 78000,
  img: '/img/velar.png',
  description: 'The Velar is Land Rover’s design-forward SUV, featuring a minimalist interior and sleek exterior. It balances luxury, tech, and off-road ability. A stylish choice for those who want refinement with adventure.',
 },
 {
  name: 'BWW X6',
  price: 158000,
  img: '/img/x6.png',
  description: 'The X6 pioneered the coupe-SUV segment with bold styling and dynamic performance. M variants deliver supercar-level speed in a high-riding package. It’s aggressive, luxurious, and unapologetically different.',
 },
 ];

 await conn.connection.db.dropDatabase();
 // Do things here.
 const insertedProducts= await Products.create(products);
 //const insertedProducts= await Products.find();


 const orders: Order[] = [
  {
   date: new Date('2025-06-07'),
   address: 'Calle Simón Sagra Hortega nr.15',
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
   address: 'Calle Simón Sagra Hortega nr.27',
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
   address: 'Calle Simón Sagra Hortega nr.27',
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
   address: 'Calle Simón Sagra Hortega nr.3',
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
  {
   product: insertedProducts[2]._id,
   qty:1,
  },
  {
   product: insertedProducts[5]._id,
   qty:2,
  }
  ],
  orders:[
    insertedOrders[0]._id, insertedOrders[1]._id
  ],
  };

  const user2: User= {
   email: 'vlad@example.com',
   password:'1234',
   name: 'Vlad',
   surname:'Pasat',
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
    {
     product: insertedProducts[2]._id,
     qty:1,
    },
    {
     product: insertedProducts[5]._id,
     qty:2,
    }
   ],
   orders:[
    insertedOrders[1]._id
   ],
  };

  const user3: User= {
   email: 'petru@example.com',
   password:'1234',
   name: 'Petru',
   surname:'Vlad',
   address:'123 Main St, 12345 New York, United States',
   birthdate:new Date('1970-01-01'),
   cartItems: [
    {
     product: insertedProducts[0]._id,
     qty:2,
    },
    {
     product: insertedProducts[7]._id,
     qty:5,
    },
    {
     product: insertedProducts[2]._id,
     qty:1,
    },
    {
     product: insertedProducts[6]._id,
     qty:2,
    }
   ],
   orders:[
    insertedOrders[0]._id
   ],
  };
  let hash = await bcrypt.hash(user.password, 10)
  user.password = hash
  hash = await bcrypt.hash(user2.password, 10)
  user2.password = hash
  hash = await bcrypt.hash(user3.password, 10)
  user3.password = hash
 const res= await Users.create(user);
  const res2= await Users.create(user2);
  const res3= await Users.create(user3);
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
