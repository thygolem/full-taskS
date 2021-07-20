import React, { useState, useEffect, useRef } from "react";
// useEffect nos permite volver a ejecutar código una vez renderizado el componente 


const API = process.env.REACT_APP_API; // Recojemos la variable de entorno y le asignamos un nombre

export const Users = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");


  const [editing, setEditing] = useState(false); //Definimos un estado diferente para el formulario cuando estamos editando un Objeto(Usuario)
  const [id, setId] = useState(""); // 1:27:00  recoger el _id

  const nameInput = useRef(null);

  let [users, setUsers] = useState([]); // Mostrar los usuarios min 1:08:30.
  // Array vacio! para poder mostrar lo que recibimos

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
          lat,
          long,
        }),
      });
      await res.json();
    } else { // En caso de estar editando !
      const res = await fetch(`${API}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          lat,
          long
        }),
      });
      const data = await res.json();
      console.log(data);
      setEditing(false); // Para 'resetar' el estado de edición a creación 
      setId(""); // Para limpiar el formulario después de haber modificado el objeto(usuario)
    }
    await getUsers(); // Llama a la función de obtener los datos para que se actualice la tabla.

    setName(""); // Para limpiar el formulario después de haber creado un objeto(usuario)
    setEmail(""); // Para limpiar el formulario después de haber creado un objeto(usuario)
    setPassword(""); // Para limpiar el formulario después de haber creado un objeto(usuario)
    setLat(""); // Para limpiar el formulario después de haber creado un objeto(usuario)
    setLong(""); // Para limpiar el formulario después de haber creado un objeto(usuario)
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
      await getUsers(); // Llama a la función de obtener los datos para que se actualice la tabla.
      //React estará comparando la información
    }
  };

  const editUser = async (id) => {
    const res = await fetch(`${API}/user/${id}`);
    const data = await res.json();

    setEditing(true); // Alteramos el estado de la variable que hemos creado para poder editar en el formulario
    setId(id);

    // Reset
    setName(data.name);
    setEmail(data.email);
    setPassword(data.password);
    setLat(data.password);
    setLong(data.password);
    nameInput.current.focus();
  };

  useEffect(() => {
    getUsers();
  }, []);
  // Sustituye a didMount

  return (
    <div className="row">
      <div className="col-md-4"> {/* este div ocupa 4 columnas  */} 
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
          <div className="form-group">
            <input
              type="lat"
              onChange={(e) => setLat(e.target.value)}
              value={lat}
              className="form-control"
              placeholder="User's Latitude"
            />
          </div>
          <div className="form-group">
            <input
              type="long"
              onChange={(e) => setLong(e.target.value)}
              value={long}
              className="form-control"
              placeholder="User's Longitude"
            />
          </div>
          <button className="btn btn-primary btn-block">
            {editing ? "Update" : "Create"} 
            {/**Estamos cambiando el texto en función del estado del formulario. (? Verdadero : Falso )*/}
          </button>
        </form>
      </div>
      <div className="col-md-6">
        <table className="table table-striped"> {/* striped nos muestra la tabla con colores alternados */ }
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Latitude</th>
              <th>Longitude</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              // Recorrer cada uno de los usuarios
              <tr key={user._id}> {/**cada _id por regla es único y debe reflejarse por cada tr */}
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>{user.lat}</td>
                <td>{user.long}</td>
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
              // Recorrer cada uno de los usuarios
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};