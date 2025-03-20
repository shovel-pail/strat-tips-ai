
import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, File, X, Check, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type FileUploadProps = {
  onFileProcessed: (data: any) => void;
  className?: string;
};

export function FileUpload({ onFileProcessed, className }: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allowedFileTypes = [
    'application/pdf',
    'text/csv',
    'application/vnd.ms-excel'
  ];

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file: File) => {
    if (!allowedFileTypes.includes(file.type)) {
      toast.error('Invalid file type', {
        description: 'Please upload a PDF or CSV file.'
      });
      return false;
    }
    
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      toast.error('File too large', {
        description: 'Maximum file size is 10MB.'
      });
      return false;
    }
    
    return true;
  };

  const processFile = async (file: File) => {
    setUploading(true);
    setUploadedFile(file);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev + 5;
        if (newProgress >= 100) {
          clearInterval(interval);
          
          // Simulate processing delay
          setTimeout(() => {
            setUploading(false);
            
            // Mock data extraction for demonstration
            const mockData = {
              fileName: file.name,
              fileSize: file.size,
              fileType: file.type,
              customers: [
                { name: 'John Doe', email: 'john@example.com', phone: '555-1234', address: '123 Main St' },
                { name: 'Jane Smith', email: 'jane@example.com', phone: '555-5678', address: '456 Oak Ave' },
                // Add more mock customers as needed
              ]
            };
            
            onFileProcessed(mockData);
            toast.success('File processed successfully', {
              description: `Extracted ${mockData.customers.length} customer records.`
            });
          }, 800);
        }
        return newProgress;
      });
    }, 120);
    
    // In a real application, you would process the file here
    // const formData = new FormData();
    // formData.append('file', file);
    // const response = await fetch('/api/process-file', { method: 'POST', body: formData });
    // const data = await response.json();
    // onFileProcessed(data);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        processFile(file);
      }
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const cancelUpload = () => {
    setUploading(false);
    setUploadProgress(0);
    setUploadedFile(null);
  };

  return (
    <div className={cn("w-full", className)}>
      <div 
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 transition-all duration-200 ease-in-out",
          dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-secondary/50",
          "flex flex-col items-center justify-center text-center",
          uploadedFile ? "bg-secondary/30" : ""
        )}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.csv,.xls,.xlsx"
          className="hidden"
          onChange={handleChange}
          disabled={uploading}
        />
        
        {!uploadedFile ? (
          <>
            <div className="w-16 h-16 mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-lg font-medium mb-2">Upload your file</h3>
            <p className="text-sm text-muted-foreground mb-4 max-w-md">
              Drag and drop your PDF or CSV file, or click to browse. We'll extract the customer data for you.
            </p>
            <Button
              onClick={handleButtonClick}
              className="relative overflow-hidden"
              disabled={uploading}
            >
              Browse Files
            </Button>
            <p className="text-xs text-muted-foreground mt-4">
              Maximum file size: 10MB
            </p>
          </>
        ) : (
          <div className="w-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center mr-3">
                <File className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 truncate text-left">
                <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / 1024).toFixed(1)} KB • {uploadedFile.type.split('/')[1].toUpperCase()}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                className="ml-2"
                onClick={cancelUpload}
                disabled={uploadProgress === 100}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-full mb-2">
              <Progress value={uploadProgress} className="h-1.5" />
            </div>
            
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>
                {uploadProgress < 100 ? 'Uploading...' : 'Processing file...'}
              </span>
              <span>{uploadProgress}%</span>
            </div>
            
            {uploadProgress === 100 && (
              <div className="mt-3 text-center animate-fade-in">
                <div className="inline-flex items-center px-2.5 py-1.5 text-xs font-medium rounded-full bg-green-50 text-green-700">
                  <Check className="mr-1 h-3 w-3" /> Processing complete
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="mt-3 flex items-start">
        <AlertCircle className="h-4 w-4 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-muted-foreground">
          Your data is securely processed. We don't store your raw files after analysis is complete.
        </p>
      </div>
    </div>
  );
}
