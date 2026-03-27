const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../Data/users.json");

const readData = () => {
  try {
    return JSON.parse(fs.readFileSync(dataPath));
  } catch {
    return [];
  }
};

const writeData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
};

const generateToken = () => {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
};

exports.register = (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email, and password are required" });
    }

    const users = readData();
    const existing = users.find((u) => u.email === email);
    if (existing) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const user = {
      id: Date.now().toString(),
      username,
      email,
      password,
      role: "user",
      token: generateToken(),
    };

    users.push(user);
    writeData(users);

    const safeUser = { id: user.id, username: user.username, email: user.email, role: user.role };
    return res.status(201).json({ user: safeUser, token: user.token });
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.login = (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "email and password are required" });
    }

    const users = readData();
    const user = users.find((u) => u.email === email && u.password === password);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.token = generateToken();
    writeData(users);

    const safeUser = { id: user.id, username: user.username, email: user.email, role: user.role || "user" };
    return res.status(200).json({ user: safeUser, token: user.token });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getMe = (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const users = readData();
    const user = users.find((u) => u.id === req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const safeUser = { id: user.id, username: user.username, email: user.email, role: user.role || "user" };
    return res.status(200).json({ user: safeUser });
  } catch (err) {
    console.error("GetMe error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getAllUsers = (req, res) => {
  try {
    const users = readData();
    const safeUsers = users.map((u) => ({ id: u.id, username: u.username, email: u.email, role: u.role || "user" }));
    return res.status(200).json(safeUsers);
  } catch (err) {
    console.error("GetAllUsers error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteUser = (req, res) => {
  try {
    const { id } = req.params;
    let users = readData();

    const before = users.length;
    users = users.filter((u) => u.id !== id);

    if (users.length === before) {
      return res.status(404).json({ message: "User not found" });
    }

    writeData(users);
    return res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.error("DeleteUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
