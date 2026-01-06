import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Books from './components/Books';
import Members from './components/Members';
import IssuedBooks from './components/IssuedBooks';
import Settings from './components/Settings';
import Toast from './components/Toast';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // State for books
  const [books, setBooks] = useState(() => {
    const saved = localStorage.getItem('books_v2');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'The God of Small Things', author: 'Arundhati Roy', isbn: '9780812979657', category: 'Fiction', year: 1997, quantity: 5, available: 4 },
      { id: 2, title: 'Interpreter of Maladies', author: 'Jhumpa Lahiri', isbn: '9780395927205', category: 'Short Stories', year: 1999, quantity: 4, available: 4 },
      { id: 3, title: 'The Palace of Illusions', author: 'Chitra Banerjee Divakaruni', isbn: '9781400096206', category: 'Mythology', year: 2008, quantity: 6, available: 5 },
      { id: 4, title: 'Fasting, Feasting', author: 'Anita Desai', isbn: '9780618065820', category: 'Fiction', year: 1999, quantity: 3, available: 2 },
      { id: 5, title: 'The Inheritance of Loss', author: 'Kiran Desai', isbn: '9780802142818', category: 'Fiction', year: 2006, quantity: 4, available: 3 },
      { id: 6, title: 'Difficult Daughters', author: 'Manju Kapur', isbn: '9780571192892', category: 'Historical Fiction', year: 1998, quantity: 3, available: 2 },
      { id: 7, title: 'Namesake', author: 'Jhumpa Lahiri', isbn: '9780618485222', category: 'Fiction', year: 2003, quantity: 5, available: 5 },
    ];
  });

  // State for members
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('members_v2');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Aadhya Gupta', memberId: 'MEM001', email: 'aadhya.gupta@example.com', phone: '+91-98765-43210', joinDate: '2024-01-15' },
      { id: 2, name: 'Priya Patel', memberId: 'MEM002', email: 'priya.patel@example.com', phone: '+91-98765-43211', joinDate: '2024-02-20' },
      { id: 3, name: 'Diya Sharma', memberId: 'MEM003', email: 'diya.sharma@example.com', phone: '+91-98765-43212', joinDate: '2024-03-10' },
      { id: 4, name: 'Sneha Reddy', memberId: 'MEM004', email: 'sneha.reddy@example.com', phone: '+91-98765-43213', joinDate: '2024-04-05' },
      { id: 5, name: 'Kavya Singh', memberId: 'MEM005', email: 'kavya.singh@example.com', phone: '+91-98765-43214', joinDate: '2024-05-12' },
    ];
  });

  // State for issued books
  const [issuedBooks, setIssuedBooks] = useState(() => {
    const saved = localStorage.getItem('issuedBooks_v2');
    return saved ? JSON.parse(saved) : [
      { id: 1, bookId: 1, memberId: 1, issueDate: '2024-01-20', dueDate: '2024-02-03', returnDate: null },
      { id: 2, bookId: 4, memberId: 2, issueDate: '2024-01-25', dueDate: '2024-02-08', returnDate: null },
      { id: 3, bookId: 3, memberId: 3, issueDate: '2023-12-15', dueDate: '2023-12-29', returnDate: null },
      { id: 4, bookId: 6, memberId: 4, issueDate: '2024-01-01', dueDate: '2024-01-15', returnDate: null },
      { id: 5, bookId: 5, memberId: 5, issueDate: '2025-12-20', dueDate: '2026-01-03', returnDate: null },
    ];
  });

  // Current user state
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('currentUser_v2');
    return saved ? JSON.parse(saved) : {
      name: 'Ananya Verma',
      role: 'Admin',
      avatar: 'AV'
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('books_v2', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('members_v2', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('issuedBooks_v2', JSON.stringify(issuedBooks));
  }, [issuedBooks]);

  useEffect(() => {
    localStorage.setItem('currentUser_v2', JSON.stringify(currentUser));
  }, [currentUser]);

  // Toast helper functions
  const showToast = (type, title, message) => {
    const id = Date.now();
    const newToast = { id, type, title, message };
    setToasts(prev => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Navigation
  const navigate = (page) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  // Get stats for dashboard
  const getStats = () => {
    const totalBooks = books.reduce((sum, book) => sum + book.quantity, 0);
    const availableBooks = books.reduce((sum, book) => sum + book.available, 0);
    const issuedCount = issuedBooks.filter(ib => !ib.returnDate).length;
    const overdueCount = issuedBooks.filter(ib => {
      if (ib.returnDate) return false;
      const dueDate = new Date(ib.dueDate);
      const today = new Date();
      return dueDate < today;
    }).length;

    return {
      totalBooks,
      availableBooks,
      issuedCount,
      overdueCount
    };
  };

  // Render current page
  const renderPage = () => {
    const props = {
      books,
      setBooks,
      members,
      setMembers,
      issuedBooks,
      setIssuedBooks,
      showToast,
      getStats
    };

    switch (currentPage) {
      case 'dashboard':
        return <Dashboard {...props} />;
      case 'books':
        return <Books {...props} />;
      case 'members':
        return <Members {...props} />;
      case 'issued':
        return <IssuedBooks {...props} />;
      case 'settings':
        return <Settings currentUser={currentUser} setCurrentUser={setCurrentUser} showToast={showToast} />;
      default:
        return <Dashboard {...props} />;
    }
  };

  return (
    <div className="app-container">
      {/* Mobile Sidebar Overlay */}
      <div
        className={`sidebar-overlay ${mobileMenuOpen ? 'visible' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Sidebar */}
      <aside className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">📚</div>
          <span>eLibrary</span>
        </div>

        <nav>
          <ul className="nav-menu">
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${currentPage === 'dashboard' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate('dashboard'); }}
              >
                <span className="nav-icon">📊</span>
                <span>Dashboard</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${currentPage === 'books' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate('books'); }}
              >
                <span className="nav-icon">📖</span>
                <span>Books</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${currentPage === 'members' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate('members'); }}
              >
                <span className="nav-icon">👥</span>
                <span>Members</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${currentPage === 'issued' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate('issued'); }}
              >
                <span className="nav-icon">📋</span>
                <span>Issued Books</span>
              </a>
            </li>
            <li className="nav-item">
              <a
                href="#"
                className={`nav-link ${currentPage === 'settings' ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); navigate('settings'); }}
              >
                <span className="nav-icon">⚙️</span>
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>

        <div className="user-profile">
          <div className="user-avatar">{currentUser.avatar}</div>
          <div className="user-info">
            <div className="user-name">{currentUser.name}</div>
            <div className="user-role">{currentUser.role}</div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {renderPage()}
      </main>

      {/* Mobile Menu Toggle */}
      <button
        className="mobile-menu-toggle"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Toast Container */}
      <Toast toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
