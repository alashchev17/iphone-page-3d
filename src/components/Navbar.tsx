import { navLists } from "../constants";
import { appleImg, bagImg, searchImg } from "../utils";

const Navbar = () => {
  return (
    <header className="w-full py-5 sm:px-10 px-5 flex justify-between items-center">
      <nav className="flex w-full screen-max-width">
        <img src={appleImg} alt="Logo: Apple" width={14} height={17} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((item) => (
            <div
              className="px-5 text-sm text-gray hover:text-white transition-all cursor-pointer"
              key={item}
            >
              {item}
            </div>
          ))}
        </div>
        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img
            className="cursor-pointer"
            src={searchImg}
            alt="Icon: Search"
            width={18}
            height={18}
          />
          <img
            className="cursor-pointer"
            src={bagImg}
            alt="Icon: Bag"
            width={18}
            height={18}
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
