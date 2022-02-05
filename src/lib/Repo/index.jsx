/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-children-prop */
/* eslint-disable no-nested-ternary */
import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Lottie from 'react-lottie';
import ReactStickyBox from 'react-sticky-box';
import FETCH_HEADERS from '../constants';
import loadingAnim from '../assets/loading.json';

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

function Repo() {
  const [data, setData] = useState({});
  const [section, setSection] = useState(0);

  const [nextContributorsPage, setNextContributorsPage] = useState(1);
  const [nextSubscribersPage, setNextSubscribersPage] = useState(1);
  const [nextStargazersPage, setNextStargazersPage] = useState(1);
  const [nextReleasesPage, setNextReleasesPage] = useState(1);
  const [nextTagsPage, setNextTagsPage] = useState(1);
  const [nextLabelsPage, setNextLabelsPage] = useState(1);
  const [nextIssuesPage, setNextIssuesPage] = useState(1);

  const params = useParams();

  useEffect(() => {
    fetch('https://api.github.com/rate_limit', FETCH_HEADERS).then((res) => res.json()).then(({ resources: { core } }) => {
      if (core.remaining) {
        fetch(`https://api.github.com/repos/${params.user}/${params.reponame}`, FETCH_HEADERS).then((res) => res.json()).then(async (d) => {
          const langs = await fetch(d.languages_url, FETCH_HEADERS).then((r) => r.json());
          const contributors = await fetch(`${d.contributors_url}?per_page=90`, FETCH_HEADERS).then((r) => r.json());
          const subscribers = await fetch(`${d.subscribers_url}?per_page=90`, FETCH_HEADERS).then((r) => r.json());
          const stargazers = await fetch(`${d.stargazers_url}?per_page=90`, FETCH_HEADERS).then((r) => r.json());
          const releases = await fetch(`${d.releases_url.replace(/\{.*?\}/, '')}?per_page=5`, FETCH_HEADERS).then((r) => r.json());
          const tags = await fetch(`${d.tags_url}?per_page=10`, FETCH_HEADERS).then((r) => r.json());
          const labels = await fetch(`${d.labels_url.replace(/\{.*?\}/, '')}?per_page=20`, FETCH_HEADERS).then((r) => r.json());
          const issues = await fetch(`${d.issues_url.replace(/\{.*?\}/, '')}?per_page=20`, FETCH_HEADERS).then((r) => r.json());

          const contributorsCount = await fetch(`${d.contributors_url}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 1);
          const releasesCount = await fetch(`${d.releases_url.replace(/\{.*?\}/, '')}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);
          const tagsCount = await fetch(`${d.tags_url}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);
          const labelsCount = await fetch(`${d.labels_url.replace(/\{.*?\}/, '')}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);
          const issuesCount = await fetch(`${d.issues_url.replace(/\{.*?\}/, '')}?per_page=1`, FETCH_HEADERS).then((r) => r.headers?.get('Link')?.match(/&page=(?<page>\d+)>; rel="last/)?.groups?.page || 0);

          if (contributorsCount > 90) setNextContributorsPage(2);
          else setNextContributorsPage(null);
          if (d.subscribers_count > 90) setNextSubscribersPage(2);
          else setNextSubscribersPage(null);
          if (d.stargazers_count > 90) setNextStargazersPage(2);
          else setNextStargazersPage(null);
          if (releasesCount > 5) setNextReleasesPage(2);
          else setNextReleasesPage(null);
          if (tagsCount > 10) setNextTagsPage(2);
          else setNextTagsPage(null);
          if (labelsCount > 20) setNextLabelsPage(2);
          else setNextLabelsPage(null);
          if (issuesCount > 20) setNextIssuesPage(2);
          else setNextIssuesPage(null);

          const README_URL = ['README.md', 'readme.md', '.github/README.md', 'README.rst'].map((e) => `https://cors-anywhere.thecodeblog.net/raw.githubusercontent.com/${d.full_name}/${d.default_branch}/${e}`);
          let readmeContent;
          // eslint-disable-next-line no-restricted-syntax
          for await (const i of README_URL) {
            readmeContent = await fetch(i, FETCH_HEADERS)
              .then((res) => (res.status === 200 ? res.text() : ''));
            if (readmeContent) break;
          }

          setData({
            ...d,
            langs,
            contributors,
            subscribers,
            stargazers,
            contributorsCount,
            readmeContent,
            releases,
            releasesCount,
            tags,
            tagsCount,
            labels,
            labelsCount,
            issues,
            issuesCount,
          });
        });
      } else {
        setData('finished');
      }
    });
  }, []);

  return (
    <div className="h-full w-full pt-4 pb-0 overflow-scroll">
      {JSON.stringify(data) !== '{}' ? (
        data !== 'finished' ? (
          <>
            <Header data={data} />
            <div className="pb-8 flex items-start justify-between gap-8">
              <ReactStickyBox>
                <div className="flex flex-col gap-4 text-zinc-600 dark:text-zinc-200 text-lg">
                  {[['uil:info-circle',
                    'Overview'],
                  ['ic:round-code',
                    'Languages'],
                  ['uil:users-alt',
                    'Contributors'],
                  ['uil:eye',
                    'Subscribers'],
                  ['uil:star',
                    'Stargazers'],
                  ['uil:document-info',
                    'README.md'],
                  ['uil:box',
                    'Releases'],
                  ['uil:tag',
                    'Tags'],
                  ['uil:tag-alt',
                    'Labels'],
                  ['octicon:issue-opened-16',
                    'Issues']].map(([icon, name], index) => (
                      <button onClick={() => setSection(index)} className={`flex items-center transition-all gap-2 w-48 text-left px-4 py-2 pt-2.5 rounded-md ${section === index ? 'text-white bg-custom-500 shadow-md' : ''}`} type="button">
                        <Icon icon={icon} className="w-6 h-6" />
                        {name}
                      </button>
                  ))}
                </div>
              </ReactStickyBox>
              <div className="min-w-0 flex-1">
                {[
                  <div>
                    <Stats data={data} />
                    <Description data={data} />
                    <License data={data} />
                    <TimeOfCreation data={data} />
                    <LastUpdated data={data} />
                    <RepoSize data={data} />
                    <Topics data={data} />
                  </div>,
                  <Languages data={data} />,
                  <Contributors
                    data={data}
                    setData={setData}
                    nextContributorsPage={nextContributorsPage}
                    setNextContributorsPage={setNextContributorsPage}
                  />,
                  <Subscribers
                    data={data}
                    setData={setData}
                    nextSubscribersPage={nextSubscribersPage}
                    setNextSubscribersPage={setNextSubscribersPage}
                  />,
                  <Stargazers
                    data={data}
                    setData={setData}
                    nextStargazersPage={nextStargazersPage}
                    setNextStargazersPage={setNextStargazersPage}
                  />,
                  <ReadmeMD data={data} />,
                  <Releases
                    data={data}
                    setData={setData}
                    nextReleasesPage={nextReleasesPage}
                    setNextReleasesPage={setNextReleasesPage}
                  />,
                  <Tags
                    data={data}
                    setData={setData}
                    nextTagsPage={nextTagsPage}
                    setNextTagsPage={setNextTagsPage}
                  />,
                  <Labels
                    data={data}
                    setData={setData}
                    nextLabelsPage={nextLabelsPage}
                    setNextLabelsPage={setNextLabelsPage}
                  />,
                  <Issues
                    data={data}
                    setData={setData}
                    nextIssuesPage={nextIssuesPage}
                    setNextIssuesPage={setNextIssuesPage}
                  />,
                ][section]}
              </div>
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center pb-12 flex-col gap-2 justify-center text-zinc-600 dark:text-zinc-200 text-2xl">
            <Icon icon="uil:exclamation-triangle" className="w-12 h-12" />
            API rate limit exceeded
          </div>
        )
      ) : (
        <div className="w-full h-full flex items-center justify-center pb-12">
          <Lottie
            options={{
              loop: true,
              autoplay: true,
              animationData: loadingAnim,
              rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
              },
            }}
            height={60}
            width={60}
            isStopped={false}
            isPaused={false}
          />
        </div>
      )}

    </div>
  );
}

export default Repo;
