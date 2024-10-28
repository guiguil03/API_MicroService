import React from "react";

const GamePage: React.FC<{ onPlay: () => void; onLogout: () => void }> = ({
  onPlay,
  onLogout,
}) => {
  return (
    <div style={styles.container}>
      <h1>F1 Game</h1>
      <button onClick={onPlay} style={styles.button}>
        Jouer
      </button>
      <button
        onClick={onLogout}
        style={{ ...styles.button, ...styles.logoutButton }}
      >
        Déconnexion
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  button: {
    padding: "10px 20px",
    fontSize: "18px",
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    margin: "10px 0",
  },
  logoutButton: {
    backgroundColor: "#f44336",
  },
};

export default GamePage;
