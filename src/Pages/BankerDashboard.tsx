import { Box, Card, Typography } from "@mui/material";
import Sidebar from "../Components/Sidebar";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function BankerDashboard() {
  const healthData = [
    { name: "Healthy", value: 112 },
    { name: "Refill", value: 21 },
    { name: "Critical", value: 7 },
  ];

  const trendData = [
    { day: "Mon", cash: 120 },
    { day: "Tue", cash: 150 },
    { day: "Wed", cash: 180 },
    { day: "Thu", cash: 140 },
    { day: "Fri", cash: 220 },
    { day: "Sat", cash: 260 },
  ];

  const COLORS = ["#22C55E", "#F59E0B", "#EF4444"];

  return (
    <>
      <Sidebar />

      <Box
        sx={{
          ml: "280px",
          width: "calc(100% - 280px)",
          minHeight: "100vh",
          bgcolor: "#F5F7FA",
          p: 4,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#00175A",
            mb: 4,
          }}
        >
          📊 CashReady Operations Center
        </Typography>

        {/* KPI Cards */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(250px, 1fr))",
            gap: 3,
            mb: 4,
          }}
        >
          <Card sx={{ p: 3 }}>
            <Typography color="gray">
              🟢 Healthy ATMs
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: "#16A34A",
                fontWeight: "bold",
              }}
            >
              112
            </Typography>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography color="gray">
              🟡 Refill Soon
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: "#F59E0B",
                fontWeight: "bold",
              }}
            >
              21
            </Typography>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography color="gray">
              🔴 Critical ATMs
            </Typography>

            <Typography
              variant="h3"
              sx={{
                color: "#DC2626",
                fontWeight: "bold",
              }}
            >
              7
            </Typography>
          </Card>
        </Box>

        {/* Forecast */}
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 4,
            background:
              "linear-gradient(135deg,#00175A,#006FCF)",
            color: "white",
          }}
        >
          <Typography variant="h5">
            🤖 AI Forecast Engine
          </Typography>

          <Typography sx={{ mt: 2 }}>
            ATM-034
          </Typography>

          <Typography
            variant="h3"
            sx={{ fontWeight: "bold" }}
          >
            Cash Out @ 7:15 PM
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Confidence Score: 95%
          </Typography>
        </Card>

        {/* Refill Queue */}
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#00175A",
            }}
          >
            🚨 Refill Priority Queue
          </Typography>

          <Typography sx={{ mt: 2 }}>
            🔴 ATM-034 | Connaught Place
          </Typography>

          <Typography sx={{ mt: 2 }}>
            🔴 ATM-089 | Rajiv Chowk
          </Typography>

          <Typography sx={{ mt: 2 }}>
            🟡 ATM-112 | Barakhamba Road
          </Typography>
        </Card>

        {/* AI Insight */}
        <Card
          sx={{
            p: 4,
            borderRadius: 4,
            mb: 4,
            bgcolor: "#EEF5FF",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: "#00175A",
            }}
          >
            💡 AI Insight
          </Typography>

          <Typography sx={{ mt: 2 }}>
            Cash demand is expected to increase by
            18% this weekend based on historical
            withdrawal trends and festival activity.
          </Typography>

          <Typography
            sx={{
              mt: 2,
              color: "#16A34A",
              fontWeight: "bold",
            }}
          >
            Recommendation: Increase replenishment
            frequency for Delhi NCR ATMs.
          </Typography>
        </Card>

        {/* Charts */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit,minmax(450px,1fr))",
            gap: 3,
          }}
        >
          <Card sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              ATM Health Distribution
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <PieChart>
                <Pie
                  data={healthData}
                  dataKey="value"
                  outerRadius={100}
                  label
                >
                  {healthData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </Card>

          <Card sx={{ p: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                mb: 2,
              }}
            >
              Cash Demand Trend
            </Typography>

            <ResponsiveContainer
              width="100%"
              height={300}
            >
              <BarChart data={trendData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="cash"
                  fill="#006FCF"
                />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Box>
      </Box>
    </>
  );
}