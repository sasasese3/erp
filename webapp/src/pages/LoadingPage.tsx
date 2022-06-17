import {
  chakra,
  Flex,
  keyframes,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import { ImSpinner2 } from "react-icons/im";

function LoadingPage() {
  const CImSpinner = chakra(ImSpinner2);

  const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  `;

  const preferReduceMotion = usePrefersReducedMotion();
  const animation = preferReduceMotion
    ? undefined
    : `${spin} infinite 1s linear`;
  return (
    <Flex
      height="100vh"
      alignItems="center"
      justify="center"
      background="rgba(0,0,0,0.5)"
      zIndex={9999}
    >
      <CImSpinner size="30%" animation={animation}></CImSpinner>
    </Flex>
  );
}

export default LoadingPage;
