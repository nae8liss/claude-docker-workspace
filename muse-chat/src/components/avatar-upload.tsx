"use client";

import { useState, useRef, useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label"; // Unused
import { Upload, X } from "lucide-react";
import ReactCrop, { Crop, PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface AvatarUploadProps {
  currentAvatarUrl?: string;
  onAvatarChange: (avatarUrl: string | undefined) => void;
  name: string;
}

export function AvatarUpload({ currentAvatarUrl, onAvatarChange, name }: AvatarUploadProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>({
    unit: '%',
    width: 90,
    height: 90,
    x: 5,
    y: 5
  });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setSelectedImage(reader.result as string);
        setIsModalOpen(true);
      });
      reader.readAsDataURL(file);
    }
  };

  const getCroppedImg = useCallback(
    (image: HTMLImageElement, crop: PixelCrop): Promise<string> => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        throw new Error('No 2d context');
      }

      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      
      // Set canvas size to reasonable avatar dimensions
      const targetSize = 200; // 200x200 max for avatar
      canvas.width = Math.min(crop.width, targetSize);
      canvas.height = Math.min(crop.height, targetSize);

      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        canvas.width,
        canvas.height
      );

      return new Promise((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result as string));
            reader.readAsDataURL(blob);
          }
        }, 'image/jpeg', 0.8); // Reduced quality for smaller file size
      });
    },
    []
  );

  const handleSaveCrop = async () => {
    if (completedCrop && imgRef.current) {
      try {
        const croppedImage = await getCroppedImg(imgRef.current, completedCrop);
        onAvatarChange(croppedImage);
        setIsModalOpen(false);
        setSelectedImage(null);
      } catch (error) {
        console.error('Error cropping image:', error);
      }
    }
  };

  const handleRemoveAvatar = () => {
    onAvatarChange(undefined);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={currentAvatarUrl} alt={name} />
          <AvatarFallback className="text-lg">
            {name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Avatar
          </Button>
          
          {currentAvatarUrl && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveAvatar}
            >
              <X className="h-4 w-4 mr-2" />
              Remove
            </Button>
          )}
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Crop Avatar</DialogTitle>
          </DialogHeader>
          
          <div className="flex flex-col items-center gap-4">
            {selectedImage && (
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
                minWidth={50}
                minHeight={50}
                circularCrop
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imgRef}
                  alt="Crop preview"
                  src={selectedImage}
                  className="max-w-full max-h-[400px] object-contain"
                  onLoad={() => {
                    // Set initial crop to center square
                    if (imgRef.current) {
                      const { width, height } = imgRef.current;
                      const size = Math.min(width, height);
                      const x = (width - size) / 2;
                      const y = (height - size) / 2;
                      
                      setCrop({
                        unit: 'px',
                        width: size * 0.8,
                        height: size * 0.8,
                        x: x + size * 0.1,
                        y: y + size * 0.1
                      });
                    }
                  }}
                />
              </ReactCrop>
            )}
            
            <p className="text-sm text-muted-foreground text-center">
              Drag to reposition the crop area. The image will be cropped to a circle.
            </p>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSaveCrop} disabled={!completedCrop}>
              Save Avatar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}