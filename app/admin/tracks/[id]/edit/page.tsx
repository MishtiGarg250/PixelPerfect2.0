"use client";

import type React from "react";
import { useState, useTransition, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { updateTrack } from "@/app/actions/tracks";
import { Loader2, Plus, Trash2, ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";

interface RoadmapItem {
  title: string;
  link: string;
}

interface Module {
  title: string;
  items: RoadmapItem[];
}

export default function EditTrackPage() {
  const router = useRouter();
  const params = useParams();
  const trackId = params.id as string;

  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(true);
  const [trackData, setTrackData] = useState({
    title: "",
    description: "",
  });
  const [modules, setModules] = useState<Module[]>([
    {
      title: "",
      items: [{ title: "", link: "" }],
    },
  ]);

  useEffect(() => {
    async function fetchTrack() {
      try {
        const response = await fetch(`/api/tracks/${trackId}`);
        if (response.ok) {
          const track = await response.json();
          setTrackData({
            title: track.title,
            description: track.description,
          });
          if (track.modules && track.modules.length > 0) {
            setModules(
              track.modules.map((module: any) => ({
                title: module.title,
                items:
                  module.items && module.items.length > 0
                    ? module.items.map((item: any) => ({
                        title: item.title,
                        link: item.link || "",
                      }))
                    : [{ title: "", link: "" }],
              }))
            );
          }
        }
      } catch (error) {
        console.error("Error fetching track:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTrack();
  }, [trackId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      id: trackId,
      ...trackData,
      modules: modules
        .filter(
          (module) =>
            module.title.trim() &&
            module.items.some((item) => item.title.trim())
        )
        .map((module) => ({
          ...module,
          items: module.items.filter((item) => item.title.trim()),
        })),
    };

    if (formData.modules.length === 0) {
      alert("Please add at least one module with items");
      return;
    }

    startTransition(async () => {
      await updateTrack(formData);
      router.push("/admin/tracks");
    });
  };

  const addModule = () => {
    setModules([...modules, { title: "", items: [{ title: "", link: "" }] }]);
  };

  const removeModule = (moduleIndex: number) => {
    setModules(modules.filter((_, index) => index !== moduleIndex));
  };

  const updateModule = (moduleIndex: number, field: string, value: string) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex] = {
      ...updatedModules[moduleIndex],
      [field]: value,
    };
    setModules(updatedModules);
  };

  const addItem = (moduleIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].items.push({ title: "", link: "" });
    setModules(updatedModules);
  };

  const removeItem = (moduleIndex: number, itemIndex: number) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].items = updatedModules[
      moduleIndex
    ].items.filter((_, index) => index !== itemIndex);
    setModules(updatedModules);
  };

  const updateItem = (
    moduleIndex: number,
    itemIndex: number,
    field: string,
    value: string
  ) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].items[itemIndex] = {
      ...updatedModules[moduleIndex].items[itemIndex],
      [field]: value,
    };
    setModules(updatedModules);
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
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-gray-300 hover:text-white"
          >
            <Link href="/admin/tracks">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tracks
            </Link>
          </Button>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-r from-[#b5b5f6]/20 to-[#f7bff4]/20 border border-[#b5b5f6]/30">
            <BookOpen className="h-6 w-6 text-[#b5b5f6]" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] bg-clip-text text-transparent">
              Edit Learning Track
            </h1>
            <p className="text-gray-400 mt-1">Update your learning track</p>
          </div>
        </div>
      </div>

      <Card className="bg-gray-900/50 border-gray-800 shadow-2xl backdrop-blur-sm">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-xl text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-[#b5b5f6]" />
            Track Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Track Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">
                Track Information
              </h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300">
                    Track Title
                  </Label>
                  <Input
                    id="title"
                    value={trackData.title}
                    onChange={(e) =>
                      setTrackData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    placeholder="e.g., Frontend Development"
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={trackData.description}
                    onChange={(e) =>
                      setTrackData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe what this learning track covers..."
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator className="bg-gray-800" />

            {/* Modules */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Modules</h3>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addModule}
                  className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-[#b5b5f6]/50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>

              {modules.map((module, moduleIndex) => (
                <Card
                  key={moduleIndex}
                  className="border-2 border-gray-700 bg-gray-800/30"
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base text-white">
                        Module {moduleIndex + 1}
                      </CardTitle>
                      {modules.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeModule(moduleIndex)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 hover:border-red-500/50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Module Title</Label>
                      <Input
                        value={module.title}
                        onChange={(e) =>
                          updateModule(moduleIndex, "title", e.target.value)
                        }
                        placeholder="e.g., HTML & CSS Basics"
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium text-gray-300">
                          Learning Items
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addItem(moduleIndex)}
                          className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </div>

                      {module.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 border border-gray-700 rounded-lg bg-gray-900/50"
                        >
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-400">
                              Item Title
                            </Label>
                            <Input
                              value={item.title}
                              onChange={(e) =>
                                updateItem(
                                  moduleIndex,
                                  itemIndex,
                                  "title",
                                  e.target.value
                                )
                              }
                              placeholder="e.g., HTML Semantics"
                              className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs text-gray-400">
                                Resource Link (Optional)
                              </Label>
                              {module.items.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeItem(moduleIndex, itemIndex)
                                  }
                                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-6 w-6 p-0"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              )}
                            </div>
                            <Input
                              value={item.link}
                              onChange={(e) =>
                                updateItem(
                                  moduleIndex,
                                  itemIndex,
                                  "link",
                                  e.target.value
                                )
                              }
                              placeholder="https://example.com/resource"
                              className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-gradient-to-r from-[#b5b5f6] to-[#f7bff4] text-black hover:from-[#c5c5f8] hover:to-[#f8cff6] transition-all duration-300 transform hover:scale-105"
              >
                {isPending && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800/50 hover:text-white hover:border-[#b5b5f6]/50"
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