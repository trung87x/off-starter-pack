/** [OFF] react/use-debounce */
import { useEffect, useState } from "react";

function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function OffUseDebounce() {
  const [q, setQ] = useState("");
  const debounced = useDebouncedValue(q, 500);
  const [log, setLog] = useState([]);
  useEffect(() => {
    setLog((l) => [...l, `🔎 query: "${debounced}"`]);
  }, [debounced]);

  return (
    <div style={{ fontFamily: "ui-sans-serif, system-ui", padding: 16 }}>
      <h1>[OFF] React – useDebounce</h1>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Type nhanh để thấy debounce"
        style={{ padding: 8, borderRadius: 8, border: "1px solid #ccc", minWidth: 280 }}
      />
      <pre>{log.join("\n")}</pre>
    </div>
  );
}
