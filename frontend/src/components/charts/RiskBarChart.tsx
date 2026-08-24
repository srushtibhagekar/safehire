import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

interface RiskBarChartProps {
  data: { range: string; count: number }[];
}

export const RiskBarChart: React.FC<RiskBarChartProps> = ({ data }) => {
  const getBarColor = (range: string) => {
    if (range.includes('0-20')) return '#10B981';
    if (range.includes('21-40')) return '#34D399';
    if (range.includes('41-60')) return '#F59E0B';
    if (range.includes('61-80')) return '#FB923C';
    return '#EF4444';
  };

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis
            dataKey="range"
            stroke="#64748B"
            fontSize={10}
            tickLine={false}
            angle={-15}
            textAnchor="end"
          />
          <YAxis stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#F8FAFC',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`bar-${index}`} fill={getBarColor(entry.range)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
