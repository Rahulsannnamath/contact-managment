import Contact from "../models/Contact.js";

export const createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and phone are required fields",
            });
        }

        const contact = await Contact.create({
            name,
            email,
            phone,
            message: message || "",
        });

        res.status(201).json({
            success: true,
            message: "Contact created successfully",
            data: contact,
        });
    } catch (error) {
        // Handle mongoose validation errors
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", "),
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while creating contact",
            error: error.message,
        });
    }
};

export const getAllContacts = async (req, res) => {
    try {
        const { sortBy = "createdAt", order = "desc" } = req.query;

        const allowedSortFields = ["name", "email", "phone", "createdAt", "updatedAt"];
        const sortField = allowedSortFields.includes(sortBy) ? sortBy : "createdAt";
        const sortOrder = order === "asc" ? 1 : -1;

        const contacts = await Contact.find()
            .sort({ [sortField]: sortOrder })
            .select("-__v");

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error while fetching contacts",
            error: error.message,
        });
    }
};

export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id).select("-__v");

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        res.status(200).json({
            success: true,
            data: contact,
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID format",
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while fetching contact",
            error: error.message,
        });
    }
};

export const updateContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;

        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        if (name !== undefined) contact.name = name;
        if (email !== undefined) contact.email = email;
        if (phone !== undefined) contact.phone = phone;
        if (message !== undefined) contact.message = message;

        const updatedContact = await contact.save();

        res.status(200).json({
            success: true,
            message: "Contact updated successfully",
            data: updatedContact,
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(", "),
            });
        }

        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID format",
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while updating contact",
            error: error.message,
        });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        if (!contact) {
            return res.status(404).json({
                success: false,
                message: "Contact not found",
            });
        }

        await Contact.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: "Contact deleted successfully",
            data: { id: req.params.id },
        });
    } catch (error) {
        if (error.name === "CastError") {
            return res.status(400).json({
                success: false,
                message: "Invalid contact ID format",
            });
        }

        res.status(500).json({
            success: false,
            message: "Server error while deleting contact",
            error: error.message,
        });
    }
};
