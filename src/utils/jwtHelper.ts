export const isValidToken = (expiresAt: number): boolean => {
    return Date.now() < Date.now() + expiresAt * 1000;
  };
  