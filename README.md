# eLibrary - Book Management System

A modern, responsive web application for managing library operations including books, members, and borrowing records.

![eLibrary](https://img.shields.io/badge/Library-Management-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![Vite](https://img.shields.io/badge/Vite-5-646CFF)

## 🌟 Features

### 📊 Dashboard
- **Real-time Statistics**: View total books, available books, issued books, and overdue returns
- **Recent Activity**: Track the latest book issues and returns
- **Category Analytics**: See popular book categories at a glance
- **Library Metrics**: Monitor availability rates and circulation stats

### 📚 Book Management
- **CRUD Operations**: Add, edit, and delete books
- **Book Details**: Track title, author, ISBN, category, publication year, quantity, and availability
- **Search & Filter**: Find books by title, author, ISBN, or category
- **Availability Status**: Real-time tracking of available vs issued books

### 👥 Member Management
- **Member Registration**: Add and manage library members
- **Auto-generated IDs**: Automatic member ID generation (MEM001, MEM002, etc.)
- **Contact Information**: Store name, email, and phone details
- **Join Date Tracking**: Automatic recording of member registration date

### 📋 Issue & Return System
- **Book Issuing**: Issue books to registered members
- **Due Date Tracking**: Set and monitor due dates (default 14 days)
- **Return Processing**: Mark books as returned with automatic availability updates
- **Overdue Detection**: Automatic highlighting of overdue books
- **Status Filtering**: Filter by active, overdue, or returned status

### ⚙️ Settings
- **User Profile**: Customize your profile name and role
- **Role-based Access**: Admin and Librarian roles
- **Data Management**: Clear all data option for fresh start

### 🎨 UI/UX Features
- **Clean & Modern Design**: Professional gradient sidebar with intuitive navigation
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Toast Notifications**: User-friendly success, error, and warning messages
- **Confirmation Modals**: Safe delete operations with confirmation dialogs
- **Empty States**: Helpful messages when no data is available
- **Form Validation**: Comprehensive input validation with error messages
- **Search & Filter**: Real-time search and filtering across all modules

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 8.x or higher

### Installation

1. **Clone or navigate to the project directory**
   ```bash
   cd /home/harsh/.gemini/antigravity/playground/sparse-singularity
   ```

2. **Install dependencies** (if not already done)
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:5173/](http://localhost:5173/)

## 📖 Usage Guide

### Dashboard
The dashboard provides an overview of your library:
- View key statistics at the top
- Check recent issued books activity
- Monitor popular categories
- Track library performance metrics

### Managing Books
1. Click **"Books"** in the sidebar
2. Click **"+ Add Book"** to add a new book
3. Fill in book details (title, author, ISBN, category, year, quantity)
4. Use the search bar to find specific books
5. Filter by category using the dropdown
6. Click the edit (✏️) icon to modify book details
7. Click the delete (🗑️) icon to remove a book (with confirmation)

### Managing Members
1. Click **"Members"** in the sidebar
2. Click **"+ Add Member"** to register a new member
3. Fill in member details (name, email, phone)
4. Member ID is auto-generated
5. Search members by name, ID, email, or phone
6. Edit or delete members as needed

### Issuing Books
1. Click **"Issued Books"** in the sidebar
2. Click **"+ Issue Book"** 
3. Select a book from available books
4. Select a member
5. Set the due date (defaults to 14 days from today)
6. Click **"Issue Book"**

### Returning Books
1. Go to **"Issued Books"**
2. Find the book to return
3. Click the **"✓ Return"** button
4. The book's availability is automatically updated

### Configuring Settings
1. Click **"Settings"** in the sidebar
2. Update your profile name and role
3. View application information
4. Clear all data if needed (with confirmation)

## 🎯 Key Features Explained

### Automatic Availability Tracking
- When a book is issued, available quantity decreases automatically
- When a book is returned, available quantity increases automatically
- Books show as "Unavailable" when all copies are issued

### Overdue Detection
- System automatically detects overdue books
- Overdue books are highlighted with red "Overdue" badge
- Dashboard shows count of overdue returns

### Data Persistence
- All data is stored in browser's localStorage
- Data persists across browser sessions
- Can be cleared from Settings page

### Role-Based Interface
- Supports Admin and Librarian roles
- User role displayed in sidebar profile
- Customizable from Settings page

## 🎨 Design System

### Color Palette
- **Primary**: Modern blue gradient (`hsl(220, 90%, 56%)`)
- **Secondary**: Purple accent (`hsl(280, 85%, 60%)`)
- **Success**: Green (`hsl(142, 71%, 45%)`)
- **Warning**: Orange (`hsl(38, 92%, 50%)`)
- **Danger**: Red (`hsl(0, 84%, 60%)`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Headings**: Weight 600, responsive sizes
- **Body**: Weight 400, 1rem base size

### Components
- Sidebar navigation with gradient background
- Stat cards with hover effects
- Data tables with search and filter
- Modal dialogs with backdrop blur
- Toast notifications with auto-dismiss
- Responsive forms with validation

## 📱 Responsive Design

### Desktop (> 768px)
- Full sidebar navigation visible
- Multi-column layouts
- Spacious padding and margins

### Mobile (≤ 768px)
- Collapsible sidebar with toggle button
- Single-column layouts
- Floating action button for menu
- Touch-optimized buttons and inputs

## 🔒 Data Storage

All data is stored locally using browser's localStorage:
- `books` - All book records
- `members` - All member records
- `issuedBooks` - All issue/return records
- `currentUser` - User profile information

## 🛠️ Technology Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Vanilla CSS with CSS Custom Properties
- **State Management**: React Hooks (useState, useEffect)
- **Storage**: Browser localStorage
- **Icons**: Emoji-based for simplicity and universal support

## 📦 Project Structure

```
src/
├── components/
│   ├── Dashboard.jsx      # Dashboard with stats and recent activity
│   ├── Books.jsx          # Book management with CRUD
│   ├── Members.jsx        # Member management with CRUD
│   ├── IssuedBooks.jsx    # Issue/return management
│   ├── Settings.jsx       # User settings and data management
│   ├── Modal.jsx          # Reusable modal component
│   └── Toast.jsx          # Toast notification component
├── App.jsx                # Main app with routing and state
├── main.jsx               # React entry point
└── index.css              # Global styles and design system
```

## 🚀 Future Enhancements

Potential features for future versions:
- Backend API integration
- Authentication and authorization
- Fine calculation for overdue books
- Book reservation system
- Export/import data (JSON, CSV)
- Advanced reporting and analytics
- Email notifications
- Barcode/QR code scanning
- Multi-library support
- Book recommendations

## 📄 License

This project is created for educational and demonstration purposes.

## 👨‍💻 Development

Built with ❤️ using modern web technologies.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 📞 Support

For issues or questions about the library management system, please refer to the Settings page for application information.

---

**eLibrary** - Making library management simple, modern, and efficient. 📚✨
