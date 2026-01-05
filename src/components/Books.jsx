import { useState } from 'react';
import Modal from './Modal';

function Books({ books, setBooks, showToast }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingBook, setEditingBook] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        isbn: '',
        category: '',
        year: '',
        quantity: '',
    });

    const categories = [...new Set(books.map(b => b.category))];

    // Filter books
    const filteredBooks = books.filter(book => {
        const matchesSearch =
            book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
            book.isbn.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory = !filterCategory || book.category === filterCategory;

        return matchesSearch && matchesCategory;
    });

    const handleOpenModal = (book = null) => {
        if (book) {
            setEditingBook(book);
            setFormData({
                title: book.title,
                author: book.author,
                isbn: book.isbn,
                category: book.category,
                year: book.year,
                quantity: book.quantity,
            });
        } else {
            setEditingBook(null);
            setFormData({
                title: '',
                author: '',
                isbn: '',
                category: '',
                year: '',
                quantity: '',
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBook(null);
        setFormData({
            title: '',
            author: '',
            isbn: '',
            category: '',
            year: '',
            quantity: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.author || !formData.isbn || !formData.category || !formData.year || !formData.quantity) {
            showToast('error', 'Validation Error', 'Please fill in all fields');
            return;
        }

        if (editingBook) {
            // Update existing book
            setBooks(books.map(book =>
                book.id === editingBook.id
                    ? {
                        ...book,
                        ...formData,
                        year: parseInt(formData.year),
                        quantity: parseInt(formData.quantity),
                        available: parseInt(formData.quantity) - (book.quantity - book.available)
                    }
                    : book
            ));
            showToast('success', 'Book Updated', `${formData.title} has been updated successfully`);
        } else {
            // Add new book
            const newBook = {
                id: Date.now(),
                ...formData,
                year: parseInt(formData.year),
                quantity: parseInt(formData.quantity),
                available: parseInt(formData.quantity),
            };
            setBooks([...books, newBook]);
            showToast('success', 'Book Added', `${formData.title} has been added to the library`);
        }

        handleCloseModal();
    };

    const handleDelete = (book) => {
        setBooks(books.filter(b => b.id !== book.id));
        showToast('success', 'Book Deleted', `${book.title} has been removed from the library`);
        setDeleteConfirm(null);
    };

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">Books Management</h1>
            </header>

            <div className="page-content">
                <div className="table-container">
                    <div className="table-header">
                        <h3 className="table-title">All Books ({filteredBooks.length})</h3>
                        <div className="table-actions">
                            <div className="search-box">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder="Search books..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="form-control"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                                style={{ minWidth: '150px' }}
                            >
                                <option value="">All Categories</option>
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                                ➕ Add Book
                            </button>
                        </div>
                    </div>

                    {filteredBooks.length > 0 ? (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Author</th>
                                        <th>ISBN</th>
                                        <th>Category</th>
                                        <th>Year</th>
                                        <th>Quantity</th>
                                        <th>Available</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredBooks.map(book => (
                                        <tr key={book.id}>
                                            <td><strong>{book.title}</strong></td>
                                            <td>{book.author}</td>
                                            <td><code style={{ fontSize: '0.875rem' }}>{book.isbn}</code></td>
                                            <td><span className="badge badge-primary">{book.category}</span></td>
                                            <td>{book.year}</td>
                                            <td>{book.quantity}</td>
                                            <td>{book.available}</td>
                                            <td>
                                                {book.available > 0 ? (
                                                    <span className="badge badge-success">Available</span>
                                                ) : (
                                                    <span className="badge badge-warning">Unavailable</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="table-actions-cell">
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => handleOpenModal(book)}
                                                        title="Edit book"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => setDeleteConfirm(book)}
                                                        title="Delete book"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">📚</div>
                            <h3 className="empty-title">No Books Found</h3>
                            <p className="empty-message">
                                {searchTerm || filterCategory
                                    ? 'Try adjusting your search or filter criteria'
                                    : 'Get started by adding your first book to the library'}
                            </p>
                            {!searchTerm && !filterCategory && (
                                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                                    ➕ Add Your First Book
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <Modal
                    title={editingBook ? 'Edit Book' : 'Add New Book'}
                    onClose={handleCloseModal}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Book Title *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter book title"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Author *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter author name"
                                        value={formData.author}
                                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">ISBN *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter ISBN"
                                        value={formData.isbn}
                                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Category *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter category"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        list="categories"
                                        required
                                    />
                                    <datalist id="categories">
                                        {categories.map(cat => (
                                            <option key={cat} value={cat} />
                                        ))}
                                    </datalist>
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Publication Year *</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter year"
                                        value={formData.year}
                                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                        min="1000"
                                        max={new Date().getFullYear()}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Quantity *</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="Enter quantity"
                                        value={formData.quantity}
                                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                                        min="1"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                Cancel
                            </button>
                            <button type="submit" className="btn btn-primary">
                                {editingBook ? 'Update Book' : 'Add Book'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <Modal
                    title="Delete Book"
                    onClose={() => setDeleteConfirm(null)}
                >
                    <div className="modal-body">
                        <p>Are you sure you want to delete <strong>{deleteConfirm.title}</strong>?</p>
                        <p className="text-muted">This action cannot be undone.</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                            Delete Book
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Books;
