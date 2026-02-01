"use client";

import type React from "react";
import { useState, useTransition, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateArticle } from "@/app/actions/articles";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Loader2, Upload, X, FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "AI/ML",
  "General",
];

export default function EditArticlePage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    featuredImage: "",
  });

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`/api/articles/${articleId}`);
        if (response.ok) {
          const article = await response.json();
          setFormData({
            title: article.title,
            content: article.content,
            category: article.category,
            featuredImage: article.featuredImage || "",
          });
          if (article.featuredImage) {
            setPreviewUrl(article.featuredImage);
          }
        }
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchArticle();
  }, [articleId]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreviewUrl(formData.featuredImage);
    if (previewUrl && previewUrl.startsWith("blob:")) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        let imageUrl = formData.featuredImage;

        if (selectedFile) {
          setIsUploading(true);
          imageUrl = await uploadToCloudinary(selectedFile);
          setIsUploading(false);
        }

        await updateArticle({
          id: articleId,
          ...formData,
          featuredImage: imageUrl,
        });

        router.push("/admin/articles");
      } catch (error) {
        console.error("Error updating article:", error);
        setIsUploading(false);
      }
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-[#b5b5f6]" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30">
            <FileText className="h-6 w-6 text-[#b5b5f6]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] bg-clip-text text-transparent">
              Edit Article
            </h1>
            <p className="text-gray-400 mt-1">Update your article</p>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <Card className="bg-gray-900/50 border-gray-800 shadow-2xl backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#b5b5f6]" />
            Article Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter article title"
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleChange("category", value)}
              >
                <SelectTrigger className="bg-gray-800/50 border-gray-700 text-white focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent className="bg-gray-800 border-gray-700">
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                      className="text-white hover:bg-gray-700"
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label className="text-gray-300">Featured Image</Label>
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg border border-gray-700"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center hover:border-[#b5b5f6]/50 transition-colors">
                  <input
                    type="file"
                    id="featuredImage"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <label
                    htmlFor="featuredImage"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <Upload className="h-10 w-10 text-gray-500 mb-2" />
                    <span className="text-gray-400">
                      Click to upload an image
                    </span>
                  </label>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="text-gray-300">Content</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="Write your article content here..."
                className="min-h-[300px] bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20 resize-none"
                required
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={isPending || isUploading}
                className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-black hover:from-[#c5c5f8] hover:to-[#f8cff6] transition-all duration-300 transform hover:scale-105"
              >
                {isPending || isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isUploading ? "Uploading..." : "Saving..."}
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button type="button" variant="outline" asChild>
                <Link href="/admin/articles">Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}