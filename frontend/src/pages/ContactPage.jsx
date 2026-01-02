import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/contacts/ContactForm';
import { MessageSquarePlus, Clock, Shield } from 'lucide-react';

const ContactPage = () => {
    const navigate = useNavigate();

    const handleSuccess = () => {
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    return (
        <div className="row g-4">
            <div className="col-lg-5">
                <div className="card info-card h-100">
                    <div className="card-body">
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <MessageSquarePlus size={20} className="text-primary" />
                            <small className="text-uppercase fw-semibold text-primary">Contact Form</small>
                        </div>
                        <h1 className="h2 fw-bold mb-3">Add New Contact</h1>
                        <p className="text-muted mb-4">
                            Fill out the form to add a new contact to your database. All required fields must be completed.
                        </p>

                        <div className="row g-3">
                            <div className="col-sm-6">
                                <div className="feature-box">
                                    <div className="feature-icon bg-primary bg-opacity-10 text-primary">
                                        <Clock size={24} />
                                    </div>
                                    <h6 className="fw-semibold mb-1">Quick Response</h6>
                                    <small className="text-muted">Your contact will be added instantly</small>
                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="feature-box">
                                    <div className="feature-icon bg-success bg-opacity-10 text-success">
                                        <Shield size={24} />
                                    </div>
                                    <h6 className="fw-semibold mb-1">Data Privacy</h6>
                                    <small className="text-muted">Your data is secure and encrypted</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-lg-7">
                <div className="card form-card">
                    <div className="card-body">
                        <ContactForm onSuccess={handleSuccess} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
