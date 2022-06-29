import { useToast } from "@chakra-ui/react";

const useTLToast = () => {
  return useToast({ position: "top-right", duration: 2000 });
};

export default useTLToast;
