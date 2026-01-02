import { CheckCircle2, XCircle, AlertCircle, X } from 'lucide-react';

export const Alert = ({ type = 'info', message, onClose }) => {
    const types = {
        success: {
            variant: 'alert-success',
            icon: CheckCircle2,
        },
        error: {
            variant: 'alert-danger',
            icon: XCircle,
        },
        warning: {
            variant: 'alert-warning',
            icon: AlertCircle,
        },
    };

    const config = types[type] || types.info;
    const Icon = config.icon;

    return (
        <div className={`alert ${config.variant} alert-dismissible fade show d-flex align-items-start gap-2`} role="alert">
            <Icon size={20} className="flex-shrink-0 mt-1" />
            <div className="flex-grow-1">{message}</div>
            {onClose && (
                <button
                    type="button"
                    className="btn-close"
                    onClick={onClose}
                    aria-label="Close"
                ></button>
            )}
        </div>
    );
};
