import React, { useState } from "react";
import { Link } from "react-router-dom";

/* ---------------- MOCK DATA (Derived logically) ---------------- */
const summaryData = {
  dailyRecovery: {
    totalRecovered: 1250000,
    casesClosed: 42,
    successRate: "68%"
  },
  cityWise: [
    { city: "Chennai", recovered: 520000, cases: 18 },
    { city: "Bangalore", recovered: 410000, cases: 14 },
    { city: "Hyderabad", recovered: 320000, cases: 10 }
  ],
  dcaPerformance: [
    { dca: "DCA Alpha", recoveryRate: "72%", sla: "96%" },
    { dca: "DCA Beta", recoveryRate: "64%", sla: "91%" },
    { dca: "DCA Gamma", recoveryRate: "58%", sla: "88%" }
  ],
  slaBreaches: [
    { caseId: "C-1021", customer: "Arun Kumar", daysLate: 5 },
    { caseId: "C-1045", customer: "Priya S", daysLate: 3 }
  ],
  ageingRisk: [
    { bucket: "0–30", amount: 420000, risk: "Low" },
    { bucket: "31–60", amount: 310000, risk: "Medium" },
    { bucket: "61–90", amount: 180000, risk: "High" }
  ],
  commission: {
    earned: 180000,
    pending: 42000,
    disputes: 3
  }
};

/* ---------------- Reusable Card ---------------- */
function ReportCard({ title, desc, onClick }) {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className="card h-100 rounded-4 shadow-sm report-card"
        onClick={onClick}
      >
        <div className="card-body">
          <h6 className="fw-semibold">{title}</h6>
          <p className="text-muted small">{desc}</p>
          <span className="badge bg-primary">View Details</span>
        </div>
      </div>
    </div>
  );
}

/* ---------------- MAIN COMPONENT ---------------- */
export default function Reports() {
  const [activeReport, setActiveReport] = useState(null);

  return (
    <div className="d-flex flex-column gap-4">

      {/* Header */}
      <div>
        <h3 className="mb-1">Reports</h3>
        <div className="text-muted">
          Consolidated analytics derived from Overall, Assigned, and Monitored cases.
        </div>
      </div>

      {/* Cards */}
      {!activeReport && (
        <div className="row g-3">
          <ReportCard
            title="Daily Recovery Report"
            desc={`Recovered ₹${summaryData.dailyRecovery.totalRecovered.toLocaleString()} • ${summaryData.dailyRecovery.casesClosed} cases closed`}
            onClick={() => setActiveReport("daily")}
          />
          <ReportCard
            title="City-wise Recovery"
            desc={`Top city: Chennai • ₹${summaryData.cityWise[0].recovered.toLocaleString()}`}
            onClick={() => setActiveReport("city")}
          />
          <ReportCard
            title="DCA Performance Report"
            desc={`Best: ${summaryData.dcaPerformance[0].dca} • ${summaryData.dcaPerformance[0].recoveryRate}`}
            onClick={() => setActiveReport("dca")}
          />
          <ReportCard
            title="SLA Breach Report"
            desc={`${summaryData.slaBreaches.length} breached cases`}
            onClick={() => setActiveReport("sla")}
          />
          <ReportCard
            title="Ageing & Risk Report"
            desc={`High risk amount ₹${summaryData.ageingRisk[2].amount.toLocaleString()}`}
            onClick={() => setActiveReport("ageing")}
          />
          <ReportCard
            title="Commission & Payout Report"
            desc={`Earned ₹${summaryData.commission.earned.toLocaleString()}`}
            onClick={() => setActiveReport("commission")}
          />
        </div>
      )}

      {/* ---------------- DETAIL VIEWS ---------------- */}

      {activeReport === "daily" && (
        <Detail title="Daily Recovery">
          <p>Total Recovered: <b>₹{summaryData.dailyRecovery.totalRecovered.toLocaleString()}</b></p>
          <p>Cases Closed: <b>{summaryData.dailyRecovery.casesClosed}</b></p>
          <p>Success Rate: <b>{summaryData.dailyRecovery.successRate}</b></p>
        </Detail>
      )}

      {activeReport === "city" && (
        <Detail title="City-wise Recovery">
          {summaryData.cityWise.map((c) => (
            <div key={c.city}>
              {c.city} — ₹{c.recovered.toLocaleString()} ({c.cases} cases)
            </div>
          ))}
        </Detail>
      )}

      {activeReport === "dca" && (
        <Detail title="DCA Performance">
          {summaryData.dcaPerformance.map((d) => (
            <div key={d.dca}>
              {d.dca} — Recovery {d.recoveryRate}, SLA {d.sla}
            </div>
          ))}
        </Detail>
      )}

      {activeReport === "sla" && (
        <Detail title="SLA Breach Details">
          {summaryData.slaBreaches.map((s) => (
            <div key={s.caseId}>
              {s.caseId} — {s.customer} ({s.daysLate} days late)
            </div>
          ))}
        </Detail>
      )}

      {activeReport === "ageing" && (
        <Detail title="Ageing & Risk">
          {summaryData.ageingRisk.map((a) => (
            <div key={a.bucket}>
              {a.bucket} days — ₹{a.amount.toLocaleString()} ({a.risk})
            </div>
          ))}
        </Detail>
      )}

      {activeReport === "commission" && (
        <Detail title="Commission & Payout">
          <p>Commission Earned: ₹{summaryData.commission.earned.toLocaleString()}</p>
          <p>Pending Payout: ₹{summaryData.commission.pending.toLocaleString()}</p>
          <p>Disputes: {summaryData.commission.disputes}</p>
        </Detail>
      )}

      {/* Footer */}
      <div className="d-flex gap-3 mt-3">
        {activeReport && (
          <button
            className="btn btn-outline-secondary"
            onClick={() => setActiveReport(null)}
          >
            Back to Reports
          </button>
        )}
        <Link to="/fedex/dashboard" className="btn btn-outline-primary">
          Back to Dashboard
        </Link>
      </div>

      {/* Styles */}
      <style>
        {`
          .report-card {
            cursor: pointer;
            transition: all 0.2s ease;
          }
          .report-card:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 24px rgba(0,0,0,0.1);
          }
        `}
      </style>

    </div>
  );
}

/* ---------------- Detail Wrapper ---------------- */
function Detail({ title, children }) {
  return (
    <div className="card rounded-4 shadow-sm">
      <div className="card-body">
        <h5 className="mb-3">{title}</h5>
        <div className="d-flex flex-column gap-2">{children}</div>
      </div>
    </div>
  );
}
