import React from "react";
import { Link, useParams } from "react-router-dom";

/* ✅ FULL DATASET (FX-2001 → FX-2010) */
const CASES = [
  {
    caseId: "FX-2001",
    customerId: "CUST-1001",
    customerName: "Delta Foods",
    dcaStaffName: "Ramesh Kumar",
    slaStatus: "On Track",
    city: "Chennai",
    phone: "9876543210",
    email: "finance@deltafoods.com",
    notes: "Calls made on Mon, Thu. Awaiting payment."
  },
  {
    caseId: "FX-2002",
    customerId: "CUST-1002",
    customerName: "Evergreen Exports",
    dcaStaffName: "Suresh B",
    slaStatus: "At Risk",
    city: "Bangalore",
    phone: "9845012345",
    email: "accounts@evergreenexports.com",
    notes: "Home visit done. Partial payment expected."
  },
  {
    caseId: "FX-2003",
    customerId: "CUST-1003",
    customerName: "Sunrise Traders",
    dcaStaffName: "Anita Rao",
    slaStatus: "On Track",
    city: "Hyderabad",
    phone: "9123456789",
    email: "sunrise@traders.com",
    notes: "Single follow-up call completed."
  },
  {
    caseId: "FX-2004",
    customerId: "CUST-1004",
    customerName: "BlueOcean Logistics",
    dcaStaffName: "Karthik S",
    slaStatus: "At Risk",
    city: "Mumbai",
    phone: "9988776655",
    email: "billing@blueocean.com",
    notes: "Multiple calls + home visit completed."
  },
  {
    caseId: "FX-2005",
    customerId: "CUST-1005",
    customerName: "GreenLeaf Supplies",
    dcaStaffName: "Divya N",
    slaStatus: "On Track",
    city: "Coimbatore",
    phone: "9786541230",
    email: "support@greenleaf.com",
    notes: "Low priority. One call completed."
  },
  {
    caseId: "FX-2006",
    customerId: "CUST-1006",
    customerName: "PrimeSteel Industries",
    dcaStaffName: "Ravi Teja",
    slaStatus: "At Risk",
    city: "Pune",
    phone: "9090909090",
    email: "finance@primesteel.com",
    notes: "High value case. Home visit done."
  },
  {
    caseId: "FX-2007",
    customerId: "CUST-1007",
    customerName: "Nova Retail Pvt Ltd",
    dcaStaffName: "Sneha Iyer",
    slaStatus: "On Track",
    city: "Chennai",
    phone: "9955443322",
    email: "nova@retail.com",
    notes: "Email follow-up sent."
  },
  {
    caseId: "FX-2008",
    customerId: "CUST-1008",
    customerName: "Orion Manufacturing",
    dcaStaffName: "Vijay Kumar",
    slaStatus: "At Risk",
    city: "Trichy",
    phone: "9443322110",
    email: "orion@manufacturing.com",
    notes: "Calls made Mon, Wed. Awaiting response."
  },
  {
    caseId: "FX-2009",
    customerId: "CUST-1009",
    customerName: "Vega Electronics",
    dcaStaffName: "Arjun P",
    slaStatus: "On Track",
    city: "Salem",
    phone: "9887766554",
    email: "vega@electronics.com",
    notes: "Customer cooperative."
  },
  {
    caseId: "FX-2010",
    customerId: "CUST-1010",
    customerName: "Atlas Global Services",
    dcaStaffName: "Meena S",
    slaStatus: "At Risk",
    city: "Delhi",
    phone: "9001122334",
    email: "atlas@global.com",
    notes: "Home visit done. Final reminder sent."
  }
];

/* ✅ SAFE LOOKUP MAP */
const CASE_MAP = CASES.reduce((acc, c) => {
  acc[c.caseId] = c;
  return acc;
}, {});

export default function CaseDetails() {
  const { id } = useParams();
  const data = CASE_MAP[id];

  return (
    <div className="d-flex flex-column gap-3">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h3 className="mb-1">Case Details</h3>
          <div className="text-muted">
            Detailed view for customer and SLA status.
          </div>
        </div>

        <Link to="/dca/assigned-cases" className="btn btn-outline-secondary">
          Back to Assigned Cases
        </Link>
      </div>

      {!data && (
        <div className="alert alert-danger">
          Case not found for ID: <b>{id}</b>
        </div>
      )}

      {data && (
        <div className="card app-card">
          <div className="card-body">

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="small text-muted">Customer ID</div>
                <div className="fw-semibold">{data.customerId}</div>
              </div>
              <div className="col-md-6">
                <div className="small text-muted">Customer Name</div>
                <div className="fw-semibold">{data.customerName}</div>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <div className="small text-muted">DCA Staff Name</div>
                <div>{data.dcaStaffName}</div>
              </div>
              <div className="col-md-6">
                <div className="small text-muted">SLA Status</div>
                <div className="fw-semibold">{data.slaStatus}</div>
              </div>
            </div>

            <hr />

            <h6 className="mb-3">Additional Details</h6>

            <div className="row mb-2">
              <div className="col-md-4">
                <div className="small text-muted">City</div>
                <div>{data.city}</div>
              </div>
              <div className="col-md-4">
                <div className="small text-muted">Phone</div>
                <div>{data.phone}</div>
              </div>
              <div className="col-md-4">
                <div className="small text-muted">Email</div>
                <div>{data.email}</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="small text-muted">Notes</div>
              <div>{data.notes}</div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
