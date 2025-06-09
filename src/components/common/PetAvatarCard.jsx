
import React from 'react';

function PetAvatarCard({ imageUrl, name }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-2 shadow">
        <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
      </div>
      <p className="text-sm text-gray-600 text-center">{name}</p>
    </div>
  );
}

export default PetAvatarCard;
