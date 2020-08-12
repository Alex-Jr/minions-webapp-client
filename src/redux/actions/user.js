export const LOGIN = "LOGIN";
export const SINGOUT = "SINGOUT";

export const login = (user) => {
  return { type: LOGIN, email: user.email, userId: user.sub};
};

export const singout = () => {
  return { type: SINGOUT};
};

