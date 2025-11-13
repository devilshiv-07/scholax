# Page Routes Reference

## Public Pages
- `/` - Landing page with theme showcase
- `/login` - Login page (purple gradient, email input)
- `/verify-otp` - OTP verification (6-digit input)

## Admin Pages
Base: `/admin`

- `/admin/dashboard` - Admin dashboard with stats and quick actions
- `/admin/students/import` - CSV import with drag-drop (pink border hover)
- `/admin/teachers` - Add and manage teachers, assign sections
- `/admin/students` - View all students with filters

### Admin Navigation
1. Dashboard - Overview and statistics
2. Import Students - CSV upload interface
3. Manage Teachers - Add teachers and assign to sections
4. View Students - Student list with filters

## Teacher Pages
Base: `/teacher`

- `/teacher/dashboard` - Teacher dashboard with assigned sections
- `/teacher/attendance/[batch]/[section]/[subject]` - Mark attendance

### Example URLs
- `/teacher/attendance/2024/A/Mathematics`
- `/teacher/attendance/2023/B/Physics`

### Attendance Marking Features
- Date picker for selecting date
- Green "Present" button
- Red "Absent" button
- Mark All Present/Absent bulk actions
- Real-time statistics
- Visual feedback with colored backgrounds

### Teacher Navigation
1. Dashboard - View assigned sections
2. Mark Attendance - Take attendance for classes

## Student Pages
Base: `/student`

- `/student/dashboard` - Student dashboard with attendance percentages
- `/student/attendance` - Detailed attendance history

### Dashboard Features
- Overall attendance circular progress (purple-pink gradient)
- Subject-wise cards with gradient progress bars
- Color-coded status (Excellent/Good/Need Improvement)
- Warning for low attendance (<75%)

### Attendance Details Features
- Date-wise grouping
- Subject filter
- Month filter
- Green/red status indicators

### Student Navigation
1. Dashboard - Attendance overview
2. Attendance Details - Complete attendance history

## Color Coding

### Status Colors
- **Green** (#22c55e): Present, >90% attendance
- **Yellow** (#f59e0b): 75-90% attendance  
- **Red** (#ef4444): Absent, <75% attendance

### Theme Colors
- **Primary** (Purple): #9333ea - Main actions, headers
- **Secondary** (Pink): #ec4899 - Accents, secondary actions
- **Background**: White with subtle gradients

## Testing Quick Links

For local testing (npm run dev on port 3000):

**Authentication**
- http://localhost:3000/login
- http://localhost:3000/verify-otp?email=test@example.com

**Admin**
- http://localhost:3000/admin/dashboard
- http://localhost:3000/admin/students/import
- http://localhost:3000/admin/teachers
- http://localhost:3000/admin/students

**Teacher**
- http://localhost:3000/teacher/dashboard
- http://localhost:3000/teacher/attendance/2024/A/Mathematics

**Student**
- http://localhost:3000/student/dashboard
- http://localhost:3000/student/attendance

## Component Usage Examples

### Button
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="success">Present</Button>
<Button variant="danger">Absent</Button>
```

### Input
```tsx
import { Input } from '@/components/ui/Input';

<Input 
  label="Email" 
  type="email" 
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  error={errorMessage}
/>
```

### Card
```tsx
import { Card } from '@/components/ui/Card';

<Card title="Card Title">
  Content goes here
</Card>
```

### Dashboard Layout
```tsx
import { DashboardLayout } from '@/components/layouts';

<DashboardLayout
  title="Page Title"
  userRole="admin"
  userName="User Name"
  navItems={navItems}
>
  {children}
</DashboardLayout>
```

