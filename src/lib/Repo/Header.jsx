/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';

function Header({ data }) {
  return (
    <div className="flex gap-2 items-center font-bold text-slate-600 dark:text-gray-100 text-3xl tracking-wide">
      <Icon icon="uil:book-alt" className="w-10 h-10 text-indigo-500 dark:text-indigo-400" />
      {data.full_name}
    </div>
  );
}

export default Header;
