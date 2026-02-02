"use client";

import type React from "react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { createTrack } from "@/app/actions/tracks";
import { Loader2, Plus, Trash2 } from "lucide-react";

interface RoadmapItem {
  title: string;
  link: string;
}

interface Module {
  title: string;
  items: RoadmapItem[];
}

export default function CreateTrackPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      ...trackData,
      modules: modules
        .filter(
          (module) =>
            module.title.trim() &&
            module.items.some((item) => item.title.trim()),
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
      await createTrack(formData);
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
    value: string,
  ) => {
    const updatedModules = [...modules];
    updatedModules[moduleIndex].items[itemIndex] = {
      ...updatedModules[moduleIndex].items[itemIndex],
      [field]: value,
    };
    setModules(updatedModules);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gray-900/60 border border-gray-800 shadow-2xl">
        <CardHeader className="border-b border-gray-800">
          <CardTitle className="text-white">Create New Learning Track</CardTitle>
        </CardHeader>
        <CardContent className="py-6">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Track Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Track Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-300">Track Title</Label>
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
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-300">Description</Label>
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
                    required
                    className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Modules */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Modules</h3>
                <Button type="button" variant="outline" onClick={addModule} className="border-gray-600 text-gray-300 bg-transparent admin-btn-outline hover:bg-gray-800/20">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>

              {modules.map((module, moduleIndex) => (
                <Card key={moduleIndex} className="bg-gray-900/60 border border-gray-800 hover:bg-gray-900/65 transition-colors">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="px-2 py-1 rounded-md bg-gradient-to-r from-[#b5b5f6]/10 to-[#f7bff4]/10 text-xs text-white font-semibold">
                          Module {moduleIndex + 1}
                        </div>
                      </div>

                      {modules.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300"
                          onClick={() => removeModule(moduleIndex)}
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
                        required
                        className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
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
                          className="border-gray-600 text-gray-300 bg-transparent admin-btn-outline hover:bg-gray-800/20"
                          onClick={() => addItem(moduleIndex)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </div>

                      {module.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-800/40 border border-gray-700 rounded-lg"
                        >
                          <div className="space-y-2">
                            <Label className="text-xs text-gray-300">Item Title</Label>
                            <Input
                              value={item.title}
                              onChange={(e) =>
                                updateItem(
                                  moduleIndex,
                                  itemIndex,
                                  "title",
                                  e.target.value,
                                )
                              }
                              placeholder="e.g., HTML Semantics"
                              className="bg-gray-800/50 border-gray-700 text-white placeholder-gray-400 focus:border-[#b5b5f6]/50 focus:ring-[#b5b5f6]/20"
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs text-gray-300">
                                Resource Link (Optional)
                              </Label>
                              {module.items.length > 1 && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="admin-delete-btn"
                                  onClick={() =>
                                    removeItem(moduleIndex, itemIndex)
                                  }
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
                                  e.target.value,
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
              <Button type="submit" disabled={isPending} className="button-admin">
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Track
              </Button>
              <Button
                type="button"
          
               className="border-red-600 text-red-400 hover:bg-red-600/10"
                onClick={() => router.back()}
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
