import { useEffect, useState } from "react";

export default function Violations() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchData = () => {
      fetch("http://127.0.0.1:8000/api/violations/")
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP ${r.status}`);
          return r.json();
        })
        .then(setItems)
        .catch((e) => setErr(String(e)));
    };

    fetchData();
    const interval = setInterval(fetchData, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Violations</h2>

      {err && <p style={{ color: "red" }}>{err}</p>}

      <table border="1" cellPadding="8" style={{ marginTop: 12, width: "100%" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Plate</th>
            <th>Type</th>
            <th>Fine</th>
            <th>Location</th>
            <th>Status</th>
            <th>Evidence</th>
            <th>Created</th>
          </tr>
        </thead>

        <tbody>
          {items.map((v) => (
            <tr key={v.id}>
              <td>{v.id}</td>
              <td>{v.vehicle_plate}</td>
              <td>{v.violation_type}</td>
              <td>{v.fine_amount}</td>
              <td>{v.location}</td>
              <td>{v.status}</td>

              {/* ✅ Evidence image */}
              <td>
                {v.evidence_url ? (
                  <a
                    href={`http://127.0.0.1:8000${v.evidence_url}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`http://127.0.0.1:8000${v.evidence_url}`}
                      alt="evidence"
                      style={{
                        width: 120,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: 4,
                        cursor: "pointer",
                      }}
                    />
                  </a>
                ) : (
                  "-"
                )}
              </td>

              <td>{new Date(v.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
