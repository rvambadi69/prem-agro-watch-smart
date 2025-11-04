import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Clock, Play } from "lucide-react";
import { mockIrrigations, mockFarms } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Irrigation() {
  const { toast } = useToast();

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
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Moisture Threshold</p>
                <p className="text-sm text-muted-foreground">Trigger irrigation when below</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">30%</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div>
                <p className="font-medium">Default Duration</p>
                <p className="text-sm text-muted-foreground">Standard watering time</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">60 min</p>
              </div>
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
            {mockIrrigations.map((irrigation) => {
              const farm = mockFarms.find(f => f.id === irrigation.farmId);
              return (
                <div key={irrigation.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                  <div className="flex items-center gap-3">
                    <Droplets className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{farm?.name}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {irrigation.startTime}
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
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
