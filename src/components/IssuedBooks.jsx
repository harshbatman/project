import { useState } from 'react';
import Modal from './Modal';

function IssuedBooks({ books, setBooks, members, issuedBooks, setIssuedBooks, showToast }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [formData, setFormData] = useState({
        bookId: '',
        memberId: '',
        dueDate: '',
    });

    // Calculate issue date (14 days from today by default)
    const getDefaultDueDate = () => {
        const date = new Date();
        date.setDate(date.getDate() + 14);
        return date.toISOString().split('T')[0];
    };

    // Get issued books with details
    const getIssuedBooksWithDetails = () => {
        return issuedBooks.map(ib => {
            const book = books.find(b => b.id === ib.bookId);
            const member = members.find(m => m.id === ib.memberId);
            const dueDate = new Date(ib.dueDate);
            const today = new Date();
            const isOverdue = !ib.returnDate && dueDate < today;

            return {
                ...ib,
                bookTitle: book?.title || 'Unknown',
                bookAuthor: book?.author || 'Unknown',
                memberName: member?.name || 'Unknown',
                memberId: member?.memberId || 'Unknown',
                isOverdue,
                status: ib.returnDate ? 'returned' : (isOverdue ? 'overdue' : 'active')
            };
        });
    };

    // Filter issued books
    const filteredIssuedBooks = getIssuedBooksWithDetails().filter(ib => {
        const matchesSearch =
            ib.bookTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ib.bookAuthor.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ib.memberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            ib.memberId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = !filterStatus || ib.status === filterStatus;

        return matchesSearch && matchesStatus;
    });

    const handleOpenModal = () => {
        setFormData({
            bookId: '',
            memberId: '',
            dueDate: getDefaultDueDate(),
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({
            bookId: '',
            memberId: '',
            dueDate: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.bookId || !formData.memberId || !formData.dueDate) {
            showToast('error', 'Validation Error', 'Please fill in all fields');
            return;
        }

        const book = books.find(b => b.id === parseInt(formData.bookId));
        const member = members.find(m => m.id === parseInt(formData.memberId));

        if (!book || !member) {
            showToast('error', 'Error', 'Invalid book or member selection');
            return;
        }

        if (book.available <= 0) {
            showToast('error', 'Not Available', 'This book is currently unavailable');
            return;
        }

        // Create new issue record
        const newIssue = {
            id: Date.now(),
            bookId: parseInt(formData.bookId),
            memberId: parseInt(formData.memberId),
            issueDate: new Date().toISOString().split('T')[0],
            dueDate: formData.dueDate,
            returnDate: null,
        };

        setIssuedBooks([...issuedBooks, newIssue]);

        // Update book availability
        setBooks(books.map(b =>
            b.id === parseInt(formData.bookId)
                ? { ...b, available: b.available - 1 }
                : b
        ));

        showToast('success', 'Book Issued', `${book.title} has been issued to ${member.name}`);
        handleCloseModal();
    };

    const handleReturn = (issuedBook) => {
        const book = books.find(b => b.id === issuedBook.bookId);

        // Update issued book with return date
        setIssuedBooks(issuedBooks.map(ib =>
            ib.id === issuedBook.id
                ? { ...ib, returnDate: new Date().toISOString().split('T')[0] }
                : ib
        ));

        // Update book availability
        setBooks(books.map(b =>
            b.id === issuedBook.bookId
                ? { ...b, available: b.available + 1 }
                : b
        ));

        showToast('success', 'Book Returned', `${book?.title || 'Book'} has been returned successfully`);
    };

    // Get available books for issuing
    const availableBooks = books.filter(b => b.available > 0);

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">Issued Books</h1>
            </header>

            <div className="page-content">
                <div className="table-container">
                    <div className="table-header">
                        <h3 className="table-title">All Issued Books ({filteredIssuedBooks.length})</h3>
                        <div className="table-actions">
                            <div className="search-box">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder="Search issued books..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="form-control"
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                style={{ minWidth: '150px' }}
                            >
                                <option value="">All Status</option>
                                <option value="active">Active</option>
                                <option value="overdue">Overdue</option>
                                <option value="returned">Returned</option>
                            </select>
                            <button className="btn btn-primary" onClick={handleOpenModal}>
                                ➕ Issue Book
                            </button>
                        </div>
                    </div>

                    {filteredIssuedBooks.length > 0 ? (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Book Title</th>
                                        <th>Author</th>
                                        <th>Member</th>
                                        <th>Member ID</th>
                                        <th>Issue Date</th>
                                        <th>Due Date</th>
                                        <th>Return Date</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredIssuedBooks.map(ib => (
                                        <tr key={ib.id}>
                                            <td><strong>{ib.bookTitle}</strong></td>
                                            <td>{ib.bookAuthor}</td>
                                            <td>{ib.memberName}</td>
                                            <td><code style={{ fontSize: '0.875rem' }}>{ib.memberId}</code></td>
                                            <td>{new Date(ib.issueDate).toLocaleDateString()}</td>
                                            <td>{new Date(ib.dueDate).toLocaleDateString()}</td>
                                            <td>
                                                {ib.returnDate
                                                    ? new Date(ib.returnDate).toLocaleDateString()
                                                    : '-'}
                                            </td>
                                            <td>
                                                {ib.status === 'returned' && (
                                                    <span className="badge badge-success">Returned</span>
                                                )}
                                                {ib.status === 'overdue' && (
                                                    <span className="badge badge-danger">Overdue</span>
                                                )}
                                                {ib.status === 'active' && (
                                                    <span className="badge badge-primary">Active</span>
                                                )}
                                            </td>
                                            <td>
                                                {!ib.returnDate && (
                                                    <button
                                                        className="btn btn-sm btn-primary"
                                                        onClick={() => handleReturn(ib)}
                                                        title="Mark as returned"
                                                    >
                                                        ✓ Return
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">📋</div>
                            <h3 className="empty-title">No Issued Books Found</h3>
                            <p className="empty-message">
                                {searchTerm || filterStatus
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'No books have been issued yet'}
                            </p>
                            {!searchTerm && !filterStatus && (
                                <button className="btn btn-primary" onClick={handleOpenModal}>
                                    ➕ Issue Your First Book
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Issue Book Modal */}
            {showModal && (
                <Modal
                    title="Issue Book"
                    onClose={handleCloseModal}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label className="form-label">Select Book *</label>
                                <select
                                    className="form-control"
                                    value={formData.bookId}
                                    onChange={(e) => setFormData({ ...formData, bookId: e.target.value })}
                                    required
                                >
                                    <option value="">Choose a book...</option>
                                    {availableBooks.map(book => (
                                        <option key={book.id} value={book.id}>
                                            {book.title} by {book.author} (Available: {book.available})
                                        </option>
                                    ))}
                                </select>
                                {availableBooks.length === 0 && (
                                    <p className="text-muted" style={{ fontSize: '0.875rem', marginTop: 'var(--space-xs)' }}>
                                        No books currently available for issuing
                                    </p>
                                )}
                            </div>

                            <div className="form-group">
                                <label className="form-label">Select Member *</label>
                                <select
                                    className="form-control"
                                    value={formData.memberId}
                                    onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                                    required
                                >
                                    <option value="">Choose a member...</option>
                                    {members.map(member => (
                                        <option key={member.id} value={member.id}>
                                            {member.name} ({member.memberId})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Due Date *</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    min={new Date().toISOString().split('T')[0]}
                                    required
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary" disabled={availableBooks.length === 0}>
                                Issue Book
                            </button>
                        </div>
                    </form>
                </Modal>
            )}
        </>
    );
}

export default IssuedBooks;
