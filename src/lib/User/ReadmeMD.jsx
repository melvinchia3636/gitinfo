/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Readme from '../Repo/Readme';

function ReadmeMD({ username }) {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${username}`)
      .then((e) => e.json())
      .then((d) => {
        fetch(`https://raw.githubusercontent.com/${d.owner.login}/${d.owner.login}/${d.default_branch}/README.md`)
          .then((e) => e.text())
          .then((t) => setData(t));
      })
      .catch(() => setData(null));
  }, []);
  return (
    data ? (
      <>
        <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
          <Icon icon="uil:info-circle" className="w-8 h-8 text-indigo-500 dark:text-indigo-400 -mt-1" />
          README.md
        </div>
        <Readme data={{ readmeContent: data, full_name: 'melvinchia3636/melvinchia3636', default_branch: 'main' }} />
      </>
    ) : ''
  );
}

export default ReadmeMD;
