export interface Disease {
  slug: string;
  name: string;
  short: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: string[];
  emoji: string;
}

export const DISEASES: Disease[] = [
  {
    slug: "lumpy-skin-disease",
    name: "Lumpy Skin Disease",
    short: "Viral disease causing skin nodules and fever in cattle.",
    emoji: "🐄",
    symptoms: ["Firm skin nodules (2–5 cm)", "High fever", "Reduced milk yield", "Swollen lymph nodes", "Loss of appetite"],
    causes: ["Lumpy Skin Disease Virus (LSDV)", "Biting insects (flies, mosquitoes)", "Contaminated equipment", "Direct contact"],
    prevention: ["Vaccination programs", "Vector control", "Quarantine new animals", "Disinfection of sheds"],
    treatment: ["Supportive care", "Antibiotics for secondary infection", "Anti-inflammatory drugs", "Wound care"],
  },
  { slug: "mastitis", name: "Mastitis", short: "Inflammation of the udder, common in dairy cattle.", emoji: "🥛",
    symptoms: ["Swollen, hot udder", "Abnormal milk (clots, blood)", "Reduced milk yield", "Fever"],
    causes: ["Bacterial infection", "Poor milking hygiene", "Udder injuries"],
    prevention: ["Clean milking practices", "Post-milking teat dip", "Dry cow therapy"],
    treatment: ["Intramammary antibiotics", "Anti-inflammatories", "Frequent milking-out"] },
  { slug: "foot-and-mouth-disease", name: "Foot and Mouth Disease", short: "Highly contagious viral disease.", emoji: "🦶",
    symptoms: ["Blisters on mouth and feet", "Lameness", "Drooling", "Reluctance to eat"],
    causes: ["FMD virus (Aphthovirus)", "Airborne spread", "Contaminated feed/water"],
    prevention: ["Regular vaccination", "Movement restrictions", "Biosecurity"],
    treatment: ["No specific cure", "Supportive care", "Wound antiseptics"] },
  { slug: "pregnancy-related", name: "Pregnancy Related Diseases", short: "Conditions affecting pregnant cattle.", emoji: "🤰",
    symptoms: ["Abortion", "Retained placenta", "Milk fever", "Ketosis"],
    causes: ["Brucellosis", "Calcium deficiency", "Metabolic imbalance"],
    prevention: ["Balanced nutrition", "Vaccination", "Regular vet checks"],
    treatment: ["Calcium therapy", "Hormonal support", "Antibiotics where indicated"] },
  { slug: "tick-infestation", name: "Tick Infestation", short: "Ectoparasitic infestation causing anemia and disease.", emoji: "🪲",
    symptoms: ["Visible ticks on body", "Anemia", "Weight loss", "Skin irritation"],
    causes: ["Heavy tick load", "Poor housing hygiene"],
    prevention: ["Acaricide spraying", "Pasture rotation", "Regular grooming"],
    treatment: ["Topical/injectable acaricides", "Tick-borne disease treatment"] },
  { slug: "skin-infection", name: "Skin Infection", short: "Bacterial or fungal infections of the skin.", emoji: "🧴",
    symptoms: ["Hair loss", "Itching", "Crusty lesions"],
    causes: ["Ringworm", "Bacterial dermatitis", "Poor hygiene"],
    prevention: ["Clean dry housing", "Isolate affected animals"],
    treatment: ["Antifungals", "Topical antiseptics", "Antibiotics"] },
  { slug: "eye-infection", name: "Eye Infection", short: "Pink eye and related ocular issues.", emoji: "👁️",
    symptoms: ["Watery eyes", "Redness", "Cloudy cornea", "Squinting"],
    causes: ["Moraxella bovis", "Dust and UV", "Flies"],
    prevention: ["Fly control", "Shaded areas"],
    treatment: ["Antibiotic eye ointment", "Eye patches"] },
  { slug: "digestive-disorders", name: "Digestive Disorders", short: "Bloat, acidosis, and indigestion.", emoji: "🌾",
    symptoms: ["Distended abdomen", "Diarrhea", "Off-feed"],
    causes: ["Sudden feed change", "Excess grain", "Spoiled feed"],
    prevention: ["Gradual diet change", "Quality forage"],
    treatment: ["Rumen stimulants", "Antacids", "Fluid therapy"] },
  { slug: "hoof-diseases", name: "Hoof Diseases", short: "Foot rot and laminitis affecting mobility.", emoji: "🐾",
    symptoms: ["Lameness", "Swollen hooves", "Foul odor"],
    causes: ["Wet, dirty floors", "Trauma", "Bacterial infection"],
    prevention: ["Dry clean floors", "Hoof trimming", "Footbaths"],
    treatment: ["Hoof cleaning", "Topical antibiotics", "Pain relief"] },
  { slug: "other-diseases", name: "Other Diseases", short: "Submit images for less common conditions.", emoji: "🩺",
    symptoms: ["Varied"], causes: ["Varied"], prevention: ["Routine vet care"], treatment: ["Vet diagnosis required"] },
];

export const getDisease = (slug: string) => DISEASES.find((d) => d.slug === slug);
