/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import copy from 'copy-to-clipboard';

function CloneCode({ data }) {
  const [cloneCodeBoxShow, setCloneCodeBoxShow] = useState(false);
  const [section, setSection] = useState(0);
  const urls = [
    data.git_url,
    data.ssh_url,
    `gh repo clone ${data.full_name}`,
  ];

  const description = [
    'Use Git or checkout with SVN using the web URL.',
    'Use a password-protected SSH key.',
    'Use the command line.',
  ];

  const [copied, setCopied] = useState(false);

  return (
    <div className="px-1">
      <button onClick={() => setCloneCodeBoxShow(true)} type="button" className="text-zinc-200 text-xl w-full flex items-center justify-center bg-custom-500 shadow-md rounded-md px-4 py-4 pr-3 mt-4 gap-2">
        <Icon icon="octicon:terminal" className="stroke-[0.4px] stroke-white mr-1 w-6 h-6 -mt-0.5" />
        Clone
        <Icon icon="uil:angle-down" className="w-6 h-6" />
      </button>
      <div
        onClick={() => setCloneCodeBoxShow(false)}
        className={`absolute top-0 left-0 flex overflow-hidden items-center justify-center w-full h-full bg-black transition-all ${cloneCodeBoxShow ? 'z-0 bg-opacity-20 duration-200' : 'z-[-1] bg-opacity-0 duration-500'}`}
      />
      <div className={`w-[40vw] overscroll-contain absolute top-1/2 left-1/2 -translate-x-1/2 bg-zinc-50 dark:bg-zinc-800 shadow-2xl text-zinc-600 dark:text-zinc-300 rounded-xl overflow-y-scroll p-6 flex flex-col gap-4 transform transition-all duration-500 ${cloneCodeBoxShow ? '-translate-y-1/2' : 'translate-y-[100vh]'}`}>
        <h2 className="flex items-center text-2xl gap-1 font-bold">
          <Icon icon="octicon:terminal" className="stroke-[0.4px] stroke-zinc-600 mr-1 w-7 h-7 -mt-0.5" />
          Clone
        </h2>
        <header className="flex items-center gap-4">
          {['HTTPS', 'SSH', 'Github CLI'].map((e, i) => <button key={i} type="button" onClick={() => setSection(i)} className={`text-base ${i === section ? 'font-bold underline decoration-custom-500 decoration-2 underline-offset-4' : ''}`}>{e}</button>)}
        </header>
        <code className="w-full bg-zinc-100 dark:bg-zinc-700 rounded-md shadow-md flex items-center justify-between p-3">
          <span className="!font-['Source_Code_Pro'] overflow-x-auto whitespace-nowrap">{urls[section]}</span>
          <button
            type="button"
            className="pl-2"
            onClick={() => {
              copy(urls[section]);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            <Icon icon={copied ? 'uil:check' : 'uil:copy'} className="w-6 h-6" />
          </button>
        </code>
        <p>{description[section]}</p>
        <a href={`https://github.com/${data.full_name}/archive/refs/heads/${data.default_branch}.zip`} className="text-zinc-200 text-xl w-full flex items-center justify-center bg-custom-500 shadow-md rounded-md px-4 py-4 pr-3 mt-4 gap-2">
          <Icon icon="octicon:file-zip" className="stroke-[0.2px] stroke-white mr-1 w-6 h-6 -mt-0.5" />
          Download ZIP
        </a>
      </div>
    </div>
  );
}

export default CloneCode;
