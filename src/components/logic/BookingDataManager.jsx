import { useEffect } from 'react';

const BookingDataManager = ({ bookings, setBookings }) => {
  useEffect(() => {
    const savedBookings = localStorage.getItem('petcare_bookings');
    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    }
  }, [setBookings]);

  useEffect(() => {
    localStorage.setItem('petcare_bookings', JSON.stringify(bookings));
  }, [bookings]);

  return null; // No renderiza nada
};

export default BookingDataManager;
