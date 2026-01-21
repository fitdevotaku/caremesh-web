import { useMemo, useState } from "react";
import { MOCK_MEDICATIONS } from "./mock";
import type { Medication } from "./types";

/**
 * Data source contract for Browse.
 * Partners can replace this with an adapter that fetches real data.
 */
export type BrowseDataSource = {
  searchMedications: (input: { query: string }) => Promise<Medication[]>;
};

/**
 * Default data source for local development.
 * Uses mock data, but still respects the async contract.
 */
const mockDataSource: BrowseDataSource = {
  async searchMedications({ query }) {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_MEDICATIONS;

    return MOCK_MEDICATIONS.filter((m) => m.name.toLowerCase().includes(q));
  },
};

function availabilityLabel(a: Medication["availability"]) {
  if (a === "available") return "Available nearby";
  if (a === "unavailable") return "Not available nearby";
  return "Availability unknown";
}

export function BrowseFeature() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [results, setResults] = useState<Medication[]>(MOCK_MEDICATIONS);
  const [isSearching, setIsSearching] = useState(false);

  const selected = useMemo(() => {
    if (!selectedId) return null;
    return results.find((m) => m.id === selectedId) ?? null;
  }, [selectedId, results]);

  async function onSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setIsSearching(true);
    try {
      const meds = await mockDataSource.searchMedications({ query });
      setResults(meds);

      const stillExists = meds.some((m) => m.id === selectedId);
      if (!stillExists) setSelectedId(null);
    } finally {
      setIsSearching(false);
    }
  }

  return (
    <section style={{ maxWidth: 800, margin: "0 auto", padding: 16 }}>
      <h1 style={{ margin: 0 }}>Browse medications</h1>

      <p style={{ marginTop: 8, opacity: 0.8 }}>
        Read only access. Ordering requires an account.
      </p>

      <form onSubmit={onSearchSubmit} style={{ marginTop: 12 }}>
        <label style={{ display: "block" }}>
          Search by name
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Try ibuprofen"
              style={{ flex: 1, padding: 10 }}
            />
            <button type="submit" style={{ padding: "10px 14px" }}>
              {isSearching ? "Searching" : "Search"}
            </button>
          </div>
        </label>
      </form>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          marginTop: 16,
        }}
      >
        <div>
          <h2 style={{ marginTop: 0 }}>Results</h2>

          {results.length === 0 ? (
            <p>No matches.</p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {results.map((m) => {
                const active = m.id === selectedId;

                return (
                  <li key={m.id} style={{ marginBottom: 8 }}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(m.id)}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        padding: 10,
                        borderRadius: 8,
                        border: "1px solid #ccc",
                        background: active ? "#e5e7eb" : "white",
                        color: "#111",
                        cursor: "pointer",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{m.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>
                        {availabilityLabel(m.availability)}
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div>
          <h2 style={{ marginTop: 0 }}>Details</h2>

          {!selected ? (
            <p>Select a medication to read more.</p>
          ) : (
            <article style={{ border: "1px solid #ccc", borderRadius: 8, padding: 12 }}>
              <div style={{ fontWeight: 700 }}>{selected.name}</div>

              <p style={{ marginTop: 8 }}>{selected.description}</p>

              <p style={{ marginTop: 8, fontSize: 13, opacity: 0.85 }}>
                {availabilityLabel(selected.availability)}
                {selected.pharmacyName ? `, ${selected.pharmacyName}` : ""}
                {typeof selected.distanceMiles === "number"
                  ? `, ${selected.distanceMiles.toFixed(1)} mi`
                  : ""}
              </p>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}
