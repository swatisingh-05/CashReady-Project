import { Box, Card, Chip, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function createLiveSnapshot() {
  const healthy = 108 + Math.floor(Math.random() * 10);
  const refill = 18 + Math.floor(Math.random() * 8);
  const critical = 5 + Math.floor(Math.random() * 5);
  const now = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return {
    healthData: [{ name: "Healthy", value: healthy, color: "#16A34A" }, { name: "Refill soon", value: refill, color: "#F59E0B" }, { name: "Critical", value: critical, color: "#DC2626" }],
    trendData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => ({ day, cash: 110 + Math.floor(Math.random() * 170) })),
    queue: ["ATM-034", "ATM-089", "ATM-112"].map((id, index) => ({ id, location: ["Connaught Place", "Rajiv Chowk", "Barakhamba Road"][index], status: index < 2 ? "Critical" : "Refill soon", level: `${15 + Math.floor(Math.random() * 28)}%`, color: index < 2 ? "critical" : "warning" })),
    activity: [["ATM-021", "Cash replenished", now, "R. Mehta"], ["ATM-177", "Health check passed", now, "Auto-monitor"], ["ATM-034", "Low cash alert", now, "Unassigned"]],
    monitored: 2420 + Math.floor(Math.random() * 61),
    availability: (97.5 + Math.random() * 1.4).toFixed(1),
    withdrawals: (16 + Math.random() * 4).toFixed(1),
  };
}

export default function BankerDashboard() {
  const [snapshot, setSnapshot] = useState(createLiveSnapshot);

  useEffect(() => {
    const intervalId = window.setInterval(() => setSnapshot(createLiveSnapshot()), 10000);
    return () => window.clearInterval(intervalId);
  }, []);

  const { healthData, trendData, queue, activity } = snapshot;
  return (
    <main className="analytics-page">
      <Box className="analytics-heading">
        <Box><Typography variant="h3">Bank Analytics</Typography><Typography className="analytics-subtitle">A live view of ATM health, cash levels, and replenishment priorities.</Typography></Box>
      </Box>
      <Box className="analytics-kpis">
        <Card className="analytics-kpi"><span className="kpi-label">ATMs monitored</span><strong>{snapshot.monitored.toLocaleString()}</strong><small className="kpi-positive">Live network count</small></Card>
        <Card className="analytics-kpi"><span className="kpi-label">Cash availability</span><strong>{snapshot.availability}%</strong><small className="kpi-positive">Live provider signal</small></Card>
        <Card className="analytics-kpi"><span className="kpi-label">Daily withdrawals</span><strong>₹{snapshot.withdrawals}M</strong><small>Live estimate, Delhi NCR</small></Card>
        <Card className="analytics-kpi"><span className="kpi-label">Needs attention</span><strong className="kpi-alert">{healthData[1].value + healthData[2].value}</strong><small>{healthData[2].value} critical terminals</small></Card>
      </Box>
      <Box className="analytics-main-grid">
        <Card className="analytics-panel trend-panel"><Box className="panel-heading"><Box><Typography variant="h6">Cash demand trend</Typography><Typography className="panel-note">Average cash dispensed, ₹ thousands</Typography></Box><span className="panel-period">Last 6 days</span></Box><ResponsiveContainer width="100%" height={260}><BarChart data={trendData} margin={{ top: 15, right: 8, left: -18, bottom: 0 }}><CartesianGrid stroke="#E6EDF5" vertical={false} /><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} /><YAxis axisLine={false} tickLine={false} tick={{ fill: "#718096", fontSize: 12 }} /><Tooltip cursor={{ fill: "#F2F7FC" }} /><Bar dataKey="cash" fill="#0872C9" radius={[4, 4, 0, 0]} barSize={28} /></BarChart></ResponsiveContainer></Card>
        <Card className="analytics-panel health-panel"><Box className="panel-heading"><Box><Typography variant="h6">ATM health</Typography><Typography className="panel-note">Current fleet distribution</Typography></Box></Box><Box className="health-chart"><ResponsiveContainer width="100%" height={190}><PieChart><Pie data={healthData} dataKey="value" innerRadius={58} outerRadius={82} paddingAngle={3}>{healthData.map((item) => <Cell key={item.name} fill={item.color} />)}</Pie></PieChart></ResponsiveContainer><div><strong>140</strong><span>active ATMs</span></div></Box><Box className="health-legend">{healthData.map((item) => <span key={item.name}><i style={{ background: item.color }} />{item.name}<b>{item.value}</b></span>)}</Box></Card>
      </Box>
      <Box className="analytics-lower-grid">
        <Card className="analytics-panel queue-panel"><Box className="panel-heading"><Box><Typography variant="h6">Replenishment queue</Typography><Typography className="panel-note">Terminals requiring action</Typography></Box><Chip label="3 open" size="small" /></Box><Box className="queue-list">{queue.map((item) => <Box className="queue-row" key={item.id}><Box className="queue-name"><span className={`severity ${item.color}`} /><strong>{item.id}</strong><small>{item.location}</small></Box><Box className="queue-level"><strong>{item.level}</strong><small>{item.status}</small></Box></Box>)}</Box></Card>
        <Card className="analytics-panel insight-panel"><Typography className="panel-kicker">AI INSIGHT</Typography><Typography variant="h6">Weekend demand is expected to rise 18%</Typography><Typography className="insight-copy">Historical withdrawals and local event activity suggest increasing replenishment frequency across Delhi NCR this weekend.</Typography><Box className="insight-callout"><strong>Recommended action</strong><span>Schedule 12 additional cash runs before Saturday morning.</span></Box></Card>
      </Box>
      <Card className="analytics-panel activity-panel"><Box className="panel-heading"><Box><Typography variant="h6">Latest operations activity</Typography><Typography className="panel-note">Most recent network events</Typography></Box></Box><Box className="activity-table"><Box className="activity-header"><span>Terminal</span><span>Event</span><span>Time</span><span>Owner</span></Box>{activity.map((row) => <Box className="activity-row" key={row[0]}><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><span>{row[3]}</span></Box>)}</Box></Card>
    </main>
  );
}
