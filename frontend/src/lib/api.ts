// frontend/src/lib/api.ts

export type Farm = {
  id: number;
  farmerId: number;
  name: string;
  cropType: string;
  area: number;
  latitude?: number;
  longitude?: number;
  soilType?: string;
  irrigationType?: string;
  lastPlanted?: string; // ISO date
  expectedYield?: number;
};

export type Farmer = {
  id: number;
  name: string;
  location: string;
};

export type CropPrice = {
  id: number;
  name: string;
  price: number;
  unit: string;
  updatedAt: string;
};

// Read API base URL and API key from Vite env vars with sensible fallbacks
const VITE_API = (import.meta.env.VITE_API_URL as string) || "http://localhost:8080";
const API_BASE_URL = `${VITE_API.replace(/\/+$/,'')}/api`;
const API_KEY = (import.meta.env.VITE_API_KEY as string) || undefined;
const ADMIN_HEADER = "x-admin-key";

function defaultHeaders(json = true, adminKey?: string) {
  const headers: Record<string,string> = {};
  if (json) headers['Content-Type'] = 'application/json';
  if (API_KEY) headers['x-api-key'] = API_KEY;
  if (adminKey) headers[ADMIN_HEADER] = adminKey;
  return headers;
}

// GET all farms
export async function fetchFarms(): Promise<Farm[]> {
  const res = await fetch(`${API_BASE_URL}/farms`, { headers: defaultHeaders(false) });
  if (!res.ok) throw new Error("Failed to load farms");
  return res.json();
}

// POST create a new farm
export async function createFarm(
  newFarm: Omit<Farm, "id">
): Promise<Farm> {
  // Defensive: ensure we never send an `id` in a create request even if caller
  // accidentally included one. Treat POST as create-only.
  const payload: any = { ...newFarm };
  if (payload.id !== undefined) delete payload.id;

  const res = await fetch(`${API_BASE_URL}/farms`, {
    method: "POST",
    headers: defaultHeaders(true),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create farm");
  return res.json();
}

// PUT update an existing farm
export async function updateFarm(id: number, payload: Partial<Farm>): Promise<Farm> {
  const res = await fetch(`${API_BASE_URL}/farms/${id}`, {
    method: "PUT",
    headers: defaultHeaders(true),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update farm");
  return res.json();
}

// DELETE a farm
export async function deleteFarm(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/farms/${id}`, {
    method: "DELETE",
    headers: defaultHeaders(false),
  });
  if (res.status === 404) throw new Error("Farm not found");
  if (!res.ok && res.status !== 204) throw new Error("Failed to delete farm");
}

// GET a single farmer by id
export async function fetchFarmer(id: number): Promise<Farmer> {
  const res = await fetch(`${API_BASE_URL}/farmers/${id}`, { headers: defaultHeaders(false) });
  if (!res.ok) throw new Error("Failed to load farmer");
  return res.json();
}

// PUT update farmer
export async function updateFarmer(id: number, payload: Partial<Farmer>): Promise<Farmer> {
  const res = await fetch(`${API_BASE_URL}/farmers/${id}`, {
    method: "PUT",
    headers: defaultHeaders(true),
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to update farmer");
  return res.json();
}

// GET crop prices
export async function fetchCropPrices(): Promise<CropPrice[]> {
  const res = await fetch(`${API_BASE_URL}/crop-prices`, { headers: defaultHeaders(false) });
  if (!res.ok) throw new Error("Failed to load crop prices");
  return res.json();
}

// POST create or update a crop price (admin key required)
export async function upsertCropPrice(payload: Partial<CropPrice> & { name: string; price: number; unit: string }, adminKey: string): Promise<CropPrice> {
  const res = await fetch(`${API_BASE_URL}/crop-prices`, {
    method: "POST",
    headers: defaultHeaders(true, adminKey),
    body: JSON.stringify(payload),
  });
  if (res.status === 403) throw new Error("Invalid admin key");
  if (!res.ok) throw new Error("Failed to save crop price");
  return res.json();
}

// Validate admin key before enabling admin mode
export async function validateAdminKey(adminKey: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/crop-prices/validate`, {
    method: "GET",
    headers: defaultHeaders(false, adminKey),
  });
  if (res.status === 403) throw new Error("Invalid admin key");
  if (!res.ok) throw new Error("Unable to validate admin key");
}
