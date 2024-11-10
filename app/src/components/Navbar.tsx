import logo from "/logo.svg";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur nav-shadow py-2 px-4 flex flex-row items-center space-x-4">
      <img src={logo} className="logo h-12" alt="Vizu logo" />
      <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-[#7F57CE] to-[#0BC5EA] bg-clip-text text-transparent">
        VIZU
      </span>
    </header>
  );
}
