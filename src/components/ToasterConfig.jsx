import { Toaster } from 'react-hot-toast';

const ToasterConfig = () => (
  <Toaster
    position="top-center"
    toastOptions={{
      duration: 4000,
      success: {
        style: {
          background: '#4BB543',
          color: '#fff',
        },
      },
      error: {
        style: {
          background: '#FF3333',
          color: '#fff',
        },
      },
    }}
  />
);

export default ToasterConfig;