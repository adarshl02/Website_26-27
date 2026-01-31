# Website 26-27 Project

**A comprehensive college club website** designed for managing events, memberships, art community engagement, and volunteer coordination. This full-stack application has successfully handled **400+ student payments** through Razorpay integration and achieved **50+ downloads** on the Google Play Store.

**Google Play Store**: [Download the App](https://play.google.com/store/apps/details?id=com.clubpratibimb.twa)


## 📋 Project Structure

```
├── Backend/          # Node.js/Express REST API
├── Frontend/         # React + Vite application
└── README.md
```

## 🛠️ Technology Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (with Knex.js for migrations)
- **Authentication**: JWT
- **File Upload**: Cloudinary
- **Payment Gateway**: Razorpay
- **Email Service**: Custom email templates
- **Deployment**: Docker & Vercel

### Frontend
- **Framework**: React 18+ with Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux
- **Authentication**: Firebase
- **HTTP Client**: Custom API service
- **Build Tool**: Vite
- **Linting**: ESLint
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL database
- Git

### Backend Setup

1. Navigate to the Backend directory:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the Backend folder with:
```
DATABASE_URL=your_postgresql_url
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
JWT_SECRET=your_jwt_secret
```

4. Run database migrations:
```bash
npm run migrate
```

5. Start the server:
```bash
npm start
```

The API will be available at `http://localhost:3000` (or your configured port)

### Frontend Setup

1. Navigate to the Frontend directory:
```bash
cd Frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create a `.env` file in the Frontend folder with:
```
VITE_API_URL=http://localhost:3000
VITE_FIREBASE_CONFIG=your_firebase_config
```

4. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## 📁 Backend Features & Structure

### Routes
- **Admin Routes** (`admin.routes.js`) - Admin panel management
- **Art Routes** (`art.routes.js`) - Art community features
- **Auth Routes** (`auth.routes.js`) - Authentication endpoints
- **Events Routes** (`events.routes.js`) - Event management
- **Recruitments Routes** (`recruitments.routes.js`) - Recruitment system
- **User Routes** (`user.routes.js`) - User profile management
- **Volunteers Routes** (`volunteers.routes.js`) - Volunteer management

### Controllers
- Admin management
- Art community posts
- Event handling
- Final round evaluations
- Recruitment workflows
- User operations
- Volunteer coordination

### Utilities
- Email functions with HTML templates
- Error handling
- Response formatting
- User verification
- Notification system
- Graceful shutdown management

## 🎨 Frontend Features & Structure

### Pages
- **Home** - Landing page
- **Events** - Event listing and details
- **Art Community** - Art showcase
- **Membership** - Membership information
- **Profile** - User profile
- **Team** - Team information
- **Sponsors** - Sponsors page
- **Blogs** - Blog posts
- **Sign Up** - Registration

### Components
- Admin components for dashboard and management
- Reusable UI components (Acernity UI, Magic UI)
- General components for layout and features

### Services
- Centralized API service for backend communication
- Redux store for state management

## 🗄️ Database

The project uses PostgreSQL with Knex.js for database management.

### Migrations
Located in `Backend/migrations/`, migrations handle:
- Database schema creation
- Table initialization
- Schema updates

Run migrations:
```bash
npm run migrate
```

Rollback:
```bash
npm run migrate:rollback
```

## 🐳 Docker Deployment

Build the Docker image:
```bash
cd Backend
docker build -t website-26-27-backend .
```

Run the container:
```bash
docker run -p 3000:3000 website-26-27-backend
```

## 📧 Email Templates

The project includes HTML email templates for:
- Welcome emails
- Art community notifications
- Event notifications
- Recruitment updates
- Volunteer notifications

Templates are located in `Backend/templates/`

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for API authentication and Firebase for frontend authentication.

Auth middleware in `Backend/middleware/auth.middleware.js` protects routes.

## 🚀 Deployment

### Backend Deployment (Vercel)
```bash
cd Backend
vercel deploy
```

### Frontend Deployment (Vercel)
```bash
cd Frontend
vercel deploy
```

Configuration files are already set up:
- `Backend/vercel.json`
- `Frontend/vercel.json`

## 📝 Available Scripts

### Backend
- `npm start` - Start the server
- `npm run migrate` - Run database migrations
- `npm run migrate:rollback` - Rollback migrations

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🤝 Contributing

1. Create a new branch for your feature
2. Make your changes
3. Test thoroughly
4. Submit a pull request with detailed description

## 📄 License

[Add your license information here]

## 📞 Support

For issues and questions:
- Check existing documentation
- Open an issue on the repository
- Contact the development team

## 🔄 Project Status

Active Development - Features and improvements are ongoing.

---

**Last Updated**: January 2026
