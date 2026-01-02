import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Contact from "../models/Contact.js";

dotenv.config();

const contacts = [
    {
        name: "Rahul Sharma",
        email: "rahul.sharma@gmail.com",
        phone: "+91-9876543210",
        message: "Hi, I would like to inquire about your services.",
    },
    {
        name: "Priya Patel",
        email: "priya.patel@yahoo.com",
        phone: "+91-8765432109",
        message: "Please contact me regarding the project proposal.",
    },
    {
        name: "Amit Kumar",
        email: "amit.kumar@outlook.com",
        phone: "+91-7654321098",
        message: "",
    },
    {
        name: "Sneha Reddy",
        email: "sneha.reddy@gmail.com",
        phone: "+91-9988776655",
        message: "Looking forward to hearing from you soon!",
    },
    {
        name: "Vikram Singh",
        email: "vikram.singh@hotmail.com",
        phone: "+91-8877665544",
        message: "Can we schedule a meeting for next week?",
    },
    {
        name: "Anjali Gupta",
        email: "anjali.gupta@gmail.com",
        phone: "+91-9123456789",
        message: "I have some questions about pricing.",
    },
    {
        name: "Arjun Nair",
        email: "arjun.nair@yahoo.co.in",
        phone: "+91-9234567890",
        message: "",
    },
    {
        name: "Deepika Iyer",
        email: "deepika.iyer@gmail.com",
        phone: "+91-9345678901",
        message: "Thank you for the quick response!",
    },
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected for seeding...");

        await Contact.deleteMany({});
        console.log("Existing contacts cleared.");

        const createdContacts = await Contact.insertMany(contacts);
        console.log(`${createdContacts.length} contacts seeded successfully!`);

        await mongoose.connection.close();
        console.log("Database connection closed.");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error.message);
        process.exit(1);
    }
};

seedDB();
