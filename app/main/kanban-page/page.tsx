import Container from "@/app/components/Container";
import KanBanBoard from "./components/KanBanBoard";

export default function Page() {
    return (
        <Container className="h-screen border border-red-500" hasHeader hasSidebar>
            <KanBanBoard />
        </Container>
    )
}
