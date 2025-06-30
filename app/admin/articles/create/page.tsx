"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
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
import { createArticle } from "@/app/actions/articles";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Loader2, Upload, X, FileText } from "lucide-react";

const categories = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
  "Mobile",
  "AI/ML",
  "General",
];

export default function CreateArticlePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    featuredImage: "",
  });

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
    setPreviewUrl("");
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        let imageUrl = formData.featuredImage;

        // Upload file to Cloudinary if a file is selected
        if (selectedFile) {
          setIsUploading(true);
          imageUrl = await uploadToCloudinary(selectedFile);
          setIsUploading(false);
        }

        // Create article with the image URL
        await createArticle({
          ...formData,
          featuredImage: imageUrl,
        });
        
        router.push("/admin/articles");
      } catch (error) {
        console.error("Error creating article:", error);
        setIsUploading(false);
      }
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30">
            <FileText className="h-6 w-6 text-[#b5b5f6]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] bg-clip-text text-transparent">
              Create New Article
            </h1>
            <p className="text-gray-400 mt-1">Add a new article to your blog</p>
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
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
                placeholder="Enter article title"
                required
                className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
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
                    <SelectItem key={category} value={category} className="text-white hover:bg-gray-700">
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="featuredImage" className="text-gray-300">Featured Image</Label>
              
              {/* File Upload Section */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      id="featuredImage"
                      type="file"
                      accept="image/*"
                      onChange={handleFileSelect}
                      className="cursor-pointer bg-gray-800/50 border-gray-700 text-white file:bg-[#b5b5f6]/20 file:border-[#b5b5f6]/30 file:text-[#b5b5f6] file:rounded-lg file:px-3 file:py-1 file:mr-4 file:hover:bg-[#b5b5f6]/30 transition-all duration-200"
                    />
                  </div>
                  {selectedFile && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleRemoveFile}
                      className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-red-500/50"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Preview */}
                {previewUrl && (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg border border-gray-700 shadow-lg"
                    />
                  </div>
                )}

                {/* Manual URL Input (fallback) */}
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-sm text-gray-400">
                    Or enter image URL manually
                  </Label>
                  <Input
                    id="imageUrl"
                    value={formData.featuredImage}
                    onChange={(e) => handleChange("featuredImage", e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    disabled={!!selectedFile}
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20 disabled:opacity-50"
                  />
                </div>
              </div>
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
                {(isPending || isUploading) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {isUploading ? "Uploading..." : "Create Article"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-[#b5b5f6]/50 transition-all duration-200"
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
