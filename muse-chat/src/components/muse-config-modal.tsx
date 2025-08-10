"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AvatarUpload } from "@/components/avatar-upload";
import { MuseConfig } from "@/types/muse";
import { MODEL_OPTIONS, NARRATION_LENGTHS, DEFAULT_MUSE_CONFIG } from "@/lib/constants";
import { ElevenLabsService, VoiceOption } from "@/lib/elevenlabs-service";

interface MuseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (config: MuseConfig) => void;
  initialConfig?: MuseConfig;
}

export function MuseConfigModal({
  isOpen,
  onClose,
  onSave,
  initialConfig,
}: MuseConfigModalProps) {
  const [config, setConfig] = useState<Partial<MuseConfig>>({
    ...DEFAULT_MUSE_CONFIG,
    ...initialConfig,
  });
  const [voices, setVoices] = useState<VoiceOption[]>([]);
  const [loadingVoices, setLoadingVoices] = useState(false);

  useEffect(() => {
    if (initialConfig) {
      setConfig({ ...DEFAULT_MUSE_CONFIG, ...initialConfig });
    }
  }, [initialConfig]);

  useEffect(() => {
    // Load voices when modal opens
    if (isOpen) {
      setLoadingVoices(true);
      ElevenLabsService.getVoices()
        .then(setVoices)
        .catch(console.error)
        .finally(() => setLoadingVoices(false));
    }
  }, [isOpen]);

  const handleSave = () => {
    const fullConfig: MuseConfig = {
      id: initialConfig?.id || crypto.randomUUID(),
      name: config.name || DEFAULT_MUSE_CONFIG.name,
      title: config.title || DEFAULT_MUSE_CONFIG.title,
      description: config.description || DEFAULT_MUSE_CONFIG.description,
      systemPrompt: config.systemPrompt || DEFAULT_MUSE_CONFIG.systemPrompt,
      model: config.model || DEFAULT_MUSE_CONFIG.model,
      temperature: config.temperature ?? DEFAULT_MUSE_CONFIG.temperature,
      maxTokens: config.maxTokens || DEFAULT_MUSE_CONFIG.maxTokens,
      elevenlabsVoiceId: config.elevenlabsVoiceId || DEFAULT_MUSE_CONFIG.elevenlabsVoiceId,
      narrationLength: config.narrationLength || DEFAULT_MUSE_CONFIG.narrationLength,
      avatarUrl: config.avatarUrl,
      createdAt: initialConfig?.createdAt || new Date(),
      updatedAt: new Date(),
    };
    onSave(fullConfig);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {initialConfig ? 'Edit Muse Configuration' : 'Create New Muse'}
          </DialogTitle>
          <DialogDescription>
            Configure your Muse&apos;s personality, behavior, and voice settings.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Avatar Upload */}
          <div className="grid gap-4">
            <Label>Avatar</Label>
            <AvatarUpload
              currentAvatarUrl={config.avatarUrl}
              onAvatarChange={(avatarUrl) => setConfig(prev => ({ ...prev, avatarUrl }))}
              name={config.name || 'Muse'}
            />
          </div>

          {/* Basic Info */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={config.name || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter muse name"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={config.title || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter muse title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={config.description || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your muse&apos;s personality and role"
                rows={3}
              />
            </div>
          </div>

          {/* AI Configuration */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="model">AI Model</Label>
              <Select
                value={config.model}
                onValueChange={(value) => setConfig(prev => ({ ...prev, model: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent>
                  {MODEL_OPTIONS.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name} ({model.provider})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Temperature: {config.temperature ?? 0.7}</Label>
              <Slider
                value={[config.temperature ?? 0.7]}
                onValueChange={(value) => setConfig(prev => ({ ...prev, temperature: value[0] }))}
                max={1}
                min={0}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Focused</span>
                <span>Creative</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxTokens">Max Response Length</Label>
              <Input
                id="maxTokens"
                type="number"
                value={config.maxTokens || ''}
                onChange={(e) => setConfig(prev => ({ ...prev, maxTokens: parseInt(e.target.value) || 1000 }))}
                placeholder="1000"
                min="100"
                max="4000"
              />
            </div>
          </div>

          {/* Voice Configuration */}
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="narrationLength">Narration Length</Label>
              <Select
                value={config.narrationLength}
                onValueChange={(value: 'short' | 'medium' | 'long') => 
                  setConfig(prev => ({ ...prev, narrationLength: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select narration length" />
                </SelectTrigger>
                <SelectContent>
                  {NARRATION_LENGTHS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="voiceId">ElevenLabs Voice</Label>
              <Select
                value={config.elevenlabsVoiceId || ''}
                onValueChange={(value) => setConfig(prev => ({ ...prev, elevenlabsVoiceId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingVoices ? "Loading voices..." : "Select a voice (optional)"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No TTS (Text only)</SelectItem>
                  {voices.map((voice) => (
                    <SelectItem key={voice.voice_id} value={voice.voice_id}>
                      {voice.name} ({voice.category})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select a voice to enable text-to-speech narration. Leave unselected to disable audio.
              </p>
            </div>
          </div>

          {/* System Prompt */}
          <div className="grid gap-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Textarea
              id="systemPrompt"
              value={config.systemPrompt || ''}
              onChange={(e) => setConfig(prev => ({ ...prev, systemPrompt: e.target.value }))}
              placeholder="Enter the system prompt that defines your muse&apos;s behavior"
              rows={5}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            {initialConfig ? 'Save Changes' : 'Create Muse'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}