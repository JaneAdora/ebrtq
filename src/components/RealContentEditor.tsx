import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ToggleSwitch } from "./ui/toggle-switch";
import { Trash2, Plus, Save, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

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

export function RealContentEditor() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState("");

  // Simple password protection
  const ADMIN_PASSWORD = "ebrtq2025"; // Change this!

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadResources();
    } else {
      setErrorMessage("Incorrect password");
    }
  };

  const loadResources = async () => {
    setIsLoading(true);
    try {
      // Load from the actual JSON file
      const response = await fetch('https://raw.githubusercontent.com/JaneAdora/ebrtq/main/src/data/resources.json');
      const data = await response.json();
      setResources(data.resources);
    } catch (error) {
      console.error('Error loading resources:', error);
      setErrorMessage("Failed to load resources");
    } finally {
      setIsLoading(false);
    }
  };

  const addResource = () => {
    const newId = (Math.max(...resources.map(r => parseInt(r.id))) + 1).toString();
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
    if (confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(resource => resource.id !== id));
    }
  };

  const saveChanges = async () => {
    setSaveStatus('saving');
    setErrorMessage("");
    
    try {
      // In a real implementation, this would:
      // 1. Create a GitHub commit with the updated JSON
      // 2. Push to the repository
      // 3. Trigger Vercel deployment
      
      // For now, we'll simulate the save process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch (error) {
      setSaveStatus('error');
      setErrorMessage("Failed to save changes. Please try again.");
    }
  };

  const generateJSON = () => {
    return JSON.stringify({ resources }, null, 2);
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
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            {errorMessage && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
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
            <Button 
              onClick={saveChanges}
              disabled={saveStatus === 'saving'}
            >
              {saveStatus === 'saving' ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : saveStatus === 'success' ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saveStatus === 'saving' ? 'Saving...' : 
               saveStatus === 'success' ? 'Saved!' : 'Save Changes'}
            </Button>
          </div>
        </div>

        {errorMessage && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        ) : showPreview ? (
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

            {/* JSON Preview */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle>JSON Output (for debugging)</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {generateJSON()}
                </pre>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
