import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "../styles/Chart.css";

/**
 * Returns an array like:
 * [
 *   { metric: "Stars", repoA: 215000, repoB: 47000 },
 *   ...
 * ]
 */
function buildChartData(repoA, repoB) {
  return [
    {
      metric: "Stars",
      [repoA.name]: repoA.stargazers_count,
      [repoB.name]: repoB.stargazers_count,
    },
    {
      metric: "Forks",
      [repoA.name]: repoA.forks_count,
      [repoB.name]: repoB.forks_count,
    },
    {
      metric: "Watchers",
      [repoA.name]: repoA.watchers_count,
      [repoB.name]: repoB.watchers_count,
    },
    {
      metric: "Open Issues",
      [repoA.name]: repoA.open_issues_count,
      [repoB.name]: repoB.open_issues_count,
    },
  ];
}


// ComparisonChart

export default function ComparisonChart({ repoA, repoB }) {
  if (!repoA || !repoB) return null;

  const data = buildChartData(repoA, repoB);

  return (
    <section className="chart-section" aria-label="Visual comparison chart">
      <div className="chart-section__header">
        <p className="chart-section__title">Visual Analytics</p>

        {/* Manual legend */}
        <div className="chart-section__legend">
          <span className="legend-item">
            <span className="legend-dot legend-dot--a" />
            {repoA.name}
          </span>
          <span className="legend-item">
            <span className="legend-dot legend-dot--b" />
            {repoB.name}
          </span>
        </div>
      </div>

      <div className="chart-section__chart">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={data}
            margin={{ top: 8, right: 16, left: 0, bottom: 8 }}
            barCategoryGap="30%"
            barGap={4}
          >
            {/* Subtle horizontal grid lines only */}
            <CartesianGrid vertical={false} stroke="#e8e8e8" />

            <XAxis
              dataKey="metric"
              tick={{ fontSize: 12, fill: "#666" }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fontSize: 11, fill: "#999" }}
              axisLine={false}
              tickLine={false}
              width={55}
              tickFormatter={(v) =>
                v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
              }
            />

            <Tooltip
              cursor={{ fill: "#f5f5f5" }}
              contentStyle={{
                border: "1px solid #ddd",
                borderRadius: "4px",
                fontSize: "0.8rem",
                boxShadow: "none",
              }}
              formatter={(value) => value.toLocaleString("en-US")}
            />
            <Legend hide />

            {/* Repo A — black bars */}
            <Bar dataKey={repoA.name} fill="#111" radius={[3, 3, 0, 0]} />

            {/* Repo B — gray bars */}
            <Bar dataKey={repoB.name} fill="#aaa" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
