// import { Box, Text } from "@chakra-ui/react";
// import DashboarLayout from "../components/dashlayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the login page
    router.replace("/login");
  }, []);

  return null;
}
