// import { create } from "zustand";

// let user = (set) => ({
//   credential: {},
//   isAuth: false,

//   setIsAuth: (isAuth) => set({ isAuth }), // Update state immutably
//   setCredential: (credential) =>
//     set({
//       Authorization: credential.ticket,
//       CSRFPreventionToken: credential.CSRFPreventionToken,
//     }),
//   logout: () => set({ credential: {}, isAuth: false }, true), // Clear state on logout
// });

// const useStore = create(user);

// export default useStore;
