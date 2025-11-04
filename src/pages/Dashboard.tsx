import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sprout, Droplets, ThermometerSun, TrendingUp } from "lucide-react";
import { mockFarms, generateSensorData } from "@/lib/mockData";

export default function Dashboard() {
  const latestSensorData = mockFarms.map(farm => {
    const data = generateSensorData(farm.id);
    return { farm, sensor: data[data.length - 1] };
  });

  const avgMoisture = latestSensorData.reduce((acc, d) => acc + d.sensor.soilMoisture, 0) / latestSensorData.length;
  const avgTemp = latestSensorData.reduce((acc, d) => acc + d.sensor.temperature, 0) / latestSensorData.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Monitor your farms in real-time</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Farms</CardTitle>
            <Sprout className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockFarms.length}</div>
            <p className="text-xs text-muted-foreground">Active farms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Soil Moisture</CardTitle>
            <Droplets className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgMoisture.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">Across all farms</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Temperature</CardTitle>
            <ThermometerSun className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgTemp.toFixed(1)}°C</div>
            <p className="text-xs text-muted-foreground">Current average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Area</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockFarms.reduce((acc, f) => acc + f.area, 0)} ha
            </div>
            <p className="text-xs text-muted-foreground">Under cultivation</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Farm Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latestSensorData.map(({ farm, sensor }) => (
              <div key={farm.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div>
                  <p className="font-medium">{farm.name}</p>
                  <p className="text-sm text-muted-foreground">{farm.cropType} - {farm.area} ha</p>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="text-right">
                    <p className="text-muted-foreground">Moisture</p>
                    <p className={sensor.soilMoisture < 30 ? "text-destructive font-medium" : "text-foreground"}>
                      {sensor.soilMoisture}%
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-muted-foreground">Temp</p>
                    <p className="text-foreground">{sensor.temperature}°C</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
