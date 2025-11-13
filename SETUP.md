# Setup Instructions

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/scholax

# JWT Secret (use a strong random string)
JWT_SECRET=your-secret-key-here-use-strong-random-string

# Email Configuration (Gmail SMTP)
# Note: You need to create an "App Password" in your Gmail account
# Go to: Google Account > Security > 2-Step Verification > App passwords
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Gmail Setup for OTP Emails

1. Go to your Google Account settings
2. Navigate to Security
3. Enable 2-Step Verification if not already enabled
4. Go to "App passwords"
5. Create a new app password for "Mail"
6. Copy the 16-character password to `EMAIL_PASS` in your `.env.local`

## MongoDB Setup

### Option 1: Local MongoDB
```bash
# Install MongoDB locally
# macOS
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb-community

# Your connection string will be:
MONGODB_URI=mongodb://localhost:27017/scholax
```

### Option 2: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a free cluster
3. Get your connection string
4. Replace `<password>` and add database name
```
MONGODB_URI=mongodb+srv://username:<password>@cluster.mongodb.net/scholax
```

## Running the Application

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Testing the Application

### 1. Access the Homepage
- Navigate to http://localhost:3000
- You should see the landing page with pink/purple theme

### 2. Test Authentication Flow
- Click "Get Started" or go to /login
- Enter any email address
- You'll be redirected to OTP verification
- (Note: Backend needs to be implemented for actual OTP sending)

### 3. Test Admin Interface
- Navigate to /admin/dashboard
- Explore CSV import, teacher management, and student views

### 4. Test Teacher Interface
- Navigate to /teacher/dashboard
- View assigned sections
- Try marking attendance

### 5. Test Student Interface
- Navigate to /student/dashboard
- View attendance percentages with color-coded progress bars

## Frontend Features Completed ✅

- [x] Pink/Purple/White theme configuration
- [x] Base UI components (Button, Input, Card)
- [x] Layout components with role-based navigation
- [x] Login page with purple gradient
- [x] OTP verification with 6-digit input
- [x] Admin dashboard with stats
- [x] CSV upload interface with drag-drop
- [x] Teacher management and assignment
- [x] Student list with filters
- [x] Teacher dashboard with assigned sections
- [x] Attendance marking with green/red buttons
- [x] Student dashboard with attendance percentages
- [x] Subject-wise attendance tracking
- [x] Attendance history with date filtering

## Backend Tasks Remaining ⏳

- [ ] Set up MongoDB connection
- [ ] Create Mongoose models
- [ ] Implement OTP generation and email sending
- [ ] Create authentication middleware
- [ ] Build admin APIs
- [ ] Build teacher APIs
- [ ] Build student APIs
- [ ] Connect frontend to backend
- [ ] Add form validation
- [ ] Add error handling
- [ ] Test complete flows

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
npm run dev -- -p 3001
```

### Module not found errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Styling not applying
```bash
# Restart dev server
# Ctrl+C to stop
npm run dev
```

