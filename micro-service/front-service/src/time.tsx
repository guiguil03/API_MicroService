import React, { useState, useEffect } from "react";

const ReactionTimePage: React.FC<{
  token: string;
  userId: string;
  onLogout: () => void;
}> = ({ token, userId, onLogout }) => {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [displayText, setDisplayText] = useState(false);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [backgroundColor, setBackgroundColor] = useState("black");
  const [isClickable, setIsClickable] = useState(true);
  const [isGameReady, setIsGameReady] = useState(false);
  const [scores, setScores] = useState<{ time: number }[]>([]);
  const [hasPlayed, setHasPlayed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showRed, setShowRed] = useState(false);

  useEffect(() => {
    const randomDelay = Math.floor(Math.random() * 5000) + 1000;
    const timeout = setTimeout(() => {
      setDisplayText(true);
      setStartTime(Date.now());
      setBackgroundColor("lightgray"); // Change background color when game is ready
      setIsGameReady(true);
    }, randomDelay);

    return () => clearTimeout(timeout);
  }, []);

  const handleClick = () => {
    if (displayText && startTime && isClickable && isGameReady) {
      const endTime = Date.now();
      const reaction = endTime - startTime;
      setReactionTime(reaction);
      setBackgroundColor("green");
      setIsClickable(false);
      setHasPlayed(true);

      sendReactionTimeToDB(reaction);
    } else if (!isGameReady) {
      // Si le jeu n'est pas prêt, afficher la couleur rouge temporairement
      setShowRed(true);
      setTimeout(() => {
        setShowRed(false);
      }, 50);
    }
  };

  const sendReactionTimeToDB = async (reactionTime: number) => {
    try {
      console.log("Envoi du temps de réaction :", reactionTime);
      const response = await fetch(
        `http://localhost:3000/time/submit-reaction-time/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reactionTime, userId }),
        }
      );
      if (response.ok) {
        fetchScores();
      } else {
        console.error("Erreur lors de l'envoi du temps de réaction");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
    }
  };

  const fetchScores = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/time/reaction-time/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Erreur HTTP ! statut : ${response.status}`);
      }

      const data = await response.json();
      setScores(
        data.reactionTimes.sort(
          (a: { time: number }, b: { time: number }) => b.time - a.time
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'envoi des données :", error);
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    if (hasPlayed) {
      fetchScores();
    }
  }, [hasPlayed]);

  const resetGame = () => {
    setStartTime(null);
    setDisplayText(false);
    setReactionTime(null);
    setBackgroundColor("black");
    setIsClickable(true);
    setIsGameReady(false);
    setHasPlayed(false); // Réinitialiser l'état hasPlayed
    const randomDelay = Math.floor(Math.random() * 5000) + 1000;
    const timeout = setTimeout(() => {
      setDisplayText(true);
      setStartTime(Date.now());
      setBackgroundColor("lightgray"); // Change background color when game is ready
      setIsGameReady(true);
    }, randomDelay);

    return () => clearTimeout(timeout);
  };

  const handleLogout = () => {
    // Logique de déconnexion
    console.log("Déconnexion");
    onLogout(); // Call the logout function passed as a prop
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: showRed ? "red" : backgroundColor,
        cursor:
          displayText && isClickable && isGameReady ? "pointer" : "default",
        overflow: "hidden", // Prevent scrolling
      }}
      onClick={handleClick}
    >
      {displayText ? (
        <>
          {!hasPlayed && <h1 style={{ userSelect: "none" }}>Click now!</h1>}
          {reactionTime && (
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>
              Votre temps de réaction : {reactionTime} ms
            </p>
          )}
          {reactionTime && hasPlayed && (
            <>
              <h2>Liste de vos scores :</h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  width: "100%", // Adjust the width to match the title
                  maxWidth: "300px", // Optional: set a max-width for better responsiveness
                  marginTop: "20px",
                  maxHeight: "200px", // Set a fixed height for the scrollable area
                  overflowY: "auto", // Enable vertical scrolling
                  scrollbarWidth: "thin", // For Firefox
                  scrollbarColor: "#4CAF50 #f0f0f0", // For Firefox
                }}
              >
                {scores.map((score, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "10px",
                      backgroundColor: "#f0f0f0",
                      borderRadius: "5px",
                      textAlign: "center",
                    }}
                  >
                    {score.time} ms
                  </div>
                ))}
              </div>
            </>
          )}
          {reactionTime && (
            <>
              <button
                onClick={resetGame}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "20px",
                }}
              >
                Rejouer
              </button>
              <button
                onClick={handleLogout}
                style={{
                  padding: "10px 20px",
                  fontSize: "16px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px", // Add some space between the buttons
                }}
              >
                Déconnexion
              </button>
            </>
          )}
        </>
      ) : (
        <h1 style={{ color: "white", userSelect: "none" }}>Wait for it...</h1>
      )}
    </div>
  );
};

export default ReactionTimePage;
