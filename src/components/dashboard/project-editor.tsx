// components/create-project-form.tsx
'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createProject, updateProject } from '@/lib/api/projects';
import { CreateProjectInput, Project } from '@/types';
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
import { X, Plus, Loader2, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadThing } from '@/utils/uploadthing';

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
  const [image, setImage] = useState<{ src: File[]; url: string } | null>(null);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.ufsUrl;
      if (url) {
        setFormData((prev) => ({ ...prev, imageUrl: url }));
        toast.success('Image uploaded successfully!');
      }
    },
    onUploadError: (err) => {
      toast.error(`Upload failed: ${err.message}`);
    },
  });

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

        const data: CreateProjectInput = await response.json();

        // Validate the data structure matches your form
        if (data && typeof data === 'object') {
          setFormData(data);
          if (data.imageUrl) {
            setImage({ url: data.imageUrl, src: [] });
          }
        } else {
          throw new Error('Invalid project data received');
        }
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
      let imageURL: string = '';

      // make image URL
      if (image && image.src.length > 0) {
        const check = await startUpload(image.src);
        if (check) {
          imageURL = check[0].ufsUrl;
        }
      }
      if (isEditing) {
        await updateProject(id, { ...formData, imageUrl: imageURL });
      } else {
        await createProject({ ...formData, imageUrl: imageURL });
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

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) setImage(null);
    else {
      const file = Array.from(e.target.files)[0];
      setImage({ src: [file], url: URL.createObjectURL(file) });
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
                onKeyDown={handleKeyPress}
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
          <div className="flex flex-col gap-5">
            {/* Image URL */}
            {/* <div className="space-y-2">
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
            </div> */}

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {image ? (
                <div className="space-y-2">
                  <picture>
                    <img
                      src={image.url}
                      alt="Featured"
                      className="mx-auto rounded-lg max-h-48 object-cover"
                    />
                  </picture>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setImage(null)}
                  >
                    Remove
                  </Button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground mb-2">
                    Upload Project image
                  </p>
                  <Button variant="outline" size="sm" disabled={isUploading}>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {isUploading ? 'Uploading...' : 'Choose Image'}
                  </Button>
                </>
              )}
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
