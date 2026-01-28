import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

/* ---------------- Reusable Card ---------------- */
function StatCard({ title, subtitle, children }) {
  return (
    <div className="card app-card h-100 rounded-4">
      <div className="card-body">
        <div className="fw-semibold mb-1">{title}</div>
        {subtitle && <div className="text-muted small mb-3">{subtitle}</div>}
        {children}
      </div>
    </div>
  );
}

/* ---------------- Action Card ---------------- */
function ActionCard({ icon, title, link }) {
  return (
    <Link to={link} className="text-decoration-none">
      <div className="card h-100 action-card rounded-4">
        <div className="card-body text-center">
          <div className="action-icon mb-2">{icon}</div>
          <div className="fw-semibold">{title}</div>
        </div>
      </div>
    </Link>
  );
}

/* ---------------- Progress Row ---------------- */
function ProgressRow({ label, percent, color }) {
  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between small mb-1">
        <span>{label}</span>
        <b>{percent}%</b>
      </div>
      <div className="progress" style={{ height: 10 }}>
        <div
          className="progress-bar"
          style={{ width: `${percent}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function DCADashboard() {
  /* Ageing bucket data */
  const ageingBuckets = [
    { label: "0–30 Days", value: 42, color: "#2EAD8F" }, // Green
    { label: "31–60 Days", value: 26, color: "#3399FF" }, // Blue
    { label: "61–90 Days", value: 18, color: "#F9AB00" }, // Yellow
    { label: "90+ Days", value: 14, color: "#DB4437" } // Red
  ];

  /* SLA weekly */
  const slaWeekly = {
    weeks: ["Week 1", "Week 2", "Week 3", "Week 4"],
    onTime: [45, 52, 48, 56],
    atRisk: [12, 8, 15, 10],
    breached: [3, 5, 2, 4]
  };

  /* Overall performance */
  const performance = {
    recoveryRate: 72.4,
    casesClosedPercent: 57,
    slaCompliance: 92.3,
    avgResolutionDays: 28,
    totalRecovery: 4250000
  };

  const pieData = useMemo(
    () =>
      ageingBuckets.map((b, i) => ({
        id: i,
        label: b.label,
        value: b.value,
        color: b.color
      })),
    []
  );

  return (
    <div className="d-flex flex-column gap-4">

      {/* Header */}
      <div>
        <h3 className="mb-1">DCA Dashboard</h3>
        <div className="text-muted">
          Assigned work, ageing bucket, SLA analysis and performance.
        </div>
      </div>

      {/* TOP ROW */}
      <div className="row g-3">

        {/* Actions */}
        <div className="col-12 col-lg-6">
          <StatCard title="Actions">
            <div className="row g-3">
              <div className="col-12 col-md-4">
                <ActionCard
                  icon="📂"
                  title="Assigned Cases"
                  link="/dca/assigned-cases"
                />
              </div>
              <div className="col-12 col-md-4">
                <ActionCard
                  icon="✅"
                  title="Case Closure"
                  link="/dca/case-closure"
                />
              </div>
              <div className="col-12 col-md-4">
                <ActionCard
                  icon="📈"
                  title="Performance"
                  link="/dca/performance"
                />
              </div>
            </div>
          </StatCard>
        </div>

        {/* Ageing Bucket */}
        <div className="col-12 col-lg-6">
          <StatCard title="Ageing Bucket" subtitle="Percentage split">
            <PieChart
              height={240}
              series={[
                {
                  data: pieData,
                  innerRadius: 55,
                  outerRadius: 95,
                  arcLabelMinAngle: 10
                }
              ]}
            />
          </StatCard>
        </div>
      </div>

      {/* BOTTOM ROW */}
      <div className="row g-3">

        {/* SLA Analysis */}
        <div className="col-12 col-lg-6">
          <StatCard title="SLA Analysis">
            <BarChart
              height={260}
              xAxis={[{ data: slaWeekly.weeks, scaleType: "band" }]}
              series={[
                { data: slaWeekly.onTime, label: "On Time", color: "#2EAD8F" },
                { data: slaWeekly.atRisk, label: "At Risk", color: "#F9AB00" },
                { data: slaWeekly.breached, label: "Breached", color: "#DB4437" }
              ]}
            />
          </StatCard>
        </div>

        {/* Overall Performance */}
        <div className="col-12 col-lg-6">
          <StatCard title="Overall DCA Performance">

            <ProgressRow
              label="Recovery Rate"
              percent={performance.recoveryRate}
              color="#2EAD8F"
            />

            <ProgressRow
              label="Cases Closed"
              percent={performance.casesClosedPercent}
              color="#34A853"
            />

            <ProgressRow
              label="SLA Compliance"
              percent={performance.slaCompliance}
              color="#F9AB00"
            />

            <div className="row text-center mt-4">
              <div className="col">
                <div className="fw-bold fs-4">
                  {performance.avgResolutionDays}
                </div>
                <div className="text-muted small">
                  Avg Resolution Days
                </div>
              </div>
              <div className="col">
                <div className="fw-bold fs-5">
                  ₹ {performance.totalRecovery.toLocaleString()}
                </div>
                <div className="text-muted small">
                  Total Recovery
                </div>
              </div>
            </div>

          </StatCard>
        </div>

      </div>

      {/* Styles */}
      <style>
        {`
          .app-card {
            box-shadow: 0 10px 30px rgba(0,0,0,0.06);
          }
          .action-card {
            cursor: pointer;
            transition: all 0.2s ease;
            border: 1px solid #e5e7eb;
          }
          .action-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0,0,0,0.08);
            border-color: #0d6efd;
          }
          .action-icon {
            width: 42px;
            height: 42px;
            border-radius: 50%;
            background: #eef4ff;
            color: #0d6efd;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            margin: 0 auto;
          }
        `}
      </style>

    </div>
  );
}
