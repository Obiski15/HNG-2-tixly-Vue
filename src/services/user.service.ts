// export interface User {
//   id: string;
//   name: string;
//   email: string;
// }

// export const authService = {
//   login: (email: string, password: string): User | null => {
//     const users = authService.getUsers();
//     const user = users.find(u => u.email === email);

//     if (!user) return null;

//     // In a real app, verify password hash
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
//     return user;
//   },

//   signup: (name: string, email: string, password: string): User | null => {
//     const users = authService.getUsers();

//     if (users.find(u => u.email === email)) {
//       return null; // User already exists
//     }

//     const newUser: User = {
//       id: crypto.randomUUID(),
//       name,
//       email,
//     };

//     users.push(newUser);
//     localStorage.setItem("ticketflow_users", JSON.stringify(users));
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));

//     return newUser;
//   },

//   logout: () => {
//     localStorage.removeItem(STORAGE_KEY);
//   },

//   getCurrentUser: (): User | null => {
//     const userStr = localStorage.getItem(STORAGE_KEY);
//     if (!userStr) return null;

//     try {
//       return JSON.parse(userStr);
//     } catch {
//       return null;
//     }
//   },

//   getUsers: (): User[] => {
//     const usersStr = localStorage.getItem("ticketflow_users");
//     if (!usersStr) return [];

//     try {
//       return JSON.parse(usersStr);
//     } catch {
//       return [];
//     }
//   },
// };
