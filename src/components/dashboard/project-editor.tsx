// components/create-project-form.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createProject, updateProject } from '@/lib/api/projects';
import { CreateProjectInput } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

export function CreateProjectForm({ isEditing }: { isEditing: boolean }) {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateProjectInput>({
    title: '',
    description: '',
    role: '',
    tools: [],
    summary: '',
    outcome: '',
    imageUrl: '',
    githubUrl: '',
    liveUrl: '',
  });
  const [currentTool, setCurrentTool] = useState('');
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const getProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/projects/${id}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch project: ${response.status}`);
        }

        const data = await response.json();

        // Validate the data structure matches your form
        if (data && typeof data === 'object') {
          setFormData(data);
        } else {
          throw new Error('Invalid project data received');
        }

        setFormData(data);
        console.log({ data });
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };
    if (isEditing) {
      getProjects();
    }
  }, [isEditing, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await updateProject(id, formData);
      } else {
        await createProject(formData);
      }
      toast(`Project ${isEditing ? 'updated' : 'created'} successfully.`);
      router.push('/dashboard/projects');
      router.refresh();
    } catch (error) {
      console.error('Error creating project:', error);
      toast('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const addTool = () => {
    if (currentTool.trim() && !formData.tools.includes(currentTool.trim())) {
      setFormData((prev) => ({
        ...prev,
        tools: [...prev.tools, currentTool.trim()],
      }));
      setCurrentTool('');
    }
  };

  const removeTool = (toolToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tools: prev.tools.filter((tool) => tool !== toolToRemove),
    }));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTool();
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {isEditing ? 'Update Project' : 'Create New Project'}
        </CardTitle>
        <CardDescription>
          Add a new project to your portfolio. Fill in all the required details
          below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Project Title *</Label>
            <Input
              id="title"
              placeholder="Enter project title"
              value={formData.title}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, title: e.target.value }))
              }
              required
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Brief Description *</Label>
            <Textarea
              id="description"
              placeholder="Provide a brief overview of the project"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              required
              className="min-h-[80px]"
            />
          </div>

          {/* Role */}
          <div className="space-y-2">
            <Label htmlFor="role">Your Role *</Label>
            <Input
              id="role"
              placeholder="e.g., Full Stack Developer, UI/UX Designer"
              value={formData.role}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, role: e.target.value }))
              }
              required
            />
          </div>

          {/* Tools */}
          <div className="space-y-3">
            <Label htmlFor="tools">Technologies & Tools</Label>
            <div className="flex gap-2">
              <Input
                id="tools"
                placeholder="Add a tool (press Enter to add)"
                value={currentTool}
                onChange={(e) => setCurrentTool(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={addTool}
                disabled={!currentTool.trim()}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Tools Badges */}
            {formData.tools.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tools.map((tool, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {tool}
                    <button
                      type="button"
                      onClick={() => removeTool(tool)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Project Summary *</Label>
            <Textarea
              id="summary"
              placeholder="Detailed explanation of the project and challenges solved"
              value={formData.summary}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, summary: e.target.value }))
              }
              required
              className="min-h-[100px]"
            />
          </div>

          {/* Outcome */}
          <div className="space-y-2">
            <Label htmlFor="outcome">Outcome & Impact *</Label>
            <Input
              id="outcome"
              placeholder="e.g., Increased conversion by 35%, Improved performance by 50%"
              value={formData.outcome}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, outcome: e.target.value }))
              }
              required
            />
          </div>

          {/* URLs Section */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Image URL */}
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Project Image URL</Label>
              <Input
                id="imageUrl"
                type="url"
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, imageUrl: e.target.value }))
                }
              />
            </div>

            {/* GitHub URL */}
            <div className="space-y-2">
              <Label htmlFor="githubUrl">GitHub Repository URL</Label>
              <Input
                id="githubUrl"
                type="url"
                placeholder="https://github.com/username/repo"
                value={formData.githubUrl}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    githubUrl: e.target.value,
                  }))
                }
              />
            </div>

            {/* Live URL */}
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="liveUrl">Live Demo URL</Label>
              <Input
                id="liveUrl"
                type="url"
                placeholder="https://yourapp.com"
                value={formData.liveUrl}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))
                }
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : isEditing ? (
                'Update Project'
              ) : (
                'Create Project'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
