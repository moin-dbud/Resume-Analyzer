import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const syncUser = async () => {
      if (isSignedIn && user) {
        const userData = {
          userId: user.id,
          name: user.fullName || "",
          email: user.primaryEmailAddress?.emailAddress || "",
        };

        try {
          await axios.post("http://localhost:5000/user", userData);
          setUserId(user.id);
        } catch (error) {
          console.error("❌ Failed to sync user with backend:", error);
        }
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return (
    <AppContext.Provider value={{ userId, isSignedIn }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
