# Kicks & Co - E-commerce Shoe Store

A modern e-commerce application for shoes built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and styled with Tailwind CSS.

## Features

- **Product Listing**: Display shoes with images, prices, and details
- **Filtering**: Filter by category, gender, price range, and availability
- **Search**: Search products by name
- **Sorting**: Sort by price, name, and creation date
- **Responsive Design**: Mobile-friendly interface
- **Real-time Updates**: Live filtering and sorting

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Frontend**: React.js, Tailwind CSS
- **Database**: MongoDB

## Project Structure

```
e-commerce/
├── app.js                 # Main server file
├── package.json           # Backend dependencies
├── .env                   # Environment variables
├── server/
│   ├── models/
│   │   └── Product.js     # Product schema
│   └── routes/
│       └── products.js    # API routes
└── client/
    ├── src/
    │   ├── components/    # React components
    │   ├── App.js         # Main React app
    │   └── index.css      # Global styles
    ├── package.json       # Frontend dependencies
    └── tailwind.config.js # Tailwind configuration
```

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd client
   npm install
   cd ..
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/ecommerce-shoes
   PORT=5000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system.

## Running the Application

### Option 1: Run Both Servers Together
```bash
npm run dev
```

### Option 2: Run Servers Separately
```bash
# Terminal 1 - Backend
node app.js

# Terminal 2 - Frontend
cd client
npm start
```

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create new product
- `PUT /api/products/update-brand` - Update brand name

### Query Parameters for Products
- `search` - Search by product name
- `category` - Filter by category
- `gender` - Filter by gender
- `minPrice` / `maxPrice` - Price range filter
- `isNew` / `isJustIn` - Filter by availability
- `sortBy` - Sort field (price, name, createdAt)
- `sortOrder` - Sort order (asc, desc)
- `page` - Page number for pagination
- `limit` - Items per page

## Adding Products

Use Postman or any API client to add products:

**POST** `http://localhost:5000/api/products`

Example body:
```json
{
  "name": "Air Max 270",
  "category": "Lifestyle",
  "gender": "Men",
  "price": 15000,
  "originalPrice": 18000,
  "colors": [
    {
      "name": "White/Black",
      "hex": "#FFFFFF"
    }
  ],
  "sizes": ["7", "8", "9", "10"],
  "images": [
    {
      "url": "https://example.com/image.jpg",
      "alt": "Air Max 270 White"
    }
  ],
  "description": "Comfortable running shoes",
  "brand": "Kicks & Co",
  "isNew": true,
  "isJustIn": false,
  "rating": 4.5,
  "reviewCount": 128,
  "inStock": true,
  "tags": ["running", "comfortable"]
}
```

## Customization

- **Brand Name**: Change "Kicks & Co" in `server/models/Product.js` and `client/src/components/Header.js`
- **Colors**: Modify Tailwind config in `client/tailwind.config.js`
- **Styling**: Update CSS in `client/src/index.css`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE). 