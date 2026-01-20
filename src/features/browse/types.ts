/**
 * Browse feature domain types.
 */
export type Availability = "available" | "unavailable" | "unknown";

export type Medication = {
  id: string;
  name: string;
  description: string;
  availability: Availability;
  pharmacyName?: string;
  distanceMiles?: number;
};