import ListItems from "@/components/ListItems";
import NavBar from "@/components/Navbar";
import { revalidatePath } from "next/cache";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

revalidatePath("/");

export const metadata = {
  title: "Home - Psa Audit",
};

export default function Home() {
  return (
    <main>
      <NavBar />
      <CssBaseline />
      <Container maxWidth="xl" className="mt-3">
        {/* <ListItems /> */}
      </Container>
    </main>
  );
}
