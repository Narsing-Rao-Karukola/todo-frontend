const endpoints = {
  signIn: {
    method: "POST",
    url: "/auth/signin",
  },
  signUp: {
    method: "POST",
    url: "/auth/signup",
  },
  getAllTodos: {
    method: "GET",
    url: "/todo",
  },
  createTodo: {
    method: "POST",
    url: "/todo",
  },
};

export const { signIn, signUp,getAllTodos,createTodo } = endpoints;
