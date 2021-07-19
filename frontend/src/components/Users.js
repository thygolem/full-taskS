import React, { useState, useEffect, useRef } from "react";

const API = process.env.REACT_APP_API; // Recojemos la variable de entorno y le asignamos un nombre

export const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [editing, setEditing] = useState(false);
  const [id, setId] = useState("");

  const nameInput = useRef(null);

  let [users, setUsers] = useState([]);

  const handleSubmit = async (e) => {
        // Es un método asíncrono, con lo que el navegador no se queda bloqueado cuando envía la petición. Lo hace en segundo plano. VER TUTORIAL DE ASYNC AWAIT !!!
    e.preventDefault();
    // preventDefault nos permite cancelar el evento por defecto, que en este caso nos estaba provocando un reinicio indeseado de la página en el navegador
    if (!editing) {
      const res = await fetch(`${API}/users`, {
        // Fetch recibe la dirección de donde queremos enviar los datos, qué queremos enviar y a través de qué método
        // Usando los `backtips` de JS
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Especificamos el tipo de archivo, podría ser un PDF, un MP3...etc
        },
        body: JSON.stringify({
        // Convertimos a string para poder enviar los datos. Enviar objetos daría error
          name,
          email,
          password,
        }),
      });
      await res.json();
    } else {
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false);
      setId("");
    }
    await getUsers();

    setName("");
    setEmail("");
    setPassword("");
    nameInput.current.focus();
  };

  const getUsers = async () => {
    const res = await fetch(`${API}/users`);
    // Por defecto fetch hace la petición GET
    const data = await res.json();
    setUsers(data);
  };

  const deleteUser = async (id) => {
    const userResponse = window.confirm("Are you sure you want to delete it?");
    if (userResponse) {
      const res = await fetch(`${API}/users/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log(data);
      await getUsers();
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/users/${id}`);
    const data = await res.json();

    setEditing(true);
    setId(id);

    // Reset
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="row">
      <div className="col-md-4">
        <form onSubmit={handleSubmit} className="card card-body">
          <div className="form-group">
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="form-control"
              placeholder="Name"
              ref={nameInput}
              autoFocus
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
              placeholder="User's Email"
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
              placeholder="User's Password"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Create"}
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-secondary btn-sm btn-block"
                    onClick={(e) => editUser(user._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm btn-block"
                    onClick={(e) => deleteUser(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};