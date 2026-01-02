export const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer py-4 mt-auto">
            <div className="container">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center gap-3">
                    <p className="text-muted mb-0 small">
                        © {currentYear} Contact Management. All rights reserved.
                    </p>
                    <div className="d-flex gap-4">
                        <a href="#" className="footer-link">Privacy</a>
                        <a href="#" className="footer-link">Terms</a>
                        <a href="#" className="footer-link">Support</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};
