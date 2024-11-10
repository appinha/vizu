import Navbar from "@/components/Navbar";
import Page from "@/components/Page";

export default function App() {
  return (
    <div className="min-h-screen w-full relative flex flex-col bg-background m-0 p-0">
      <Navbar />
      <Page className="h-[calc(100vh-4rem)]" />
    </div>
  );
}
