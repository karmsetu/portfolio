'use client';

import { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowLeft, Save, Eye, ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useUploadThing } from '@/utils/uploadthing'; // ✅ add this
import { createPostSchema } from '@/lib/validators';
import { formatZodErrors } from '@/utils/zod';

interface Post {
  id: string;
  title: string;
  content: string;
  published: boolean;
  tags?: string[];
  createdAt: string;
  featuredImage?: string;
}

type PostEditorProp = { isEditing: boolean };

export default function PostEditor({ isEditing }: PostEditorProp) {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [post, setPost] = useState<Omit<Post, 'id' | 'createdAt'>>({
    title: '',
    content: '',
    published: false,
    tags: [],
  });
  const [postError, setPostError] = useState({
    title: '',
    content: '',
    tags: '',
    featuredImage: '',
  });
  const [image, setImage] = useState<{ src: File[]; url: string } | null>(null);
  const inputSchema = createPostSchema.omit({ published: true });

  const ImageInputRef = useRef<HTMLInputElement | null>(null);

  const { startUpload, isUploading } = useUploadThing('imageUploader', {
    onClientUploadComplete: (res) => {
      const url = res?.[0]?.ufsUrl;
      if (url) {
        setPost((prev) => ({ ...prev, featuredImage: url }));
        toast.success('Image uploaded successfully!');
      }
    },
    onUploadError: (err) => {
      toast.error(`Upload failed: ${err.message}`);
    },
  });

  useEffect(() => {
    const getPost = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost({
          content: data.post.content,
          published: data.post.published,
          title: data.post.title,
          featuredImage: data.post.featuredImage,
          tags: data.post.tags,
        });
        setImage({ src: [], url: data.post.featuredImage as string });
        // if(ImageInputRef) {
        //   ImageInputRef.current?.files = new FileList()
        // }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch post');
      } finally {
        setIsLoading(false);
      }
    };
    if (isEditing) {
      getPost();
    }
  }, [isEditing, id]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) setImage(null);
    else {
      const file = Array.from(e.target.files)[0];
      setImage({ src: [file], url: URL.createObjectURL(file) });
    }
  };

  const handleContentChange = (field: string, value: string) => {
    const validatedResult = inputSchema
      .pick({ [field]: true })
      .safeParse({ [field]: value });
    if (!validatedResult.success) {
      const message = JSON.parse(validatedResult.error.message)[0].message;

      setPostError((prev) => ({
        ...prev,
        [field]: message,
      }));
    } else setPostError((prev) => ({ ...prev, [field]: '' }));
    setPost((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // upload image in uploadthing
      let imageURL: string = '';
      if (image && image.src.length > 0) {
        const check = await startUpload(image.src);
        if (check) {
          imageURL = check[0].ufsUrl;
        }
      }

      let response;
      const body = JSON.stringify({
        title: post.title,
        content: post.content,
        published: post.published,
        tags: post.tags,
        featuredImage: imageURL,
      });

      // validate the input
      const validatedResult = inputSchema.safeParse(JSON.parse(body));
      if (!validatedResult.success) {
        const o = formatZodErrors(validatedResult.error);
        setPostError((prev) => {
          const newObj = { ...prev, ...o };
          return newObj;
        });
        toast('invalid inputs, please check...');
        return;
      }

      if (isEditing) {
        response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      } else {
        response = await fetch('/api/posts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
        });
      }

      await response.json();
      toast.success(
        isEditing ? 'Post updated successfully!' : 'Post created successfully!'
      );
      router.push('/dashboard/posts');
    } catch (error) {
      console.error(error);
      toast.error('Failed to save post' + error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => toast.info('Preview functionality coming soon!');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">
              {isEditing ? 'Edit Post' : 'Create New Post'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Update your blog post' : 'Write a new blog post'}
            </p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handlePreview}
            disabled={isLoading}
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            <Save className="w-4 h-4 mr-2" />
            {isLoading
              ? 'Saving...'
              : isEditing
              ? 'Update Post'
              : 'Create Post'}
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Content */}
          <Card>
            <CardHeader>
              <CardTitle>Post Content</CardTitle>
              <CardDescription>
                The main content of your blog post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={post.title}
                  onChange={(e) => handleContentChange('title', e.target.value)}
                  placeholder="Enter a compelling title..."
                  required
                />
                <span
                  className={`text-sm font-medium transition delay-150 duration-300 ease-in-out  text-red-500 opacity-0 ${
                    postError.title && 'opacity-100 -translate-1'
                  }`}
                >
                  {postError.title}
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={post.content}
                  onChange={(e) =>
                    handleContentChange('content', e.target.value)
                  }
                  placeholder="Write your post content here... You can use Markdown!"
                  rows={20}
                  required
                />
                <span
                  className={`text-sm font-medium transition delay-150 duration-300 ease-in-out  text-red-500 opacity-0 ${
                    postError.content && 'opacity-100 -translate-1'
                  }`}
                >
                  {postError.content}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Publish</CardTitle>
              <CardDescription>
                Control when and how your post is published
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="published" className="cursor-pointer">
                  Status
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <Switch
                    id="published"
                    checked={post.published}
                    onCheckedChange={(checked) =>
                      setPost((prev) => ({ ...prev, published: checked }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
              <CardDescription>
                Add tags to categorize your post
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Input
                placeholder="Add tags (comma separated)"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const value = e.currentTarget.value.trim();
                    if (value && !post.tags?.includes(value)) {
                      setPost((prev) => ({
                        ...prev,
                        tags: [...(prev.tags || []), value],
                      }));
                      e.currentTarget.value = '';
                    }
                  }
                }}
              />
              <div className="flex flex-wrap gap-2 mt-3">
                <span
                  className={`text-sm font-medium transition delay-150 duration-300 ease-in-out  text-red-500 opacity-0 ${
                    postError.tags && 'opacity-100 -translate-1'
                  }`}
                >
                  {postError.tags}
                </span>

                {post.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() =>
                        setPost((prev) => ({
                          ...prev,
                          tags: prev.tags?.filter((t) => t !== tag),
                        }))
                      }
                      className="hover:text-blue-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ✅ Featured Image (UploadThing integrated) */}
          <Card>
            <CardHeader>
              <CardTitle>Featured Image</CardTitle>
              <CardDescription>
                Add a featured image for your post
              </CardDescription>
            </CardHeader>
            <CardContent>
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
                      Upload featured image
                    </p>
                    <Button variant="outline" size="sm" disabled={isUploading}>
                      <ImageIcon className="w-4 h-4 mr-2" />
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={ImageInputRef}
                      />
                      {isUploading ? 'Uploading...' : 'Choose Image'}
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
