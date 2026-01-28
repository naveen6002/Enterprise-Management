import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { PieChart } from '@mui/x-charts/PieChart';
import { LineChart } from '@mui/x-charts/LineChart';
import { api } from '../../services/api.js';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

function StatCard({ title, children }) {
  return (
    <div className="card app-card h-100 rounded-4">
      <div className="card-body">
        <div className="fw-semibold mb-3">{title}</div>
        {children}
      </div>
    </div>
  );
}

const AGEING_COLORS = ['#0F9D8A', '#2D9CDB', '#F2994A', '#EB5757'];

function ProgressRow({ label, value, total, barClass }) {
  const percent = total ? Math.round((value / total) * 100) : 0;
  return (
    <div className="mb-2">
      <div className="d-flex justify-content-between small">
        <span>{label}</span>
        <b>{value}</b>
      </div>
      <div className="progress" style={{ height: 8 }}>
        <div
          className={`progress-bar ${barClass}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}

export default function FedExDashboard() {
  const [loading, setLoading] = useState(true);
  const [casesHover, setCasesHover] = useState(false);
  const [ageing, setAgeing] = useState(null);
  const [dcaPerf, setDcaPerf] = useState(null);
  const [sla, setSla] = useState(null);
  const [risk, setRisk] = useState(null);
  const [trend, setTrend] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const [a, d, s, r, t] = await Promise.all([
          api.getAgeingBreakdown(),
          api.getDCAPerformance(),
          api.getSLAAnalysis(),
          api.getRiskPriority(),
          api.getRecoveryTrend()
        ]);
        if (!alive) return;
        setAgeing(a);
        setDcaPerf(d);
        setSla(s);
        setRisk(r);
        setTrend(t);
      } catch {
        if (!alive) return;
        setError('Failed to load dashboard.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, []);

  const pieData = useMemo(() => {
    const buckets = ageing?.buckets || [];
    const total = buckets.reduce((s, b) => s + b.value, 0);
    return buckets.map((b, i) => ({
      id: i,
      label: b.label,
      value: b.value,
      percent: total ? Math.round((b.value / total) * 100) : 0,
      color: AGEING_COLORS[i]
    }));
  }, [ageing]);

  if (loading) return <LoadingSpinner label="Loading FedEx dashboard…" />;

  const slaTotal = (sla?.onTime || 0) + (sla?.atRisk || 0) + (sla?.breached || 0);
  const riskTotal = (risk?.high || 0) + (risk?.medium || 0) + (risk?.low || 0);

  return (
    <div className="d-flex flex-column gap-4">

      {/* Header */}
      <div>
        <h3 className="mb-1">Enterprise Dashboard</h3>
        <div className="muted">Overview of cases, SLA, and recovery signals.</div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* TOP SECTION */}
      <div className="row g-3">

        {/* Navigation */}
        <div className="col-12 col-lg-6">
          <StatCard title="Navigation">
            <div className="row g-3">

              {/* Overall */}
              <div className="col-12 col-md-4">
                <Link to="/fedex/overall-cases" className="text-decoration-none">
                  <div className="border rounded-4 p-3 text-center h-100 nav-card">
                    <div className="icon-circle bg-primary-subtle text-primary">📂</div>
                    <div className="fw-semibold mt-2">Overall Cases</div>
                  </div>
                </Link>
              </div>

              {/* Cases – FIXED */}
              <div
                className="col-12 col-md-4 position-relative"
                onMouseEnter={() => setCasesHover(true)}
                onMouseLeave={() => setCasesHover(false)}
              >
                <div className="border rounded-4 p-3 text-center h-100 nav-card">
                  <div className="icon-circle bg-success-subtle text-success">🗂️</div>
                  <div className="fw-semibold mt-2">Cases</div>
                </div>

                {casesHover && (
                  <div
                    className="position-absolute bg-white shadow rounded-3"
                    style={{
                      top: '100%',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      minWidth: 180,
                      zIndex: 1000
                    }}
                  >
                    <Link className="dropdown-item py-2" to="/fedex/assign-cases">
                      Assign Cases
                    </Link>
                    <Link className="dropdown-item py-2" to="/fedex/monitor-cases">
                      Monitor Cases
                    </Link>
                    <Link className="dropdown-item py-2" to="/fedex/reassign">
                      Reassign Cases
                    </Link>
                  </div>
                )}
              </div>

              {/* Reports */}
              <div className="col-12 col-md-4">
                <Link to="/fedex/reports" className="text-decoration-none">
                  <div className="border rounded-4 p-3 text-center h-100 nav-card">
                    <div className="icon-circle bg-warning-subtle text-warning">📊</div>
                    <div className="fw-semibold mt-2">Reports</div>
                  </div>
                </Link>
              </div>

            </div>
          </StatCard>
        </div>

        {/* Ageing */}
        <div className="col-12 col-lg-6">
          <StatCard title="Ageing Breakdown">
            <PieChart
              height={240}
              series={[{
                data: pieData,
                innerRadius: 55,
                outerRadius: 95,
                arcLabel: (item) => `${item.percent}%`,
                arcLabelMinAngle: 10
              }]}
            />
          </StatCard>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="row g-3">
        <div className="col-12 col-lg-4">
          <StatCard title="DCA Performance">
            <ProgressRow
              label="Avg Recovery Rate"
              value={Math.round((dcaPerf?.averageRecoveryRate || 0) * 100)}
              total={100}
              barClass="bg-success"
            />
            <div>Active DCA: <b>{dcaPerf?.activeDca}</b></div>
            <div>🏆 Best: <b>{dcaPerf?.bestDca}</b></div>
            <div>⚠️ Worst: <b>{dcaPerf?.worstDca}</b></div>
          </StatCard>
        </div>

        <div className="col-12 col-lg-4">
          <StatCard title="SLA Analysis">
            <ProgressRow label="On Time" value={sla?.onTime || 0} total={slaTotal} barClass="bg-success" />
            <ProgressRow label="At Risk" value={sla?.atRisk || 0} total={slaTotal} barClass="bg-warning" />
            <ProgressRow label="Breached" value={sla?.breached || 0} total={slaTotal} barClass="bg-danger" />
          </StatCard>
        </div>

        <div className="col-12 col-lg-4">
          <StatCard title="Risk & Priority">
            <ProgressRow label="High" value={risk?.high || 0} total={riskTotal} barClass="bg-danger" />
            <ProgressRow label="Medium" value={risk?.medium || 0} total={riskTotal} barClass="bg-warning" />
            <ProgressRow label="Low" value={risk?.low || 0} total={riskTotal} barClass="bg-success" />
          </StatCard>
        </div>
      </div>

      {/* Trend */}
      <StatCard title="Recovery Trend">
        <LineChart
          height={220}
          xAxis={[{ scaleType: 'point', data: trend?.labels || [] }]}
          series={(trend?.series || []).map((s) => ({
            data: s.data,
            label: s.label,
            valueFormatter: (v) => `${v}%`
          }))}
        />
      </StatCard>

      <style>
        {`
          .icon-circle {
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            margin: 0 auto;
          }
          .nav-card {
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .nav-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(0,0,0,0.08);
          }
        `}
      </style>

    </div>
  );
}
