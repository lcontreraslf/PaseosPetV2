import { useEffect } from 'react';

export default function PetDataManager({ pets, setPets }) {
  useEffect(() => {
    const savedPets = localStorage.getItem('petcare_pets');
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    }
  }, [setPets]);

  useEffect(() => {
    localStorage.setItem('petcare_pets', JSON.stringify(pets));
  }, [pets]);

  return null;
}
