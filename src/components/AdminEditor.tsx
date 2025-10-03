import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ToggleSwitch } from "./ui/toggle-switch";
import { Trash2, Plus, Save } from "lucide-react";

interface Resource {
  id: string;
  title: string;
  url: string;
  provider: string;
  type: string;
  icon: string;
  color: string;
}

const iconOptions = [
  "Heart", "Home", "Users", "Phone", "BookOpen", 
  "Activity", "Briefcase", "GraduationCap", "Shield"
];

const colorOptions = [
  "blue", "pink", "white", "purple", "magenta", "cyan", "green"
];

const typeOptions = [
  "Mental Health", "Healthcare", "Crisis Support", "Legal Services", 
  "Housing", "Education", "Employment", "Community", "Youth Services"
];

export function AdminEditor() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  // Simple password protection
  const ADMIN_PASSWORD = "VCL0cbQLFmGLcK7Wfo0I";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadResources();
    } else {
      alert("Incorrect password");
    }
  };

  const loadResources = () => {
    // In a real app, this would fetch from your API
    // For now, we'll use the static data
    const defaultResources: Resource[] = [
      {
        id: "1",
        title: "Pride Center - Support Groups",
        url: "#",
        provider: "Local Pride Center",
        type: "Mental Health",
        icon: "Users",
        color: "blue"
      }
    ];
    setResources(defaultResources);
  };

  const addResource = () => {
    const newId = (resources.length + 1).toString();
    const newResource: Resource = {
      id: newId,
      title: "",
      url: "",
      provider: "",
      type: "Mental Health",
      icon: "Users",
      color: "blue"
    };
    setResources([...resources, newResource]);
  };

  const updateResource = (id: string, field: keyof Resource, value: string) => {
    setResources(resources.map(resource => 
      resource.id === id ? { ...resource, [field]: value } : resource
    ));
  };

  const deleteResource = (id: string) => {
    setResources(resources.filter(resource => resource.id !== id));
  };

  const saveChanges = () => {
    // In a real app, this would save to your backend
    console.log("Saving resources:", resources);
    alert("Changes saved! (In production, this would update the live site)");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <Card className="w-96">
          <CardHeader>
            <CardTitle>EBRTQ Admin Login</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">EBRTQ Content Editor</h1>
          <div className="flex gap-4 items-center">
            <ToggleSwitch
              isOn={showPreview}
              onToggle={() => setShowPreview(!showPreview)}
              leftLabel="Edit"
              rightLabel="Preview"
            />
            <Button onClick={saveChanges}>
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>

        {showPreview ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {resources.map((resource) => (
              <Card key={resource.id} className="p-4">
                <h3 className="font-semibold">{resource.title}</h3>
                <p className="text-sm text-gray-600">{resource.provider}</p>
                <p className="text-sm text-gray-500">{resource.type}</p>
                <a href={resource.url} className="text-blue-500 text-sm">
                  {resource.url}
                </a>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Resources ({resources.length})</h2>
              <Button onClick={addResource}>
                <Plus className="w-4 h-4 mr-2" />
                Add Resource
              </Button>
            </div>

            {resources.map((resource, index) => (
              <Card key={resource.id} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor={`title-${resource.id}`}>Title</Label>
                    <Input
                      id={`title-${resource.id}`}
                      value={resource.title}
                      onChange={(e) => updateResource(resource.id, "title", e.target.value)}
                      placeholder="Resource title"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`url-${resource.id}`}>URL</Label>
                    <Input
                      id={`url-${resource.id}`}
                      value={resource.url}
                      onChange={(e) => updateResource(resource.id, "url", e.target.value)}
                      placeholder="https://example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`provider-${resource.id}`}>Provider</Label>
                    <Input
                      id={`provider-${resource.id}`}
                      value={resource.provider}
                      onChange={(e) => updateResource(resource.id, "provider", e.target.value)}
                      placeholder="Organization name"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`type-${resource.id}`}>Type</Label>
                    <Select 
                      value={resource.type} 
                      onValueChange={(value) => updateResource(resource.id, "type", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {typeOptions.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`icon-${resource.id}`}>Icon</Label>
                    <Select 
                      value={resource.icon} 
                      onValueChange={(value) => updateResource(resource.id, "icon", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {iconOptions.map((icon) => (
                          <SelectItem key={icon} value={icon}>{icon}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor={`color-${resource.id}`}>Color</Label>
                    <Select 
                      value={resource.color} 
                      onValueChange={(value) => updateResource(resource.id, "color", value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {colorOptions.map((color) => (
                          <SelectItem key={color} value={color}>{color}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Button 
                    variant="destructive" 
                    size="sm"
                    onClick={() => deleteResource(resource.id)}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
