import React from 'react';
import {BotMessageSquare, CircleUser} from 'lucide-react';

const Navbar = () => {
  return (
    <div>
      <div className="nav flex items-center justify-between h-[70px] md:h-[100px] px-4 md:px-[150px]">
        <div className="logo flex items-center gap-2 md:gap-[10px]">
          <i className="text-[32px] md:text-[50px]"> <BotMessageSquare /> </i>
          <h3 className="text-[18px] md:text-[25px] font-[700]">
            React<span className="text-slate-400">Bot</span>{' '}
          </h3>
        </div>
        <div className="user">
          <i className="text-[22px] md:text-[27px] cursor-pointer">
            {' '} <CircleUser />
          </i>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
