import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { mockFarms, generateSensorData, calculateYieldPrediction } from "@/lib/mockData";

export default function Analytics() {
  const sensorData = generateSensorData(1);
  
  const moistureByFarm = mockFarms.map(farm => {
    const data = generateSensorData(farm.id);
    const avgMoisture = data.reduce((acc, d) => acc + d.soilMoisture, 0) / data.length;
    return {
      name: farm.name,
      moisture: Math.round(avgMoisture)
    };
  });

  const yieldPredictions = mockFarms.map(farm => {
    const data = generateSensorData(farm.id);
    const avgTemp = data.reduce((acc, d) => acc + d.temperature, 0) / data.length;
    const avgMoisture = data.reduce((acc, d) => acc + d.soilMoisture, 0) / data.length;
    return {
      farm: farm.name,
      crop: farm.cropType,
      predicted: calculateYieldPrediction(farm.cropType, avgTemp, avgMoisture)
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Data-driven insights for better farming decisions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Temperature Trend (Last 7 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              temperature: {
                label: "Temperature (°C)",
                color: "hsl(var(--primary))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line type="monotone" dataKey="temperature" stroke="hsl(var(--primary))" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Average Soil Moisture by Farm</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              moisture: {
                label: "Moisture (%)",
                color: "hsl(var(--accent))",
              },
            }}
            className="h-[300px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={moistureByFarm}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="moisture" fill="hsl(var(--accent))" />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Yield Predictions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {yieldPredictions.map((prediction, idx) => (
              <div key={idx} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{prediction.farm}</p>
                  <p className="text-sm text-muted-foreground">{prediction.crop}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">{prediction.predicted}</p>
                  <p className="text-sm text-muted-foreground">tons/ha</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
