import { Navbar } from './Navbar';
import { Footer } from './Footer';

export const Layout = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100 app-layout">
            <Navbar />
            <main className="flex-grow-1">
                <div className="container py-4">
                    {children}
                </div>
            </main>
            <Footer />
        </div>
    );
};
