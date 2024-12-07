import logo from "/logo.svg";

export default function Logo() {
  return (
    <div data-testid="Logo" className="flex flex-row items-center space-x-4">
      <img src={logo} className="h-12" alt="Vizu logo" />
      <span className="bg-gradient-to-r from-[#9947EB] to-[#0DCCF2] bg-clip-text text-xl font-bold tracking-wider text-transparent">
        VIZU
      </span>
    </div>
  );
}
