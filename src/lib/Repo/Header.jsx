/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function Header({ data }) {
  return (
    <div className="flex gap-2 mb-8 items-center font-bold text-zinc-600 dark:text-zinc-200 text-3xl tracking-wide">
      <Icon icon="uil:book-alt" className="w-10 h-10 text-custom-500 dark:text-custom-400" />
      {data.full_name}
    </div>
  );
}

export default Header;
