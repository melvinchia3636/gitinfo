/* eslint-disable react/prop-types */
import React from 'react';
import { Icon } from '@iconify/react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement } from 'chart.js';
import colors from '../../assets/colors.json';

Chart.register(ArcElement);

function Languages({ data }) {
  console.log(data.langs);
  return (
    <div>
      <div className="flex items-center gap-2 text-2xl font-medium text-zinc-600 dark:text-zinc-300 tracking-wide">
        <Icon icon="ic:round-code" className="w-8 h-8 text-custom-500 dark:text-custom-400" />
        Languages
      </div>
      <div className="w-full flex flex-col items-center">
        <div className="mb-6 w-[32rem] h-[32rem] mt-8">
          <Doughnut
            data={{
              labels: Object.keys(data.langs),
              datasets: [{
                label: 'My First Dataset',
                data: Object.values(data.langs),
                backgroundColor: Object.keys(data.langs).map((e) => colors[e]?.color || 'white'),
                hoverOffset: 4,
              }],
            }}
          />
        </div>
        <div className="flex gap-x-5 gap-y-3 mt-4 flex-wrap">
          {Object.keys(data.langs).map((k) => (
            <div className="text-zinc-600 dark:text-zinc-300 text-lg flex items-center gap-2">
              <span className="w-4 h-4 rounded-full border border-zinc-300 dark:border-zinc-600" style={{ backgroundColor: colors[k]?.color }} />
              {k}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Languages;
