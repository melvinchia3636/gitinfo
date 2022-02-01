/* eslint-disable react/prop-types */
import React from 'react';
import ReadmeMD from './ReadmeMD';
import Repositories from './Repositories';

function RightSide({ data }) {
  return (
    <div className="flex-1 overflow-y-scroll -mt-2 pb-28 flex flex-col gap-12">
      <ReadmeMD username={data.login} />
      <Repositories repos_url={data.repos_url} repos_count={data.public_repos} />
    </div>
  );
}

export default RightSide;
