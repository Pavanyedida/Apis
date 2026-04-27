# 🚀 E-Commerce Backend API Documentation

## 🌐 Base URL

```
http://localhost:3000
```

# 🔐 Authentication APIs

## 📌 Register User

```
POST /api/userRoutes/register
```

### 📥 Request Body

```json
{
  "name": "pavan",
  "email": "pavan@gmail.com",
  "password": "123456"
}
```

### 📤 Response

```json
{
  "message": "account created",
  "user": {
    "_id": "id",
    "name": "pavan",
    "email": "pavan@gmail.com",
    "role": "admin"
  }
}
```

---

## 📌 Login User

```
POST /api/userRoutes/login
```

### 📥 Request Body

```json
{
  "email": "pavan@gmail.com",
  "password": "123456"
}
```

### 📤 Response

```json
{
  "message": "login done",
  "webToken": "jwt_token"
}
```

---

## 🔑 Authentication Header

```
Authorization: Bearer <token>
```

---

# 👤 Profile APIs

## 📌 Get Profile

```
GET /api/profileRoutes/profile/:id
```

### 📤 Response

```json
{
  "user": {
    "_id": "id",
    "name": "pavan",
    "email": "pavan@gmail.com"
  }
}
```

---

## 📌 Update Profile

```
PUT /api/profileRoutes/updateprofile/:id
```

### 📥 Request Body

```json
{
  "name": "Updated",
  "email": "new@gmail.com",
  "password": "123456"
}
```

---

# 🛒 Product APIs

## 📌 Get All Products

```
GET /api/productRoutes/products
```

👉 Requires Token

---

## 📌 Get Single Product

```
GET /api/productRoutes/products/:id
```

---

## 📌 Add Product (Admin)

```
POST /api/productRoutes/products
```

### 📥 Form Data

| Field       | Type   |
| ----------- | ------ |
| title       | text   |
| description | text   |
| price       | number |
| image       | file   |

---

## 📌 Update Product

```
PUT /api/productRoutes/products/:id
```

---

## 📌 Delete Product

```
DELETE /api/productRoutes/products/:id
```

---

# 🛍️ Cart APIs

## 📌 Get Cart

```
GET /api/cartRoutes/cart
```

---

## 📌 Add to Cart

```
POST /api/cartRoutes/addcart
```

### 📥 Request Body

```json
{
  "productId": "product_id"
}
```

---

# 💳 Payment APIs

## 📌 Checkout

```
POST /api/paymentRoutes/checkout
```

### 📤 Response

```json
{
  "message": "checkout created",
  "order": {},
  "totalAmount": 1000
}
```

---

## 📌 Verify Payment

```
POST /api/paymentRoutes/verifypayment
```

### 📥 Request Body

```json
{
  "razorpay_order_id": "id",
  "razorpay_payment_id": "id",
  "razorpay_signature": "signature"
}
```

---

# 📦 Order APIs

## 📌 Get All Orders

```
GET /api/orderRoutes/orders
```

---

## 📌 Get Single Order

```
GET /api/orderRoutes/orders/:id
```

---

# 🔄 Complete Flow

```
Register → Login → Token →
Products → Cart → Checkout →
Payment → Verify → Order
```
---

# ⚠️ Important Notes

* All APIs (except register/login) require token
* Admin required for product create/update/delete
* Password hashed using bcrypt
* Payment via Razorpay
* Images uploaded using multer + cloudinary

---

# 🧠 Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* bcrypt
* Razorpay
* Multer
* Cloudinary

# 🎯 Summary

This backend supports complete e-commerce flow including authentication, product management, cart, payment, and order handling.
