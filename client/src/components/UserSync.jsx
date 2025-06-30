// src/components/UserSync.jsx
import { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";

const UserSync = () => {
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    const syncUser = async () => {
      if (!isSignedIn || !user) return;

      try {
        await axios.post("http://localhost:5000/auth/register", {
          userId: user.id,
          email: user.primaryEmailAddress.emailAddress,
          name: user.fullName || "Unknown",
        });
      } catch (error) {
        console.error("❌ Failed to sync user with backend:", error);
      }
    };

    syncUser();
  }, [isSignedIn, user]);

  return null; // No UI
};

export default UserSync;
