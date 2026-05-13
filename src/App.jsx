import { useState } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const USERS = [
  { username: "farmer1", password: "farm123", name: "Juan dela Cruz", role: "Field Farmer" },
  { username: "admin", password: "admin123", name: "Maria Santos", role: "Farm Manager" },
];

const GLOSSARY = {
  "Volatilization": "The process where nitrogen converts to ammonia gas (NH₃) and escapes into the atmosphere, reducing fertilizer effectiveness.",
  "PHI": "Pre-Harvest Interval — the minimum number of days required between last chemical application and harvest to ensure safe residue levels.",
  "Systemic": "A type of pesticide/fungicide absorbed and transported throughout the plant's vascular system (xylem/phloem), protecting tissues not directly sprayed.",
  "Protectant": "A chemical applied to plant surfaces before pathogen infection to prevent disease establishment — does not cure existing infections.",
  "Salt Index": "A measure of the osmotic pressure a fertilizer creates in soil solution; high salt index can cause root damage (osmotic stress).",
  "Strobilurin": "A class of fungicides (QoI inhibitors) that block mitochondrial respiration in fungi at the Quinone outside Inhibition site of complex III.",
  "Neonicotinoid": "Systemic insecticides that act on nicotinic acetylcholine receptors (nAChRs) in insect nervous systems, causing paralysis and death.",
  "Triazole": "DMI (DeMethylation Inhibitor) fungicides that block ergosterol biosynthesis in fungal cell membranes, disrupting cell integrity.",
  "Pyrethroid": "Synthetic insecticides derived from pyrethrin (natural extract of Chrysanthemum cinerariaefolium), targeting voltage-gated sodium channels in insects.",
  "Organophosphate": "Insecticides that inhibit acetylcholinesterase (AChE) enzyme, preventing nerve signal termination and causing continuous nerve firing.",
  "Avermectin": "Macrocyclic lactones produced by Streptomyces avermitilis that activate glutamate-gated chloride channels in invertebrate nerve/muscle cells.",
  "Spinosyn": "Insecticides derived from Saccharopolyspora spinosa fermentation; act on nicotinic acetylcholine receptors (nAChRs) and GABA receptors.",
  "DMI": "DeMethylation Inhibitor — fungicides targeting the CYP51 (sterol 14α-demethylase) enzyme in the ergosterol biosynthesis pathway of fungi.",
  "QoI": "Quinone outside Inhibitor — fungicides that block electron transport in fungal mitochondria at the bc1 complex (Complex III).",
  "Auxin": "A plant hormone (indole-3-acetic acid, IAA) regulating cell elongation; auxin-mimic herbicides cause uncontrolled plant growth and death.",
  "EPSPS": "5-enolpyruvylshikimate-3-phosphate synthase — an enzyme in the shikimate pathway inhibited by glyphosate, blocking aromatic amino acid synthesis.",
  "Ergosterol": "The primary sterol in fungal cell membranes (analogous to cholesterol in animals); target of azole and polyene fungicides.",
  "Osmotic stress": "Cellular dehydration caused by high solute concentration outside the cell, drawing water out via osmosis — can cause root burn.",
  "Xylem": "Water-conducting vascular tissue in plants (dead cells) that transports water and dissolved minerals from roots to shoots.",
  "Phloem": "Food-conducting vascular tissue in plants (living cells) that transports sugars and systemic chemicals throughout the plant.",
};

const PPE = [
  { item: "Chemical-Resistant Gloves", why: "Prevents dermal absorption of pesticides and fertilizers through skin (transcutaneous exposure).", img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&q=80", color: "#4ade80" },
  { item: "Full-Face Respirator", why: "Protects against inhalation of toxic vapors, aerosols, and fine particles (aerosol inhalation exposure).", img: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80", color: "#60a5fa" },
  { item: "Chemical Splash Goggles", why: "Shields eyes from spray drift and accidental splashing of corrosive or irritant agrochemicals.", img: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?w=300&q=80", color: "#f59e0b" },
  { item: "Protective Coverall / Suit", why: "Full-body barrier preventing contact of chemicals with skin — required for highly toxic (Class I) pesticides.", img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80", color: "#a78bfa" },
  { item: "Chemical-Resistant Boots", why: "Prevents absorption through feet when walking in treated fields or handling liquid concentrate.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", color: "#fb923c" },
  { item: "Wide-Brim Hat", why: "Reduces UV (ultraviolet radiation) exposure and spray drift landing on head and neck during field work.", img: "https://images.unsplash.com/photo-1521369909029-2afed882baee?w=300&q=80", color: "#34d399" },
];

const FERTILIZERS = [
  {
    id: 1, name: "Urea (46-0-0)", sciName: "CH₄N₂O — Carbamide", type: "Nitrogen", form: "Granular",
    crops: ["Corn (Zea mays)", "Wheat (Triticum aestivum)", "Rice (Oryza sativa)"],
    rate: "100–200 kg/ha", timing: "Pre-plant / Side-dress",
    caution: "Volatilization risk — avoid surface application before rain. Urease enzyme converts urea to NH₃.",
    explanation: "Urea is the world's most widely used nitrogen fertilizer. Once applied, soil urease enzymes convert it to ammonium (NH₄⁺) then nitrate (NO₃⁻) for plant uptake via root ion channels.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    tooltips: ["Volatilization", "Osmotic stress"]
  },
  {
    id: 2, name: "DAP (18-46-0)", sciName: "Diammonium Phosphate — (NH₄)₂HPO₄", type: "N-P", form: "Granular",
    crops: ["Wheat (Triticum aestivum)", "Soybean (Glycine max)", "Canola (Brassica napus)"],
    rate: "80–150 kg/ha", timing: "At planting",
    caution: "High salt index — keep 5–7 cm away from seed to avoid osmotic stress and root burn.",
    explanation: "DAP supplies both nitrogen and phosphorus simultaneously. Phosphorus is essential for ATP synthesis, root development, and energy transfer in photosynthesis and respiration.",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
    tooltips: ["Salt Index", "Osmotic stress"]
  },
  {
    id: 3, name: "NPK 15-15-15", sciName: "Complete Compound Fertilizer — N₁₅P₁₅K₁₅", type: "Complete", form: "Granular",
    crops: ["Vegetables", "Fruit Trees", "Pasture"],
    rate: "150–250 kg/ha", timing: "Basal / Split application",
    caution: "Monitor soil pH regularly. Excess potassium can interfere with magnesium (Mg²⁺) and calcium (Ca²⁺) uptake.",
    explanation: "A balanced complete fertilizer providing all three macronutrients: N for leaf/protein growth, P for root/flower development, K for water regulation and disease resistance.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    tooltips: ["Osmotic stress"]
  },
  {
    id: 4, name: "Calcium Nitrate (15.5N+19Ca)", sciName: "Ca(NO₃)₂ — Calcium Nitrate Tetrahydrate", type: "Calcium-N", form: "Soluble",
    crops: ["Tomato (Solanum lycopersicum)", "Pepper (Capsicum annuum)", "Lettuce (Lactuca sativa)"],
    rate: "5–10 kg per 1000L water", timing: "Fertigation (drip/sprinkler)",
    caution: "Do NOT mix with phosphate (H₂PO₄⁻) or sulfate (SO₄²⁻) — forms insoluble precipitates (CaSO₄, CaHPO₄).",
    explanation: "Ideal for hydroponic and drip irrigation systems. Calcium strengthens cell walls (calcium pectate in middle lamella), reducing blossom-end rot and tip-burn disorders.",
    img: "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=400&q=80",
    tooltips: ["Xylem", "Phloem"]
  },
  {
    id: 5, name: "Compost / Organic Manure", sciName: "Humus — Stabilized Organic Matter", type: "Organic", form: "Bulk solid",
    crops: ["All crops"],
    rate: "5–20 tonnes/ha", timing: "Pre-season incorporation",
    caution: "Test for pathogens (E. coli, Salmonella). Allow proper composting (thermophilic phase ≥55°C for 3 days).",
    explanation: "Organic amendments improve soil structure (aggregate stability), increase CEC (Cation Exchange Capacity), boost microbial biomass, and supply slow-release macro/micronutrients.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    tooltips: []
  },
];

const FUNGICIDES = [
  {
    id: 1, name: "Mancozeb 80% WP", sciName: "Manganese ethylenebis(dithiocarbamate) — C₄H₆MnN₂S₄", group: "Multi-site (M3)", mode: "Protectant",
    targets: ["Early Blight (Alternaria solani)", "Late Blight (Phytophthora infestans)", "Downy Mildew (Peronospora spp.)"],
    crops: ["Potato", "Tomato", "Grape (Vitis vinifera)"],
    rate: "2–2.5 kg/ha", phi: "7 days", resistance: "Very Low — multi-site inhibitor; disrupts multiple enzyme systems simultaneously.",
    explanation: "Mancozeb works by releasing metal ions (Mn²⁺, Zn²⁺) that bind to and inhibit thiol (-SH) groups in multiple fungal enzymes, making resistance development extremely difficult.",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
    tooltips: ["Protectant", "PHI"]
  },
  {
    id: 2, name: "Azoxystrobin 25% SC", sciName: "Methyl (E)-{2-[6-(2-cyanophenoxy)pyrimidin-4-yloxy]phenyl}(3-methoxy-acryloyl)carbamate", group: "Strobilurin (QoI)", mode: "Systemic",
    targets: ["Powdery Mildew (Erysiphe spp.)", "Rust (Puccinia spp.)", "Anthracnose (Colletotrichum spp.)"],
    crops: ["Wheat", "Soybean", "Banana (Musa spp.)"],
    rate: "0.75–1 L/ha", phi: "14 days", resistance: "Moderate — rotate with DMI or SDHI fungicides every 2 applications.",
    explanation: "Inhibits mitochondrial respiration at Complex III (bc1 complex) in fungi, blocking electron transport and ATP production. Systemic movement provides both protective and curative action.",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
    tooltips: ["Strobilurin", "QoI", "Systemic", "Ergosterol"]
  },
  {
    id: 3, name: "Tebuconazole 25% EW", sciName: "(RS)-1-p-Chlorophenyl-4,4-dimethyl-3-(1H-1,2,4-triazol-1-ylmethyl)pentan-3-ol", group: "Triazole (DMI)", mode: "Systemic",
    targets: ["Fusarium Head Blight (Fusarium graminearum)", "Crown Rot", "Rust (Puccinia striiformis)"],
    crops: ["Wheat (Triticum aestivum)", "Corn (Zea mays)", "Soybean"],
    rate: "0.5–1 L/ha", phi: "21 days", resistance: "Moderate — monitor for CYP51 mutations; use mixture partners.",
    explanation: "Triazoles inhibit the CYP51 enzyme (sterol 14α-demethylase) in the ergosterol biosynthesis pathway, disrupting fungal cell membrane integrity and causing cell death.",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80",
    tooltips: ["Triazole", "DMI", "Ergosterol", "Systemic"]
  },
  {
    id: 4, name: "Copper Hydroxide 50% WG", sciName: "Cu(OH)₂ — Cupric Hydroxide", group: "Multi-site (M1)", mode: "Protectant",
    targets: ["Bacterial Blight (Xanthomonas spp.)", "Downy Mildew", "Citrus Canker (Xanthomonas citri)"],
    crops: ["Citrus", "Vegetables", "Coffee (Coffea arabica)"],
    rate: "1–2.5 kg/ha", phi: "0 days", resistance: "Very Low — copper ions denature multiple proteins non-specifically.",
    explanation: "Copper ions (Cu²⁺) precipitate proteins, disrupt enzyme systems, and damage cell membranes in both fungi and bacteria. One of the oldest approved pesticides (Bordeaux mixture, 1880s).",
    img: "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=400&q=80",
    tooltips: ["Protectant", "PHI"]
  },
];

const PESTICIDES = [
  {
    id: 1, name: "Lambda-Cyhalothrin 5% EC", sciName: "(R)-α-Cyano-4-fluoro-3-phenoxybenzyl (1R,3R)-rel-3-(2-chloro-3,3,3-trifluoropropenyl)-2,2-dimethylcyclopropanecarboxylate", group: "Pyrethroid", type: "Insecticide",
    targets: ["Thrips (Thysanoptera)", "Whitefly (Bemisia tabaci)", "Armyworm (Spodoptera spp.)", "Beetles"],
    crops: ["Soybean", "Vegetables", "Fruit crops"],
    rate: "0.5–1 L/ha", phi: "14 days",
    caution: "Highly toxic to fish and aquatic organisms (Lethal Concentration LC₅₀ <1 μg/L). Buffer zones near waterways mandatory.",
    explanation: "Pyrethroids bind to voltage-gated sodium channels (Nav) in insect axons, keeping them open and causing continuous nerve firing (action potential), leading to paralysis and death.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    tooltips: ["Pyrethroid"]
  },
  {
    id: 2, name: "Imidacloprid 70% WG", sciName: "1-[(6-Chloro-3-pyridyl)methyl]-N-nitro-2-imidazolidinimine", group: "Neonicotinoid", type: "Insecticide",
    targets: ["Whitefly (Bemisia tabaci)", "Aphids (Aphididae)", "Leafhoppers (Cicadellidae)"],
    crops: ["Cotton (Gossypium hirsutum)", "Rice (Oryza sativa)", "Vegetables"],
    rate: "70–100 g/ha", phi: "21 days",
    caution: "HIGHLY TOXIC TO BEES (Apis mellifera) — avoid application near flowering crops. Systemic — present in pollen and nectar.",
    explanation: "Neonicotinoids bind selectively to insect nicotinic acetylcholine receptors (nAChRs) in the central nervous system, causing irreversible activation and eventual nerve failure.",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80",
    tooltips: ["Neonicotinoid", "Systemic"]
  },
  {
    id: 3, name: "Abamectin 1.8% EC", sciName: "Avermectin B₁ — a mixture of avermectin B₁ₐ (≥80%) and B₁ᵦ (≤20%)", group: "Avermectin", type: "Acaricide/Insecticide",
    targets: ["Spider Mites (Tetranychus urticae)", "Leafminers (Liriomyza spp.)", "Thrips (Thysanoptera)"],
    crops: ["Vegetables", "Fruit Trees", "Cotton"],
    rate: "0.5–1 L/ha", phi: "7 days",
    caution: "Toxic to beneficial insects and earthworms. Photodegrades rapidly — avoid direct sunlight immediately after application.",
    explanation: "Abamectin activates glutamate-gated chloride channels (GluCl) in invertebrate neurons and muscle cells, causing hyperpolarization, paralysis, and death. Derived from soil bacterium Streptomyces avermitilis.",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&q=80",
    tooltips: ["Avermectin"]
  },
  {
    id: 4, name: "Glyphosate 48% SL", sciName: "N-(phosphonomethyl)glycine — C₃H₈NO₅P", group: "Herbicide", type: "Herbicide (EPSPS inhibitor)",
    targets: ["Broadleaf Weeds (Dicotyledonae)", "Grasses (Poaceae)", "Sedges (Cyperaceae)"],
    crops: ["All crops (non-selective — apply with care)"],
    rate: "2–4 L/ha", phi: "N/A",
    caution: "Non-selective — kills all green plants including crops. Spray buffer zones near water. Do not apply in wind >10 km/h (drift risk).",
    explanation: "Glyphosate inhibits EPSPS (5-enolpyruvylshikimate-3-phosphate synthase), blocking the shikimate pathway and preventing synthesis of aromatic amino acids (phenylalanine, tyrosine, tryptophan) essential for plant survival.",
    img: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400&q=80",
    tooltips: ["EPSPS", "Auxin"]
  },
  {
    id: 5, name: "Spinosad 48% SC", sciName: "Spinosyn A + Spinosyn D — Macrolide-type insecticide", group: "Spinosyn", type: "Insecticide",
    targets: ["Caterpillars (Lepidoptera)", "Thrips (Thysanoptera)", "Leafminers (Liriomyza spp.)"],
    crops: ["Vegetables", "Fruits", "Cereals"],
    rate: "0.1–0.2 L/ha", phi: "3 days",
    caution: "Relatively low mammalian toxicity. Rotate to prevent resistance. Mildly toxic to bees when wet — apply at dusk.",
    explanation: "Spinosyns are naturally derived from Saccharopolyspora spinosa fermentation. They act on both nicotinic acetylcholine receptors (nAChRs) and GABA receptors, causing rapid insect paralysis.",
    img: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&q=80",
    tooltips: ["Spinosyn"]
  },
];

const QUIZ_QUESTIONS = [
  { q: "What does PHI stand for in agriculture?", options: ["Plant Health Index", "Pre-Harvest Interval", "Phosphorus Humidity Indicator", "Pesticide Handling Instruction"], answer: 1, explanation: "PHI (Pre-Harvest Interval) is the minimum days between last chemical application and harvest to ensure safe residue levels on crops." },
  { q: "Which fertilizer type poses the highest volatilization risk?", options: ["DAP", "NPK 15-15-15", "Urea", "Calcium Nitrate"], answer: 2, explanation: "Urea (CH₄N₂O) is converted to ammonia (NH₃) by urease enzymes in soil, especially in warm, moist conditions on the surface." },
  { q: "What does a SYSTEMIC fungicide do differently from a PROTECTANT?", options: ["It only prevents disease", "It is absorbed and moves inside the plant to cure existing infections", "It has no resistance risk", "It is applied before planting only"], answer: 1, explanation: "Systemic fungicides travel through the plant's xylem and phloem, providing protective AND curative action. Protectants only prevent — they cannot cure existing infections." },
  { q: "Why are Neonicotinoids dangerous to bees?", options: ["They repel bees from flowers", "They are systemic — present in pollen and nectar, disrupting bee nervous systems", "They change flower color", "They dry out the hive"], answer: 1, explanation: "Neonicotinoids bind to nicotinic acetylcholine receptors (nAChRs) in bees — the same target as in pest insects — causing sub-lethal effects like disorientation and colony collapse." },
  { q: "What PPE is MOST critical when mixing concentrated liquid pesticides?", options: ["Sun hat", "Chemical-resistant gloves and splash goggles", "Regular work boots", "Dust mask only"], answer: 1, explanation: "Concentrated liquid pesticides pose the highest dermal and eye exposure risk during mixing. Chemical-resistant gloves and splash goggles are the minimum required PPE." },
  { q: "What is the mode of action of Glyphosate?", options: ["Blocks cell wall synthesis", "Inhibits EPSPS enzyme in the shikimate pathway", "Disrupts mitochondrial respiration", "Activates sodium channels"], answer: 1, explanation: "Glyphosate inhibits EPSPS (5-enolpyruvylshikimate-3-phosphate synthase), blocking aromatic amino acid synthesis. This pathway doesn't exist in animals, making it selective — but still requires care near water." },
];

const CROP_CALENDAR = [
  { month: "Jan", season: "Cool-Dry", activities: ["Soil testing (pH, NPK analysis)", "Land preparation & deep plowing", "Cool-season crop planting"], color: "#4ade80" },
  { month: "Feb", season: "Pre-Wet", activities: ["Basal fertilization (DAP/NPK)", "Transplanting seedlings", "Irrigation system setup"], color: "#4ade80" },
  { month: "Mar", season: "Early Wet", activities: ["First weed control (herbicide application)", "Fungicide spray — disease prevention start", "Side-dress nitrogen (Urea)"], color: "#facc15" },
  { month: "Apr", season: "Wet", activities: ["Pest scouting — integrated pest monitoring", "Insecticide (if threshold exceeded)", "Soil moisture monitoring"], color: "#facc15" },
  { month: "May", season: "Peak Wet", activities: ["Canopy management & pruning", "Second fungicide application", "Fruit/grain set monitoring"], color: "#fb923c" },
  { month: "Jun", season: "Harvest", activities: ["Pre-harvest fungicide (respect PHI)", "PHI compliance verification", "Harvest preparation"], color: "#fb923c" },
  { month: "Jul", season: "Post-Harvest", activities: ["Dry season irrigation management", "Post-harvest soil amendment", "Cover crop planting"], color: "#f87171" },
  { month: "Aug", season: "Fallow", activities: ["Soil rest & recovery", "Lime application (pH correction)", "Equipment servicing"], color: "#f87171" },
  { month: "Sep", season: "Planning", activities: ["Next season crop rotation planning", "Seed and input procurement", "Budget and farm record review"], color: "#a78bfa" },
  { month: "Oct", season: "New Season", activities: ["Land preparation begins", "Wet-season crop planting", "Basal fertilization (NPK)"], color: "#a78bfa" },
  { month: "Nov", season: "Growing", activities: ["Active pest scouting", "Weed management (post-emergent)", "Fertigation program start"], color: "#34d399" },
  { month: "Dec", season: "Maturing", activities: ["Disease monitoring — increased humidity risk", "Pre-harvest checks", "Spray records & farm diary update"], color: "#34d399" },
];

// ─── TOOLTIP COMPONENT ────────────────────────────────────────────────────────
function Tooltip({ term }) {
  const [show, setShow] = useState(false);
  if (!GLOSSARY[term]) return <span style={{ color: "#9dd76a", fontWeight: 700 }}>{term}</span>;
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span
        style={{ color: "#fbbf24", fontWeight: 700, borderBottom: "1px dashed #fbbf24", cursor: "help" }}
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
      >{term}</span>
      {show && (
        <span style={{
          position: "absolute", bottom: "130%", left: "50%", transform: "translateX(-50%)",
          background: "#1a2e08", border: "1px solid #5cb85c", borderRadius: 10,
          padding: "10px 14px", width: 280, fontSize: 12, color: "#d4f0b8",
          zIndex: 999, boxShadow: "0 8px 32px rgba(0,0,0,0.7)", lineHeight: 1.6,
          pointerEvents: "none"
        }}>
          <strong style={{ color: "#fbbf24" }}>{term}:</strong> {GLOSSARY[term]}
          <span style={{ position: "absolute", bottom: -6, left: "50%", transform: "translateX(-50%)", width: 12, height: 12, background: "#1a2e08", border: "1px solid #5cb85c", borderRadius: 2, transform: "translateX(-50%) rotate(45deg)", borderTop: "none", borderLeft: "none" }}></span>
        </span>
      )}
    </span>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [u, setU] = useState(""); const [p, setP] = useState(""); const [err, setErr] = useState(""); const [loading, setLoading] = useState(false);
  const handleLogin = () => {
    setLoading(true); setErr("");
    setTimeout(() => {
      const user = USERS.find(x => x.username === u && x.password === p);
      if (user) onLogin(user); else { setErr("Invalid username or password."); setLoading(false); }
    }, 800);
  };
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #071a02 0%, #0f2e05 50%, #081502 100%)",
      fontFamily: "'Georgia', serif", padding: 16,
      backgroundImage: "radial-gradient(ellipse at 20% 50%, rgba(92,184,92,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(74,222,128,0.05) 0%, transparent 50%)"
    }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>🌾</div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 700, color: "#c8f59a", letterSpacing: 1 }}>FarmPro System</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#6aad3c", letterSpacing: 2, textTransform: "uppercase" }}>Agricultural Management Portal</p>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.04)", border: "2px solid rgba(92,184,92,0.25)",
          borderRadius: 20, padding: "36px 32px", backdropFilter: "blur(8px)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.6)"
        }}>
          <div style={{ marginBottom: 18 }}>
            <label style={{ fontSize: 12, color: "#6aad3c", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Username</label>
            <input value={u} onChange={e => setU(e.target.value)} placeholder="Enter username"
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px", borderRadius: 12, border: "2px solid rgba(92,184,92,0.2)", background: "rgba(255,255,255,0.05)", color: "#e8f5e0", fontFamily: "inherit", fontSize: 15, outline: "none" }} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ fontSize: 12, color: "#6aad3c", letterSpacing: 1, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Password</label>
            <input type="password" value={p} onChange={e => setP(e.target.value)} placeholder="Enter password"
              onKeyDown={e => e.key === "Enter" && handleLogin()}
              style={{ width: "100%", boxSizing: "border-box", padding: "12px 16px", borderRadius: 12, border: "2px solid rgba(92,184,92,0.2)", background: "rgba(255,255,255,0.05)", color: "#e8f5e0", fontFamily: "inherit", fontSize: 15, outline: "none" }} />
          </div>
          {err && <div style={{ color: "#f87171", fontSize: 13, marginBottom: 8, textAlign: "center" }}>⚠ {err}</div>}
          <div style={{ fontSize: 12, color: "#4d7a2a", marginBottom: 20, textAlign: "right" }}>Demo: farmer1 / farm123</div>
          <button onClick={handleLogin} disabled={loading} style={{
            width: "100%", padding: "14px", background: loading ? "#2d6a12" : "linear-gradient(90deg, #3a7d1a, #5cb85c)",
            color: "#fff", border: "none", borderRadius: 12, fontFamily: "inherit", fontSize: 16,
            fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", letterSpacing: 0.5,
            boxShadow: "0 4px 16px rgba(92,184,92,0.3)", transition: "all 0.2s"
          }}>{loading ? "Signing in…" : "Sign In to FarmPro"}</button>
          <div style={{ marginTop: 20, textAlign: "center", fontSize: 12, color: "#3a6e1a" }}>
            Also try: admin / admin123
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── QUIZ ─────────────────────────────────────────────────────────────────────
function QuizSection() {
  const [qi, setQi] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [answered, setAnswered] = useState(false);

  const q = QUIZ_QUESTIONS[qi];
  const handleAnswer = (i) => {
    if (answered) return;
    setSelected(i); setAnswered(true);
    if (i === q.answer) setScore(s => s + 1);
  };
  const next = () => {
    if (qi + 1 >= QUIZ_QUESTIONS.length) setDone(true);
    else { setQi(qi + 1); setSelected(null); setAnswered(false); }
  };
  const restart = () => { setQi(0); setSelected(null); setScore(0); setDone(false); setAnswered(false); };

  if (done) return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <div style={{ fontSize: 60, marginBottom: 16 }}>{score >= 4 ? "🏆" : score >= 2 ? "🌱" : "📚"}</div>
      <h2 style={{ color: "#c8f59a", fontSize: 26 }}>Quiz Complete!</h2>
      <p style={{ fontSize: 18, color: "#9dd76a" }}>Score: <strong style={{ color: "#4ade80" }}>{score}</strong> / {QUIZ_QUESTIONS.length}</p>
      <p style={{ color: "#d4f0b8", fontSize: 14 }}>{score >= 5 ? "Excellent! You're a certified FarmPro!" : score >= 3 ? "Good work — review the glossary to improve." : "Keep studying the FarmPro guides!"}</p>
      <button onClick={restart} style={{ marginTop: 16, padding: "12px 32px", background: "#3a7d1a", color: "#fff", border: "none", borderRadius: 24, fontFamily: "inherit", fontSize: 15, cursor: "pointer" }}>Try Again</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ color: "#6aad3c", fontSize: 13 }}>Question {qi + 1} of {QUIZ_QUESTIONS.length}</span>
        <span style={{ color: "#4ade80", fontSize: 13 }}>Score: {score}</span>
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 18, padding: "28px 24px", border: "2px solid rgba(92,184,92,0.15)", marginBottom: 16 }}>
        <p style={{ fontSize: 17, color: "#c8f59a", fontWeight: 700, margin: "0 0 24px", lineHeight: 1.5 }}>{q.q}</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {q.options.map((opt, i) => {
            let bg = "rgba(255,255,255,0.05)";
            let border = "rgba(255,255,255,0.1)";
            let color = "#d4f0b8";
            if (answered) {
              if (i === q.answer) { bg = "rgba(74,222,128,0.15)"; border = "#4ade80"; color = "#4ade80"; }
              else if (i === selected && i !== q.answer) { bg = "rgba(248,113,113,0.12)"; border = "#f87171"; color = "#f87171"; }
            }
            return (
              <button key={i} onClick={() => handleAnswer(i)} style={{
                textAlign: "left", padding: "13px 18px", borderRadius: 12,
                background: bg, border: `2px solid ${border}`, color,
                fontFamily: "inherit", fontSize: 14, cursor: answered ? "default" : "pointer",
                transition: "all 0.2s"
              }}>
                <span style={{ fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{opt}
              </button>
            );
          })}
        </div>
        {answered && (
          <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(255,255,255,0.05)", borderRadius: 12, borderLeft: "3px solid #fbbf24" }}>
            <span style={{ color: "#fbbf24", fontWeight: 700 }}>💡 Explanation: </span>
            <span style={{ fontSize: 13, color: "#fef9c3" }}>{q.explanation}</span>
          </div>
        )}
      </div>
      {answered && (
        <button onClick={next} style={{ width: "100%", padding: "13px", background: "linear-gradient(90deg, #3a7d1a, #5cb85c)", color: "#fff", border: "none", borderRadius: 12, fontFamily: "inherit", fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
          {qi + 1 >= QUIZ_QUESTIONS.length ? "See Results" : "Next Question →"}
        </button>
      )}
    </div>
  );
}

// ─── GLOSSARY PANEL ───────────────────────────────────────────────────────────
function GlossaryPanel() {
  const [search, setSearch] = useState("");
  const terms = Object.entries(GLOSSARY).filter(([k]) => k.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <input placeholder="Search terms…" value={search} onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", boxSizing: "border-box", padding: "10px 18px", borderRadius: 24, border: "2px solid #3a6e1a", background: "rgba(255,255,255,0.05)", color: "#e8f5e0", fontFamily: "inherit", fontSize: 14, outline: "none", marginBottom: 18 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {terms.map(([k, v]) => (
          <div key={k} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: "14px 18px", border: "1px solid rgba(92,184,92,0.15)" }}>
            <div style={{ fontWeight: 700, color: "#fbbf24", marginBottom: 4 }}>{k}</div>
            <div style={{ fontSize: 13, color: "#d4f0b8", lineHeight: 1.6 }}>{v}</div>
          </div>
        ))}
        {terms.length === 0 && <div style={{ textAlign: "center", color: "#4d7a2a", padding: 32 }}>No terms found.</div>}
      </div>
    </div>
  );
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────────
function ProductCard({ item, color, accentBadge }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, border: `2px solid ${open ? color : "rgba(255,255,255,0.08)"}`, overflow: "hidden", transition: "border-color 0.2s, box-shadow 0.2s", boxShadow: open ? `0 4px 24px ${color}44` : "0 2px 8px rgba(0,0,0,0.3)" }}>
      <img src={item.img} alt={item.name} style={{ width: "100%", height: 160, objectFit: "cover", display: "block" }} loading="lazy" />
      <div style={{ padding: "16px 18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6, gap: 8 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 15, color: "#c8f59a", lineHeight: 1.3 }}>{item.name}</div>
            <div style={{ fontSize: 11, color: "#6aad3c", fontStyle: "italic", marginTop: 2 }}>{item.sciName}</div>
          </div>
          <span style={{ background: color + "33", color, fontSize: 10, borderRadius: 8, padding: "3px 10px", fontWeight: 700, flexShrink: 0, border: `1px solid ${color}55` }}>{accentBadge}</span>
        </div>

        <div style={{ fontSize: 12, color: "#9dd76a", marginBottom: 10 }}>
          {item.mode && <><strong>Mode:</strong> <Tooltip term={item.mode} /> · </>}
          {item.group && <><strong>Group:</strong> {item.group} · </>}
          {item.type && <><strong>Type:</strong> {item.type}</>}
          {item.form && <><strong>Form:</strong> {item.form}</>}
        </div>

        <div style={{ fontSize: 13, color: "#b8e89a", marginBottom: 10, lineHeight: 1.6, borderLeft: `3px solid ${color}66`, paddingLeft: 10 }}>
          {item.explanation}
        </div>

        <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "9px", background: open ? color + "22" : "rgba(255,255,255,0.05)", color: open ? color : "#9dd76a", border: `1px solid ${open ? color : "rgba(255,255,255,0.1)"}`, borderRadius: 10, fontFamily: "inherit", fontSize: 13, cursor: "pointer", transition: "all 0.2s" }}>
          {open ? "▲ Hide Details" : "▼ Show Full Details"}
        </button>

        {open && (
          <div style={{ marginTop: 14 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
              <Row label="Rate" value={item.rate} />
              {item.phi && <Row label="PHI" value={<><Tooltip term="PHI" />: {item.phi}</>} />}
              <Row label="Crops" value={(item.crops || []).join(", ")} />
              <Row label="Targets" value={(item.targets || item.crops || []).join(", ")} />
              {item.timing && <Row label="Timing" value={item.timing} />}
              {item.resistance && <Row label="Resistance Risk" value={item.resistance} />}
            </div>
            <div style={{ marginTop: 12, padding: "10px 14px", background: "rgba(250,200,80,0.1)", borderRadius: 10, borderLeft: "3px solid #facc15" }}>
              <span style={{ color: "#facc15", fontWeight: 700 }}>⚠ Caution: </span>
              <span style={{ fontSize: 13, color: "#fef9c3" }}>{item.caution || item.resistance}</span>
            </div>
            {item.tooltips?.length > 0 && (
              <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
                <span style={{ fontSize: 11, color: "#6aad3c" }}>📖 Tap to learn:</span>
                {item.tooltips.map(t => <Tooltip key={t} term={t} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
      <span style={{ color: "#6aad3c", minWidth: 100, flexShrink: 0 }}>{label}:</span>
      <span style={{ color: "#d4f0b8" }}>{value}</span>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
const TABS = ["🌱 Fertilizers", "🍄 Fungicides", "🐛 Pesticides", "🛡️ PPE Safety", "📅 Calendar", "🧪 Quiz", "📖 Glossary"];

export default function App() {
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  if (!user) return <LoginPage onLogin={setUser} />;

  const searchable = (arr) => arr.filter(x =>
    !search || x.name.toLowerCase().includes(search.toLowerCase()) ||
    (x.crops || []).some(c => c.toLowerCase().includes(search.toLowerCase())) ||
    (x.targets || []).some(t => t.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0a1e03 0%, #132e06 60%, #091603 100%)", fontFamily: "'Georgia', serif", color: "#e8f5e0" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(90deg, #122e06 0%, #1e4e0a 50%, #122e06 100%)", borderBottom: "2px solid rgba(92,184,92,0.3)", padding: "18px 24px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 24px rgba(0,0,0,0.5)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 32 }}>🌾</span>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#c8f59a" }}>FarmPro System</div>
                <div style={{ fontSize: 11, color: "#6aad3c", letterSpacing: 1.5, textTransform: "uppercase" }}>Agricultural Management</div>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 13, color: "#9dd76a" }}>👤 {user.name} · <em style={{ color: "#6aad3c" }}>{user.role}</em></span>
              <button onClick={() => setUser(null)} style={{ padding: "6px 16px", background: "rgba(248,113,113,0.15)", color: "#f87171", border: "1px solid rgba(248,113,113,0.3)", borderRadius: 20, fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>Logout</button>
            </div>
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {TABS.map((t, i) => (
              <button key={i} onClick={() => { setTab(i); setSearch(""); }} style={{
                background: tab === i ? "#5cb85c" : "rgba(255,255,255,0.06)",
                color: tab === i ? "#0a1e03" : "#b8e89a",
                border: tab === i ? "2px solid #7ee05c" : "2px solid rgba(255,255,255,0.08)",
                borderRadius: 20, padding: "6px 14px", cursor: "pointer",
                fontFamily: "inherit", fontSize: 12, fontWeight: tab === i ? 700 : 500, transition: "all 0.2s"
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px" }}>

        {/* Search for tabs 0-2 */}
        {tab < 3 && (
          <input placeholder="Search by name, crop, or target pest…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", boxSizing: "border-box", padding: "11px 20px", borderRadius: 24, border: "2px solid #3a6e1a", background: "rgba(255,255,255,0.05)", color: "#e8f5e0", fontFamily: "inherit", fontSize: 14, outline: "none", marginBottom: 24 }} />
        )}

        {/* ── FERTILIZERS ── */}
        {tab === 0 && (
          <>
            <SectionHeader icon="🌱" title="Fertilizers" sub="Plant nutrients that support growth, yield, and soil health." color="#4ade80" />
            <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 14, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#d4f0b8", lineHeight: 1.8 }}>
              <strong style={{ color: "#4ade80" }}>What are Fertilizers?</strong> Fertilizers supply essential mineral nutrients — primarily <strong>Nitrogen (N)</strong>, <strong>Phosphorus (P)</strong>, and <strong>Potassium (K)</strong> — that plants need for photosynthesis, protein synthesis, root development, and disease resistance. They can be organic (from natural sources) or inorganic (chemically synthesized). Proper fertilizer management improves crop yield, reduces waste, and protects soil and water quality. Always base application on soil test results (pH, NPK, micronutrient analysis).
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
              {searchable(FERTILIZERS).map(f => <ProductCard key={f.id} item={f} color="#4ade80" accentBadge={f.type} />)}
            </div>
            {searchable(FERTILIZERS).length === 0 && <EmptyState />}
          </>
        )}

        {/* ── FUNGICIDES ── */}
        {tab === 1 && (
          <>
            <SectionHeader icon="🍄" title="Fungicides" sub="Chemicals that prevent or cure fungal diseases in crops." color="#a78bfa" />
            <div style={{ background: "rgba(167,139,250,0.06)", border: "1px solid rgba(167,139,250,0.2)", borderRadius: 14, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#d4f0b8", lineHeight: 1.8 }}>
              <strong style={{ color: "#a78bfa" }}>What are Fungicides?</strong> Fungicides control plant diseases caused by fungi (e.g., <em>Phytophthora, Fusarium, Alternaria, Puccinia</em>). They work by either <Tooltip term="Protectant">protecting</Tooltip> plant surfaces from infection or acting <Tooltip term="Systemic">systemically</Tooltip> inside plant tissues. Understanding mode of action (<Tooltip term="QoI">QoI</Tooltip>, <Tooltip term="DMI">DMI</Tooltip>) is critical for resistance management — always rotate between different chemical groups to prevent resistance development. Respect <Tooltip term="PHI">PHI</Tooltip> intervals to ensure food safety.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
              {searchable(FUNGICIDES).map(f => <ProductCard key={f.id} item={f} color="#a78bfa" accentBadge={f.mode} />)}
            </div>
            {searchable(FUNGICIDES).length === 0 && <EmptyState />}
          </>
        )}

        {/* ── PESTICIDES ── */}
        {tab === 2 && (
          <>
            <SectionHeader icon="🐛" title="Pesticides & Herbicides" sub="Chemicals for pest, weed, and disease control in agricultural fields." color="#fb923c" />
            <div style={{ background: "rgba(251,146,60,0.06)", border: "1px solid rgba(251,146,60,0.2)", borderRadius: 14, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#d4f0b8", lineHeight: 1.8 }}>
              <strong style={{ color: "#fb923c" }}>What are Pesticides?</strong> Pesticides include insecticides (kill insects), acaricides (kill mites), and herbicides (kill weeds). They act on specific biological targets in pest nervous systems, metabolic pathways, or growth regulators. Groups include <Tooltip term="Pyrethroid">Pyrethroids</Tooltip>, <Tooltip term="Neonicotinoid">Neonicotinoids</Tooltip>, <Tooltip term="Organophosphate">Organophosphates</Tooltip>, and <Tooltip term="Avermectin">Avermectins</Tooltip>. Always follow Integrated Pest Management (IPM) principles — only spray when pest thresholds are exceeded, and rotate chemical groups to prevent resistance. ALWAYS wear full PPE when handling.
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 18 }}>
              {searchable(PESTICIDES).map(p => <ProductCard key={p.id} item={p} color="#fb923c" accentBadge={p.group.split(" ")[0]} />)}
            </div>
            {searchable(PESTICIDES).length === 0 && <EmptyState />}
          </>
        )}

        {/* ── PPE SAFETY ── */}
        {tab === 3 && (
          <>
            <SectionHeader icon="🛡️" title="PPE Safety — Personal Protective Equipment" sub="Required gear for safe handling of all agricultural chemicals." color="#60a5fa" />
            <div style={{ background: "rgba(96,165,250,0.06)", border: "1px solid rgba(96,165,250,0.2)", borderRadius: 14, padding: "14px 18px", marginBottom: 24, fontSize: 13, color: "#d4f0b8", lineHeight: 1.8 }}>
              <strong style={{ color: "#60a5fa" }}>Why PPE Matters:</strong> Agrochemicals can enter the body through 4 routes: <strong>dermal absorption</strong> (skin contact), <strong>inhalation</strong> (breathing vapors/dust), <strong>ocular exposure</strong> (eye splash), and <strong>ingestion</strong> (hand-to-mouth). Proper PPE blocks these exposure pathways. PPE must be worn during <em>mixing, loading, application, and equipment cleaning</em>. Follow the product label — it is the LAW. Failure to wear PPE can result in acute toxicity, chronic illness, or death.
            </div>
            <div style={{ background: "rgba(248,113,113,0.08)", border: "2px solid rgba(248,113,113,0.3)", borderRadius: 14, padding: "16px 20px", marginBottom: 24 }}>
              <div style={{ fontWeight: 700, color: "#f87171", fontSize: 15, marginBottom: 10 }}>🚨 BEFORE YOU SPRAY — MANDATORY CHECKLIST</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
                {["✅ Check wind speed — must be below 10 km/h", "✅ Read the product label completely", "✅ Wear ALL required PPE", "✅ Check sprayer for leaks before filling", "✅ Never spray alone — have someone nearby", "✅ Know the PHI of the chemical being used", "✅ Keep children and animals away from spray area", "✅ Have clean water available for emergency washing"].map((c, i) => (
                  <div key={i} style={{ fontSize: 13, color: "#fecaca" }}>{c}</div>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 18 }}>
              {PPE.map((p, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 16, overflow: "hidden", border: `2px solid ${p.color}44` }}>
                  <img src={p.img} alt={p.item} style={{ width: "100%", height: 180, objectFit: "cover" }} loading="lazy"
                    onError={e => { e.target.style.display = "none"; }} />
                  <div style={{ padding: "16px 18px" }}>
                    <div style={{ fontWeight: 700, color: p.color, fontSize: 15, marginBottom: 8 }}>{p.item}</div>
                    <div style={{ fontSize: 13, color: "#d4f0b8", lineHeight: 1.6 }}>{p.why}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 28, background: "rgba(255,255,255,0.04)", borderRadius: 14, padding: "20px 24px", border: "2px solid rgba(92,184,92,0.2)" }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#9dd76a", marginBottom: 14 }}>📋 After Application — Decontamination Protocol</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 10 }}>
                {[["1.", "Remove PPE — peel off gloves last"], ["2.", "Wash hands thoroughly with soap and water"], ["3.", "Remove and bag contaminated clothing"], ["4.", "Shower with soap — wash hair"], ["5.", "Rinse PPE and hang to dry in ventilated area"], ["6.", "Record spray date, product, rate in farm diary"]].map(([n, t], i) => (
                  <div key={i} style={{ display: "flex", gap: 10, fontSize: 13, color: "#c8f59a" }}>
                    <span style={{ color: "#5cb85c", fontWeight: 700, flexShrink: 0 }}>{n}</span><span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* ── CALENDAR ── */}
        {tab === 4 && (
          <>
            <SectionHeader icon="📅" title="Crop Management Calendar" sub="Month-by-month farm activity guide for year-round crop management." color="#facc15" />
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
              {CROP_CALENDAR.map((m, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", borderRadius: 14, border: `2px solid ${m.color}44`, padding: "16px 18px", boxShadow: `0 2px 12px ${m.color}22` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <span style={{ background: m.color, color: "#0f2005", borderRadius: 8, fontWeight: 800, fontSize: 13, padding: "4px 12px" }}>{m.month}</span>
                    <span style={{ fontSize: 11, color: m.color }}>{m.season}</span>
                  </div>
                  <ul style={{ margin: 0, padding: "0 0 0 16px" }}>
                    {m.activities.map((a, j) => <li key={j} style={{ fontSize: 13, color: "#d4f0b8", marginBottom: 5, lineHeight: 1.5 }}>{a}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── QUIZ ── */}
        {tab === 5 && (
          <>
            <SectionHeader icon="🧪" title="Interactive Farm Knowledge Quiz" sub="Test your understanding of fertilizers, fungicides, pesticides, and safety." color="#34d399" />
            <QuizSection />
          </>
        )}

        {/* ── GLOSSARY ── */}
        {tab === 6 && (
          <>
            <SectionHeader icon="📖" title="Scientific Terms Glossary" sub="Definitions of technical and scientific terms used throughout FarmPro." color="#fbbf24" />
            <GlossaryPanel />
          </>
        )}
      </div>

      <div style={{ textAlign: "center", padding: "24px 16px", color: "#3a6e1a", fontSize: 11, borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: 32 }}>
        🌾 FarmPro System · Always consult a licensed agronomist and read product labels before application.
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, sub, color }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, color, display: "flex", alignItems: "center", gap: 10 }}>
        <span>{icon}</span>{title}
      </h2>
      <p style={{ margin: "4px 0 0 34px", fontSize: 13, color: "#6aad3c" }}>{sub}</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div style={{ textAlign: "center", padding: "60px 20px", color: "#4d7a2a" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
      <div>No results found. Try a different search term.</div>
    </div>
  );
}
