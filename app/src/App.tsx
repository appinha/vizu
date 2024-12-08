import Navbar from "@/components/Navbar";
import Page from "@/components/Page";
import { ThemeProvider } from "@/contexts/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <div className="relative m-0 flex min-h-screen w-full flex-col bg-background p-0">
        <Navbar />
        <Page className="h-[calc(100vh-4rem)]" />
      </div>
    </ThemeProvider>
  );
}
