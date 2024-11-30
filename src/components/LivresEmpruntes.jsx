import { useEmpruntContext } from "../context/EmpruntContext"; 

const LivresEmpruntes = () => {
  const { emprunts, returnLivre } = useEmpruntContext(); 

  return (
    <div>
      <h2>Borrowed Books</h2>
      {emprunts.length > 0 ? (
        <table border="1" style={{ width: "100%", textAlign: "left" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Return</th>
            </tr>
          </thead>
          <tbody>
            {emprunts.map((livre, index) => (
              <tr key={index}>
                <td>{livre.titre}</td>
                <td>{livre.auteur}</td>
                <td>
                  <button
                  className="return"
                   onClick={() => returnLivre(livre.id)}>
                    Return
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No books borrowed.</p>
      )}
    </div>
  );
};

export default LivresEmpruntes;
