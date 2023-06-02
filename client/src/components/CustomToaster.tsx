import { useToaster } from 'react-hot-toast/headless';

const Notifications = () => {
  const { toasts, handlers } = useToaster();
  const { startPause, endPause } = handlers;

  return (
    <div onMouseEnter={startPause} onMouseLeave={endPause}>
      {toasts
        .filter((toast) => toast.visible)
        .map((toast: any) => (
          <div key={toast.id} {...toast.ariaProps}>
            {toast.message}
          </div>
        ))}
    </div>
  );
};

export default Notifications