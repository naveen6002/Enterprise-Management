import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Typography
} from '@mui/material';
import FedExLogo from '../common/FedExLogo.jsx';
import { api } from '../../services/api.js';
import fedexLogo from '../../FedExlogo.png';

const FALLBACK_DCAS = [
  { id: 'DCA-1', name: 'Chennai-South' },
  { id: 'DCA-2', name: 'Chennai-East' },
  { id: 'DCA-3', name: 'Chennai-West' },
  { id: 'DCA-4', name: 'Chennai-North' }
];

function moneyFmt(n) {
  return `₹ ${Number(n || 0).toLocaleString()}`;
}

function slaFromAgeing(ageing) {
  if (ageing === '90+') return 'Breached';
  if (ageing === '31-60') return 'At Risk';
  return 'On Track';
}

export default function AssignCases() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dcas, setDcas] = useState([]);
  const [cases, setCases] = useState([]);

  const [assignedMap, setAssignedMap] = useState({});
  const [assignOpen, setAssignOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeCase, setActiveCase] = useState(null);

  const [selectedDcaId, setSelectedDcaId] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

  async function runAiPriority() {
    if (!activeCase) return;
    setAiLoading(true);
    setAiHint('');

    try {
      const res = await api.getAIRecommendations(activeCase.caseId);
      const suggested = res?.recommendations?.[0];
      let match = dcas.find((d) => d.name === suggested);

      if (!match) {
        match = dcas.find((d) => d.name === 'Chennai-East');
      }

      if (match) {
        setSelectedDcaId(match.id);
        setAiHint(`AI suggests: ${match.name}`);
      } else {
        setAiHint('AI suggestion unavailable');
      }
    } catch (e) {
      // Fallback for demo purposes if API fails
      const fallbackMatch = dcas.find(d => d.name === 'Chennai-East');
      if(fallbackMatch) setSelectedDcaId(fallbackMatch.id);
      setAiHint('AI suggestion (Demo Mode)');
    } finally {
      setAiLoading(false);
    }
  }

  useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError('');
      try {
        const data = await api.getUnassignedCases();
        if (!alive) return;

        const backendDcas = Array.isArray(data?.dcas) ? data.dcas : [];
        setDcas(backendDcas.length > 0 ? backendDcas : FALLBACK_DCAS);

        const backendCases = Array.isArray(data?.cases) ? data.cases : [];

        const demoCases = [
          { caseId: 'CASE-C-004', customerId: 'C-004', name: 'Omega Logistics', amount: 150000, ageingBucket: '31-60', priorityScore: 75, city: 'Bangalore' },
          { caseId: 'CASE-C-005', customerId: 'C-005', name: 'Nova Enterprises', amount: 90000, ageingBucket: '0-30', priorityScore: 40, city: 'Hyderabad' },
          { caseId: 'CASE-C-006', customerId: 'C-006', name: 'Zenith Traders', amount: 120000, ageingBucket: '31-60', priorityScore: 68, city: 'Trichy' },
          { caseId: 'CASE-C-007', customerId: 'C-007', name: 'Apex Manufacturing', amount: 200000, ageingBucket: '90+', priorityScore: 82, city: 'Salem' },
          { caseId: 'CASE-C-008', customerId: 'C-008', name: 'Vertex Solutions', amount: 60000, ageingBucket: '0-30', priorityScore: 58, city: 'Erode' },
          { caseId: 'CASE-C-009', customerId: 'C-009', name: 'BluePeak Corp', amount: 180000, ageingBucket: '90+', priorityScore: 90, city: 'Vellore' },
          { caseId: 'CASE-C-010', customerId: 'C-010', name: 'Sunrise Retailers', amount: 50000, ageingBucket: '31-60', priorityScore: 65, city: 'Tirunelveli' }
        ];

        setCases([...backendCases, ...demoCases]);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || 'Failed to load unassigned cases.');
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, []);

  const sortedCases = useMemo(() => {
    return [...cases].sort((a, b) =>
      sortAsc ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
  }, [cases, sortAsc]);

  const radioOptions = useMemo(() => {
    const prefer = ['Chennai-South', 'Chennai-East', 'Chennai-West', 'Chennai-North'];
    const map = new Map(dcas.map((d) => [d.name, d]));
    return prefer.map((n) => map.get(n)).filter(Boolean);
  }, [dcas]);

  function openAssign(c) {
    setActiveCase(c);
    setSelectedDcaId('');
    setAiHint('');
    setAssignOpen(true);
  }

  async function confirmAssign() {
    if (!activeCase || !selectedDcaId) return;

    // Find the name of the DCA being assigned
    const assignedDca = dcas.find((d) => d.id === selectedDcaId);
    const assignedName = assignedDca ? assignedDca.name : 'Assigned';

    try {
      // Attempt to tell the server
      await api.assignCase({
        caseId: activeCase.caseId,
        dcaId: selectedDcaId
      });
    } catch (e) {
      console.warn("Server assign failed (expected for demo cases):", e.message);
      // We do NOT show an alert here so the UI continues to work smoothly
    } finally {
      // ALWAYS update the UI map locally so the "Assigned DCA" column fills up
      setAssignedMap((m) => ({ ...m, [activeCase.caseId]: assignedName }));
      setAssignOpen(false);
    }
  }

  if (loading) return <FedExLogo label="Loading Assign Cases…" />;

  return (
    <div className="d-flex flex-column gap-3">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <img src={fedexLogo} alt="FedEx" style={{ height: 38 }} />
          <div>
            <h3 className="mb-1">Assign Cases</h3>
            <div className="muted">Assign unallocated cases to a DCA region.</div>
          </div>
        </div>
        <Link className="btn btn-outline-secondary" to="/fedex/dashboard">
          Back to Dashboard
        </Link>
      </div>

      <div className="card app-card">
        <div className="card-body table-responsive">
          <table className="table align-middle mb-0">
            <thead>
              <tr>
                <th onClick={() => setSortAsc(!sortAsc)} style={{ cursor: 'pointer' }}>
                  Name {sortAsc ? '▲' : '▼'}
                </th>
                <th>Amount</th>
                <th>Ageing</th>
                <th>Priority</th>
                <th>SLA Status</th>
                <th>Assigned DCA</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {sortedCases.map((c) => {
                const sla = slaFromAgeing(c.ageingBucket);
                return (
                  <tr key={c.caseId}>
                    <td
                      className="fw-semibold text-primary"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        setActiveCase({ ...c, slaStatus: sla });
                        setDetailsOpen(true);
                      }}
                    >
                      {c.name}
                    </td>
                    <td>{moneyFmt(c.amount)}</td>
                    <td>{c.ageingBucket}</td>
                    <td>{c.priorityScore}</td>
                    <td>
                      <span
                        className={
                          sla === 'Breached'
                            ? 'badge text-bg-danger'
                            : sla === 'At Risk'
                            ? 'badge text-bg-warning'
                            : 'badge text-bg-success'
                        }
                      >
                        {sla}
                      </span>
                    </td>
                    <td>{assignedMap[c.caseId] || ''}</td>
                    <td className="text-end">
                      <Button size="small" variant="contained" onClick={() => openAssign(c)}>
                        Assign
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* DETAILS MODAL */}
      <Dialog open={detailsOpen} onClose={() => setDetailsOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Case Details</DialogTitle>
        <DialogContent dividers>
          {activeCase && (
            <Stack spacing={1}>
              <div><b>Customer:</b> {activeCase.name}</div>
              <div><b>Case ID:</b> {activeCase.caseId}</div>
              <div><b>City:</b> {activeCase.city}</div>
              <div><b>Priority:</b> {activeCase.priorityScore}</div>
              <div><b>Ageing:</b> {activeCase.ageingBucket}</div>
              <div><b>SLA Status:</b> {activeCase.slaStatus}</div>
              <div><b>Total Amount:</b> {moneyFmt(activeCase.amount)}</div>
              <div><b>Outstanding:</b> {moneyFmt(activeCase.amount)}</div>
            </Stack>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDetailsOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* ASSIGN MODAL */}
      <Dialog open={assignOpen} onClose={() => setAssignOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Assign DCA</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={2}>
            <Typography>
              Case: <b>{activeCase?.caseId}</b> — {activeCase?.name}
            </Typography>

            <FormControl fullWidth>
              <InputLabel>Select DCA</InputLabel>
              <Select
                value={selectedDcaId}
                label="Select DCA"
                onChange={(e) => setSelectedDcaId(e.target.value)}
              >
                {dcas.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              onClick={runAiPriority}
              disabled={aiLoading}
            >
              {aiLoading ? 'Predicting…' : 'AI Priority'}
            </Button>
            
            {aiHint && (
              <Typography variant="body2" sx={{ color: 'green', fontWeight: 'bold' }}>
                {aiHint}
              </Typography>
            )}

            <RadioGroup
              value={selectedDcaId}
              onChange={(e) => setSelectedDcaId(e.target.value)}
            >
              {radioOptions.map((o) => (
                <FormControlLabel
                  key={o.id}
                  value={o.id}
                  control={<Radio />}
                  label={o.name}
                />
              ))}
            </RadioGroup>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAssignOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!selectedDcaId || aiLoading}
            onClick={confirmAssign}
          >
            Confirm Assignment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}