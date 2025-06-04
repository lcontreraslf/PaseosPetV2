import { useEffect } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';

const NotificationManager = ({ currentUser }) => {
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('petcare_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('petcare_user');
    }
  }, [currentUser]);

  return <Toaster />;
};

export default NotificationManager;
