import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const name = form.name.value;
    const email = form.email.value;
    const user = { name, email };
    // console.log(user);
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUser = [...users, data];
        setUsers(newUser)
      })
      .catch(error => console.log(error))
    form.reset()
  }

  return (
    <div className="App">

      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder='Name' id="" />
        <br />
        <input type="email" name="email" placeholder='Email' id="" />
        <br />
        <button type="submit">Add user</button>
      </form>

      <h3>users : {users.length}</h3>
      {
        users.map(user => <div key={user._id}>

          <p>
            {user?.name} {user?.email}
          </p>
        </div>)
      }
    </div>
  );
}

export default App;
