import { Icon } from '@iconify/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Repo() {
  const [data, setData] = useState({});
  const params = useParams();

  useEffect(() => {
    fetch(`https://api.github.com/repos/${params.user}/${params.reponame}`).then((res) => res.json()).then((d) => setData(d));
  }, []);

  return (
    <div className="h-full w-full pt-12 pb-0 break-all overflow-scroll">
      {JSON.stringify(data) !== '{}' ? (
        <>
          <div className="flex gap-2 items-center text-slate-600 text-3xl tracking-wide font-medium">
            <Icon icon="uil:book-alt" className="w-10 h-10 text-purple-500" />
            {data.full_name}
          </div>
          <div className="flex gap-2 mt-8 px-1 tracking-wide">
            <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
              <div className="p-2 bg-purple-200 rounded-md">
                <Icon icon="ant-design:star-filled" className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                Stars
                <span className="text-2xl text-slate-600">{data.stargazers_count.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
              <div className="p-2 bg-purple-200 rounded-md">
                <Icon icon="ant-design:fork-outlined" className="w-8 h-8 text-purple-500 stroke-[0.4px]" />
              </div>
              <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                Forks
                <span className="text-2xl text-slate-600">{data.forks.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
              <div className="p-2 bg-purple-200 rounded-md">
                <Icon icon="uil:eye" className="w-8 h-8 text-purple-500" />
              </div>
              <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                Subscribers
                <span className="text-2xl text-slate-600">{data.subscribers_count.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-md p-2 bg-white w-full shadow-md">
              <div className="p-2 bg-purple-200 rounded-md">
                <Icon icon="octicon:issue-opened-24" className="w-8 h-8 text-purple-500 stroke-purple-500 stroke-[0.4px]" />
              </div>
              <div className="text-sm font-medium text-slate-400 flex flex-col justify-between">
                Issues
                <span className="text-2xl text-slate-600">{data.open_issues.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 tracking-wide">
              <Icon icon="uil:info-circle" className="w-8 h-8 text-purple-500" />
              Description
            </div>
            <p className="mt-3 text-slate-600 text-lg ml-1 tracking-wide">{data.description}</p>
            {data.homepage ? (
              <a href={data.homepage} target="_blank" rel="noreferrer" className="text-purple-500 mt-2 font-medium flex items-center gap-2 ml-1 tracking-wide">
                <Icon icon="uil:external-link-alt" className="w-5 h-5" />
                {data.homepage}
              </a>
            ) : ''}
          </div>
        </>
      ) : ''}

    </div>
  );
}

export default Repo;
