import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { IndianRupee, Edit2, Save, X, Plus } from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CropPrice, fetchCropPrices, upsertCropPrice, validateAdminKey } from "@/lib/api";

export default function CropPrices() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminKey, setAdminKey] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editPrice, setEditPrice] = useState("");
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newUnit, setNewUnit] = useState("per quintal");

  const { data: cropPrices, isLoading, isError } = useQuery({ queryKey: ["crop-prices"], queryFn: fetchCropPrices });

  const mutation = useMutation({
    mutationFn: (payload: Partial<CropPrice> & { name: string; price: number; unit: string }) => upsertCropPrice(payload, adminKey),
    onSuccess: () => {
      toast({ title: "Saved", description: "Crop price updated." });
      setEditingId(null);
      setEditPrice("");
      setNewName("");
      setNewPrice("");
      queryClient.invalidateQueries({ queryKey: ["crop-prices"] });
    },
    onError: (err: any) => {
      const message = err?.message || "Invalid admin key";
      toast({ title: "Unauthorized", description: message, variant: "destructive" });
    }
  });

  const requireAdminKey = () => {
    if (!adminKey) {
      toast({ title: "Admin key required", description: "Enter admin key to edit prices.", variant: "destructive" });
      return false;
    }
    return true;
  };

  const handleAdminToggle = async (checked: boolean) => {
    if (checked) {
      const key = prompt("Enter admin key");
      if (key && key.trim()) {
        try {
          await validateAdminKey(key.trim());
          setAdminKey(key.trim());
          setIsAdminMode(true);
          toast({ title: "Admin mode enabled", description: "You can now edit crop prices." });
        } catch (err: any) {
          setIsAdminMode(false);
          setAdminKey("");
          toast({ title: "Invalid admin key", description: err?.message || "Please try again", variant: "destructive" });
        }
      } else {
        setIsAdminMode(false);
        toast({ title: "Admin key needed", description: "Editing requires a valid key.", variant: "destructive" });
      }
    } else {
      setIsAdminMode(false);
      setAdminKey("");
      setEditingId(null);
      setEditPrice("");
    }
  };

  const handleEdit = (crop: CropPrice) => {
    if (!requireAdminKey()) return;
    setEditingId(crop.id);
    setEditPrice(crop.price.toString());
  };

  const handleSave = (id: number) => {
    if (!requireAdminKey()) return;
    const price = parseFloat(editPrice);
    if (isNaN(price) || price <= 0) {
      toast({ title: "Invalid price", description: "Enter a valid price", variant: "destructive" });
      return;
    }
    const target = cropPrices?.find((c) => c.id === id);
    if (!target) return;
    mutation.mutate({ id: target.id, name: target.name, unit: target.unit, price });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditPrice("");
  };

  const handleAdd = () => {
    if (!requireAdminKey()) return;
    const price = parseFloat(newPrice);
    if (!newName.trim() || isNaN(price) || price <= 0) {
      toast({ title: "Missing fields", description: "Enter name and valid price", variant: "destructive" });
      return;
    }
    mutation.mutate({ name: newName.trim(), price, unit: newUnit });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
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
          <Switch id="admin-mode" checked={isAdminMode} onCheckedChange={handleAdminToggle} />
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IndianRupee className="h-5 w-5" />
            Today's Rates
          </CardTitle>
          <CardDescription>Updated prices as of {formatDate(new Date().toISOString())}</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && <p>Loading prices...</p>}
          {isError && <p className="text-red-500">Failed to load crop prices.</p>}

          {isAdminMode && (
            <div className="mb-4 grid gap-3 md:grid-cols-4">
              <Input placeholder="Crop name" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <Input placeholder="Price" type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
              <Input placeholder="Unit" value={newUnit} onChange={(e) => setNewUnit(e.target.value)} />
              <Button onClick={handleAdd} disabled={mutation.status === "pending"}>
                <Plus className="h-4 w-4 mr-2" /> Add Crop
              </Button>
            </div>
          )}

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
              {(cropPrices ?? []).map((crop) => (
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
                  <TableCell className="text-muted-foreground">{formatDate(crop.updatedAt)}</TableCell>
                  {isAdminMode && (
                    <TableCell className="text-right">
                      {editingId === crop.id ? (
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" onClick={() => handleSave(crop.id)} className="h-8" disabled={mutation.status === "pending"}>
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" onClick={handleCancel} className="h-8">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ) : (
                        <Button size="sm" variant="outline" onClick={() => handleEdit(crop)} className="h-8">
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
