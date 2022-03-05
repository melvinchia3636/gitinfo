/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import languageMap from 'language-map';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneLight } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import bytes from 'bytes';
import FETCH_HEADERS from '../../constants';

function SourceCode({ data, setData }) {
  const [currentURL, setCurrentURL] = useState(data.contents_url.replace(/\{.*?}/, ''));
  const [contents, setContents] = useState([]);

  const fetchContents = async () => {
    setContents([]);
    const newContents = await fetch(currentURL.replace(/\{.*?}/, ''), FETCH_HEADERS).then((r) => r.json());
    setContents(newContents);
  };

  const navigateTo = (index) => {
    if (index) {
      const newPath = data.currentPath.slice(1, index + 1);
      setCurrentURL(`${data.contents_url.replace(/\{.*?}/, '').replace(/\/^/, '')}/${newPath.join('/')}`);
    } else {
      setCurrentURL(`${data.contents_url.replace(/\{.*?}/, '')}`);
    }
  };

  useEffect(() => {
    fetchContents();
    if (currentURL) {
      setData({
        ...data,
        currentPath: ['root'].concat((currentURL
          .split('?')
          .shift()
          .split(/^.+\/contents\/(.+)?/)
          .filter((e) => e)
          .pop() || '')
          .split('/')
          .filter((e) => e)),
      });
    }
  }, [currentURL]);

  return (
    <div className="flex flex-col h-full text-zinc-600 dark:text-zinc-300">
      <div className="flex items-center gap-2 text-2xl font-medium tracking-wide">
        <Icon icon="lucide:file-code" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
        Source Code
      </div>
      <div className="flex items-center justify-between mt-8">
        <div className="flex items-center gap-8">
          <button type="button" className="text-zinc-200 bg-custom-500 shadow-md rounded-md px-4 py-2 pr-3 flex items-center gap-2">
            <Icon icon="mdi:source-branch" width="20" height="20" />
            {data.default_branch}
            <Icon icon="uil:angle-down" width="20" height="20" />
          </button>
          <p className="text-lg">
            {data.currentPath.map((e, i) => (
              <button onClick={() => navigateTo(i)} type="button">
                <span className={data.currentPath.length - 1 !== i ? 'text-custom-500' : ''}>
                  {e}
                </span>
                {' '}
                {contents.type === 'file' && i === data.currentPath.length - 1 ? '' : <>/&nbsp;</>}
              </button>
            ))}
          </p>
        </div>
        <div className="flex items-center gap-8 mr-2">
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
        </div>
      </div>
      {Array.isArray(contents) ? (contents.length ? (
        <div className="mt-4">
          {contents.sort((a, b) => ['file', 'dir'].indexOf(b.type) - ['file', 'dir'].indexOf(a.type)).map((e) => (
            <button type="button" onClick={() => setCurrentURL(e.url)} className="flex w-full items-center justify-between px-4 py-4 border-b text-lg hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:rounded-md border-zinc-300 dark:border-zinc-500">
              <div className="flex items-center gap-4">
                <Icon icon={e.type === 'dir' ? 'mdi-folder' : 'uil:file'} className={`w-6 h-6 ${e.type === 'dir' ? 'text-custom-500' : 'text-zinc-600 dark:text-zinc-300'}`} />
                {e.name}
              </div>
              {e.type === 'file' && (
              <span>
                {bytes(e.size)}
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
      )) : (
        contents.type === 'file'
          ? (
            <div className="mt-8 text-sm bg-zinc-50 rounded-md shadow-md">
              <div className="mb-1 p-4 pb-0 flex justify-between items-center w-full">
                <div className="!font-['Source_Code_Pro']">
                  {window.atob(contents.content).split('\n').length.toLocaleString()}
                  {' '}
                  lines |
                  {' '}
                  {bytes(contents.size)}
                </div>
                <div className="flex items-center gap-4">
                  <a href={`https://raw.githubusercontent.com/${data.full_name}/${data.default_branch}/${data.currentPath.slice(1).join('/')}`} target="_blank" rel="noreferrer">
                    <Icon icon="octicon:code-square-16" className="w-4 h-4" />
                  </a>
                  <button aria-label="copy" type="button"><Icon icon="octicon:copy-16" className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col items-end my-2 ml-3 mr-2">
                  {window.atob(contents.content).split('\n').map((e, i) => <span className="text-zinc-300 !font-['Source_Code_Pro']">{i}</span>)}
                </div>
                <SyntaxHighlighter
                  customStyle={{
                    fontFamily: 'Source Code Pro',
                  }}
                  style={atomOneLight}
                  language={((Object.entries(languageMap).filter((e) => e[1].extensions?.includes(contents.name.split('.').pop())) || [null])[0] || [null])[0]}
                >
                  {window.atob(contents.content)}
                </SyntaxHighlighter>
              </div>
            </div>
          )
          : ''
      )}
    </div>
  );
}

export default SourceCode;
