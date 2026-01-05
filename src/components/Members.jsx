import { useState } from 'react';
import Modal from './Modal';

function Members({ members, setMembers, showToast }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState(null);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const [formData, setFormData] = useState({
        name: '',
        memberId: '',
        email: '',
        phone: '',
    });

    // Filter members
    const filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.memberId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.phone.includes(searchTerm)
    );

    const handleOpenModal = (member = null) => {
        if (member) {
            setEditingMember(member);
            setFormData({
                name: member.name,
                memberId: member.memberId,
                email: member.email,
                phone: member.phone,
            });
        } else {
            setEditingMember(null);
            // Generate member ID
            const nextId = members.length > 0
                ? Math.max(...members.map(m => parseInt(m.memberId.replace('MEM', '')))) + 1
                : 1;
            setFormData({
                name: '',
                memberId: `MEM${String(nextId).padStart(3, '0')}`,
                email: '',
                phone: '',
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingMember(null);
        setFormData({
            name: '',
            memberId: '',
            email: '',
            phone: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.memberId || !formData.email || !formData.phone) {
            showToast('error', 'Validation Error', 'Please fill in all fields');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showToast('error', 'Validation Error', 'Please enter a valid email address');
            return;
        }

        if (editingMember) {
            // Update existing member
            setMembers(members.map(member =>
                member.id === editingMember.id
                    ? { ...member, ...formData }
                    : member
            ));
            showToast('success', 'Member Updated', `${formData.name}'s information has been updated`);
        } else {
            // Add new member
            const newMember = {
                id: Date.now(),
                ...formData,
                joinDate: new Date().toISOString().split('T')[0],
            };
            setMembers([...members, newMember]);
            showToast('success', 'Member Added', `${formData.name} has been registered successfully`);
        }

        handleCloseModal();
    };

    const handleDelete = (member) => {
        setMembers(members.filter(m => m.id !== member.id));
        showToast('success', 'Member Deleted', `${member.name} has been removed from the system`);
        setDeleteConfirm(null);
    };

    return (
        <>
            <header className="page-header">
                <h1 className="page-title">Members Management</h1>
            </header>

            <div className="page-content">
                <div className="table-container">
                    <div className="table-header">
                        <h3 className="table-title">All Members ({filteredMembers.length})</h3>
                        <div className="table-actions">
                            <div className="search-box">
                                <span className="search-icon">🔍</span>
                                <input
                                    type="text"
                                    className="form-control search-input"
                                    placeholder="Search members..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                                ➕ Add Member
                            </button>
                        </div>
                    </div>

                    {filteredMembers.length > 0 ? (
                        <div className="table-wrapper">
                            <table className="data-table">
                                <thead>
                                    <tr>
                                        <th>Member ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Join Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredMembers.map(member => (
                                        <tr key={member.id}>
                                            <td><code style={{ fontSize: '0.875rem', fontWeight: 600 }}>{member.memberId}</code></td>
                                            <td><strong>{member.name}</strong></td>
                                            <td>{member.email}</td>
                                            <td>{member.phone}</td>
                                            <td>{new Date(member.joinDate).toLocaleDateString()}</td>
                                            <td>
                                                <div className="table-actions-cell">
                                                    <button
                                                        className="btn btn-sm btn-secondary"
                                                        onClick={() => handleOpenModal(member)}
                                                        title="Edit member"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-danger"
                                                        onClick={() => setDeleteConfirm(member)}
                                                        title="Delete member"
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
                            <div className="empty-icon">👥</div>
                            <h3 className="empty-title">No Members Found</h3>
                            <p className="empty-message">
                                {searchTerm
                                    ? 'Try adjusting your search criteria'
                                    : 'Get started by registering your first member'}
                            </p>
                            {!searchTerm && (
                                <button className="btn btn-primary" onClick={() => handleOpenModal()}>
                                    ➕ Add Your First Member
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}
            {showModal && (
                <Modal
                    title={editingMember ? 'Edit Member' : 'Add New Member'}
                    onClose={handleCloseModal}
                >
                    <form onSubmit={handleSubmit}>
                        <div className="modal-body">
                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Full Name *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter full name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Member ID *</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={formData.memberId}
                                        onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                                        required
                                        disabled={!!editingMember}
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email Address *</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="member@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Phone Number *</label>
                                    <input
                                        type="tel"
                                        className="form-control"
                                        placeholder="555-0100"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
                                {editingMember ? 'Update Member' : 'Add Member'}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <Modal
                    title="Delete Member"
                    onClose={() => setDeleteConfirm(null)}
                >
                    <div className="modal-body">
                        <p>Are you sure you want to delete <strong>{deleteConfirm.name}</strong>?</p>
                        <p className="text-muted">This action cannot be undone.</p>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={() => setDeleteConfirm(null)}>
                            Cancel
                        </button>
                        <button className="btn btn-danger" onClick={() => handleDelete(deleteConfirm)}>
                            Delete Member
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
}

export default Members;
