/* eslint-disable operator-linebreak */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-nested-ternary */
import { Icon } from '@iconify/react';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ReactStickyBox from 'react-sticky-box';
import FETCH_HEADERS from '../../constants';

import Header from './Header';
import Stats from './Stats';
import Description from './Description';
import License from './License';
import TimeOfCreation from './TimeOfCreation';
import LastUpdated from './LastUpdated';
import RepoSize from './RepoSize';
import Topics from './Topics';
import Languages from './Languages';
import Contributors from './Contributors';
import Subscribers from './Subscribers';
import Stargazers from './Stargazers';
import ReadmeMD from './ReadmeMD';
import Releases from './Releases';
import Tags from './Tags';
import Labels from './Labels';
import Issues from './Issues';
import SourceCode from './SourceCode';
import Deployments from './Deployments';
import CloneCode from './CloneCode';
import Branches from './Branches';
import Forks from './Forks';
import Commits from './Commits';

function Repo() {
  const [data, setData] = useState({});
  const [section, setSection] = useState(0);

  const scrollArea = useRef();

  const [nextTagsPage, setNextTagsPage] = useState(1);

  const params = useParams();

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS)
      .then((res) => res.json())
      .then(({ resources: { core } }) => {
        if (core.remaining) {
          fetch(
            `https://api.github.com/repos/${params.user}/${params.reponame}`,
            FETCH_HEADERS,
          )
            .then((res) => res.json())
            .then(async (d) => {
              const langs = await fetch(d.languages_url, FETCH_HEADERS).then(
                (r) => r.json(),
              );
              const tags = await fetch(
                `${d.tags_url}?per_page=10`,
                FETCH_HEADERS,
              ).then((r) => r.json());

              const branchesCount = await fetch(
                `${d.branches_url.replace(/\{.*?\}/, '')}?per_page=1`,
                FETCH_HEADERS,
              ).then(
                (r) =>
                  r.headers
                    ?.get('Link')
                    ?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page ||
                  0,
              );
              const tagsCount = await fetch(
                `${d.tags_url}?per_page=1`,
                FETCH_HEADERS,
              ).then(
                (r) =>
                  r.headers
                    ?.get('Link')
                    ?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page ||
                  0,
              );

              if (tagsCount > 10) setNextTagsPage(2);
              else setNextTagsPage(null);

              setData({
                ...d,
                langs,
                branchesCount,
                tags,
                tagsCount,
                currentPath: [],
              });
            });
        } else {
          setData('finished');
        }
      });
  }, []);

  useEffect(() => {
    scrollArea.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [scrollArea, section, data.currentPath]);

  return (
    <div className="w-full h-full pt-4 pb-0 overflow-hidden flex flex-col">
      {JSON.stringify(data) !== '{}' ? (
        data !== 'finished' ? (
          <>
            <Header data={data} />
            <div
              ref={scrollArea}
              className="flex items-start justify-between gap-8 h-full overflow-y-auto"
            >
              <ReactStickyBox>
                <div className="flex flex-col gap-4 mb-4 text-zinc-600 dark:text-zinc-300 text-lg">
                  {[
                    ['uil:info-circle', 'Overview'],
                    ['uil:document-info', 'README.md'],
                    ['lucide:file-code', 'Source Code'],
                    ['uil:rocket', 'Deployments'],
                    ['ic:round-code', 'Languages'],

                    ['uil:users-alt', 'Contributors'],
                    ['uil:eye', 'Subscribers'],
                    ['uil:star', 'Stargazers'],

                    ['octicon:git-branch-16', 'Branches'],
                    ['uil:tag', 'Tags'],
                    ['uil:box', 'Releases'],

                    ['octicon:git-commit-16', 'Commits'],
                    ['octicon:repo-forked-16', 'Forks'],

                    ['uil:tag-alt', 'Labels'],
                    ['octicon:issue-opened-16', 'Issues'],
                    ['octicon:git-pull-request-16', 'Pull Requests'],
                    ['octicon:project-16', 'Projects'],
                  ].map(([icon, name], index) => (
                    <button
                      onClick={() => setSection(index)}
                      className={`flex items-center transition-all gap-3 w-48 text-left px-4 py-2 pt-2.5 rounded-md ${
                        section === index
                          ? 'text-zinc-100 bg-custom-500 shadow-md'
                          : ''
                      }`}
                      type="button"
                    >
                      <Icon
                        icon={icon}
                        className={
                          icon.startsWith('octicon')
                            ? 'w-[1.3rem] h-[1.3rem]'
                            : 'w-6 h-6'
                        }
                      />
                      {name}
                    </button>
                  ))}
                </div>
              </ReactStickyBox>
              <div className="min-w-0 pb-8 flex-1 flex flex-col">
                {
                  [
                    <div>
                      <Stats data={data} />
                      <CloneCode data={data} />
                      <div className="grid grid-cols-2 gap-8">
                        <Description data={data} />
                        <License data={data} />
                        <TimeOfCreation data={data} />
                        <LastUpdated data={data} />
                        <RepoSize data={data} />
                        <Topics data={data} />
                      </div>
                    </div>,
                    <ReadmeMD data={data} setData={setData} />,
                    <SourceCode data={data} setData={setData} />,
                    <Deployments data={data} />,
                    <Languages data={data} />,
                    <Contributors data={data} setData={setData} />,
                    <Subscribers data={data} setData={setData} />,
                    <Stargazers data={data} setData={setData} />,
                    <Branches
                      data={data}
                      setData={setData}
                      nextTagsPage={nextTagsPage}
                      setNextTagsPage={setNextTagsPage}
                    />,
                    <Tags
                      data={data}
                      setData={setData}
                      nextTagsPage={nextTagsPage}
                      setNextTagsPage={setNextTagsPage}
                    />,
                    <Releases data={data} setData={setData} />,
                    <Commits data={data} setData={setData} />,
                    <Forks data={data} setData={setData} />,
                    <Labels data={data} setData={setData} />,
                    <Issues data={data} setData={setData} />,
                  ][section]
                }
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center pb-12 flex-col gap-2 justify-center text-zinc-600 dark:text-zinc-300 text-2xl">
            <Icon icon="uil:exclamation-triangle" className="w-12 h-12" />
            API rate limit exceeded
          </div>
        )
      ) : (
        <div className="w-full min-h-0 h-full flex items-center justify-center pb-32 mt-6 transition-none">
          <svg className="spinner" viewBox="0 0 50 50">
            <circle
              className="path"
              cx="25"
              cy="25"
              r="20"
              fill="none"
              strokeWidth="7"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default Repo;
