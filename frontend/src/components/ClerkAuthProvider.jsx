import { useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";
import { setClerkToken } from "../features/api/apiSlice";

// This component updates the token store for API requests
export default function ClerkAuthProvider({ children }) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    const updateToken = async () => {
      if (isSignedIn) {
        try {
          const token = await getToken();
          setClerkToken(token);
        } catch (err) {
          console.warn("Failed to get Clerk token:", err);
          setClerkToken(null);
        }
      } else {
        setClerkToken(null);
      }
    };

    updateToken();
    // Update token periodically (every 5 minutes) or on auth state changes
    const interval = setInterval(updateToken, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [getToken, isSignedIn]);

  return <>{children}</>;
}

