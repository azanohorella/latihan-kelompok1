
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Gagal mengambil data pengguna");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <header>
        <p className="subtitle">USER MANAGEMENT</p>
        <h1>Data Pengguna</h1>
        <p>
          Daftar informasi pengguna yang mencakup nama, email,
          nomor telepon, website, dan alamat.
        </p>
      </header>

      <main className="content">
        <div className="section-header">
          <h2>Daftar Pengguna</h2>
          <span className="summary">
            Total: {users.length} pengguna
          </span>
        </div>

        {loading && (
          <div className="message">
            Memuat data pengguna...
          </div>
        )}

        {error && (
          <div className="error">
            Terjadi kesalahan: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="user-grid">
            {users.map((user) => (
              <div className="user-card" key={user.id}>
                <div className="avatar">
                  {user.name.charAt(0)}
                </div>

                <h3>{user.name}</h3>
                <p>@{user.username}</p>

                <div className="details">
                  <p>
                    <strong>Email</strong>
                    <span>{user.email}</span>
                  </p>

                  <p>
                    <strong>Nomor Telepon</strong>
                    <span>{user.phone}</span>
                  </p>

                  <p>
                    <strong>Website</strong>
                    <span>{user.website}</span>
                  </p>

                  <p>
                    <strong>Alamat</strong>
                    <span>
                      {user.address.street},{" "}
                      {user.address.suite},{" "}
                      {user.address.city}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer>
        © 2026 User Management Dashboard
      </footer>
    </div>
  );
}

export default App;
