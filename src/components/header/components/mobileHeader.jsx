import { useState } from "react";
import Logo from "./logo";
import MobileDropdown from "./mobileDropdown";
import { headerContext } from "../utils/mobileHeaderContext";

function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  if (isOpen) {
    document.body.classList.add("activeDropdown");
  } else {
    document.body.classList.remove("activeDropdown");
  }
  return (
    <headerContext.Provider value={[isOpen, setIsOpen]}>
      <div className="relative w-full h-full flex justify-between items-center md:hidden px-5 z-50">
        <Logo />
        <span
          onClick={toggleMenu}
          className={
            isOpen
              ? "duration-300 rotate-45 relative w-[30px] h-[2px] bg-primaryDark rounded-lg before:absolute before:top-0 before:w-[30px] before:rotate-90  before:h-[2px] before:bg-primaryDark before:rounded-lg after:absolute after:bottom-2 after:w-[30px] after:h-[2px] after:bg-primaryDark after:rounded-lg after:opacity-0"
              : "duration-300 relative w-[30px] h-[2px] bg-primaryDark rounded-lg before:absolute before:top-2 before:w-[30px] before:h-[2px] before:bg-primaryDark before:rounded-lg after:absolute after:bottom-2 after:w-[30px] after:h-[2px] after:bg-primaryDark after:rounded-lg"
          }
        />
      </div>
      <div
        onClick={toggleMenu}
        className={
          isOpen
            ? "duration-200 fixed top-[75px] left-0 w-full h-screen bg-black opacity-5 md:hidden"
            : "duration-200 fixed top-[75px] left-0 w-full h-0 bg-black opacity-0 md:hidden"
        }
      ></div>
      <div
        className={
          isOpen
            ? "duration-500 bg-primaryWhite md:hidden flex w-[250px] sm:w-[350px] h-screen fixed top-[75px] right-0 z-10 overflow-hidden shadow-xl"
            : "duration-300 opacity-0 w-0 h-screen md:hidden fixed top-[75px] right-0 z-10 overflow-hidden"
        }
      >
        <MobileDropdown />
      </div>
    </headerContext.Provider>
  );
}

export default MobileHeader;
