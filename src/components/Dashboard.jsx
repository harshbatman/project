function Dashboard({ getStats, books, members, issuedBooks }) {
    const stats = getStats();

    const recentActivity = issuedBooks
        .filter(ib => !ib.returnDate)
        .slice(0, 5)
        .map(ib => {
            const book = books.find(b => b.id === ib.bookId);
            const member = members.find(m => m.id === ib.memberId);
            const dueDate = new Date(ib.dueDate);
            const today = new Date();
            const isOverdue = dueDate < today;

            return {
                ...ib,
                bookTitle: book?.title || 'Unknown',
                memberName: member?.name || 'Unknown',
                isOverdue
            };
        });

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">Dashboard</h1>
            </header>

            <div className="page-content">
                {/* Stats Grid */}
                <div className="stats-grid">
                    <div className="stat-card" style={{ '--card-color': 'hsl(220, 90%, 56%)', '--icon-bg': 'hsl(220, 90%, 96%)', '--icon-color': 'hsl(220, 90%, 56%)' }}>
                        <div className="stat-header">
                            <div>
                                <div className="stat-value">{stats.totalBooks}</div>
                                <div className="stat-label">Total Books</div>
                            </div>
                            <div className="stat-icon">📚</div>
                        </div>
                    </div>

                    <div className="stat-card" style={{ '--card-color': 'hsl(142, 71%, 45%)', '--icon-bg': 'hsl(142, 71%, 95%)', '--icon-color': 'hsl(142, 71%, 45%)' }}>
                        <div className="stat-header">
                            <div>
                                <div className="stat-value">{stats.availableBooks}</div>
                                <div className="stat-label">Available Books</div>
                            </div>
                            <div className="stat-icon">✅</div>
                        </div>
                    </div>

                    <div className="stat-card" style={{ '--card-color': 'hsl(280, 85%, 60%)', '--icon-bg': 'hsl(280, 85%, 96%)', '--icon-color': 'hsl(280, 85%, 60%)' }}>
                        <div className="stat-header">
                            <div>
                                <div className="stat-value">{stats.issuedCount}</div>
                                <div className="stat-label">Issued Books</div>
                            </div>
                            <div className="stat-icon">📤</div>
                        </div>
                    </div>

                    <div className="stat-card" style={{ '--card-color': 'hsl(0, 84%, 60%)', '--icon-bg': 'hsl(0, 84%, 96%)', '--icon-color': 'hsl(0, 84%, 60%)' }}>
                        <div className="stat-header">
                            <div>
                                <div className="stat-value">{stats.overdueCount}</div>
                                <div className="stat-label">Overdue Returns</div>
                            </div>
                            <div className="stat-icon">⚠️</div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="table-container">
                    <div className="table-header">
                        <h3 className="table-title">Recent Issued Books</h3>
                    </div>

                    {recentActivity.length > 0 ? (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Book Title</th>
                                        <th>Member</th>
                                        <th>Issue Date</th>
                                        <th>Due Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentActivity.map(activity => (
                                        <tr key={activity.id}>
                                            <td>{activity.bookTitle}</td>
                                            <td>{activity.memberName}</td>
                                            <td>{new Date(activity.issueDate).toLocaleDateString()}</td>
                                            <td>{new Date(activity.dueDate).toLocaleDateString()}</td>
                                            <td>
                                                {activity.isOverdue ? (
                                                    <span className="badge badge-danger">Overdue</span>
                                                ) : (
                                                    <span className="badge badge-success">Active</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="empty-state">
                            <div className="empty-icon">📭</div>
                            <h3 className="empty-title">No Issued Books</h3>
                            <p className="empty-message">There are no books currently issued.</p>
                        </div>
                    )}
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--space-lg)', marginTop: 'var(--space-2xl)' }}>
                    <div className="table-container">
                        <div className="table-header">
                            <h3 className="table-title">Popular Categories</h3>
                        </div>
                        <div style={{ padding: 'var(--space-xl)' }}>
                            {(() => {
                                const categories = {};
                                books.forEach(book => {
                                    categories[book.category] = (categories[book.category] || 0) + 1;
                                });
                                const sortedCategories = Object.entries(categories)
                                    .sort((a, b) => b[1] - a[1])
                                    .slice(0, 5);

                                return sortedCategories.length > 0 ? (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                        {sortedCategories.map(([category, count]) => (
                                            <div key={category} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontWeight: 500 }}>{category}</span>
                                                <span className="badge badge-primary">{count} books</span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-muted">No categories available</p>
                                );
                            })()}
                        </div>
                    </div>

                    <div className="table-container">
                        <div className="table-header">
                            <h3 className="table-title">Library Stats</h3>
                        </div>
                        <div style={{ padding: 'var(--space-xl)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 500 }}>Total Members</span>
                                    <span className="badge badge-primary">{members.length}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 500 }}>Total Books</span>
                                    <span className="badge badge-primary">{stats.totalBooks}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 500 }}>Books In Circulation</span>
                                    <span className="badge badge-warning">{stats.issuedCount}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <span style={{ fontWeight: 500 }}>Availability Rate</span>
                                    <span className="badge badge-success">
                                        {stats.totalBooks > 0 ? Math.round((stats.availableBooks / stats.totalBooks) * 100) : 0}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
