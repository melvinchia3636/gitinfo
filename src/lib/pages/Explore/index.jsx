import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import ReactStickyBox from 'react-sticky-box';
import Gist from './Gists';
import Repo from './Repo';
import User from './User';

function Explore() {
  const [section, setSection] = useState(0);

  return (
    <>
      <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-200">
        <h3 className="font-bold text-3xl flex items-end">
          <span>
            <span className="text-custom-500">Explore</span>
            {' '}
            Github
          </span>
        </h3>
      </div>
      <div className="flex items-start justify-between gap-8 mt-8 h-full overflow-y-auto">
        <ReactStickyBox>
          <div className="flex flex-col h-full gap-4 mb-4 text-zinc-600 dark:text-zinc-200 text-lg">
            {[
              ['uil:users-alt', 'Users'],
              ['uil:book-alt', 'Repositories'],
              ['lucide:file-code', 'Gists'],
              ['octicon:organization-16', 'Organizations'],
              ['uil:calendar-alt', 'Events'],
              ['uil:apps', 'Apps'],
            ].map(([icon, name], index) => (
              <button onClick={() => setSection(index)} className={`flex items-center transition-all ${icon.startsWith('octicon') ? 'gap-[1.2rem]' : 'gap-4'} w-48 text-left px-4 py-2 pt-2.5 rounded-md ${section === index ? 'text-zinc-200 bg-custom-500 shadow-md' : ''}`} type="button">
                <Icon icon={icon} className={icon.startsWith('octicon') ? 'w-[1.3rem] h-[1.3rem]' : 'w-6 h-6'} />
                {name}
              </button>
            ))}
          </div>
        </ReactStickyBox>
        <div className="min-w-0 pb-8 flex-1 h-[200vh] flex flex-col text-zinc-600 dark:text-zinc-200">
          {[
            <User />,
            <Repo />,
            <Gist />,
          ][section]}
        </div>
      </div>
    </>
  );
}

export default Explore;
