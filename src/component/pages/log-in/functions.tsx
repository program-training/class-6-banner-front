export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  export const validatePassword = (password: string): boolean => {
    return (
      password.length >= 7 &&
      password.length >= 7 &&
      ( /[a-z]/.test(password)) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password)
    );
  };
