import { useState } from 'react';
import { Search, Trash2, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { Button } from '../ui';

const ContactTable = ({ contacts, onDelete, sortBy, order, onSort }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredContacts = contacts.filter((contact) => {
        const search = searchTerm.toLowerCase();
        return (
            contact.name?.toLowerCase().includes(search) ||
            contact.email?.toLowerCase().includes(search) ||
            contact.phone?.toLowerCase().includes(search)
        );
    });

    const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedContacts = filteredContacts.slice(startIndex, startIndex + itemsPerPage);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this contact?')) {
            try {
                await onDelete(id);
            } catch (error) {
                alert('Failed to delete contact');
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const avatarColors = ['primary', 'success', 'info', 'warning', 'danger'];
    const getAvatarColor = (name) => {
        const index = name.charCodeAt(0) % avatarColors.length;
        return avatarColors[index];
    };

    return (
        <div className="contact-table-container">
            <div className="mb-4">
                <div className="input-group search-bar">
                    <span className="input-group-text bg-transparent border-end-0">
                        <Search size={18} />
                    </span>
                    <input
                        type="text"
                        className="form-control border-start-0"
                        placeholder="Search by name, email, or phone..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
            </div>

            <div className="table-responsive custom-table">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr>
                            <th className="sortable" onClick={() => onSort('name')}>
                                Contact {sortBy === 'name' && <ArrowUpDown size={14} className="ms-1" />}
                            </th>
                            <th className="sortable" onClick={() => onSort('email')}>
                                Email {sortBy === 'email' && <ArrowUpDown size={14} className="ms-1" />}
                            </th>
                            <th>Phone</th>
                            <th className="sortable" onClick={() => onSort('createdAt')}>
                                Added {sortBy === 'createdAt' && <ArrowUpDown size={14} className="ms-1" />}
                            </th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedContacts.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center py-5 text-muted">
                                    {searchTerm ? 'No contacts found matching your search.' : 'No contacts yet.'}
                                </td>
                            </tr>
                        ) : (
                            paginatedContacts.map((contact) => (
                                <tr key={contact._id}>
                                    <td>
                                        <div className="d-flex align-items-center gap-3">
                                            <div className={`avatar-circle bg-${getAvatarColor(contact.name)}`}>
                                                {getInitials(contact.name)}
                                            </div>
                                            <div>
                                                <div className="fw-semibold">{contact.name}</div>
                                                {contact.message && (
                                                    <small className="text-muted text-truncate d-block" style={{ maxWidth: '200px' }}>
                                                        {contact.message}
                                                    </small>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td className="text-muted">{formatDate(contact.createdAt)}</td>
                                    <td className="text-end">
                                        <button
                                            onClick={() => handleDelete(contact._id)}
                                            className="btn btn-sm btn-outline-danger rounded-circle delete-btn"
                                            title="Delete contact"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <div className="d-flex justify-content-between align-items-center mt-4 pagination-container">
                    <small className="text-muted">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredContacts.length)} of {filteredContacts.length} contacts
                    </small>
                    <nav>
                        <ul className="pagination pagination-sm mb-0">
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                >
                                    <ChevronLeft size={16} />
                                </button>
                            </li>
                            <li className="page-item active">
                                <span className="page-link">
                                    {currentPage} / {totalPages}
                                </span>
                            </li>
                            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                                <button
                                    className="page-link"
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </li>
                        </ul>
                    </nav>
                </div>
            )}
        </div>
    );
};

export default ContactTable;
