import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, MapPin, Mail, Phone } from "lucide-react";
import { mockFarmer } from "@/lib/mockData";

export default function Profile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Farmer Profile</h1>
        <p className="text-muted-foreground">Manage your account information</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <User className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{mockFarmer.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{mockFarmer.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">john.smith@agrismart.demo</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 border rounded-lg">
            <Phone className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">+1 (555) 123-4567</p>
            </div>
          </div>

          <Button variant="outline" className="w-full">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
