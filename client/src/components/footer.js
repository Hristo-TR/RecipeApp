import React from 'react'


export const Footer = () => {
  
    return (
        <footer className="bg-green-900 text-white py-4">
          <div className="container mx-auto text-center">
            <p>&copy; {new Date().getFullYear()} Tasty Food</p>
            <p>Images by timolina and KamranAydinov on Freepik</p>
          </div>
        </footer>
      );
}

