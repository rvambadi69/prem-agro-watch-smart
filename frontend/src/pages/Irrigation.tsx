import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Clock, Play } from "lucide-react";
import { mockIrrigations } from "@/lib/mockData";
import { fetchFarms, type Farm } from "@/lib/api";
import React from "react";
import { useToast } from "@/hooks/use-toast";

export default function Irrigation() {
  const { toast } = useToast();
  const [farms, setFarms] = React.useState<Farm[]>([]);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchFarms()
      .then((data) => {
        if (mounted) setFarms(data);
      })
      .catch((err) => {
        toast({ title: "Failed to load farms", description: err.message });
      })
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  // persisted scheduled irrigations saved to localStorage
  const [persisted, setPersisted] = React.useState<any[]>(() => {
    try {
      const raw = localStorage.getItem("irrigation_schedule");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem("irrigation_schedule", JSON.stringify(persisted));
    } catch {}
  }, [persisted]);

  const scheduleForFarm = (farm: Farm) => {
    const entry = {
      id: Date.now(),
      farmId: farm.id,
      startTime: new Date().toISOString(),
      duration: 60,
      status: "Scheduled",
    };
    setPersisted((p) => [entry, ...p]);
    toast({ title: "Irrigation scheduled", description: `Scheduled for ${farm.name}` });
  };

  const handleSchedule = () => {
    toast({
      title: "Irrigation Scheduled",
      description: "Auto-irrigation will start when soil moisture drops below threshold.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Irrigation Control</h1>
          <p className="text-muted-foreground">Manage automated irrigation schedules</p>
        </div>
        <Button onClick={handleSchedule}>
          <Play className="mr-2 h-4 w-4" />
          Schedule Irrigation
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Auto-Irrigation Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <p className="font-medium">Default Moisture Threshold</p>
                <p className="text-sm text-muted-foreground">Trigger irrigation when below</p>
                <p className="mt-2 text-2xl font-bold text-primary">30%</p>
              </div>
              <div className="p-4 border rounded-lg">
                <p className="font-medium">Default Duration</p>
                <p className="text-sm text-muted-foreground">Standard watering time</p>
                <p className="mt-2 text-2xl font-bold text-primary">60 min</p>
              </div>
            </div>

            <div>
              <p className="font-medium">Farms</p>
              <p className="text-sm text-muted-foreground">Settings are derived from farm properties below</p>
              {loading ? (
                <p className="mt-2">Loading farms...</p>
              ) : (
                <div className="mt-3 space-y-3">
                  {farms.map((f) => (
                    <div key={f.id} className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <p className="font-medium">{f.name}</p>
                        <p className="text-sm text-muted-foreground">{f.cropType} • {f.soilType || "—"} • {f.irrigationType || "—"}</p>
                        <p className="text-sm text-muted-foreground">Coords: {f.latitude ?? "—"}, {f.longitude ?? "—"}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="sm" onClick={() => scheduleForFarm(f)}>
                          Schedule
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Irrigation History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(() => {
              // merge persisted schedules (client) with mock history
              const combined = [...persisted, ...mockIrrigations];
              return combined.map((irrigation) => {
                const farm = (farms || []).find((f) => f.id === irrigation.farmId);
                const displayTime = irrigation.startTime
                  ? (new Date(irrigation.startTime)).toLocaleString()
                  : String(irrigation.startTime);
                return (
                  <div key={irrigation.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                    <div className="flex items-center gap-3">
                      <Droplets className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{farm?.name ?? `Farm ${irrigation.farmId}`}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {displayTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{irrigation.duration} min</span>
                      <Badge variant={irrigation.status === "Completed" ? "default" : "secondary"}>
                        {irrigation.status}
                      </Badge>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
