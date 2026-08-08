const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");

dotenv.config();

const products = [
  { name: "React Infinity Run", brand: "Nike", description: "Engineered to help reduce injury and add comfort to every run", price: 13499, images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"], category: "Running", sizes: [7,8,9,10], colors: ["White","Black"], countInStock: 14 },
  { name: "Superstar", brand: "Adidas", description: "Iconic shell-toe sneaker with timeless style", price: 6499, images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["White","Black"], countInStock: 28, isFeatured: true },
  { name: "Metcon 8", brand: "Nike", description: "Built for weightlifting and cross-training performance", price: 10499, images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"], category: "Sports", sizes: [7,8,9,10,11], colors: ["Black","Red"], countInStock: 16 },
  { name: "Monk Strap", brand: "Clarks", description: "Elegant double monk strap shoe for formal wear", price: 7499, images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80"], category: "Formal", sizes: [8,9,10,11], colors: ["Brown"], countInStock: 9 },
  { name: "Sk8-Hi", brand: "Vans", description: "High-top skate shoe with padded collar for support", price: 5999, images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["Black","White"], countInStock: 20 },
  { name: "Speedgoat 5", brand: "Hoka", description: "Trail running shoe with aggressive grip and cushioning", price: 12999, images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"], category: "Running", sizes: [7,8,9,10], colors: ["Orange","Black"], countInStock: 11 },
  { name: "574 Core", brand: "New Balance", description: "Retro running-inspired sneaker for everyday wear", price: 6999, images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["Grey","Navy"], countInStock: 24 },
  { name: "Predator Accuracy", brand: "Adidas", description: "Precision football boots for control and accuracy", price: 14999, images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"], category: "Sports", sizes: [7,8,9,10], colors: ["Black","Blue"], countInStock: 8 },
  { name: "Cap Toe Oxford", brand: "Bata", description: "Traditional cap-toe formal shoe for business attire", price: 5499, images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"], category: "Formal", sizes: [7,8,9,10,11], colors: ["Black","Brown"], countInStock: 13 },
  { name: "Authentic", brand: "Vans", description: "The original Vans sneaker, simple and versatile", price: 3999, images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"], category: "Casual", sizes: [6,7,8,9], colors: ["Navy","White"], countInStock: 32 },
  { name: "Nimbus 25", brand: "Asics", description: "Plush cushioned running shoe for long distances", price: 11999, images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"], category: "Running", sizes: [7,8,9,10,11], colors: ["Blue","White"], countInStock: 17, isFeatured: true },
  { name: "RS-X", brand: "Puma", description: "Chunky retro sneaker with bold design elements", price: 7999, images: ["https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80"], category: "Sports", sizes: [7,8,9,10], colors: ["White","Multicolor"], countInStock: 19 },
  { name: "Wingtip Brogue", brand: "Clarks", description: "Detailed brogue pattern for a classic formal statement", price: 8499, images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80"], category: "Formal", sizes: [8,9,10,11], colors: ["Tan"], countInStock: 7 },
  { name: "Cortez", brand: "Nike", description: "Vintage-style running sneaker, a timeless classic", price: 5999, images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["White","Red"], countInStock: 21 },
  { name: "GT-2000", brand: "Asics", description: "Supportive running shoe designed for overpronation control", price: 9499, images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"], category: "Running", sizes: [7,8,9,10], colors: ["Black","Yellow"], countInStock: 13 },
  { name: "Air Force 1", brand: "Nike", description: "Legendary basketball-inspired sneaker with iconic silhouette", price: 7499, images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"], category: "Sports", sizes: [6,7,8,9,10,11], colors: ["White","Black"], countInStock: 26, isFeatured: true },
  { name: "Loafer Classic", brand: "Bata", description: "Slip-on formal loafer with a comfortable fit", price: 4499, images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"], category: "Formal", sizes: [7,8,9,10], colors: ["Black","Brown"], countInStock: 15 },
  { name: "Slip-On Checker", brand: "Vans", description: "Iconic checkerboard slip-on for laid-back style", price: 4999, images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["Black","White"], countInStock: 23 },
  { name: "Clifton 9", brand: "Hoka", description: "Lightweight everyday running shoe with soft landing", price: 10999, images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"], category: "Running", sizes: [7,8,9,10], colors: ["Grey","Pink"], countInStock: 16 },
  { name: "Court Vision", brand: "Nike", description: "Basketball-style sneaker built for everyday comfort", price: 6499, images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"], category: "Sports", sizes: [7,8,9,10], colors: ["White","Blue"], countInStock: 20 },
  { name: "Stan Smith", brand: "Adidas", description: "Minimalist tennis-inspired sneaker, an all-time classic", price: 6999, images: ["https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["White","Green"], countInStock: 27 },
  { name: "Bondi 8", brand: "Hoka", description: "Maximum cushioning running shoe for smooth long runs", price: 11499, images: ["https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80"], category: "Running", sizes: [7,8,9,10], colors: ["Black","White"], countInStock: 12 },
  { name: "Zoom Freak 5", brand: "Nike", description: "Basketball shoe built for explosive speed and cutting", price: 9999, images: ["https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80"], category: "Sports", sizes: [7,8,9,10,11], colors: ["Green","Black"], countInStock: 14 },
  { name: "Chelsea Boot", brand: "Clarks", description: "Sleek ankle boot suitable for smart-casual formal looks", price: 8999, images: ["https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80"], category: "Formal", sizes: [7,8,9,10,11], colors: ["Black","Tan"], countInStock: 10 },
  { name: "Classic Slip-On", brand: "Vans", description: "Effortless slip-on style with signature waffle sole", price: 4299, images: ["https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["Grey","Black"], countInStock: 25 },
  { name: "GEL-Nimbus Lite", brand: "Asics", description: "Lightweight cushioned trainer for daily comfort runs", price: 8999, images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80"], category: "Running", sizes: [7,8,9,10], colors: ["Blue","Grey"], countInStock: 18 },
  { name: "990v5", brand: "New Balance", description: "Premium made-in-USA running shoe with superior craftsmanship", price: 15999, images: ["https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80"], category: "Running", sizes: [7,8,9,10], colors: ["Grey"], countInStock: 9, isFeatured: true },
  { name: "Future Rider", brand: "Puma", description: "Retro-futuristic sneaker blending style and comfort", price: 6499, images: ["https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=800&q=80"], category: "Casual", sizes: [6,7,8,9,10], colors: ["White","Blue"], countInStock: 22 },
  { name: "Tribute Formal", brand: "Bata", description: "Sleek formal shoe designed for everyday office wear", price: 3999, images: ["https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80"], category: "Formal", sizes: [7,8,9,10,11], colors: ["Black"], countInStock: 20 },
  { name: "Air Max 270", brand: "Nike", description: "Bold sneaker with visible Air unit for all-day comfort", price: 11999, images: ["https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80"], category: "Sports", sizes: [7,8,9,10,11], colors: ["Black","White"], countInStock: 15, isFeatured: true },
];

const importData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.insertMany(products);
    console.log(`✅ ${products.length} products added successfully! (existing products kept)`);
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();