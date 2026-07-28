"use client";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState, useRef } from "react";
import { UploadCloud, FileVideo, X, CheckCircle2, Loader2 } from "lucide-react";
import { useUploadVideo } from "@/hooks/useVideos";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const platforms = [
  { id: 'youtube', name: 'YouTube', color: '#ff0000' },
  { id: 'x', name: 'X (Twitter)', color: '#000000' },
  { id: 'linkedin', name: 'LinkedIn', color: '#0077b5' },
  { id: 'tiktok', name: 'TikTok', color: '#ff0050' },
];

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const uploadMutation = useUploadVideo();
  const router = useRouter();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    if (selectedFile.type.startsWith('video/')) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, ""));
      }
    } else {
      toast.error('Please upload a valid video file.');
    }
  };

  const togglePlatform = (id: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error('Please select a video to upload.');
      return;
    }
    if (!title.trim()) {
      toast.error('Please enter a title for the video.');
      return;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    
    uploadMutation.mutate(formData, {
      onSuccess: (data: any) => {
        toast.success('Video analyzed successfully!');
        router.push(`/reports/${data.id}`);
      },
      onError: (err: any) => {
        const msg = err?.response?.data?.detail || 'Upload failed. Please try again.';
        toast.error(msg);
      }
    });
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-1">Upload Video</h1>
          <p className="text-muted text-sm">Analyze a new video for AI manipulation and authenticity.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Dropzone */}
          {!file ? (
            <div 
              className={`border-2 border-dashed rounded-card p-12 text-center transition-colors cursor-pointer ${isDragging ? 'border-white bg-surface-100' : 'border-border bg-surface-50 hover:bg-surface-100'}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input type="file" className="hidden" ref={fileInputRef} accept="video/*" onChange={(e) => e.target.files && handleFile(e.target.files[0])} />
              <UploadCloud className="w-12 h-12 text-muted mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop your video here</h3>
              <p className="text-muted text-sm">or click to browse from your computer</p>
              <p className="text-xs text-muted mt-4">MP4, MOV, AVI, WEBM up to 2GB</p>
            </div>
          ) : (
            <div className="bg-surface-50 border border-border rounded-card p-6 relative">
              <button 
                type="button" 
                onClick={() => { setFile(null); setPreview(null); }}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors z-10"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4 border border-border">
                {preview && <video src={preview} controls className="w-full h-full object-contain" />}
              </div>
              <div className="flex items-center gap-3">
                <FileVideo className="w-8 h-8 text-white" />
                <div>
                  <h4 className="font-medium text-sm">{file.name}</h4>
                  <p className="text-xs text-muted">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
              </div>
            </div>
          )}

          {/* Details Form */}
          <div className="grid md:grid-cols-2 gap-6 bg-surface-50 border border-border rounded-card p-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title *</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors" 
                  placeholder="Video title" 
                  required 
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select className="w-full bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors text-white">
                  <option>News & Politics</option>
                  <option>Entertainment</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full h-[112px] bg-surface-100 border border-border rounded-btn px-4 py-2 focus:outline-none focus:border-white transition-colors resize-none" 
                placeholder="Video description..." 
              />
            </div>
          </div>

          {/* Auto Publish */}
          <div className="bg-surface-50 border border-border rounded-card p-6">
            <h3 className="text-sm font-medium mb-4">Auto-Publish if Verified Clean (Optional)</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {platforms.map(p => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => togglePlatform(p.id)}
                  className={`p-4 rounded-card border transition-all flex flex-col items-center gap-2 ${selectedPlatforms.includes(p.id) ? 'border-white bg-surface-100' : 'border-border hover:bg-surface-100'}`}
                >
                  <div className="w-8 h-8 rounded-full flex items-center justify-center bg-black border border-border relative">
                    {selectedPlatforms.includes(p.id) && (
                      <div className="absolute -top-1 -right-1 bg-white rounded-full">
                        <CheckCircle2 className="w-3 h-3 text-black" />
                      </div>
                    )}
                  </div>
                  <span className="text-xs font-medium">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <button 
              type="submit" 
              disabled={uploadMutation.isPending || !file}
              className={`px-8 py-3 rounded-btn font-medium transition-colors flex items-center gap-2 ${uploadMutation.isPending || !file ? 'bg-surface-200 text-muted cursor-not-allowed' : 'bg-white text-black hover:bg-gray-200'}`}
            >
              {uploadMutation.isPending && <Loader2 className="w-4 h-4 animate-spin" />}
              {uploadMutation.isPending ? 'Uploading & Analyzing...' : 'Analyze & Verify'}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
