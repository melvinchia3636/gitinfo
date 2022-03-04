/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function Header({ data }) {
  return (
    <div className="flex justify-between mb-8 items-center font-bold text-zinc-600 dark:text-zinc-300 text-3xl tracking-wide">
      <div className="flex items-center gap-2">
        <Icon icon="uil:book-alt" className="w-10 h-10 text-custom-500 dark:text-custom-400" />
        {data.full_name}
      </div>
    </div>
  );
}

export default Header;
