import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, MapPin } from "lucide-react";
import { mockFarms } from "@/lib/mockData";
import { useToast } from "@/hooks/use-toast";

export default function Farms() {
  const { toast } = useToast();

  const handleAddFarm = () => {
    toast({
      title: "Demo Mode",
      description: "Farm management is simulated in this demo version.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Farms</h1>
          <p className="text-muted-foreground">Manage your agricultural properties</p>
        </div>
        <Button onClick={handleAddFarm}>
          <Plus className="mr-2 h-4 w-4" />
          Add Farm
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {mockFarms.map((farm) => (
          <Card key={farm.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {farm.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crop Type:</span>
                  <span className="font-medium">{farm.cropType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Area:</span>
                  <span className="font-medium">{farm.area} hectares</span>
                </div>
                <Button variant="outline" className="w-full mt-4">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
