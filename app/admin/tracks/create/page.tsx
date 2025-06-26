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
      <Card>
        <CardHeader>
          <CardTitle>Create New Learning Track</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Track Basic Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Track Information</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Track Title</Label>
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
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
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
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Modules */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Modules</h3>
                <Button type="button" variant="outline" onClick={addModule}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Module
                </Button>
              </div>

              {modules.map((module, moduleIndex) => (
                <Card key={moduleIndex} className="border-2">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">
                        Module {moduleIndex + 1}
                      </CardTitle>
                      {modules.length > 1 && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeModule(moduleIndex)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Module Title</Label>
                      <Input
                        value={module.title}
                        onChange={(e) =>
                          updateModule(moduleIndex, "title", e.target.value)
                        }
                        placeholder="e.g., HTML & CSS Basics"
                        required
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label className="text-sm font-medium">
                          Learning Items
                        </Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addItem(moduleIndex)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add Item
                        </Button>
                      </div>

                      {module.items.map((item, itemIndex) => (
                        <div
                          key={itemIndex}
                          className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 border rounded-lg"
                        >
                          <div className="space-y-2">
                            <Label className="text-xs">Item Title</Label>
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
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label className="text-xs">
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
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Create Track
              </Button>
              <Button
                type="button"
                variant="outline"
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
