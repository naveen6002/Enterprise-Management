import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material';
import FedExLogo from '../common/FedExLogo.jsx';
import { api } from '../../services/api.js';

function moneyFmt(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

function slaBadge(remainingDays) {
  if (remainingDays == null) return 'badge text-bg-secondary';
  if (remainingDays < 0) return 'badge text-bg-danger';
  if (remainingDays <= 3) return 'badge text-bg-warning';
  return 'badge text-bg-success';
}

export default function MonitorCases() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState('');

  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getMonitorCases();
        if (!alive) return;

        const baseRows = Array.isArray(data) ? data : [];

        // ✅ 7 MORE DEMO CUSTOMERS (SAME STRUCTURE)
        const demoRows = [
          {
            caseId: 'CASE-C-004',
            customerId: 'C-004',
            overallAmount: 150000,
            amountPaid: 50000,
            amountLeft: 100000,
            slaRemainingDays: 4,
            priorityScore: 75,
            actions: { callDays: ['Mon'], emailLastSent: true, visitDone: false }
          },
          {
            caseId: 'CASE-C-005',
            customerId: 'C-005',
            overallAmount: 90000,
            amountPaid: 90000,
            amountLeft: 0,
            slaRemainingDays: 8,
            priorityScore: 40,
            actions: { callDays: [], emailLastSent: true, visitDone: true }
          },
          {
            caseId: 'CASE-C-006',
            customerId: 'C-006',
            overallAmount: 120000,
            amountPaid: 30000,
            amountLeft: 90000,
            slaRemainingDays: 2,
            priorityScore: 68,
            actions: { callDays: ['Tue'], emailLastSent: false, visitDone: false }
          },
          {
            caseId: 'CASE-C-007',
            customerId: 'C-007',
            overallAmount: 200000,
            amountPaid: 100000,
            amountLeft: 100000,
            slaRemainingDays: -1,
            priorityScore: 82,
            actions: { callDays: ['Fri'], emailLastSent: true, visitDone: true }
          },
          {
            caseId: 'CASE-C-008',
            customerId: 'C-008',
            overallAmount: 60000,
            amountPaid: 15000,
            amountLeft: 45000,
            slaRemainingDays: 6,
            priorityScore: 58,
            actions: { callDays: ['Wed'], emailLastSent: false, visitDone: false }
          },
          {
            caseId: 'CASE-C-009',
            customerId: 'C-009',
            overallAmount: 180000,
            amountPaid: 0,
            amountLeft: 180000,
            slaRemainingDays: -3,
            priorityScore: 90,
            actions: { callDays: ['Mon', 'Thu'], emailLastSent: true, visitDone: false }
          },
          {
            caseId: 'CASE-C-010',
            customerId: 'C-010',
            overallAmount: 50000,
            amountPaid: 25000,
            amountLeft: 25000,
            slaRemainingDays: 1,
            priorityScore: 65,
            actions: { callDays: ['Tue'], emailLastSent: true, visitDone: false }
          }
        ];

        setRows([...baseRows, ...demoRows]);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load monitor cases.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <FedExLogo label="Monitoring cases… (loading)" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div>
          <h3 className="mb-1">Monitor Cases</h3>
          <div className="muted">
            Customer payment progress, SLA status, and actions (phone/email/visit).
          </div>
        </div>
        <Link className="btn btn-outline-secondary" to="/fedex/dashboard">
          Back to Dashboard
        </Link>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card app-card">
        <div className="card-body table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th>Customer ID</th>
                <th>Overall Amount</th>
                <th>Paid Status</th>
                <th>SLA Status</th>
                <th>Priority Score</th>
                <th>Phone / Email / Visit</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.caseId}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActive(r);
                    setOpen(true);
                  }}
                >
                  <td className="fw-semibold">{r.customerId}</td>
                  <td>{moneyFmt(r.overallAmount)}</td>
                  <td>
                    <div className="d-flex flex-column">
                      <span className="small">
                        Paid: <b>{moneyFmt(r.amountPaid)}</b>
                      </span>
                      <span className="small muted">
                        Left: <b>{moneyFmt(r.amountLeft)}</b>
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className={slaBadge(r.slaRemainingDays)}>
                      {r.slaRemainingDays < 0
                        ? 'Breached'
                        : r.slaRemainingDays <= 3
                        ? `At Risk (${r.slaRemainingDays} days)`
                        : `On Time (${r.slaRemainingDays} days)`}
                    </span>
                  </td>
                  <td>{r.priorityScore}</td>
                  <td>
                    <div className="d-flex flex-wrap gap-2">
                      <span className="badge text-bg-primary">
                        Calls: {(r.actions?.callDays || []).join(', ') || '—'}
                      </span>
                      <span className="badge text-bg-info">
                        Email: {r.actions?.emailLastSent ? 'Sent' : '—'}
                      </span>
                      <span className="badge text-bg-secondary">
                        Visit: {r.actions?.visitDone ? 'Done' : 'Not yet'}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center muted py-4">
                    No monitor cases found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Case Details</DialogTitle>
        <DialogContent dividers>
          {active && (
            <div className="d-flex flex-column gap-2">
              <div><b>Customer ID:</b> {active.customerId}</div>
              <div><b>Case ID:</b> {active.caseId}</div>
              <div><b>Overall Amount:</b> {moneyFmt(active.overallAmount)}</div>
              <div><b>Amount Paid:</b> {moneyFmt(active.amountPaid)}</div>
              <div><b>Amount Left:</b> {moneyFmt(active.amountLeft)}</div>
              <div><b>Priority Score:</b> {active.priorityScore}</div>
              <div><b>SLA Remaining Days:</b> {active.slaRemainingDays}</div>
              <div><b>Calls:</b> {(active.actions?.callDays || []).join(', ') || '—'}</div>
              <div><b>Email Sent:</b> {active.actions?.emailLastSent ? 'Yes' : 'No'}</div>
              <div><b>Visit Done:</b> {active.actions?.visitDone ? 'Yes' : 'No'}</div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
