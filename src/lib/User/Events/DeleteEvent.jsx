/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React from 'react';
import { Link } from 'react-router-dom';

function DeleteEvent({ e }) {
  return (
    <div>
      <div className="flex gap-2 text-xl overflow-hidden font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="octicon:trash-16" className="w-6 h-6 mt-1 flex-shrink-0 text-custom-500 dark:text-custom-400" />
        <div className="flex flex-col min-w-0">
          <p className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            Deleted
            {' '}
            {e.payload.ref_type}
            {' '}
            &quot;
            {e.payload.ref}
            &quot;
            {' '}
            in
            {' '}
            <Link to={`/repo/${e.repo.name}`} className="font-bold">{e.repo.name}</Link>
          </p>
          <p className="text-sm text-zinc-400">{new Date(e.created_at).toDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default DeleteEvent;
