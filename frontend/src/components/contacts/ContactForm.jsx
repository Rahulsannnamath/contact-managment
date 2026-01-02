import { useState } from 'react';
import { User, Mail, Phone } from 'lucide-react';
import { Input, TextArea, Button, Alert } from '../ui';
import { contactService } from '../../services/api';

const initialFormState = {
    name: '',
    email: '',
    phone: '',
    message: '',
};

const ContactForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState(initialFormState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(null);

    const validate = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        } else if (formData.name.trim().length < 2) {
            newErrors.name = 'Name must be at least 2 characters';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
            newErrors.email = 'Enter a valid email address';
        }

        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required';
        } else if (!/^\+?[0-9\s-]{7,}$/.test(formData.phone.trim())) {
            newErrors.phone = 'Enter a valid phone number';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((previous) => ({ ...previous, [name]: value }));

        if (errors[name]) {
            setErrors((previous) => {
                const updated = { ...previous };
                delete updated[name];
                return updated;
            });
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setAlert(null);

        if (!validate()) {
            return;
        }

        setLoading(true);

        try {
            await contactService.createContact(formData);
            setAlert({ type: 'success', message: 'Contact submitted successfully.' });
            setFormData(initialFormState);
            setErrors({});
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            setAlert({
                type: 'error',
                message:
                    error?.response?.data?.message ||
                    'Failed to submit contact. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const isFormValid =
        formData.name.trim() &&
        formData.email.trim() &&
        formData.phone.trim() &&
        Object.keys(errors).length === 0;

    return (
        <form onSubmit={handleSubmit} className="contact-form">
            {alert && (
                <Alert
                    type={alert.type}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="row g-3">
                <div className="col-md-6">
                    <Input
                        label="Name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        error={errors.name}
                        required
                        icon={User}
                    />
                </div>

                <div className="col-md-6">
                    <Input
                        label="Email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        error={errors.email}
                        required
                        icon={Mail}
                    />
                </div>
            </div>

            <Input
                label="Phone"
                name="phone"
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
                error={errors.phone}
                required
                icon={Phone}
                helperText="Include country code for better contact"
            />

            <TextArea
                label="Message (Optional)"
                name="message"
                placeholder="Your message here..."
                value={formData.message}
                onChange={handleChange}
                rows={5}
            />

            <div className="d-flex justify-content-end">
                <Button
                    type="submit"
                    disabled={!isFormValid || loading}
                    loading={loading}
                    size="lg"
                    variant="primary"
                >
                    Submit Contact
                </Button>
            </div>
        </form>
    );
};

export default ContactForm;
