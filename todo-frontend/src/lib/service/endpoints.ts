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
    url: "/tasks",
  },
  createTodo: {
    method: "POST",
    url: "/tasks",
  },
};

export const { signIn, signUp,getAllTodos,createTodo } = endpoints;
