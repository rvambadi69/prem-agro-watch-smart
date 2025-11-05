import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { IndianRupee, Edit2, Save, X } from "lucide-react";

interface CropPrice {
  id: number;
  name: string;
  price: number;
  unit: string;
  updatedAt: string;
}

const defaultCropPrices: CropPrice[] = [
  { id: 1, name: "Sugarcane", price: 2850, unit: "per ton", updatedAt: new Date().toISOString() },
  { id: 2, name: "Ragi", price: 3200, unit: "per quintal", updatedAt: new Date().toISOString() },
  { id: 3, name: "Rice", price: 2100, unit: "per quintal", updatedAt: new Date().toISOString() },
  { id: 4, name: "Cotton", price: 5800, unit: "per quintal", updatedAt: new Date().toISOString() },
  { id: 5, name: "Groundnut", price: 5500, unit: "per quintal", updatedAt: new Date().toISOString() },
  { id: 6, name: "Maize", price: 1900, unit: "per quintal", updatedAt: new Date().toISOString() },
  { id: 7, name: "Jowar", price: 2800, unit: "per quintal", updatedAt: new Date().toISOString() },
  { id: 8, name: "Tur Dal", price: 6500, unit: "per quintal", updatedAt: new Date().toISOString() }
];

export default function CropPrices() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [cropPrices, setCropPrices] = useState<CropPrice[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    const stored = localStorage.getItem("cropPrices");
    if (stored) {
      setCropPrices(JSON.parse(stored));
    } else {
      setCropPrices(defaultCropPrices);
      localStorage.setItem("cropPrices", JSON.stringify(defaultCropPrices));
    }
  }, []);

  const handleEdit = (crop: CropPrice) => {
    setEditingId(crop.id);
    setEditPrice(crop.price.toString());
  };

  const handleSave = (id: number) => {
    const price = parseFloat(editPrice);
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Invalid Price",
        description: "Please enter a valid price",
        variant: "destructive",
      });
      return;
    }

    const updated = cropPrices.map(crop =>
      crop.id === id
        ? { ...crop, price, updatedAt: new Date().toISOString() }
        : crop
    );

    setCropPrices(updated);
    localStorage.setItem("cropPrices", JSON.stringify(updated));
    setEditingId(null);
    setEditPrice("");

    toast({
      title: "Price Updated",
      description: "Crop price has been updated successfully",
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditPrice("");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Crop Prices</h1>
          <p className="text-muted-foreground mt-1">Current market rates for Karnataka crops</p>
        </div>
        <div className="flex items-center gap-3">
          <Label htmlFor="admin-mode" className="text-sm font-medium">
            Admin Mode
          </Label>
          <Switch
            id="admin-mode"
            checked={isAdminMode}
            onCheckedChange={setIsAdminMode}
          />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Today's Rates
          </CardTitle>
          <CardDescription>
            Updated prices as of {formatDate(new Date().toISOString())}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Crop Name</TableHead>
                <TableHead>Price (₹)</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Last Updated</TableHead>
                {isAdminMode && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {cropPrices.map((crop) => (
                <TableRow key={crop.id}>
                  <TableCell className="font-medium">{crop.name}</TableCell>
                  <TableCell>
                    {editingId === crop.id ? (
                      <Input
                        type="number"
                        value={editPrice}
                        onChange={(e) => setEditPrice(e.target.value)}
                        className="w-32"
                        min="0"
                        step="0.01"
                      />
                    ) : (
                      <span className="text-lg font-semibold">₹{crop.price.toLocaleString("en-IN")}</span>
                    )}
                  </TableCell>
                  <TableCell>{crop.unit}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {formatDate(crop.updatedAt)}
                  </TableCell>
                  {isAdminMode && (
                    <TableCell className="text-right">
                      {editingId === crop.id ? (
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            onClick={() => handleSave(crop.id)}
                            className="h-8"
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={handleCancel}
                            className="h-8"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEdit(crop)}
                          className="h-8"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
