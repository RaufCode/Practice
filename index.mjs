import express from "express"
import dotenv from "dotenv"
import { config } from "dotenv"
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
app.use(express.json())

let products = [
  {
    id: 1,
    name: "iPhone 13 Pro",
    category: "electronics",
    price: 1200,
    inStock: true
  },
  {
    id: 2,
    name: "Samsung Galaxy S22",
    category: "electronics",
    price: 950,
    inStock: false
  },
  {
    id: 3,
    name: "MacBook Pro 14",
    category: "electronics",
    price: 2400,
    inStock: true
  },
  {
    id: 4,
    name: "Wireless Headphones",
    category: "accessories",
    price: 150,
    inStock: true
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "accessories",
    price: 90,
    inStock: false
  },
  {
    id: 6,
    name: "Office Chair Pro",
    category: "furniture",
    price: 320,
    inStock: true
  },
  {
    id: 7,
    name: "Standing Desk",
    category: "furniture",
    price: 650,
    inStock: false
  },
  {
    id: 8,
    name: "USB-C Hub Pro",
    category: "electronics",
    price: 80,
    inStock: true
  },
  {
    id: 9,
    name: "Mechanical Keyboard",
    category: "accessories",
    price: 140,
    inStock: true
  }
]


app.get("/api/products", (req, res) => {
    let product_name = products
    const { q, category, minPrice, maxPrice, inStock, sort, limit } = req.query
    
    if (q) {
        product_name = product_name.filter(product => product.name.includes(q))
        
        
    }

    if (minPrice && maxPrice) {
        const minNumber = Number(minPrice)
        const maxNumber = Number(maxPrice)
        if (isNaN(minNumber) || isNaN(maxNumber)) {
            res.send({error: "prices can only be numbers and not strings"})
        }

// Filter products by price range
    product_name = product_name.filter(
        product => product.price >= minNumber && product.price <= maxNumber
    )
        
        
    }



    if (category) {
        product_name = product_name.filter(product => product.category.includes(category))
        
        
    }
    
    if (limit) {
        const limit_number = Number(limit)
        if (!Number.isNaN(limit_number)) {
            product_name = product_name.slice(0, limit_number)
        }
        
    }
    
    
    res.status(200).send({
        total: product_name.length,
        product_name
    })
})



app.listen(PORT, () => {
    console.log(`the app is running on port ${PORT}`)
})