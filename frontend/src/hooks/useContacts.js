import { useState, useEffect } from 'react';
import { contactService } from '../services/api';

export const useContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState('createdAt');
    const [order, setOrder] = useState('desc');

    const fetchContacts = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await contactService.getAllContacts();
            setContacts(Array.isArray(data) ? data : []);
        } catch (err) {
            setError(err.message || 'Failed to fetch contacts');
            setContacts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const sortedContacts = [...contacts].sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
            return order === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
        }

        if (sortBy === 'createdAt') {
            const aDate = new Date(aValue);
            const bDate = new Date(bValue);
            return order === 'asc' ? aDate - bDate : bDate - aDate;
        }

        return 0;
    });

    const removeContact = async (id) => {
        await contactService.deleteContact(id);
        setContacts((prev) => prev.filter((contact) => contact._id !== id));
    };

    const updateSorting = (field) => {
        if (sortBy === field) {
            setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortBy(field);
            setOrder('asc');
        }
    };

    return {
        contacts: sortedContacts,
        loading,
        error,
        sortBy,
        order,
        refetch: fetchContacts,
        removeContact,
        updateSorting,
    };
};
