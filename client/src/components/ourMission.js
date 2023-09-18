import React from 'react'

 export const OurMission = () => {
  const scrollToRecipes = () => {
    const recipesSection = document.getElementById('recipes');
    if (recipesSection) {
      recipesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative" id="diagonal2">
      <div className="absolute top-1/2 right-1/2 transform translate-x-12 -translate-y-2/4 w-1/2 text-left">
        <p className="text-green-800 font-bold  text-4xl lg:text-5xl font-signature2 z-0">
          Our Mission
        </p>
        <p className="text-black text-3xl text-justify w-2/3 font-medium">
          To grow a positive community of food lovers and makers alike that see cooking as a way to express themselves!
        </p>
      </div>
      
  </div>
    
  );

}
