/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import FETCH_HEADERS from '../../constants';

function Deployments({ data }) {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch(data.deployments_url, FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => setContent(d.length ? d : null));
  }, []);

  return (
    <div className="text-zinc-600 dark:text-zinc-300">
      <div className="flex items-center gap-2 text-2xl font-medium tracking-wide">
        <Icon icon="uil:rocket" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
        Deployments
      </div>
      {content !== null ? content.length > 0 && content.map((e) => (
        <div className="px-2 py-4 border-b border-zinc-300 dark:border-zinc-500">
          <h3 className="text-2xl">
            {e.environment}
            {' '}
            <span className="text-zinc-400 text-sm">
              at
              {' '}
              {e.sha.slice(0, 7)}
            </span>
          </h3>
          <div className="mt-2">
            Deployed by
            {' '}
            <img src={e.creator.avatar_url} alt={e.creator.login} className="w-4 h-4 rounded-sm inline" />
            {' '}
            {e.creator.login}
            {' on '}
            {new Date(e.created_at).toLocaleString()}
          </div>
        </div>
      )) : (
        <div className="w-full flex items-center justify-center">
          <p className="text-xl text-zinc-400 mt-16">Not Available</p>
        </div>
      )}
    </div>
  );
}

export default Deployments;
