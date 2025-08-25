# MERN_APP_CSTech
A complete full-stack web application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) for managing agents and distributing contact lists efficiently.

🌟 Features
🔐 Admin Authentication - Secure JWT-based login system

👥 Agent Management - Create, view, and manage agents

📊 CSV Upload & Processing - Upload and process CSV/XLSX files with validation

📦 Automatic Distribution - Intelligently distribute contacts among agents

🎨 Responsive Design - Mobile-friendly Bootstrap UI

🛡️ Role-Based Access - Admin and agent role permissions

📱 Modern UI - Clean and intuitive user interface

🛠️ Tech Stack
Frontend: React.js, Bootstrap, React Router, Axios

Backend: Node.js, Express.js, JWT Authentication

Database: MongoDB with Mongoose ODM

File Processing: Multer, CSV-parser, XLSX

Security: bcrypt.js for password hashing

📦 Installation & Setup
Prerequisites
Node.js (v14 or higher)

MongoDB Atlas account or local MongoDB installation

npm or yarn package manager

1. Clone and Setup
bash
# Clone the repository
git clone <your-repository-url>

cd mern-app

# Setup backend
cd backend
npm install

# Setup frontend
cd ../frontend
npm install
2. Environment Configuration
Create a .env file in the backend directory and write your port,mongodb_url  and jwt_secret.

3. Database Setup
For MongoDB Atlas:

Create account at MongoDB Atlas

Create a new cluster and database

Whitelist your IP address in Network Access

Create a database user with read/write permissions

Update the MONGODB_URI in your .env file

For Local MongoDB:

bash
# Install MongoDB locally
# Start MongoDB service
net start MongoDB  # Windows
brew services start mongodb-community  # macOS
sudo systemctl start mongod  # Linux
4. Create Admin User
bash
cd backend
node create-admin.js
Default admin credentials:

Email: admin@example.com

Password: admin123

🚀 Running the Application
Start Development Servers
bash
# Terminal 1 - Backend (runs on http://localhost:5000)
cd backend
npm run dev

# Terminal 2 - Frontend (runs on http://localhost:3000)
cd frontend
npm start
Production Build
bash
# Build frontend for production
cd frontend
npm run build

# Start production server
cd ../backend
npm start
📖 Usage Guide
1. Login
Open http://localhost:3000

Use default credentials: admin@example.com / admin123

Successful login redirects to dashboard

2. Manage Agents
Navigate to "Agents" section

Click "Add Agent" to create new agents

View all agents in a sortable table

Delete agents with delete action

3. Upload Contact Lists
Navigate to "Lists" section

Click "Upload List" button

Select CSV/XLSX file with required format

System automatically distributes contacts among agents

CSV File Format
Required columns: FirstName, Phone, Notes

csv
FirstName,Phone,Notes
John Doe,1234567890,Interested in product demo
Jane Smith,0987654321,Follow up next week
Robert Johnson,5551234567,Customer since 2020
🔧 API Endpoints
Method	Endpoint	Description	Authentication
POST	/api/auth/login	Admin login	Public
GET	/api/auth/profile	Get user profile	Bearer Token
GET	/api/agents	Get all agents	Admin
POST	/api/agents	Create new agent	Admin
DELETE	/api/agents/:id	Delete agent	Admin
GET	/api/lists	Get all lists	Admin
POST	/api/lists	Upload CSV file	Admin
GET	/api/lists/:id	Get list details	Admin
🧪 Testing the Application
Automated API Tests
bash
cd backend
node test-all-endpoints.js
Database Integrity Check
bash
node test-database.js
Manual Testing Checklist
Login Functionality - Test with valid/invalid credentials

Agent Management - Create, view, and delete agents

File Upload - Test CSV upload with various file types

Responsive Design - Test on different screen sizes

📁 Project Structure
text
mern-app/
├── backend/
│   ├── config/           # Database configuration
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Auth & upload middleware
│   ├── models/          # MongoDB models (User, List)
│   ├── routes/          # API routes
│   ├── uploads/         # File upload directory
│   ├── .env            # Environment variables
│   ├── server.js       # Express server
│   └── package.json
├── frontend/
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable components
│   │   ├── pages/      # Page components
│   │   ├── utils/      # Auth context & API config
│   │   ├── App.js      # Main App component
│   │   └── index.js    # React entry point
│   └── package.json
└── README.md
🐛 Troubleshooting
Common Issues & Solutions
MongoDB Connection Error

Verify connection string in .env file

Whitelist IP in MongoDB Atlas

Check database user permissions

"No agents available" Error

Create agents before uploading CSV files

Run node create-agents.js to generate test agents

File Upload Issues

Ensure file is CSV or Excel format

Check file has required column headers

Authentication Errors

Verify JWT_SECRET in .env file

Check token expiration

Debug Scripts
node check-admin.js - Verify admin user exists

node verify-agents.js - Check available agents

node test-connection.js - Test database connection

🚀 Deployment
Environment Setup
Set NODE_ENV=production in environment variables

Use strong JWT secret in production

Configure production MongoDB connection string

Set up reverse proxy (Nginx) for React build files

Deployment Platforms
Frontend: Vercel, Netlify, or S3 + CloudFront

Backend: Heroku, DigitalOcean, AWS EC2

Database: MongoDB Atlas (recommended)

📝 License
This project is open source and available under the MIT License.

🤝 Contributing
Fork the repository

Create a feature branch (git checkout -b feature/amazing-feature)

Commit your changes (git commit -m 'Add amazing feature')

Push to the branch (git push origin feature/amazing-feature)

Open a Pull Request

📞 Support
For support or questions:

Check the troubleshooting section above

Review API documentation

Create an issue in the repository

