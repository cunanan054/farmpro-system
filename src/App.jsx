import { useState } from "react";

const data = {
  fertilizers: [
    { id: 1, name: "Urea (46-0-0)", type: "Nitrogen", form: "Granular", crops: ["Corn", "Wheat", "Rice"], rate: "100–200 kg/ha", timing: "Pre-plant / Side-dress", caution: "Avoid surface application before rain; volatilization risk.", icon: "🌱" },
    { id: 2, name: "DAP (18-46-0)", type: "N-P", form: "Granular", crops: ["Wheat", "Soybean", "Canola"], rate: "80–150 kg/ha", timing: "At planting", caution: "Keep away from seed; high salt index.", icon: "🌱" },
    { id: 3, name: "Muriate of Potash (0-0-60)", type: "Potassium", form: "Granular", crops: ["Potato", "Corn", "Cotton"], rate: "60–120 kg/ha", timing: "Pre-plant", caution: "High chloride; sensitive crops may react.", icon: "🌱" },
    { id: 4, name: "NPK 15-15-15", type: "Complete", form: "Granular", crops: ["Vegetables", "Fruit Trees", "Pasture"], rate: "150–250 kg/ha", timing: "Basal / Split", caution: "Monitor pH; avoid over-application.", icon: "🌿" },
    { id: 5, name: "Ammonium Sulfate (21-0-0-24S)", type: "N-S", form: "Granular", crops: ["Canola", "Onion", "Corn"], rate: "100–180 kg/ha", timing: "Pre-plant", caution: "Acidifies soil; check pH regularly.", icon: "🌿" },
    { id: 6, name: "Calcium Nitrate (15.5-0-0+19Ca)", type: "Calcium-N", form: "Soluble", crops: ["Tomato", "Pepper", "Lettuce"], rate: "5–10 kg/1000L", timing: "Fertigation", caution: "Do not mix with phosphate or sulfate.", icon: "🌿" },
    { id: 7, name: "Compost / Organic Manure", type: "Organic", form: "Bulk", crops: ["All crops"], rate: "5–20 t/ha", timing: "Pre-season", caution: "Test for pathogens; allow curing time.", icon: "♻️" },
  ],
  fungicides: [
    { id: 1, name: "Mancozeb 80% WP", group: "Multi-site (M3)", mode: "Protectant", targets: ["Early Blight", "Late Blight", "Downy Mildew"], crops: ["Potato", "Tomato", "Grape"], rate: "2–2.5 kg/ha", phi: "7 days", resistance: "Low risk", icon: "🍄" },
    { id: 2, name: "Azoxystrobin 25% SC", group: "Strobilurin (QoI)", mode: "Systemic", targets: ["Powdery Mildew", "Rust", "Anthracnose"], crops: ["Wheat", "Soybean", "Banana"], rate: "0.75–1 L/ha", phi: "14 days", resistance: "Moderate risk — rotate", icon: "🍄" },
    { id: 3, name: "Tebuconazole 25% EW", group: "Triazole (DMI)", mode: "Systemic", targets: ["Fusarium Head Blight", "Crown Rot", "Rust"], crops: ["Wheat", "Corn", "Soybean"], rate: "0.5–1 L/ha", phi: "21 days", resistance: "Moderate risk — rotate", icon: "🍄" },
    { id: 4, name: "Copper Hydroxide 50% WG", group: "Multi-site (M1)", mode: "Protectant", targets: ["Bacterial Blight", "Downy Mildew", "Canker"], crops: ["Citrus", "Vegetables", "Coffee"], rate: "1–2.5 kg/ha", phi: "0 days", resistance: "Very low risk", icon: "🟤" },
    { id: 5, name: "Propiconazole 25% EC", group: "Triazole (DMI)", mode: "Systemic", targets: ["Brown Rust", "Septoria", "Sheath Blight"], crops: ["Wheat", "Rice", "Corn"], rate: "0.5 L/ha", phi: "28 days", resistance: "Moderate risk", icon: "🍄" },
    { id: 6, name: "Chlorothalonil 75% WP", group: "Multi-site (M5)", mode: "Protectant", targets: ["Alternaria", "Botrytis", "Scab"], crops: ["Potato", "Vegetables", "Peanut"], rate: "1.5–2.5 kg/ha", phi: "14 days", resistance: "Very low risk", icon: "🟤" },
  ],
  pesticides: [
    { id: 1, name: "Chlorpyrifos 48% EC", group: "Organophosphate", targets: ["Aphids", "Mites", "Cutworms", "Borers"], crops: ["Corn", "Cotton", "Citrus"], rate: "1–2 L/ha", phi: "21 days", caution: "Highly toxic to bees; avoid bloom period.", icon: "🐛" },
    { id: 2, name: "Lambda-Cyhalothrin 5% EC", group: "Pyrethroid", targets: ["Thrips", "Whitefly", "Armyworm", "Beetles"], crops: ["Soybean", "Vegetables", "Fruit"], rate: "0.5–1 L/ha", phi: "14 days", caution: "Toxic to fish and aquatic organisms.", icon: "🐛" },
    { id: 3, name: "Imidacloprid 70% WG", group: "Neonicotinoid", targets: ["Whitefly", "Aphids", "Leafhoppers", "Thrips"], crops: ["Cotton", "Rice", "Vegetables"], rate: "70–100 g/ha", phi: "21 days", caution: "Highly toxic to bees; restrict use near flowering crops.", icon: "🐝" },
    { id: 4, name: "Abamectin 1.8% EC", group: "Avermectin", targets: ["Spider Mites", "Leafminers", "Thrips"], crops: ["Vegetables", "Fruit Trees", "Cotton"], rate: "0.5–1 L/ha", phi: "7 days", caution: "Toxic to beneficial insects; avoid direct sunlight after application.", icon: "🐛" },
    { id: 5, name: "Spinosad 48% SC", group: "Spinosyn", targets: ["Caterpillars", "Thrips", "Leafminers"], crops: ["Vegetables", "Fruits", "Cereals"], rate: "0.1–0.2 L/ha", phi: "3 days", caution: "Low toxicity to mammals; rotate to prevent resistance.", icon: "🌿" },
    { id: 6, name: "Glyphosate 48% SL", group: "Herbicide (EPSPS inhibitor)", targets: ["Broadleaf Weeds", "Grasses", "Sedges"], crops: ["All (non-selective)"], rate: "2–4 L/ha", phi: "N/A", caution: "Non-selective; protect desirable plants. No-spray buffer near water.", icon: "🌾" },
    { id: 7, name: "2,4-D Amine 72% SL", group: "Herbicide (Auxin mimic)", targets: ["Broadleaf Weeds"], crops: ["Corn", "Wheat", "Rice", "Pasture"], rate: "0.5–1.5 L/ha", phi: "N/A", caution: "Drift-sensitive; avoid near broadleaf crops and dicots.", icon: "🌾" },
  ],
  cropCalendar: [
    { month: "Jan", activities: ["Soil testing", "Land preparation", "Cool-season planting"], color: "#4ade80" },
    { month: "Feb", activities: ["Basal fertilization", "Transplanting seedlings", "Irrigation setup"], color: "#4ade80" },
    { month: "Mar", activities: ["Weed control", "First fungicide spray", "Top-dress N fertilizer"], color: "#facc15" },
    { month: "Apr", activities: ["Pest monitoring", "Insecticide application (if needed)", "Soil moisture check"], color: "#facc15" },
    { month: "May", activities: ["Canopy management", "Second fungicide spray", "Fruit/grain set monitoring"], color: "#fb923c" },
    { month: "Jun", activities: ["Harvest preparation", "Pre-harvest fungicide (if needed)", "PHI compliance check"], color: "#fb923c" },
    { month: "Jul", activities: ["Dry season irrigation", "Post-harvest soil amendment", "Cover crop planting"], color: "#f87171" },
    { month: "Aug", activities: ["Fallow / soil rest", "Lime application", "Equipment maintenance"], color: "#f87171" },
    { month: "Sep", activities: ["New season planning", "Seed procurement", "Crop rotation planning"], color: "#a78bfa" },
    { month: "Oct", activities: ["Land preparation", "Wet-season planting", "Basal fertilization"], color: "#a78bfa" },
    { month: "Nov", activities: ["Pest scouting", "Weed management", "Fertigation start"], color: "#34d399" },
    { month: "Dec", activities: ["Disease monitoring", "Pre-harvest checks", "Record keeping"], color: "#34d399" },
  ],
  weatherTips: [
    { condition: "Heavy Rain", tip: "Delay fertilizer application. Apply fungicides after rain stops.", icon: "🌧️" },
    { condition: "High Humidity >80%", tip: "Increase fungicide frequency. Monitor for Botrytis and Downy Mildew.", icon: "💧" },
    { condition: "Strong Wind >20 km/h", tip: "Suspend all spraying operations. Risk of drift.", icon: "💨" },
    { condition: "Drought / Dry Spell", tip: "Irrigate before applying granular fertilizer. Watch for spider mites.", icon: "☀️" },
    { condition: "Cool Temperature <15°C", tip: "Reduce fungicide rate. Soil nutrient uptake slows.", icon: "❄️" },
  ]
};

const tabs = ["🌱 Fertilizers", "🍄 Fungicides", "🐛 Pesticides", "📅 Crop Calendar", "⛅ Weather Tips"];

export default function FarmingSystem() {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [filterType, setFilterType] = useState("All");

  const getFertilizerTypes = () => ["All", ...new Set(data.fertilizers.map(f => f.type))];
  const getPesticideGroups = () => ["All", ...new Set(data.pesticides.map(p => p.group))];
  const getFungicideGroups = () => ["All", ...new Set(data.fungicides.map(f => f.group))];

  const filteredFertilizers = data.fertilizers.filter(f =>
    (filterType === "All" || f.type === filterType) &&
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.crops.some(c => c.toLowerCase().includes(search.toLowerCase())))
  );
  const filteredFungicides = data.fungicides.filter(f =>
    (filterType === "All" || f.group === filterType) &&
    (f.name.toLowerCase().includes(search.toLowerCase()) || f.targets.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );
  const filteredPesticides = data.pesticides.filter(p =>
    (filterType === "All" || p.group === filterType) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.targets.some(t => t.toLowerCase().includes(search.toLowerCase())))
  );

  const handleTabChange = (i) => { setActiveTab(i); setSearch(""); setFilterType("All"); setSelected(null); };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f2005 0%, #1a3a08 40%, #0d2b04 100%)",
      fontFamily: "'Georgia', 'Times New Roman', serif",
      color: "#e8f5e0",
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(90deg, #1b4d07 0%, #2d6a12 50%, #1b4d07 100%)",
        borderBottom: "3px solid #5cb85c",
        padding: "28px 32px 20px",
        position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 4px 32px rgba(0,0,0,0.5)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
          <span style={{ fontSize: 40 }}>🌾</span>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: 1, color: "#c8f59a", textShadow: "0 2px 8px #000a" }}>
              FarmPro Management System
            </h1>
            <p style={{ margin: 0, fontSize: 13, color: "#9dd76a", letterSpacing: 2, textTransform: "uppercase" }}>
              Fertilizers · Fungicides · Pesticides · Crop Planning
            </p>
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", gap: 6, marginTop: 18, flexWrap: "wrap" }}>
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => handleTabChange(i)} style={{
              background: activeTab === i ? "#5cb85c" : "rgba(255,255,255,0.07)",
              color: activeTab === i ? "#0f2005" : "#b8e89a",
              border: activeTab === i ? "2px solid #7ee05c" : "2px solid rgba(255,255,255,0.1)",
              borderRadius: 24, padding: "7px 18px", cursor: "pointer",
              fontFamily: "inherit", fontSize: 13, fontWeight: activeTab === i ? 700 : 500,
              transition: "all 0.2s", letterSpacing: 0.5,
            }}>{tab}</button>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px" }}>

        {/* Search Bar (tabs 0,1,2) */}
        {activeTab < 3 && (
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <input
              placeholder={`Search ${activeTab === 0 ? "fertilizers" : activeTab === 1 ? "fungicides" : "pesticides"}, crops, targets...`}
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, minWidth: 220, padding: "10px 18px",
                borderRadius: 24, border: "2px solid #3a6e1a",
                background: "rgba(255,255,255,0.06)", color: "#e8f5e0",
                fontFamily: "inherit", fontSize: 14, outline: "none",
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
              }}
            />
            <select
              value={filterType}
              onChange={e => setFilterType(e.target.value)}
              style={{
                padding: "10px 16px", borderRadius: 24, border: "2px solid #3a6e1a",
                background: "#1a3a08", color: "#b8e89a", fontFamily: "inherit", fontSize: 13,
                cursor: "pointer", outline: "none"
              }}
            >
              {(activeTab === 0 ? getFertilizerTypes() : activeTab === 1 ? getFungicideGroups() : getPesticideGroups()).map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
        )}

        {/* FERTILIZERS TAB */}
        {activeTab === 0 && (
          <div>
            <SectionTitle icon="🌱" title="Fertilizer Guide" sub={`${filteredFertilizers.length} products listed`} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {filteredFertilizers.map(f => (
                <ProductCard key={f.id} onClick={() => setSelected(selected?.id === f.id && selected?.cat === "fert" ? null : { ...f, cat: "fert" })}
                  selected={selected?.id === f.id && selected?.cat === "fert"}
                  color="#4ade80"
                  header={<><span style={{ fontSize: 22 }}>{f.icon}</span> <span style={{ fontWeight: 700, fontSize: 15 }}>{f.name}</span></>}
                  tags={[{ label: f.type, color: "#166534" }, { label: f.form, color: "#1e3a8a" }]}
                >
                  <Row label="Application Rate" value={f.rate} />
                  <Row label="Timing" value={f.timing} />
                  <Row label="Suitable Crops" value={f.crops.join(", ")} />
                  {selected?.id === f.id && selected?.cat === "fert" && (
                    <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(250,200,80,0.12)", borderRadius: 10, borderLeft: "3px solid #facc15" }}>
                      <span style={{ color: "#facc15", fontWeight: 700 }}>⚠ Caution: </span>
                      <span style={{ fontSize: 13, color: "#fef9c3" }}>{f.caution}</span>
                    </div>
                  )}
                </ProductCard>
              ))}
            </div>
            {filteredFertilizers.length === 0 && <EmptyState />}
          </div>
        )}

        {/* FUNGICIDES TAB */}
        {activeTab === 1 && (
          <div>
            <SectionTitle icon="🍄" title="Fungicide Guide" sub={`${filteredFungicides.length} products listed`} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {filteredFungicides.map(f => (
                <ProductCard key={f.id} onClick={() => setSelected(selected?.id === f.id && selected?.cat === "fung" ? null : { ...f, cat: "fung" })}
                  selected={selected?.id === f.id && selected?.cat === "fung"}
                  color="#a78bfa"
                  header={<><span style={{ fontSize: 22 }}>{f.icon}</span> <span style={{ fontWeight: 700, fontSize: 15 }}>{f.name}</span></>}
                  tags={[{ label: f.mode, color: "#4c1d95" }, { label: f.group.split(" ")[0], color: "#1e3a8a" }]}
                >
                  <Row label="Targets" value={f.targets.join(", ")} />
                  <Row label="Rate" value={f.rate} />
                  <Row label="PHI" value={f.phi} />
                  <Row label="Crops" value={f.crops.join(", ")} />
                  {selected?.id === f.id && selected?.cat === "fung" && (
                    <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(239,68,68,0.1)", borderRadius: 10, borderLeft: "3px solid #f87171" }}>
                      <span style={{ color: "#f87171", fontWeight: 700 }}>⚠ Resistance: </span>
                      <span style={{ fontSize: 13, color: "#fee2e2" }}>{f.resistance}</span>
                    </div>
                  )}
                </ProductCard>
              ))}
            </div>
            {filteredFungicides.length === 0 && <EmptyState />}
          </div>
        )}

        {/* PESTICIDES TAB */}
        {activeTab === 2 && (
          <div>
            <SectionTitle icon="🐛" title="Pesticide & Herbicide Guide" sub={`${filteredPesticides.length} products listed`} />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
              {filteredPesticides.map(p => (
                <ProductCard key={p.id} onClick={() => setSelected(selected?.id === p.id && selected?.cat === "pest" ? null : { ...p, cat: "pest" })}
                  selected={selected?.id === p.id && selected?.cat === "pest"}
                  color="#fb923c"
                  header={<><span style={{ fontSize: 22 }}>{p.icon}</span> <span style={{ fontWeight: 700, fontSize: 15 }}>{p.name}</span></>}
                  tags={[{ label: p.group.split(" ")[0], color: "#7c2d12" }, { label: `PHI: ${p.phi}`, color: "#1e3a8a" }]}
                >
                  <Row label="Targets" value={p.targets.join(", ")} />
                  <Row label="Rate" value={p.rate} />
                  <Row label="Crops" value={p.crops.join(", ")} />
                  {selected?.id === p.id && selected?.cat === "pest" && (
                    <div style={{ marginTop: 10, padding: "10px 14px", background: "rgba(239,68,68,0.1)", borderRadius: 10, borderLeft: "3px solid #f87171" }}>
                      <span style={{ color: "#f87171", fontWeight: 700 }}>⚠ Safety: </span>
                      <span style={{ fontSize: 13, color: "#fee2e2" }}>{p.caution}</span>
                    </div>
                  )}
                </ProductCard>
              ))}
            </div>
            {filteredPesticides.length === 0 && <EmptyState />}
          </div>
        )}

        {/* CROP CALENDAR TAB */}
        {activeTab === 3 && (
          <div>
            <SectionTitle icon="📅" title="Crop Activity Calendar" sub="Monthly farm management guide" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {data.cropCalendar.map((m, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.05)", borderRadius: 14,
                  border: `2px solid ${m.color}44`,
                  padding: "16px 18px", transition: "transform 0.2s",
                  cursor: "default",
                  boxShadow: `0 2px 16px ${m.color}22`
                }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{
                      background: m.color, color: "#0f2005", borderRadius: 8,
                      fontWeight: 800, fontSize: 13, padding: "4px 12px", letterSpacing: 1
                    }}>{m.month}</span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 18px" }}>
                    {m.activities.map((a, j) => (
                      <li key={j} style={{ fontSize: 13, color: "#d4f0b8", marginBottom: 5, lineHeight: 1.5 }}>{a}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* WEATHER TIPS TAB */}
        {activeTab === 4 && (
          <div>
            <SectionTitle icon="⛅" title="Weather-Based Farming Tips" sub="Adjust operations based on conditions" />
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {data.weatherTips.map((w, i) => (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)", borderRadius: 14,
                  border: "2px solid rgba(255,255,255,0.08)",
                  padding: "20px 24px", display: "flex", gap: 20, alignItems: "flex-start",
                  boxShadow: "0 2px 16px rgba(0,0,0,0.3)",
                  transition: "background 0.2s"
                }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.09)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
                >
                  <span style={{ fontSize: 36, flexShrink: 0 }}>{w.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 16, color: "#9dd76a", marginBottom: 6 }}>{w.condition}</div>
                    <div style={{ fontSize: 14, color: "#d4f0b8", lineHeight: 1.7 }}>{w.tip}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Safety Legend */}
            <div style={{ marginTop: 32, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "20px 24px", border: "2px solid rgba(92,184,92,0.2)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#9dd76a", marginBottom: 14 }}>📋 General Safety Reminders</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {[
                  ["🧤", "Always wear PPE when handling chemicals"],
                  ["🔖", "Read product labels before use"],
                  ["🕐", "Respect Pre-Harvest Intervals (PHI)"],
                  ["🔄", "Rotate chemical groups to prevent resistance"],
                  ["💧", "Apply buffer zones near water sources"],
                  ["📦", "Store chemicals in cool, dry, locked areas"],
                  ["🐝", "Protect pollinators — spray at dusk/dawn"],
                  ["📝", "Keep spray records for traceability"],
                ].map(([icon, text], i) => (
                  <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 13, color: "#c8f59a" }}>
                    <span style={{ flexShrink: 0 }}>{icon}</span><span>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ textAlign: "center", padding: "24px 16px", color: "#4d7a2a", fontSize: 12, borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 32 }}>
        🌾 FarmPro System · Always consult local agronomist and product label for official recommendations.
      </div>
    </div>
  );
}

function SectionTitle({ icon, title, sub }) {
  return (
    <div style={{ marginBottom: 22 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color: "#c8f59a", display: "flex", alignItems: "center", gap: 10 }}>
        <span>{icon}</span> {title}
      </h2>
      <p style={{ margin: "4px 0 0 34px", fontSize: 13, color: "#6aad3c" }}>{sub}</p>
    </div>
  );
}

function ProductCard({ children, onClick, selected, color, header, tags }) {
  return (
    <div onClick={onClick} style={{
      background: selected ? `rgba(${hexToRgb(color)},0.12)` : "rgba(255,255,255,0.05)",
      borderRadius: 14, padding: "16px 18px",
      border: `2px solid ${selected ? color : "rgba(255,255,255,0.08)"}`,
      cursor: "pointer", transition: "all 0.2s",
      boxShadow: selected ? `0 4px 24px ${color}44` : "0 2px 8px rgba(0,0,0,0.2)"
    }}
      onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = `${color}66`; }}
      onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, flexWrap: "wrap" }}>{header}</div>
        <span style={{ color: selected ? color : "#6aad3c", fontSize: 12, flexShrink: 0 }}>{selected ? "▲ Less" : "▼ More"}</span>
      </div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
        {tags.map((t, i) => (
          <span key={i} style={{ background: t.color, color: "#fff", fontSize: 10, borderRadius: 10, padding: "2px 10px", fontWeight: 600, letterSpacing: 0.5 }}>{t.label}</span>
        ))}
      </div>
      <div>{children}</div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 13 }}>
      <span style={{ color: "#6aad3c", minWidth: 110, flexShrink: 0 }}>{label}:</span>
      <span style={{ color: "#d4f0b8" }}>{value}</span>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "#4d7a2a" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
      <div style={{ fontSize: 16 }}>No results found. Try a different search term.</div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
