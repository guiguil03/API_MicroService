import React, { useState, useEffect } from "react";
import ReactionTimePage from "./time";
import GamePage from "./gamePage";

const Register = ({
  setIsLoggedIn,
  setToken,
  setUserId,
}: {
  setIsLoggedIn: (value: boolean) => void;
  setToken: (token: string) => void;
  setUserId: (id: string) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("compte créé");
    console.log("Is Admin:", isAdmin);

    try {
      const response = await fetch("http://localhost:3000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, isAdmin }),
      });

      const data = await response.json();
      console.log("data", data);
      if (response.ok) {
        console.log("Utilisateur :", data.userId);
        setIsLoggedIn(true);
        setToken(data.token); // Stockez le token
        localStorage.setItem("token", data.token); // Stockez le token dans localStorage
        console.log("Token:", data.token);
        setUserId(data.userId); // Stockez l'ID de l'utilisateur
        localStorage.setItem("userId", data.userId); // Stockez l'ID de l'utilisateur dans localStorage
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      alert("Erreur lors de l'inscription.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="regEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="regPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="isAdmin" style={styles.label}>
            Admin?
          </label>
          <input
            type="checkbox"
            id="isAdmin"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

const Login = ({
  setIsLoggedIn,
  setToken,
  setUserId,
}: {
  setIsLoggedIn: (value: boolean) => void;
  setToken: (token: string) => void;
  setUserId: (id: string) => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Email:", email);

    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("connecté");
        alert("Connexion réussie");
        console.log("Utilisateur:", data);
        setIsLoggedIn(true);
        setToken(data.token); // Stockez le token
        localStorage.setItem("token", data.token); // Stockez le token dans localStorage
        setUserId(data.userId); // Stockez l'ID de l'utilisateur
        localStorage.setItem("userId", data.userId); // Stockez l'ID de l'utilisateur dans localStorage
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      alert("Erreur lors de la connexion.");
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="logEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            required
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="LogPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const AuthContainer = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [token, setToken] = useState<string>("");
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUserId = localStorage.getItem("userId");
    if (storedToken && storedUserId) {
      setToken(storedToken);
      setUserId(storedUserId);
      setIsLoggedIn(true);
    }
  }, []);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken("");
    setUserId("");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsPlaying(false); // Reset the playing state
  };

  return (
    <div style={styles.authContainer}>
      {isLoggedIn ? (
        isPlaying ? (
          <ReactionTimePage
            token={token}
            userId={userId}
            onLogout={handleLogout}
          />
        ) : (
          <GamePage onPlay={handlePlay} onLogout={handleLogout} />
        )
      ) : (
        <div style={styles.centeredContainer}>
          <Register
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
            setUserId={setUserId}
          />
          <Login
            setIsLoggedIn={setIsLoggedIn}
            setToken={setToken}
            setUserId={setUserId}
          />
        </div>
      )}
    </div>
  );
};

const styles = {
  authContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#f5f5f5",
    overflow: "hidden", // Prevent scrolling
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start", // Align items to the start to ensure they start at the same height
    gap: "50px", // Adjust the gap between the Register and Login blocks
    height: "100%", // Ensure the container takes the full height
  },
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    minHeight: "300px", // Set a minimum height for the containers
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    height: "100%", // Ensure the form takes the full height of the container
  },
  inputGroup: {
    marginBottom: "15px",
  },
  label: {
    textAlign: "center" as const,
    display: "block",
    marginBottom: "5px",
  },
  input: {
    width: "calc(100% - 40px)",
    maxWidth: "300px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    margin: "0 20px",
  },
  button: {
    padding: "10px 15px",
    fontSize: "16px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export { AuthContainer, Register, Login };
