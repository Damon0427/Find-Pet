import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  LineChart, Line, CartesianGrid
} from 'recharts';

const Graph = ({ pets }) => {
  function buildChartData(pets) {
    const typeCounts = {};
    const ageCounts = {};
    const today = new Date();
    const dailyCounts = Array(7).fill(0);
    const dayLabels = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dayLabels.push(date.toISOString().slice(5, 10)); // MM-DD
    }

    pets.forEach(pet => {
      const type = pet.type || 'Unknown';
      const age = pet.age || 'Unknown';
      const publishedDate = new Date(pet.published_at);

      typeCounts[type] = (typeCounts[type] || 0) + 1;
      ageCounts[age] = (ageCounts[age] || 0) + 1;

      const diffDays = Math.floor((today - publishedDate) / (1000 * 60 * 60 * 24));
      if (diffDays >= 0 && diffDays < 7) {
        dailyCounts[6 - diffDays]++;
      }
    });

    const typeData = Object.entries(typeCounts).map(([type, count]) => ({ type, count }));
    const ageData = Object.entries(ageCounts).map(([age, count]) => ({ age, count }));

    return { typeData, ageData};
  }

  if (!pets) return <p className="loading">Loading Graphs...</p>;

  const { typeData, ageData } = buildChartData(pets);

return (
  <div className="Chart-Section">
    <h2 className="displayGraph">📊 Pet Data Overview</h2>
    <div className="chart-row">
      <div className="chart-box">
        <h3>Pet Type Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={typeData}>
            <XAxis dataKey="type" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="chart-box">
        <h3>Pet Age Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={ageData}>
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="age" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);

};

export default Graph;
