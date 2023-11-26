export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  export const validatePassword = (password: string): boolean => {
    return (
      password.length >= 7 &&
      /[a-z]/.test(password) && 
      /[A-Z]/.test(password) && 
      /\d/.test(password) 
   
    );
  };