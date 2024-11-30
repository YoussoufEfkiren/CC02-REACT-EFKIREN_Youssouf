import  { createContext, useState, useContext } from "react";

const EmpruntContext = createContext();

// eslint-disable-next-line react/prop-types
export const EmpruntProvider = ({ children }) => {
  const [emprunts, setEmprunts] = useState([]); 


  const EmpruntLivre = (id, livres) => {
    const livreToBorrow = livres.find(livre => livre.id === id); 
    if (livreToBorrow && livreToBorrow.disponible) {
      livreToBorrow.disponible = false;
      setEmprunts((prevEmprunts) => [...prevEmprunts, livreToBorrow]); 
    }
  };

  const returnLivre = (id) => {
    const livreToReturn = emprunts.find(livre => livre.id === id);
    if (livreToReturn) {
      livreToReturn.disponible = true;
    }
    setEmprunts((prevEmprunts) => prevEmprunts.filter(livre => livre.id !== id));

  };

  return (
    <EmpruntContext.Provider value={{ emprunts, EmpruntLivre, returnLivre }}>
      {children}
    </EmpruntContext.Provider>
  );
};

export const useEmpruntContext = () => useContext(EmpruntContext);
