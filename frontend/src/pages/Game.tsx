import { Navigate } from "react-router-dom";
import { encryptEmailWithRandomString } from "../utils/encrypt";
import { useGlobalContext } from "../components/context/GlobalContext";

const Game = () => {
  const { userProfileState } = useGlobalContext();

  if (!userProfileState) return <Navigate to="/" />;

  const encryptedEmail = encryptEmailWithRandomString(userProfileState?.email);

  return (
    <div className="content-center h-screen">
      <iframe
        src={`${import.meta.env.VITE_GAMES_URL}?ref=${encryptedEmail}&amount=${
          userProfileState?.balance
        }`}
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default Game;
