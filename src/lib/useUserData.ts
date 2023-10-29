export type UserData = {
  name: string;
  email: string;
};

export default function useUserData() {
  function setUserData(userData: UserData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  function getUserData(): UserData | null {
    const userData = localStorage.getItem('userData');
    if (!userData) return null;

    const parsedUserData = JSON.parse(userData);

    if (!parsedUserData.name || !parsedUserData.email) return null;

    return parsedUserData;
  }

  return {
    setUserData,
    getUserData,
  };
}
