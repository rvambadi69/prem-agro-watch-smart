export const mockFarmer = {
  id: 1,
  name: "John Smith",
  location: "California Valley"
};

export const mockFarms = [
  { id: 1, farmerId: 1, name: "North Field", cropType: "Wheat", area: 50 },
  { id: 2, farmerId: 1, name: "East Valley", cropType: "Corn", area: 75 },
  { id: 3, farmerId: 1, name: "South Hills", cropType: "Soybeans", area: 60 }
];

export const generateSensorData = (farmId: number) => {
  const now = new Date();
  const data = [];
  
  for (let i = 6; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    data.push({
      id: Math.random(),
      farmId,
      date: date.toISOString().split('T')[0],
      soilMoisture: Math.floor(Math.random() * 40) + 20,
      temperature: Math.floor(Math.random() * 15) + 18
    });
  }
  
  return data;
};

export const mockIrrigations = [
  { id: 1, farmId: 1, startTime: "2024-11-01 06:00", duration: 60, status: "Completed" },
  { id: 2, farmId: 2, startTime: "2024-11-02 07:00", duration: 45, status: "Completed" },
  { id: 3, farmId: 1, startTime: "2024-11-03 06:30", duration: 60, status: "Scheduled" }
];

export const calculateYieldPrediction = (cropType: string, avgTemp: number, avgMoisture: number) => {
  const baseYields: Record<string, number> = {
    "Wheat": 3.5,
    "Corn": 8.5,
    "Soybeans": 3.0
  };
  
  const base = baseYields[cropType] || 3.0;
  const tempFactor = avgTemp > 25 ? 0.9 : 1.0;
  const moistureFactor = avgMoisture < 30 ? 0.85 : avgMoisture > 50 ? 1.1 : 1.0;
  
  return (base * tempFactor * moistureFactor).toFixed(2);
};
