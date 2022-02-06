/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import FETCH_HEADERS from '../constants';

function SourceCode({ data }) {
  const [currentPath, setCurrentPath] = useState(data.contents_url.replace(/\{.*?}/, ''));
  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    setContents([]);
    const newContents = await fetch(currentPath.replace(/\{.*?}/, ''), FETCH_HEADERS).then((r) => r.json());
    setContents(newContents);
  };

  useEffect(() => {
    fetchContents();
  }, [currentPath]);

  return (
    <div className="flex flex-col overflow-hidden h-full text-zinc-600">
      <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="lucide:file-code" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
        Source Code
      </div>
      {contents.length ? (
        <div className="mt-6">
          {contents.sort((a, b) => ['file', 'dir'].indexOf(b.type) - ['file', 'dir'].indexOf(a.type)).map((e) => (
            <button type="button" onClick={() => setCurrentPath(e.url)} className="flex w-full items-center gap-4 px-4 py-4 border-b text-lg hover:bg-zinc-200 hover:rounded-md border-zinc-200">
              <Icon icon={e.type === 'dir' ? 'mdi-folder' : 'uil:file'} className={`w-6 h-6 ${e.type === 'dir' ? 'text-custom-500' : 'text-zinc-600'}`} />
              {e.name}
            </button>
          ))}
        </div>
      ) : (
        <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="7" />
          </svg>
        </div>
      )}
    </div>
  );
}

export default SourceCode;
