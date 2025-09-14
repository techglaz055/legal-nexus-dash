import React, { useState, useCallback, useEffect } from 'react';
import { mockApi } from '@/lib/mockApi';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  X, 
  FileText, 
  CheckCircle, 
  AlertCircle,
  Loader2
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface UploadFile {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  message?: string;
}

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose }) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  // Handle drag and drop
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    addFiles(droppedFiles);
  }, []);

  // Handle file selection
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    addFiles(selectedFiles);
  }, []);

  // Add files to upload queue
  const addFiles = (newFiles: File[]) => {
    const uploadFiles: UploadFile[] = newFiles.map(file => ({
      file,
      status: 'pending',
      progress: 0,
    }));
    
    setFiles(prev => [...prev, ...uploadFiles]);
    
    // Start uploading immediately
    uploadFiles.forEach((fileToUpload, index) => {
      setTimeout(() => {
        uploadSingleFile(fileToUpload);
      }, index * 500); // Stagger uploads
    });
  };

  // Upload a single file
  const uploadSingleFile = async (uploadFile: UploadFile) => {
    setFiles(prev => 
      prev.map(f => 
        f.file === uploadFile.file 
          ? { ...f, status: 'uploading', progress: 0 }
          : f
      )
    );

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setFiles(prev => 
        prev.map(f => 
          f.file === uploadFile.file && f.status === 'uploading'
            ? { ...f, progress: Math.min(f.progress + Math.random() * 20, 90) }
            : f
        )
      );
    }, 200);

    try {
      const result = await mockApi.uploadFile(uploadFile.file);
      
      clearInterval(progressInterval);
      
      setFiles(prev => 
        prev.map(f => 
          f.file === uploadFile.file 
            ? { 
                ...f, 
                status: result.success ? 'success' : 'error',
                progress: 100,
                message: result.message 
              }
            : f
        )
      );

      if (result.success) {
        toast({
          title: "Upload successful",
          description: `${uploadFile.file.name} has been uploaded successfully.`,
        });
      } else {
        toast({
          title: "Upload failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      clearInterval(progressInterval);
      
      setFiles(prev => 
        prev.map(f => 
          f.file === uploadFile.file 
            ? { 
                ...f, 
                status: 'error',
                progress: 0,
                message: 'Upload failed - please try again' 
              }
            : f
        )
      );
    }
  };

  // Remove file from list
  const removeFile = (fileToRemove: File) => {
    setFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  // Retry upload
  const retryUpload = (uploadFile: UploadFile) => {
    uploadSingleFile(uploadFile);
  };

  // Clear all files
  const clearAll = () => {
    setFiles([]);
  };

  // Close modal and clear files
  const handleClose = () => {
    setFiles([]);
    onClose();
  };

  const getFileIcon = (status: UploadFile['status']) => {
    switch (status) {
      case 'uploading':
        return <Loader2 className="h-5 w-5 animate-spin text-primary" />;
      case 'success':
        return <CheckCircle className="h-5 w-5 text-success" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-hidden animate-scale-in">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center">
              <Upload className="mr-2 h-5 w-5" />
              Upload Contracts
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={handleClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-8 text-center transition-colors animate-fast",
              isDragOver 
                ? "border-primary bg-primary-light" 
                : "border-muted-foreground/25 hover:border-primary/50"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">
                Drop files here or click to browse
              </h3>
              <p className="text-muted-foreground">
                Support for PDF, DOC, DOCX files up to 10MB each
              </p>
            </div>
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept=".pdf,.doc,.docx"
              onChange={handleFileSelect}
            />
            <Button 
              variant="outline" 
              className="mt-4 hover-lift"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              Browse Files
            </Button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Upload Queue ({files.length})</h4>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={clearAll}
                  className="hover-lift"
                >
                  Clear All
                </Button>
              </div>
              
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {files.map((uploadFile, index) => (
                  <div 
                    key={`${uploadFile.file.name}-${index}`}
                    className="flex items-center space-x-3 p-3 border rounded-lg animate-fade-in hover-lift"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {getFileIcon(uploadFile.status)}
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">
                          {uploadFile.file.name}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {formatFileSize(uploadFile.file.size)}
                        </span>
                      </div>
                      
                      {uploadFile.status === 'uploading' && (
                        <Progress value={uploadFile.progress} className="h-2" />
                      )}
                      
                      {uploadFile.message && (
                        <p className={cn(
                          "text-xs mt-1",
                          uploadFile.status === 'success' 
                            ? "text-success" 
                            : "text-destructive"
                        )}>
                          {uploadFile.message}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {uploadFile.status === 'error' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => retryUpload(uploadFile)}
                          className="hover-lift"
                        >
                          Retry
                        </Button>
                      )}
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFile(uploadFile.file)}
                        className="hover-lift"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};