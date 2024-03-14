import { createContext } from "react";

const LayoutContext = createContext({
  refetchAll: () => {
    console.log("Calling default all refetch function");
  },
  refetchTickets: () => {
    console.log("Calling default tickets refetch function");
  },
  refetchClubs: () => {
    console.log("Calling default clubs refetch function");
  },
  refetchCredit: () => {
    console.log("Calling default balance refetch function");
  },
});

export default LayoutContext;
