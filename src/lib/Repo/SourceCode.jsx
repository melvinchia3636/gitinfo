/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import FETCH_HEADERS from '../constants';

function SourceCode({ data }) {
  const [currentURL, setCurrentURL] = useState(data.contents_url.replace(/\{.*?}/, ''));
  const [currentPath, setCurrentPath] = useState([]);
  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    setContents([]);
    const newContents = await fetch(currentURL.replace(/\{.*?}/, ''), FETCH_HEADERS).then((r) => r.json());
    setContents(newContents);
  };

  const navigateTo = (index) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentURL(`${data.contents_url.replace(/\{.*?}/, '')}/${newPath.join('/')}?ref=main`);
  };

  useEffect(() => {
    fetchContents();
    if (currentURL) {
      setCurrentPath((currentURL
        .split('?')
        .shift()
        .split(/^.+\/contents\/(.+)?/)
        .filter((e) => e)
        .pop() || '')
        .split('/')
        .filter((e) => e));
    }
  }, [currentURL]);

  return (
    <div className="flex flex-col overflow-hidden h-full text-zinc-600">
      <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-200 tracking-wide">
        <Icon icon="lucide:file-code" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
        Source Code
      </div>
      <div className="flex items-center gap-8 mt-8">
        <button type="button" className="text-white bg-custom-500 shadow-md rounded-md px-4 py-2 pr-3 flex items-center gap-2">
          <Icon icon="mdi:source-branch" width="20" height="20" />
          {data.default_branch}
          <Icon icon="uil:angle-down" width="20" height="20" />
        </button>
        {currentPath.length ? (
          <p className="text-lg">
            {currentPath.map((e, i) => (
              <button onClick={() => navigateTo(i)} type="button">
                <span className={currentPath.length - 1 !== i ? 'text-custom-500' : ''}>
                  {e}
                </span>
                {' '}
                /&nbsp;
              </button>
            ))}
          </p>
        ) : (
          <>
            <div className="flex items-center text-lg gap-2">
              <Icon icon="mdi:source-branch" width="20" height="20" />
              <span>
                {data.branchesCount}
                {' '}
                branch
                {data.branchesCount > 1 ? 'es' : ''}
              </span>
            </div>
            <div className="flex items-center text-lg gap-2">
              <Icon icon="uil:tag" width="20" height="20" />
              <span>
                {data.tagsCount}
                {' '}
                tag
                {data.tagsCount > 1 ? 's' : ''}
              </span>
            </div>
          </>
        )}
      </div>
      {contents.length ? (
        <div className="mt-4">
          {contents.sort((a, b) => ['file', 'dir'].indexOf(b.type) - ['file', 'dir'].indexOf(a.type)).map((e) => (
            <button type="button" onClick={() => setCurrentURL(e.url)} className="flex w-full items-center justify-between px-4 py-4 border-b text-lg hover:bg-zinc-200 hover:rounded-md border-zinc-200">
              <div className="flex items-center gap-4">
                <Icon icon={e.type === 'dir' ? 'mdi-folder' : 'uil:file'} className={`w-6 h-6 ${e.type === 'dir' ? 'text-custom-500' : 'text-zinc-600'}`} />
                {e.name}
              </div>
              {e.size > 0 && (
              <span>
                {(e.size / (e.size < 1024 ? 1 : 1024)).toFixed(2).toLocaleString()}
                {' '}
                {e.size < 1024 ? 'KB' : 'MB'}
              </span>
              )}
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
