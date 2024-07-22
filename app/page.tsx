import Image from "next/image";
import { ModeToggle } from "./components/ModeToggle";
import { CalendarDemo } from "./components/Calendar";
import Header from "./components/layout/Header";
import Container from "./components/Container";
import Hero from "./components/layout/Hero";

export default function HomePage() {
  return (
    <Container hasHeader hasSidebar>
      <Hero />
    </Container>
  );
}
