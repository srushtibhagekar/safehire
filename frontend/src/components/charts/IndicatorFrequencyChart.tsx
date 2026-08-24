import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

interface IndicatorFrequencyProps {
  data: { type: string; count: number; severity: string }[];
}

export const IndicatorFrequencyChart: React.FC<IndicatorFrequencyProps> = ({ data }) => {
  const getSeverityColor = (sev: string) => {
    if (sev === 'CRITICAL') return '#EF4444';
    if (sev === 'HIGH') return '#F97316';
    if (sev === 'MEDIUM') return '#F59E0B';
    return '#10B981';
  };

  const formatted = data.map((d) => ({
    ...d,
    label: d.type.replace(/_/g, ' ').toLowerCase(),
  }));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={formatted} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
          <XAxis type="number" stroke="#64748B" fontSize={11} tickLine={false} allowDecimals={false} />
          <YAxis
            type="category"
            dataKey="label"
            stroke="#94A3B8"
            fontSize={10}
            tickLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#0F172A',
              borderColor: '#334155',
              borderRadius: '8px',
              color: '#F8FAFC',
              fontSize: '12px',
            }}
          />
          <Bar dataKey="count" radius={[0, 4, 4, 0]}>
            {formatted.map((entry, index) => (
              <Cell key={`ind-bar-${index}`} fill={getSeverityColor(entry.severity)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
