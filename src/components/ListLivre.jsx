import { useEffect, useState } from "react";
import FetchLivres from "../services/Api";
import { useEmpruntContext } from "../context/EmpruntContext";
import LivresEmpruntes from "./LivresEmpruntes";

const ListLivre = () => {
  const [livres, setLivres] = useState([]);
  const { emprunts, EmpruntLivre, returnLivre } = useEmpruntContext();
  const [showModal, setShowModal] = useState(false);
  const [borrowMessage, setBorrowMessage] = useState("");

  useEffect(() => {
    FetchLivres().then((data) => {
      setLivres(data);
    });
  }, []);

  const handleBorrow = (id, livres) => {
    EmpruntLivre(id, livres);
    setBorrowMessage("Book borrowed successfully!");
    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
    }, 1000);
  };

  return (
    <div>
      <h1>List of Books</h1>

      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          tabIndex="-1"
          aria-labelledby="borrowModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="borrowModalLabel">
                  Success
                </h5>
              </div>
              <div className="modal-body">
                <p>{borrowMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="tables-container">
        <div className="table-container">
          <h2>Available Books</h2>
          {livres.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Available</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {livres.map((livre, index) => (
                  <tr key={index}>
                    <td>{livre.titre}</td>
                    <td>{livre.auteur}</td>
                    <td>{livre.disponible ? "Yes" : "No"}</td>
                    <td>
                      {livre.disponible &&
                        !emprunts.some((b) => b.id === livre.id) && (
                          <button
                            className="borrow"
                            onClick={() => handleBorrow(livre.id, livres)}
                          >
                            Borrow
                          </button>
                        )}

                      {emprunts.some((b) => b.id === livre.id) && (
                        <button
                          className="return"
                          onClick={() => returnLivre(livre.id)}
                        >
                          Return
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No books available.</p>
          )}
        </div>

        <div className="table-container">
          <LivresEmpruntes />
        </div>
      </div>
    </div>
  );
};

export default ListLivre;
