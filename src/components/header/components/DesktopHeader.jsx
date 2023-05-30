import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import { ProfileContentDesktop } from "./ProfileContent";
import PropTypes from "prop-types";

export default function DesktopHeader({ user }) {
  return (
    <div className="relative w-full h-full justify-between items-center flex mx-auto px-5 z-30 max-w-[1400px]">
      <Logo />
      <DesktopNav user={user} />
      <ProfileContentDesktop />
    </div>
  );
}

DesktopHeader.propTypes = {
  user: PropTypes.object,
};
