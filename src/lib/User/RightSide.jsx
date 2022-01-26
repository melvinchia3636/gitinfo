/* eslint-disable react/prop-types */
import React from 'react';
import ReadmeMD from './ReadmeMD';

function RightSide({ data }) {
  return (
    <div className="flex-1 overflow-y-scroll h-full -mt-2">
      <ReadmeMD username={data.login} />
    </div>
  );
}

export default RightSide;
