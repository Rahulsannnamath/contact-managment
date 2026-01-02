export const Input = ({
    label,
    name,
    type = 'text',
    placeholder,
    value,
    onChange,
    error,
    required = false,
    icon: Icon,
    helperText,
    className = '',
}) => {
    return (
        <div className="mb-3">
            {label && (
                <label htmlFor={name} className="form-label">
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            )}
            <div className="position-relative">
                {Icon && (
                    <div className="input-icon">
                        <Icon size={20} />
                    </div>
                )}
                <input
                    id={name}
                    name={name}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    required={required}
                    className={`form-control ${Icon ? 'with-icon' : ''} ${error ? 'is-invalid' : ''} ${className}`}
                />
            </div>
            {helperText && !error && (
                <div className="form-text">{helperText}</div>
            )}
            {error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};
