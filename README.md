# ShopNow - Professional E-Commerce Application

A modern, full-stack e-commerce application built with Next.js 16 (App Router) and Express.js. Features authentication, product browsing, and protected admin functionality for managing products.

## 🚀 Technologies Used

- **Frontend**: Next.js 16.1.1 (App Router), React 19.2.3, Tailwind CSS 4
- **Backend**: Express.js 5.2.1
- **Authentication**: NextAuth.js 4.24.13 (Credentials & Google OAuth)
- **Data Storage**: JSON-based file storage (Server-side)
- **Styling**: Tailwind CSS with custom animations

---

## ✨ Features Implemented

### 1. Landing Page (Public)
A professional, comprehensive homepage with **7 distinct sections**:

1. **Hero Section** - Welcome message with call-to-action buttons
2. **About Section** - Company story with statistics and mission
3. **Features Section** - Key benefits (Free Shipping, Secure Payment, Easy Returns)
4. **Services / Items Preview Section** - Product categories showcase
5. **Why Choose Us Section** - Value propositions and guarantees
6. **Testimonials / Reviews Section** - Customer reviews with star ratings
7. **Contact / Call to Action Section** - Newsletter subscription and contact information

- ✅ No authentication required
- ✅ Responsive design for all devices
- ✅ Professional UI/UX with modern animations

### 2. Authentication System

#### Core Implementation:
- ✅ **Mock Login** - Hardcoded credentials stored in Express server
- ✅ **Cookie-based Sessions** - NextAuth.js JWT tokens stored in HTTP-only cookies
- ✅ **Protected Routes** - Middleware protection for authenticated pages
- ✅ **Login Redirect** - Automatically redirects to `/items` after successful login

#### Credentials:
- **Email**: `admin@luxedecor.com`
- **Password**: `securepassword123`

#### Optional Features (Implemented):
- ✅ **NextAuth.js Integration** - Full authentication framework
- ✅ **Google OAuth Provider** - Social login option (requires Google Cloud setup)
- ✅ **Credentials Provider** - Email/password authentication

**Authentication Flow**:
1. User enters credentials on `/login` page
2. Credentials are validated against Express API (`/api/login`)
3. NextAuth.js creates a JWT session stored in cookies
4. User is redirected to `/items` page
5. Protected routes check authentication status via middleware

### 3. Item List Page (Public)
- ✅ **Public Access** - No login required to browse products
- ✅ **API Integration** - Fetches items from Express server (`GET /api/items`)
- ✅ **Product Cards** - Displays:
  - Product image
  - Name and category
  - Description (truncated)
  - Price
  - Link to details page
- ✅ **Responsive Grid** - 3-column layout on desktop, stacks on mobile
- ✅ **Loading States** - Built-in Next.js loading UI
- ✅ **Error Handling** - Error boundary for API failures

### 4. Item Details Page (Public)
- ✅ **Dynamic Routing** - `/items/[id]` pattern
- ✅ **Full Product Information**:
  - Large product image
  - Product name and category
  - Complete description
  - Price with free shipping indicator
  - "Add to Cart" and wishlist buttons
- ✅ **404 Handling** - Proper not-found page for invalid IDs
- ✅ **Server-side Fetching** - SEO-friendly data loading

### 5. Protected Page: Add Item
- ✅ **Authentication Required** - Only accessible when logged in
- ✅ **Form Validation** - Client and server-side validation
- ✅ **Product Creation** - Saves to MongoDB database (or JSON file if MongoDB not configured)
- ✅ **Image Preview** - Real-time preview of product image
- ✅ **Toast Notifications** - Success/error feedback with animations
- ✅ **Auto-redirect** - Redirects to items page after successful creation
- ✅ **Unauthorized Redirect** - Redirects to login if not authenticated

**Form Fields**:
- Product Name (required)
- Price (required, numeric)
- Category (dropdown selection)
- Image URL (optional, with preview)
- Description (textarea)

### 6. Express.js Backend API

**Endpoints**:

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/health` | Health check | No |
| GET | `/api/items` | Get all products | No |
| GET | `/api/items/:id` | Get single product | No |
| POST | `/api/items` | Create new product | No (should be protected) |
| POST | `/api/login` | Authenticate user | No |

**Data Storage**: 
- MongoDB (if `MONGODB_URI` is configured) - Collection: `items`
- JSON file fallback (`server/data/items.json`) - Used if MongoDB is not configured

---

## 📋 Setup & Installation

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Environment Variables
Create a `.env` file in the root directory:

```env
# Next.js
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-generate-with-openssl-rand-base64-32

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3001/api
PORT=3001
CORS_ORIGIN=http://localhost:3000

# Authentication (Optional - defaults provided)
ADMIN_EMAIL=admin@luxedecor.com
ADMIN_PASSWORD=securepassword123

# MongoDB Configuration (Optional - uses JSON file if not provided)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority
MONGODB_NAME=shopnow
# Or for local MongoDB:
# MONGODB_URI=mongodb://localhost:27017

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Note**: If MongoDB URI is not provided, the application will automatically use JSON file storage (`server/data/items.json`). See `MONGODB_SETUP.md` for detailed MongoDB setup instructions.

**Generate NEXTAUTH_SECRET**:
```bash
openssl rand -base64 32
```

**Google OAuth Setup** (Required for Google Sign-In):
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** or **Google Identity API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client ID**
5. Set Application type to **Web application**
6. Add the following **Authorized redirect URIs**:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`
7. Copy the **Client ID** and **Client Secret** to your `.env` file

**Important**: Make sure `NEXTAUTH_URL` in your `.env` matches your application URL (e.g., `http://localhost:3000` for development).

### Step 3: Run the Application

**Option 1: Run Both Servers Together** (Recommended)
```bash
npm run dev:all
```

**Option 2: Run Servers Separately**

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

### Step 4: Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **API Health Check**: http://localhost:3001/api/health

---

## 🛣️ Route Summary

| Route | Type | Description | Auth Required |
|-------|------|-------------|---------------|
| `/` | Public | Landing page with 7 sections | ❌ |
| `/login` | Public | Login page (Credentials & Google OAuth) | ❌ |
| `/items` | Public | Product listing page | ❌ |
| `/items/[id]` | Public | Individual product details | ❌ |
| `/add-item` | Protected | Form to add new products | ✅ |

---

## 🎯 Key Implementation Details

### Authentication Flow
1. User visits protected route → Middleware checks session
2. If unauthenticated → Redirect to `/login`
3. User submits credentials → Validated via Express API
4. NextAuth creates JWT session → Stored in HTTP-only cookie
5. User redirected to intended page

### Data Flow
```
Frontend (Next.js) → Express API → JSON File Storage
```

### Protected Routes
- Uses Next.js middleware (if implemented) or client-side session checks
- `useSession()` hook from NextAuth.js for authentication state
- Automatic redirect to login for unauthenticated users

### Toast Notifications
- Custom implementation with CSS animations
- Auto-dismiss after 5 seconds
- Manual close button available
- Success (green) and Error (red) variants

---

## 📁 Project Structure

```
jobproject/
├── src/
│   ├── app/
│   │   ├── add-item/          # Protected: Add product form
│   │   ├── api/
│   │   │   └── auth/          # NextAuth.js API routes
│   │   ├── items/
│   │   │   ├── [id]/          # Dynamic: Product details
│   │   │   ├── page.js        # Product listing
│   │   │   ├── loading.js     # Loading state
│   │   │   └── error.js       # Error boundary
│   │   ├── login/             # Login page
│   │   ├── layout.js          # Root layout with Navbar/Footer
│   │   ├── page.js            # Landing page (7 sections)
│   │   └── providers.js       # NextAuth SessionProvider
│   ├── components/
│   │   ├── Navbar.js          # Navigation with auth state
│   │   ├── Footer.js          # Site footer
│   │   └── ProductCard.js     # Product card component
│   └── lib/
├── server/
│   ├── data/
│   │   └── items.json         # Product database (JSON)
│   └── server.js              # Express API server
├── .env                       # Environment variables
├── package.json
└── README.md
```

---

## 🔐 Test Credentials

For testing the authentication system:

- **Email**: `admin@luxedecor.com`
- **Password**: `securepassword123`

These credentials can be customized via environment variables:
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`

---

## 🎨 UI/UX Features

- **Responsive Design** - Mobile-first approach, works on all screen sizes
- **Modern Animations** - Smooth transitions and hover effects
- **Loading States** - Skeleton loaders and spinners
- **Error Handling** - User-friendly error messages
- **Toast Notifications** - Non-intrusive success/error feedback
- **Professional Styling** - Clean, modern design with Tailwind CSS

---

## 🚧 Optional Enhancements (Future)

- [ ] Shopping cart functionality
- [ ] User registration system
- [ ] Product search and filters
- [ ] Pagination for product listings
- [ ] Image upload functionality
- [ ] Product reviews and ratings
- [ ] Order management system
- [ ] Email notifications
- [ ] Payment integration (Stripe/PayPal)

---

## 📝 Notes

- The Express server uses JSON file storage for simplicity. For production, consider migrating to a database (MongoDB, PostgreSQL, etc.).
- Google OAuth requires additional setup in Google Cloud Console.
- All API calls use environment variables for flexibility across different environments.
- The application is optimized for both development and production builds.

---

## 🤝 Contributing

This is a demonstration project. Feel free to use it as a template or learning resource.

---

## 📄 License

This project is open source and available for educational purposes.

---

**Built with ❤️ using Next.js 16 and Express.js**
