import { useCallback } from "react";

export type UserData = {
  name: string;
  email: string;
};

export default function useUserData() {
  const setUserData = useCallback((userData: UserData) => {
    if (typeof window === "undefined") {
      return;
    }
    
    localStorage.setItem('userData', JSON.stringify(userData));
  }, []);

  const getUserData = useCallback(() =>{
    if (typeof window === "undefined") {
      return null;
    }

    const userData = localStorage.getItem('userData');
    if (!userData) return null;

    const parsedUserData = JSON.parse(userData);

    if (!parsedUserData.name || !parsedUserData.email) return null;

    return parsedUserData;
  }, []);

  

  return {
    setUserData,
    getUserData,
  };
}
