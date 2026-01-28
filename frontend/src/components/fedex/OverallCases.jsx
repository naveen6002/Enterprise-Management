import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../common/LoadingSpinner.jsx';
import { api } from '../../services/api.js';

function money(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

function ageingFromPriority(p) {
  if (p >= 80) return '90+';
  if (p >= 60) return '31-60';
  return '0-30';
}

export default function OverallCases() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    let alive = true;

    (async () => {
      setLoading(true);
      setError('');

      try {
        const apiData = await api.getOverallCases();
        if (!alive) return;

        const baseRows = (Array.isArray(apiData) ? apiData : []).map((r) => {
          const outstanding = Number(r.outstandingAmount || 0);
          const paid = Number(r.amountPaid || 0);
          const total = outstanding + paid;
          const pct = total > 0 ? Math.round((paid / total) * 100) : 0;

          return {
            customerId: r.customerId,
            customerName: r.customerName,
            invoiceId: `INV-${r.customerId}`,
            caseId: `CASE-${r.customerId}`,
            city: r.city,

            totalAmount: total,
            amountPaid: paid,
            outstandingAmount: outstanding,

            caseStatus: outstanding > 0 ? 'In Progress' : 'Closed',
            priorityScore: r.priorityScore,
            ageingBucket: ageingFromPriority(r.priorityScore),
            assignedDca: 'Unassigned',
            lastAction: 'Case Created',

            paymentPercentage: pct,
            paidAmount: paid,
            remainingAmount: outstanding
          };
        });

        // ✅ ADD 7 MORE CUSTOMERS (FIXED DEMO DATA)
        const demoRows = [
          {
            customerId: 'C-004',
            customerName: 'Omega Logistics',
            invoiceId: 'INV-C-004',
            caseId: 'CASE-C-004',
            city: 'Bangalore',
            totalAmount: 150000,
            amountPaid: 50000,
            outstandingAmount: 100000,
            caseStatus: 'In Progress',
            priorityScore: 75,
            ageingBucket: '31-60',
            assignedDca: 'Chennai-East',
            lastAction: 'Call Follow-up',
            paymentPercentage: 33,
            paidAmount: 50000,
            remainingAmount: 100000
          },
          {
            customerId: 'C-005',
            customerName: 'Nova Enterprises',
            invoiceId: 'INV-C-005',
            caseId: 'CASE-C-005',
            city: 'Hyderabad',
            totalAmount: 90000,
            amountPaid: 90000,
            outstandingAmount: 0,
            caseStatus: 'Closed',
            priorityScore: 40,
            ageingBucket: '0-30',
            assignedDca: 'Chennai-South',
            lastAction: 'Payment Received',
            paymentPercentage: 100,
            paidAmount: 90000,
            remainingAmount: 0
          },
          {
            customerId: 'C-006',
            customerName: 'Zenith Traders',
            invoiceId: 'INV-C-006',
            caseId: 'CASE-C-006',
            city: 'Trichy',
            totalAmount: 120000,
            amountPaid: 30000,
            outstandingAmount: 90000,
            caseStatus: 'In Progress',
            priorityScore: 68,
            ageingBucket: '31-60',
            assignedDca: 'Chennai-West',
            lastAction: 'Email Sent',
            paymentPercentage: 25,
            paidAmount: 30000,
            remainingAmount: 90000
          },
          {
            customerId: 'C-007',
            customerName: 'Apex Manufacturing',
            invoiceId: 'INV-C-007',
            caseId: 'CASE-C-007',
            city: 'Salem',
            totalAmount: 200000,
            amountPaid: 100000,
            outstandingAmount: 100000,
            caseStatus: 'In Progress',
            priorityScore: 82,
            ageingBucket: '90+',
            assignedDca: 'Chennai-North',
            lastAction: 'Home Visit',
            paymentPercentage: 50,
            paidAmount: 100000,
            remainingAmount: 100000
          },
          {
            customerId: 'C-008',
            customerName: 'Vertex Solutions',
            invoiceId: 'INV-C-008',
            caseId: 'CASE-C-008',
            city: 'Erode',
            totalAmount: 60000,
            amountPaid: 15000,
            outstandingAmount: 45000,
            caseStatus: 'In Progress',
            priorityScore: 58,
            ageingBucket: '0-30',
            assignedDca: 'Chennai-East',
            lastAction: 'Reminder Sent',
            paymentPercentage: 25,
            paidAmount: 15000,
            remainingAmount: 45000
          },
          {
            customerId: 'C-009',
            customerName: 'BluePeak Corp',
            invoiceId: 'INV-C-009',
            caseId: 'CASE-C-009',
            city: 'Vellore',
            totalAmount: 180000,
            amountPaid: 0,
            outstandingAmount: 180000,
            caseStatus: 'In Progress',
            priorityScore: 90,
            ageingBucket: '90+',
            assignedDca: 'Chennai-South',
            lastAction: 'Case Escalated',
            paymentPercentage: 0,
            paidAmount: 0,
            remainingAmount: 180000
          },
          {
            customerId: 'C-010',
            customerName: 'Sunrise Retailers',
            invoiceId: 'INV-C-010',
            caseId: 'CASE-C-010',
            city: 'Tirunelveli',
            totalAmount: 50000,
            amountPaid: 25000,
            outstandingAmount: 25000,
            caseStatus: 'In Progress',
            priorityScore: 65,
            ageingBucket: '31-60',
            assignedDca: 'Chennai-West',
            lastAction: 'Partial Payment',
            paymentPercentage: 50,
            paidAmount: 25000,
            remainingAmount: 25000
          }
        ];

        setRows([...baseRows, ...demoRows]);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load overall cases.');
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <LoadingSpinner label="Loading overall cases…" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Overall Cases</h3>
          <div className="muted">All customers and current case posture.</div>
        </div>
        <Link className="btn btn-outline-secondary" to="/fedex/dashboard">
          Back to Dashboard
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card app-card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Invoice</th>
                  <th>Case</th>
                  <th>City</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Outstanding</th>
                  <th>Status</th>
                  <th>Priority</th>
                  <th>Ageing</th>
                  <th>DCA</th>
                  <th>Last Action</th>
                  <th>Payment %</th>
                  <th>Paid Amount</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.caseId}>
                    <td>{r.customerId}</td>
                    <td className="fw-semibold">{r.customerName}</td>
                    <td>{r.invoiceId}</td>
                    <td>{r.caseId}</td>
                    <td>{r.city}</td>
                    <td>{money(r.totalAmount)}</td>
                    <td>{money(r.amountPaid)}</td>
                    <td>{money(r.outstandingAmount)}</td>
                    <td>
                      <span
                        className={
                          r.caseStatus === 'Closed'
                            ? 'badge text-bg-success'
                            : 'badge text-bg-warning'
                        }
                      >
                        {r.caseStatus}
                      </span>
                    </td>
                    <td>{r.priorityScore}</td>
                    <td>{r.ageingBucket}</td>
                    <td>{r.assignedDca}</td>
                    <td>{r.lastAction}</td>
                    <td>
                      <div className="progress" style={{ height: 6 }}>
                        <div
                          className="progress-bar"
                          style={{ width: `${r.paymentPercentage}%` }}
                        />
                      </div>
                      <small>{r.paymentPercentage}%</small>
                    </td>
                    <td>{money(r.paidAmount)}</td>
                    <td>{money(r.remainingAmount)}</td>
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
