/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import colors from '../assets/colors.json';

function Languages({ data }) {
  useEffect(() => {
    const width = document.querySelector('.l').clientWidth;
    const sum = Object.values(data.langs).reduce((a, b) => a + b, 0);
    Array.from(document.querySelectorAll('[data-key]')).forEach((ele) => {
      // eslint-disable-next-line no-param-reassign
      ele.style.width = `${(parseInt(ele.attributes['data-value'].value, 10) / sum) * width}px`;
    });
  }, []);

  return (
    <div className="mt-10">
      <div className="flex items-center gap-2 text-2xl font-medium text-slate-600 dark:text-gray-100 tracking-wide">
        <Icon icon="ic:round-code" className="w-8 h-8 text-indigo-500 dark:text-indigo-400" />
        Languages
      </div>
      <div className="mt-3 flex w-full border border-slate-300 dark:border-slate-600 h-4 l rounded-full overflow-hidden">
        {Object.entries(data.langs).map(([k, v]) => (
          <div className="h-full" style={{ backgroundColor: colors[k]?.color }} data-key={k} data-value={v} />
        ))}
      </div>
      <div className="flex gap-x-5 gap-y-3 mt-4 flex-wrap">
        {Object.keys(data.langs).map((k) => (
          <div className="text-slate-600 dark:text-gray-100 text-lg flex items-center gap-2">
            <span className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-600" style={{ backgroundColor: colors[k]?.color }} />
            {k}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Languages;
