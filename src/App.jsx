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
    const saved = localStorage.getItem('books');
    return saved ? JSON.parse(saved) : [
      { id: 1, title: 'The Guide', author: 'R.K. Narayan', isbn: '9780143039648', category: 'Fiction', year: 1958, quantity: 4, available: 3 },
      { id: 2, title: 'The God of Small Things', author: 'Arundhati Roy', isbn: '9780812979657', category: 'Fiction', year: 1997, quantity: 5, available: 4 },
      { id: 3, title: 'Midnight\'s Children', author: 'Salman Rushdie', isbn: '9780099578512', category: 'Fiction', year: 1981, quantity: 3, available: 2 },
      { id: 4, title: 'Wings of Fire', author: 'A.P.J. Abdul Kalam', isbn: '9788173711466', category: 'Biography', year: 1999, quantity: 6, available: 5 },
      { id: 5, title: 'Train to Pakistan', author: 'Khushwant Singh', isbn: '9780143065883', category: 'Historical Fiction', year: 1956, quantity: 3, available: 2 },
      { id: 6, title: 'The White Tiger', author: 'Aravind Adiga', isbn: '9781416562597', category: 'Fiction', year: 2008, quantity: 4, available: 3 },
      { id: 7, title: 'Gitanjali', author: 'Rabindranath Tagore', isbn: '9788129119704', category: 'Poetry', year: 1910, quantity: 2, available: 2 },
    ];
  });

  // State for members
  const [members, setMembers] = useState(() => {
    const saved = localStorage.getItem('members');
    return saved ? JSON.parse(saved) : [
      { id: 1, name: 'Rahul Sharma', memberId: 'MEM001', email: 'rahul.sharma@example.com', phone: '+91-98765-43210', joinDate: '2024-01-15' },
      { id: 2, name: 'Priya Patel', memberId: 'MEM002', email: 'priya.patel@example.com', phone: '+91-98765-43211', joinDate: '2024-02-20' },
      { id: 3, name: 'Arjun Kumar', memberId: 'MEM003', email: 'arjun.kumar@example.com', phone: '+91-98765-43212', joinDate: '2024-03-10' },
      { id: 4, name: 'Sneha Reddy', memberId: 'MEM004', email: 'sneha.reddy@example.com', phone: '+91-98765-43213', joinDate: '2024-04-05' },
      { id: 5, name: 'Vikram Singh', memberId: 'MEM005', email: 'vikram.singh@example.com', phone: '+91-98765-43214', joinDate: '2024-05-12' },
    ];
  });

  // State for issued books
  const [issuedBooks, setIssuedBooks] = useState(() => {
    const saved = localStorage.getItem('issuedBooks');
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
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : {
      name: 'Admin User',
      role: 'Admin',
      avatar: 'AU'
    };
  });

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem('members', JSON.stringify(members));
  }, [members]);

  useEffect(() => {
    localStorage.setItem('issuedBooks', JSON.stringify(issuedBooks));
  }, [issuedBooks]);

  useEffect(() => {
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
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
