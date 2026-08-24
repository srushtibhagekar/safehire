import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

interface AnalysisTrendLineProps {
  data: { _id: string; total: number; fraud: number; genuine: number }[];
}

export const AnalysisTrendLine: React.FC<AnalysisTrendLineProps> = ({ data }) => {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
          <XAxis dataKey="_id" stroke="#64748B" fontSize={11} tickLine={false} />
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
          <Legend
            verticalAlign="top"
            height={36}
            formatter={(value) => <span className="text-xs text-slate-300 capitalize">{value}</span>}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#06B6D4"
            strokeWidth={2}
            dot={{ r: 3, fill: '#06B6D4' }}
            activeDot={{ r: 5 }}
            name="Total Scans"
          />
          <Line
            type="monotone"
            dataKey="fraud"
            stroke="#EF4444"
            strokeWidth={2}
            dot={{ r: 3, fill: '#EF4444' }}
            name="Fraudulent"
          />
          <Line
            type="monotone"
            dataKey="genuine"
            stroke="#10B981"
            strokeWidth={2}
            dot={{ r: 3, fill: '#10B981' }}
            name="Genuine"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
