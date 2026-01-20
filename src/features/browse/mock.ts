/**
 * Mock data used for local development and UI iteration.
 * This will later be replaced by a data source adapter.
 */
import type { Medication } from "./types";

export const MOCK_MEDICATIONS: Medication[] = [
  {
    id: "amox-500",
    name: "Amoxicillin 500mg",
    description: "Antibiotic used to treat bacterial infections.",
    availability: "available",
    pharmacyName: "CareMesh Pharmacy",
    distanceMiles: 1.2,
  },
  {
    id: "ibu-200",
    name: "Ibuprofen 200mg",
    description: "NSAID for pain, fever, and inflammation.",
    availability: "available",
    pharmacyName: "Neighborhood Rx",
    distanceMiles: 2.7,
  },
  {
    id: "ator-10",
    name: "Atorvastatin 10mg",
    description: "Statin used to lower cholesterol.",
    availability: "unknown",
  },
  {
    id: "met-500",
    name: "Metformin 500mg",
    description: "Used to help control blood sugar in type 2 diabetes.",
    availability: "unavailable",
    pharmacyName: "Local Pharmacy",
    distanceMiles: 0.9,
  },
];
