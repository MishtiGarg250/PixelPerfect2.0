"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Loader2, X, FileText, ArrowLeft, ImageIcon } from "lucide-react";
import Link from "next/link";
import { MarkdownEditor } from "@/components/markdown-editor";

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

        if (selectedFile) {
          setIsUploading(true);
          imageUrl = await uploadToCloudinary(selectedFile);
          setIsUploading(false);
        }

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
    <div className="min-h-screen bg-[#151218]">
      {/* Header Section */}
      <div className="p-6 pt-18 md:pt-8 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-[#cac4cf] hover:text-[#e6e1e9] hover:bg-[#211f24] rounded-xl"
          >
            <Link href="/admin/articles">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Articles
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-4 md:mb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-[#b5b5f6] to-[#f7bff4] rounded-2xl flex items-center justify-center shadow-lg">
            <FileText className="w-7 h-7 text-[#141318]" />
          </div>
          <div>
            <h1 className="text-[30px] md:text-5xl font-bold text-[#e6e1e9]">
              Create Article
            </h1>
            <p className="text-[#cac4cf] text-sm md:text-[16px] md:mt-2">
              Write a new article with Markdown support
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="px-6 md:px-8 pb-8">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-5xl">
          {/* Title & Category Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-[#211f24] border-[#2b292f]">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-[#e6e1e9]">
                    Article Title
                  </Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    placeholder="Enter a compelling title..."
                    required
                    className="bg-[#1a1a1f] border-[#36343a] text-[#e6e1e9] placeholder-[#938f99] focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20 rounded-xl"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#211f24] border-[#2b292f]">
              <CardContent className="pt-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-[#e6e1e9]">
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger className="bg-[#1a1a1f] border-[#36343a] text-[#e6e1e9] focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20 rounded-xl">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#211f24] border-[#36343a]">
                      {categories.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="text-[#e6e1e9] hover:bg-[#2b292f] focus:bg-[#2b292f]"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Featured Image */}
          <Card className="bg-[#211f24] border-[#2b292f]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#e6e1e9] flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-[#cebdfe]" />
                Featured Image
              </CardTitle>
            </CardHeader>
            <CardContent>
              {previewUrl ? (
                <div className="relative">
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-xl border border-[#36343a]"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-3 right-3 rounded-xl"
                    onClick={handleRemoveFile}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-[#36343a] rounded-xl p-8 text-center hover:border-[#b5b5f6]/50 transition-colors">
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
                    <ImageIcon className="h-12 w-12 text-[#938f99] mb-3" />
                    <span className="text-[#cac4cf] font-medium">
                      Click to upload featured image
                    </span>
                    <span className="text-[#938f99] text-sm mt-1">
                      PNG, JPG, GIF up to 10MB
                    </span>
                  </label>
                </div>
              )}

              {/* Manual URL Input */}
              {!selectedFile && (
                <div className="mt-4">
                  <Label className="text-sm text-[#938f99]">
                    Or enter image URL manually
                  </Label>
                  <Input
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleChange("featuredImage", e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className="mt-2 bg-[#1a1a1f] border-[#36343a] text-[#e6e1e9] placeholder-[#938f99] focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20 rounded-xl"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Content Editor */}
          <Card className="bg-[#211f24] border-[#2b292f]">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg text-[#e6e1e9] flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#cebdfe]" />
                Article Content
              </CardTitle>
              <p className="text-sm text-[#938f99] mt-1">
                Write your article using Markdown. You can format text, add
                code blocks, images, tables, and more.
              </p>
            </CardHeader>
            <CardContent>
              <MarkdownEditor
                value={formData.content}
                onChange={(value) => handleChange("content", value)}
                placeholder=""
                height={500}
              />
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 pt-4">
            <Button
              type="submit"
              disabled={isPending || isUploading}
              className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-[#141318] hover:from-[#c5c5f8] hover:to-[#f8cff6] rounded-xl transition-all duration-300 hover:scale-105"
            >
              {isPending || isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploading ? "Uploading..." : "Creating..."}
                </>
              ) : (
                "Publish Article"
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              asChild
              className="bg-transparent border-[#36343a] text-[#cac4cf] hover:bg-[#2b292f] hover:text-[#e6e1e9] rounded-xl"
            >
              <Link href="/admin/articles">Cancel</Link>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}