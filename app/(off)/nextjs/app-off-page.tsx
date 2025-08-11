/** [OFF] nextjs/off-page (App Router) */
"use client";
import { useEffect, useState } from "react";

async function fetchUsersMock(signal) {
  await new Promise(r => setTimeout(r, 600));
  return [{ id: 1, name: "Ada" }, { id: 2, name: "Linus" }];
}

export default function OffPage() {
  const [users, setUsers] = useState([]);
  const [q, setQ] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    setIsLoading(true);
    fetchUsersMock(ctrl.signal).then(setUsers).finally(()=>setIsLoading(false));
    return () => ctrl.abort();
  }, []);

  const filtered = users.filter(u => u.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <main style={{ fontFamily: "ui-sans-serif, system-ui", padding: 16 }}>
      <h1>[OFF] Next.js – Users filter</h1>
      <p style={{ color:"#64748b" }}>Một trang duy nhất: UI + fetch + filter.</p>
      <input
        placeholder="Tìm tên…"
        value={q}
        onChange={(e)=>setQ(e.target.value)}
        style={{ padding:8, borderRadius:8, border:"1px solid #cbd5e1", minWidth:260 }}
      />
      {isLoading ? <p>Đang tải…</p> : (
        <ul>{filtered.map(u => <li key={u.id}>{u.name}</li>)}</ul>
      )}
      <section style={{marginTop:16, padding:12, border:"1px dashed #cbd5e1", borderRadius:12}}>
        <h2>Notes</h2>
        <ul>
          <li>ONE FILE: file này đủ UI/state/effects cơ bản để luyện tay.</li>
          <li>Prod: tách hooks, services, UI thành module riêng.</li>
        </ul>
      </section>
    </main>
  );
}
