import { Link } from "@chakra-ui/react";
import { Link as ReactLink } from "react-router-dom";

type LinkProp = {
  to: string;
  children: JSX.Element;
};

function LinkwithReact({ to, children }: LinkProp) {
  return (
    <Link as={ReactLink} to={to} _hover={{ textDecoration: "none" }}>
      {children}
    </Link>
  );
}

export default LinkwithReact;
