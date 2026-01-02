import { useContacts } from '../hooks/useContacts';
import ContactTable from '../components/contacts/ContactTable';
import { BarChart3, Users } from 'lucide-react';

const DashboardPage = () => {
    const { contacts, loading, error, sortBy, order, removeContact, updateSorting, refetch } = useContacts();

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary mb-3" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted">Loading contacts...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
                <div className="alert alert-danger text-center">
                    <p>Error: {error}</p>
                    <button onClick={refetch} className="btn btn-danger mt-3">
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="dashboard-page">
            <div className="card overview-card mb-4">
                <div className="card-body">
                    <div className="d-flex align-items-center gap-2 mb-3">
                        <BarChart3 size={20} className="text-primary" />
                        <small className="text-uppercase fw-semibold text-primary">Overview</small>
                    </div>
                    <h1 className="h2 fw-bold mb-2">Contact Dashboard</h1>
                    <p className="text-muted mb-4">
                        Manage and track all your contact form submissions in one place.
                    </p>
                    
                    <div className="stat-badge">
                        <Users size={24} />
                        <div>
                            <div className="h3 mb-0 fw-bold">{contacts.length}</div>
                            <small className="text-muted">Total Contacts</small>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card table-card">
                <div className="card-body">
                    <ContactTable
                        contacts={contacts}
                        onDelete={removeContact}
                        sortBy={sortBy}
                        order={order}
                        onSort={updateSorting}
                    />
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
