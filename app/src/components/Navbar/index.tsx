import Logo from "@/components/Navbar/Logo";
import SelectMonth from "@/components/Navbar/SelectMonth";
import ThemeToggle from "@/components/Navbar/ThemeToggle";

export default function Navbar() {
  return (
    <header className="nav-shadow sticky top-0 z-50 flex w-full flex-row items-center justify-between space-x-4 px-4 py-2 backdrop-blur">
      <Logo />
      <div className="flex flex-row gap-2">
        <SelectMonth />
        <ThemeToggle />
      </div>
    </header>
  );
}
