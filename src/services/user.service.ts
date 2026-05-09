import bcrypt from "bcryptjs";

// Mock user database
let users: any[] = [];

export const register = async (username: string, password: string) => {
  const existing = users.find(u => u.username === username);
  if (existing) throw new Error("Username already exists");
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { id: Date.now().toString(), username, password: hashedPassword };
  users.push(user);
  return { id: user.id, username: user.username };
};

export const login = async (username: string, password: string) => {
  const user = users.find(u => u.username === username);
  if (!user) return null;
  
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  
  return { id: user.id, username: user.username };
};