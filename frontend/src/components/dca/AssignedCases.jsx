import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PiggyBankLoader from "../common/PiggyBankLoader.jsx";
import fedexLogo from "../../dcaimages.png";

/* ---------------- Utils ---------------- */
function moneyFmt(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

function dateFmt(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString();
  } catch {
    return "—";
  }
}

/* ---------------- MOCK DATA (10 CASES) ---------------- */
const MOCK_CASES = [
  {
    caseId: "FX-2001",
    customerName: "Delta Foods",
    dueAmount: 78000,
    priorityScore: 79,
    slaDeadline: "2026-02-02",
    callMadeDays: ["Mon", "Thu"],
    homeVisitDone: false,
    lastEmailSent: "2026-01-24"
  },
  {
    caseId: "FX-2002",
    customerName: "Evergreen Exports",
    dueAmount: 142500,
    priorityScore: 91,
    slaDeadline: "2026-01-29",
    callMadeDays: ["Tue", "Wed", "Fri"],
    homeVisitDone: true,
    lastEmailSent: "2026-01-26"
  },
  {
    caseId: "FX-2003",
    customerName: "Sunrise Traders",
    dueAmount: 96500,
    priorityScore: 74,
    slaDeadline: "2026-02-05",
    callMadeDays: ["Mon"],
    homeVisitDone: false,
    lastEmailSent: "2026-01-22"
  },
  {
    caseId: "FX-2004",
    customerName: "BlueOcean Logistics",
    dueAmount: 210000,
    priorityScore: 88,
    slaDeadline: "2026-01-30",
    callMadeDays: ["Tue", "Thu"],
    homeVisitDone: true,
    lastEmailSent: "2026-01-25"
  },
  {
    caseId: "FX-2005",
    customerName: "GreenLeaf Supplies",
    dueAmount: 56000,
    priorityScore: 66,
    slaDeadline: "2026-02-10",
    callMadeDays: ["Wed"],
    homeVisitDone: false,
    lastEmailSent: "2026-01-20"
  },
  {
    caseId: "FX-2006",
    customerName: "PrimeSteel Industries",
    dueAmount: 320000,
    priorityScore: 95,
    slaDeadline: "2026-01-28",
    callMadeDays: ["Mon", "Tue", "Thu"],
    homeVisitDone: true,
    lastEmailSent: "2026-01-27"
  },
  {
    caseId: "FX-2007",
    customerName: "Nova Retail Pvt Ltd",
    dueAmount: 118000,
    priorityScore: 82,
    slaDeadline: "2026-02-01",
    callMadeDays: ["Fri"],
    homeVisitDone: false,
    lastEmailSent: "2026-01-23"
  },
  {
    caseId: "FX-2008",
    customerName: "Orion Manufacturing",
    dueAmount: 275000,
    priorityScore: 90,
    slaDeadline: "2026-01-31",
    callMadeDays: ["Mon", "Wed"],
    homeVisitDone: true,
    lastEmailSent: "2026-01-26"
  },
  {
    caseId: "FX-2009",
    customerName: "Vega Electronics",
    dueAmount: 134000,
    priorityScore: 77,
    slaDeadline: "2026-02-06",
    callMadeDays: ["Tue"],
    homeVisitDone: false,
    lastEmailSent: "2026-01-21"
  },
  {
    caseId: "FX-2010",
    customerName: "Atlas Global Services",
    dueAmount: 198500,
    priorityScore: 85,
    slaDeadline: "2026-02-03",
    callMadeDays: ["Thu", "Fri"],
    homeVisitDone: true,
    lastEmailSent: "2026-01-24"
  }
];

/* ---------------- COMPONENT ---------------- */
export default function AssignedCases() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    // simulate API delay
    const t = setTimeout(() => {
      setRows(MOCK_CASES);
      setLoading(false);
    }, 800);

    return () => clearTimeout(t);
  }, []);

  if (loading) return <PiggyBankLoader label="Loading assigned cases…" />;

  return (
    <div className="d-flex flex-column gap-3">

      {/* HEADER */}
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <img src={fedexLogo} alt="FedEx" style={{ height: 36 }} />
          <div>
            <h3 className="mb-1">Assigned Cases</h3>
            <div className="muted">All cases assigned to this DCA member.</div>
          </div>
        </div>

        <Link className="btn btn-outline-secondary" to="/dca/dashboard">
          Back to Dashboard
        </Link>
      </div>

      {/* TABLE */}
      <div className="card app-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Customer Name</th>
                  <th>Due Amount</th>
                  <th>Priority Score</th>
                  <th>SLA Deadline</th>
                  <th>Call Made (days)</th>
                  <th>Home Visit</th>
                  <th>Last Email</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.caseId}>
                    <td className="fw-semibold">{r.caseId}</td>
                    <td>
                      <button
                        className="btn btn-link p-0 fw-semibold"
                        onClick={() =>
                          nav(`/dca/case-details/${r.caseId}`)
                        }
                      >
                        {r.customerName}
                      </button>
                    </td>
                    <td>{moneyFmt(r.dueAmount)}</td>
                    <td>{r.priorityScore}</td>
                    <td>{dateFmt(r.slaDeadline)}</td>
                    <td>{r.callMadeDays.join(", ")}</td>
                    <td>{r.homeVisitDone ? "Done" : "No"}</td>
                    <td>{dateFmt(r.lastEmailSent)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
}
