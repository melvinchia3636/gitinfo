/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import Readme from './Readme';
import FETCH_HEADERS from '../../constants';

function ReadmeMD({ data, setData }) {
  const fetchReadme = async () => {
    const README_URL = ['README.md', 'readme.md', 'README', '.github/README.md', 'README.rst'].map((e) => `https://cors-anywhere.thecodeblog.net/raw.githubusercontent.com/${data.full_name}/${data.default_branch}/${e}`);
    let rmContent;
    // eslint-disable-next-line no-restricted-syntax
    for await (const i of README_URL) {
      rmContent = await fetch(i, FETCH_HEADERS)
        .then((res) => (res.status === 200 ? res.text() : ''));
      if (rmContent) break;
    }
    setData({ ...data, readmeContent: rmContent });
  };

  useEffect(() => {
    if (!data.readmeContent) fetchReadme();
  }, []);

  return (
    data.readmeContent ? (
      <>
        <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
          <Icon icon="codicon:law" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
          README.md
        </div>
        <Readme data={data} />
      </>
    ) : (
      <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
        <svg className="spinner" viewBox="0 0 50 50">
          <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
        </svg>
      </div>
    )
  );
}

export default ReadmeMD;
