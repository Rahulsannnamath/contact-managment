import { Loader2 } from 'lucide-react';

export const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    icon: Icon,
}) => {
    const variants = {
        primary: 'btn-primary gradient-btn',
        secondary: 'btn-secondary',
        ghost: 'btn-outline-light',
        danger: 'btn-danger',
    };

    const sizes = {
        sm: 'btn-sm',
        md: '',
        lg: 'btn-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn ${variants[variant]} ${sizes[size]} d-inline-flex align-items-center gap-2 ${className}`}
        >
            {loading ? (
                <>
                    <Loader2 className="spinner-icon" size={18} />
                    <span>Loading...</span>
                </>
            ) : (
                <>
                    {Icon && <Icon size={18} />}
                    {children}
                </>
            )}
        </button>
    );
};
