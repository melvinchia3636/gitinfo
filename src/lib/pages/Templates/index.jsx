/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/no-danger */
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';
import ReactStickyBox from 'react-sticky-box';
import Readme from '../Repo/Readme';
import FETCH_HEADERS from '../../constants';
import colors from '../../assets/colors.json';

function Templates() {
  const [section, setSection] = useState(0);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch(`https://api.github.com/${['gitignore/templates', 'licenses'][section]}`, FETCH_HEADERS)
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      });
  }, [section]);

  useEffect(() => {
    if (showContent) {
      setContent('');
      if (!section) {
        fetch(`https://api.github.com/gitignore/templates/${showContent}`, FETCH_HEADERS)
          .then((res) => res.json())
          .then((d) => {
            setContent(d);
          });
      } else {
        fetch(`https://api.github.com/licenses/${showContent}`, FETCH_HEADERS)
          .then((res) => res.json())
          .then((d) => {
            setContent(d);
          });
      }
    }
  }, [showContent]);

  return (
    <>
      <div className="flex items-center justify-between text-zinc-600 dark:text-zinc-200">
        <h3 className="font-bold text-3xl flex items-end">
          <span>
            Github
            {' '}
            <span className="text-custom-500">Templates</span>
          </span>
        </h3>
        <div className="flex items-center gap-2 bg-zinc-50 dark:bg-zinc-600 p-4 rounded-lg shadow-md">
          <Icon icon="uil:search" className="w-6 h-6 text-zinc-300" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search templates"
            className="bg-transparent placeholder-zinc-300 text-lg focus:outline-none"
          />
        </div>
      </div>
      <div className="flex items-start justify-between gap-8 mt-6 h-full overflow-y-auto">
        <ReactStickyBox>
          <div className="flex flex-col gap-4 mb-4 text-zinc-600 dark:text-zinc-200 text-lg">
            {[['uil:github-alt',
              'Gitignore'],
            ['octicon:law-16', 'License'],
            ].map(([icon, name], index) => (
              <button onClick={() => setSection(index)} className={`flex items-center transition-all gap-3 w-48 text-left px-4 py-2 pt-2.5 rounded-md ${section === index ? 'text-white bg-custom-500 shadow-md' : ''}`} type="button">
                <Icon icon={icon} className={icon.startsWith('octicon') ? 'w-[1.3rem] h-[1.3rem]' : 'w-6 h-6'} />
                {name}
              </button>
            ))}
          </div>
        </ReactStickyBox>
        <div className="min-w-0 pb-8 flex-1 flex flex-col text-zinc-600 dark:text-zinc-200">
          {data.length > 0 && (
            section === 0 && typeof data[0] === 'string' ? data.filter((e) => (query ? e.toLowerCase().includes(query.toLowerCase()) : true)).map((e) => (
              <button type="button" onClick={() => setShowContent(e)} className="px-2 w-full py-4 border-b border-gray-300 text-lg flex items-center gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:border-zinc-600 duration-300 hover:rounded-md">
                <span className="w-4 h-4 rounded-full block shadow-sm" style={{ backgroundColor: ((Object.entries(colors).filter(([name]) => name.toLowerCase() === e.toLowerCase()))[0] || [])[1]?.color || 'white' }} />
                {e}
              </button>
            )) : data.filter((e) => (
              query ? e.name?.toLowerCase().includes(query.toLowerCase()) : true
            )).map((e) => (
              <button type="button" onClick={() => setShowContent(e.key)} className="px-2 w-full py-4 border-b border-gray-300 text-lg flex items-center gap-4 hover:bg-zinc-200 dark:hover:bg-zinc-600 dark:border-zinc-600 duration-300 hover:rounded-md">
                <span className="w-28 flex items-center font-bold justify-center py-1 text-custom-500 bg-custom-100 dark:bg-custom-500 dark:text-zinc-200 overflow-hidden rounded-full text-sm shadow-sm whitespace-nowrap">{e.key}</span>
                {e.name}
              </button>
            ))
          )}
        </div>
      </div>
      <button type="button" aria-label="hideContent" onClick={() => setShowContent(null)} className={`bg-black absolute w-full h-screen top-0 left-0 ${showContent ? 'bg-opacity-[1%] z-40' : 'bg-opacity-0 z-[-1]'}`} />
      <div className={`absolute ${showContent ? 'top-1/2 -translate-y-1/2 shadow-2xl' : 'top-0 -translate-y-full shadow-0'} left-1/2 -translate-x-1/2 p-8 z-50 overflow-scroll h-[calc(100vh-16rem)] w-[46rem] bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-200 rounded-lg`}>
        {section === 0 && (
        <>
          <h3 className="text-3xl font-bold mb-3">{content.name}</h3>
          <div className="whitespace-pre-line" dangerouslySetInnerHTML={{ __html: content.source }} />
        </>
        )}
        {section === 1 && content.permissions && (
        <>
          <h3 className="text-3xl font-bold mb-3">{content.name}</h3>
          <p className="whitespace-pre-wrap dangerousHTML" dangerouslySetInnerHTML={{ __html: content.description }} />
          <h4 className="text-2xl font-bold mt-6">Permissions</h4>
          <div className="grid grid-cols-2 mt-3 gap-y-2">
            {content.permissions.map((e) => (
              <div className="flex items-center gap-2">
                <Icon icon="uil:check" className="w-5 h-5 text-emerald-500" />
                {e}
              </div>
            ))}
          </div>
          <h4 className="text-2xl font-bold mt-6">Limitations</h4>
          <div className="grid grid-cols-2 mt-3 gap-y-2">
            {content.limitations.map((e) => (
              <div className="flex items-center gap-2">
                <Icon icon="uil:multiply" className="w-4 h-4 text-rose-500" />
                {e}
              </div>
            ))}
          </div>
          {content.conditions.length > 0 && (
          <>
            <h4 className="text-2xl font-bold mt-6">Conditions</h4>
            <div className="grid grid-cols-2 mt-3 gap-y-2">
              {content.conditions.map((e) => (
                <div className="flex items-center gap-2">
                  <Icon icon="uil:info-circle" className="w-5 h-5 text-sky-500" />
                  {e}
                </div>
              ))}
            </div>
          </>
          )}
          <div className="license p-4 bg-zinc-100 shadow-md rounded-lg mt-6 flex flex-col gap-4">
            <Readme data={{
              readmeContent: content.body,
              custom: {
                code({
                  children, ...props
                }) {
                  return (
                    <code className="!flex !flex-col !justify-center" {...props}>
                      {children[0].split('\n').map((e) => <span className="!text-sm">{e}</span>)}
                    </code>
                  );
                },
              },
            }}
            />
          </div>
        </>
        )}
      </div>
    </>
  );
}

export default Templates;
