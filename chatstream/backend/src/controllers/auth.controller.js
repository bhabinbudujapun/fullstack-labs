const signup = (req, res) => {
  // Logic for user signup
  res.status(201).send("User signed up successfully");
};

const login = (req, res) => {
  // Logic for user login
  res.status(200).send("User logged in successfully");
};

const logout = (req, res) => {
  // Logic for user logout
  res.status(200).send("User logged out successfully");
};

export { signup, login, logout };
