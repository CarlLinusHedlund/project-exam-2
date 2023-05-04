import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import { ProfileContentDesktop } from "./ProfileContent";

export default function DesktopHeader() {
  return (
    <div className="relative w-full h-full justify-between items-center flex mx-auto px-5 z-30 max-w-7xl">
      <Logo />
      <DesktopNav />
      <ProfileContentDesktop />
    </div>
  );
}
