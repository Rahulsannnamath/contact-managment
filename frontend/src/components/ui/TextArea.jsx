export const TextArea = ({
    label,
    name,
    placeholder,
    value,
    onChange,
    error,
    required = false,
    rows = 4,
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
            <textarea
                id={name}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
                rows={rows}
                className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
            />
            {helperText && !error && (
                <div className="form-text">{helperText}</div>
            )}
            {error && (
                <div className="invalid-feedback d-block">{error}</div>
            )}
        </div>
    );
};
