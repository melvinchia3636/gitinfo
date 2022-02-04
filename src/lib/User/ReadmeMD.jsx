/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Readme from '../Repo/Readme';
import FETCH_HEADERS from '../constants';

function ReadmeMD({ username }) {
  const [data, setData] = useState('');
  useEffect(() => {
    fetch(`https://api.github.com/repos/${username}/${username}`, FETCH_HEADERS)
      .then((e) => e.json())
      .then((d) => {
        fetch(`https://raw.githubusercontent.com/${d.owner.login}/${d.owner.login}/${d.default_branch}/README.md`)
          .then((e) => e.text())
          .then((t) => setData(t));
      })
      .catch(() => {
        fetch(`https://api.github.com/repos/${username}/.github`, FETCH_HEADERS)
          .then((e) => e.json())
          .then((d) => {
            fetch(`https://raw.githubusercontent.com/${d.owner.login}/.github/${d.default_branch}/profile/README.md`)
              .then((e) => e.text())
              .then((t) => setData(t));
          })
          .catch(() => {
            setData(null);
          });
      });
  }, []);

  return (
    data && data !== '404: Not Found' ? (
      <div>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
          <Icon icon="uil:info-circle" className="w-8 h-8 text-indigo-500 dark:text-indigo-400 -mt-1" />
          README.md
        </div>
        <Readme data={{ readmeContent: data, full_name: 'melvinchia3636/melvinchia3636', default_branch: 'main' }} />
      </div>
    ) : ''
  );
}

export default ReadmeMD;
