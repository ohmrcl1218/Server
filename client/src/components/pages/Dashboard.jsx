import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
} from "recharts";
import "../styles/Dashboard.css";

const SLICE_COLORS = ["#2a5caa", "#c98a2c", "#3f7a5e", "#b3432b", "#6b6f96"];

export default function Dashboard({ blogs }) {
  const totalViews = blogs.reduce((sum, b) => sum + b.views, 0);
  const totalLikes = blogs.reduce((sum, b) => sum + b.likes, 0);
  const totalComments = blogs.reduce((sum, b) => sum + b.comments.length, 0);
  const totalBlogs = blogs.length;

  const likesPerBlog = blogs.map((b) => ({
    name: b.title.length > 16 ? b.title.slice(0, 16) + "…" : b.title,
    likes: b.likes,
  }));

  const categoryCounts = Object.values(
    blogs.reduce((acc, b) => {
      acc[b.category] = acc[b.category] || { name: b.category, value: 0 };
      acc[b.category].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="dashboard">
      <p className="dashboard-kicker">Overview</p>
      <h1>Dashboard</h1>

      <div className="kpi-row">
        <div className="kpi-card">
          <p className="kpi-label">Total views</p>
          <p className="kpi-value">{totalViews.toLocaleString()}</p>
        </div>
        <div className="kpi-card">
          <p className="kpi-label">Total likes</p>
          <p className="kpi-value">{totalLikes.toLocaleString()}</p>
        </div>
        <div className="kpi-card">
          <p className="kpi-label">Total comments</p>
          <p className="kpi-value">{totalComments.toLocaleString()}</p>
        </div>
        <div className="kpi-card">
          <p className="kpi-label">Total entries</p>
          <p className="kpi-value">{totalBlogs}</p>
        </div>
      </div>

      <div className="chart-row">
        <div className="chart-card">
          <h3>Likes by entry</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={likesPerBlog} margin={{ left: -20 }}>
              <CartesianGrid stroke="#dcd7c9" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 11, fill: "#5b6169" }}
                axisLine={{ stroke: "#dcd7c9" }}
                tickLine={false}
              />
              <YAxis tick={{ fontSize: 11, fill: "#5b6169" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  borderRadius: 6,
                  border: "1px solid #dcd7c9",
                  fontSize: 13,
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              />
              <Bar dataKey="likes" fill="#2a5caa" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Entries by category</h3>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categoryCounts}
                dataKey="value"
                nameKey="name"
                outerRadius={85}
                label={({ name }) => name}
                labelLine={false}
              >
                {categoryCounts.map((entry, index) => (
                  <Cell key={entry.name} fill={SLICE_COLORS[index % SLICE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  borderRadius: 6,
                  border: "1px solid #dcd7c9",
                  fontSize: 13,
                  fontFamily: "IBM Plex Sans, sans-serif",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
