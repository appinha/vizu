import Navbar from "@/components/Navbar";
import Page from "@/components/Page";

export default function App() {
  return (
    <div className="relative m-0 flex min-h-screen w-full flex-col bg-background p-0">
      <Navbar />
      <Page className="h-[calc(100vh-4rem)]" />
    </div>
  );
}
