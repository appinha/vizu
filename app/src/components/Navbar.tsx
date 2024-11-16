import logo from "/logo.svg";

export default function Navbar() {
  return (
    <header className="nav-shadow sticky top-0 z-50 flex w-full flex-row items-center space-x-4 px-4 py-2 backdrop-blur">
      <img src={logo} className="logo h-12" alt="Vizu logo" />
      <span className="bg-gradient-to-r from-[#7F57CE] to-[#0BC5EA] bg-clip-text text-xl font-bold tracking-wider text-transparent">
        VIZU
      </span>
    </header>
  );
}
