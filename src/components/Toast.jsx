function Toast({ toasts, onClose }) {
    if (toasts.length === 0) return null;

    const getToastIcon = (type) => {
        switch (type) {
            case 'success':
                return '✓';
            case 'error':
                return '✕';
            case 'warning':
                return '⚠';
            default:
                return 'ℹ';
        }
    };

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <div key={toast.id} className={`toast toast-${toast.type}`}>
                    <div className="toast-icon">{getToastIcon(toast.type)}</div>
                    <div className="toast-content">
                        <div className="toast-title">{toast.title}</div>
                        <p className="toast-message">{toast.message}</p>
                    </div>
                    <button
                        className="toast-close"
                        onClick={() => onClose(toast.id)}
                        aria-label="Close notification"
                    >
                        ✕
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Toast;
