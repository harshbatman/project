import { useState } from 'react';

function Settings({ currentUser, setCurrentUser, showToast }) {
    const [formData, setFormData] = useState({
        name: currentUser.name,
        role: currentUser.role,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.role) {
            showToast('error', 'Validation Error', 'Please fill in all fields');
            return;
        }

        const avatar = formData.name
            .split(' ')
            .map(n => n[0])
            .join('')
            .toUpperCase()
            .substring(0, 2);

        setCurrentUser({
            name: formData.name,
            role: formData.role,
            avatar,
        });

        showToast('success', 'Settings Updated', 'Your profile has been updated successfully');
    };

    const handleReset = () => {
        if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">Settings</h1>
            </header>

            <div className="page-content">
                <div style={{ maxWidth: '800px' }}>
                    {/* User Profile Settings */}
                    <div className="table-container" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <div className="table-header">
                            <h3 className="table-title">User Profile</h3>
                        </div>
                        <div style={{ padding: 'var(--space-xl)' }}>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label className="form-label">Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Role</label>
                                    <select
                                        className="form-control"
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        required
                                    >
                                        <option value="Admin">Admin</option>
                                        <option value="Librarian">Librarian</option>
                                    </select>
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Save Changes
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Application Info */}
                    <div className="table-container" style={{ marginBottom: 'var(--space-2xl)' }}>
                        <div className="table-header">
                            <h3 className="table-title">Application Information</h3>
                        </div>
                        <div style={{ padding: 'var(--space-xl)' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--color-border-light)' }}>
                                    <span style={{ fontWeight: 500 }}>Application Name</span>
                                    <span className="text-secondary">eLibrary</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--color-border-light)' }}>
                                    <span style={{ fontWeight: 500 }}>Version</span>
                                    <span className="text-secondary">1.0.0</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-md) 0', borderBottom: '1px solid var(--color-border-light)' }}>
                                    <span style={{ fontWeight: 500 }}>Storage</span>
                                    <span className="text-secondary">Local Storage</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', padding: 'var(--space-md) 0' }}>
                                    <span style={{ fontWeight: 500 }}>Current User</span>
                                    <span className="text-secondary">{currentUser.name} ({currentUser.role})</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Data Management */}
                    <div className="table-container">
                        <div className="table-header">
                            <h3 className="table-title">Data Management</h3>
                        </div>
                        <div style={{ padding: 'var(--space-xl)' }}>
                            <p className="text-secondary" style={{ marginBottom: 'var(--space-lg)' }}>
                                All data is stored locally in your browser. Clearing data will remove all books, members, and issued book records.
                            </p>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleReset}
                            >
                                🗑️ Clear All Data
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Settings;
