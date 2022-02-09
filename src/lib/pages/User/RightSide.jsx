/* eslint-disable react/prop-types */
import React from 'react';
import ContributionActivity from './ContributionActivity';
import ReadmeMD from './ReadmeMD';
import Repositories from './Repositories';

function RightSide({ data }) {
  return (
    <div className="flex-1 pb-28 flex flex-col gap-12 min-w-0 w-full">
      <ReadmeMD username={data.login} />
      <Repositories repos_url={data.repos_url} repos_count={data.public_repos} />
      <ContributionActivity username={data.login} eventsUrl={data.events_url.replace(/\{.*?\}/, '')} />
    </div>
  );
}

export default RightSide;
