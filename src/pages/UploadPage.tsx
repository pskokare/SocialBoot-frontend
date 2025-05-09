import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTask } from '../contexts/TaskContext';
import { useNotification } from '../contexts/NotificationContext';
import Layout from '../components/layout/Layout';
import Button from '../components/ui/Button';
import { Upload, X, CheckCircle, Star } from 'lucide-react';

function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reelsUploaded, setReelsUploaded] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { updateTaskProgress } = useTask();
  const { addNotification } = useNotification();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const videoFiles = newFiles.filter(file => file.type.startsWith('video/'));
    if (videoFiles.length !== newFiles.length) {
      addNotification({
        id: Date.now().toString(),
        title: 'Invalid Files',
        message: 'Only video files are allowed.',
        type: 'error',
      });
    }
    const newPreviews = videoFiles.map(file => URL.createObjectURL(file));
    setFiles(prev => [...prev, ...videoFiles]);
    setPreviews(prev => [...prev, ...newPreviews]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    const newPreviews = [...previews];
    URL.revokeObjectURL(newPreviews[index]);
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    setFiles(newFiles);
    setPreviews(newPreviews);
  };

  const handleUpload = async () => {
    if (files.length === 0) {
      addNotification({
        id: Date.now().toString(),
        title: 'No Files Selected',
        message: 'Please select at least one video to upload.',
        type: 'error',
      });
      return;
    }

    setUploading(true);
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      updateTaskProgress('upload-reels', files.length);
      setReelsUploaded(prev => prev + files.length);
      addNotification({
        id: Date.now().toString(),
        title: 'Upload Complete',
        message: `Successfully uploaded ${files.length} ${files.length === 1 ? 'reel' : 'reels'}.`,
        type: 'success',
      });
    }, 3000);
  };

  return (
    <Layout>
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Upload Reels</h1>
          <p className="text-gray-600">Share your creative content with the community</p>
        </div>

        {/* Upload Area */}
        <div
          className={`mb-8 border-2 border-dashed rounded-lg p-12 text-center ${
            dragging ? 'border-purple-400 bg-purple-50' : 'border-gray-300 hover:border-purple-400'
          } transition-colors duration-200 cursor-pointer`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            multiple
            className="hidden"
          />
          <Upload className={`h-12 w-12 mx-auto mb-4 ${dragging ? 'text-purple-500' : 'text-gray-400'}`} />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {dragging ? 'Drop your files here' : 'Drag & drop your reels here'}
          </h3>
          <p className="text-gray-500 mb-4">or click to browse from your device</p>
          <p className="text-sm text-gray-400">Supported formats: MP4, MOV, AVI, WEBM</p>
        </div>

        {/* Selected Files */}
        {files.length > 0 && (
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Selected Reels ({files.length})</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {files.map((file, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="relative bg-gray-100 w-full h-32 flex items-center justify-center">
                    <video src={previews[index]} className="w-full h-full object-cover" controls />
                    <button
                      className="absolute top-2 right-2 p-1 bg-red-100 rounded-full text-red-600 hover:bg-red-200"
                      onClick={e => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Progress */}
        {uploading && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Uploading reels...</span>
              <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Upload Button */}
        <div className="flex justify-end gap-4">
          <Button variant="outline" disabled={uploading}>
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={files.length === 0 || uploading} isLoading={uploading}>
            {uploading ? 'Uploading...' : 'Upload Reels'}
          </Button>
        </div>

        {/* Enhanced Reward Card */}
        <div className="mt-10 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-300 p-6 rounded-xl shadow-lg text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-stars bg-repeat animate-pulse" />
          <div className="flex items-center gap-3 mb-4 text-black">
            <Star className="h-6 w-6  drop-shadow-lg animate-bounce" />
            <h3 className="text-xl font-extrabold tracking-wide">Earn 5 Coins by Watching Reels</h3>
          </div>
          <div className="flex justify-between items-center mb-2 text-black">
            <span className="text-sm">Progress</span>
            <span className="text-sm font-semibold">{reelsUploaded}/10</span>
          </div>
          <div className="h-3 bg-white bg-opacity-30 rounded-full overflow-hidden text-black">
            <div
              className="h-full bg-green-400 rounded-full transition-all duration-300 text-black"
              style={{ width: `${(reelsUploaded / 10) * 100}%` }}
            ></div>
          </div>
          <div className="mt-4 flex items-start gap-2 text-black">
            <CheckCircle className="h-5 w-5 text-green-200 mt-1" />
            <div>
              <p className="text-sm font-medium">Unlock these rewards after 10 uploads:</p>
              <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                <li>Access exclusive content</li>
                <li>Unlock premium features</li>
                <li>Get bonus coins for your next purchase</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UploadPage;
