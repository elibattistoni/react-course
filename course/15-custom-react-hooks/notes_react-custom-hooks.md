# What are custom hooks^
Custom hooks are just regular functions, like the built-in hooks; but importantly, they are functions that can contain stateful logic.

**You can build custom hooks in order to outsource stateful logic into reusable functions.** Unlike regular functions, custom hooks can use other React hooks, including other custom hooks; therefore, they can also leverage React state managed with useState or useReducer; they can access useEffect,...

With custom hooks, you can outsource logic, which you might be using in different components, into a custom hook, which you can then call from all these various components.