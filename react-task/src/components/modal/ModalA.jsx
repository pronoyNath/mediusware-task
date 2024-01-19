import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BiSearch } from "react-icons/bi";

const ModalA = () => {
  const navigate = useNavigate();
  const [usContacts, setUsContacts] = useState([]);
  const [isEven, setIsEven] = useState(false);

  useEffect(() => {
    fetch(
      "https://contact.mediusware.com/api/country-contacts/United%20States/"
    )
      .then((res) => res.json())
      .then((data) => setUsContacts(data.results));
  }, []);
  // console.log(usContacts);

  const evenContacts = usContacts.filter((contact) => contact.id % 2 === 0);

  const ContactRow = ({ contact }) => (
    <tr key={contact.id}>
      <td>{contact.id}</td>
      <td>{contact.country.name}</td>
      <td>{contact.phone}</td>
    </tr>
  );

  return (
    <div style={{ backdropFilter: "blur(50px)" }}>
      <div
        style={{
          width: "80%",
          margin: "50px auto",
          background: "#0d6efd",
          padding: "30px 50px",
          borderRadius: "20px",
        }}
      >
        <div className="d-flex justify-content-between align-items-center my-3">
          <button
            className="btn btn-lg fw-semibold"
            style={{ color: "#fff", background: "#46139F", border: "none" }}
            onClick={() => navigate("/problem-2/modal/modalA")}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg fw-semibold"
            style={{ color: "#fff", background: "#ff7f50", border: "none" }}
            onClick={() => navigate("/problem-2/modal/modalB")}
          >
            Us Contacts
          </button>
          <button
            className="btn btn-lg fw-semibold"
            style={{ color: "#fff", background: "#46139F", border: "none" }}
            onClick={() => navigate("/problem-2")}
          >
            Close
          </button>
        
        </div>
        <table className="table text-center text-white">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Country Name</th>
              <th scope="col">Phone</th>
            </tr>
          </thead>
          <tbody>

            {isEven
              ? evenContacts.map((contact) => <ContactRow contact={contact} />)
              : usContacts.map((contact) => <ContactRow contact={contact} />)}
          </tbody>
        </table>
        <div className="fw-semibold fs-5 text-white">
          <label htmlFor="even">
            <input
              type="checkbox"
              name="even"
              id="even"
              onChange={() => setIsEven(!isEven)}
            />{" "}
            Only even
          </label>
        </div>
      </div>
    </div>
  );
};

export default ModalA;