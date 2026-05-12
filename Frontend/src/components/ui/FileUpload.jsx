import React, { useState, useRef } from 'react';
import { Upload as UploadIcon, FileText, X, CheckCircle, Loader2 } from 'lucide-react';
import Button from './Button';
import { motion, AnimatePresence } from 'framer-motion';

const FileUpload = ({ onUpload, loading, error }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const selectedFile = e.dataTransfer.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const clearFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className={`relative group border-2 border-dashed rounded-2xl p-12 transition-all duration-300 flex flex-col items-center justify-center
          ${file ? 'border-primary-500 bg-primary-50/30' : 'border-slate-200 hover:border-primary-400 hover:bg-slate-50'}
        `}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".pdf,.docx"
          className="hidden"
        />

        <AnimatePresence mode="wait">
          {!file ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <UploadIcon size={32} />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">Upload your resume</h3>
              <p className="text-slate-500 mb-6">Supports PDF and DOCX files (max 5MB)</p>
              <Button onClick={() => fileInputRef.current.click()}>
                Select File
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full flex flex-col items-center"
            >
              <div className="w-full bg-white border border-slate-100 shadow-premium rounded-xl p-4 flex items-center mb-6">
                <div className="w-10 h-10 bg-primary-50 text-primary-600 rounded-lg flex items-center justify-center mr-4">
                  <FileText size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-800 truncate">{file.name}</p>
                  <p className="text-xs text-slate-500">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  onClick={clearFile}
                  className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => onUpload(file)} 
                  loading={loading}
                  icon={loading ? null : CheckCircle}
                >
                  {loading ? 'Analyzing with AI...' : 'Parse Resume'}
                </Button>
                {!loading && (
                  <Button variant="secondary" onClick={clearFile}>
                    Cancel
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] rounded-2xl flex flex-col items-center justify-center z-10">
            <Loader2 className="w-10 h-10 text-primary-600 animate-spin mb-4" />
            <p className="text-lg font-bold text-slate-800">Processing with AI</p>
            <p className="text-sm text-slate-500">This may take a few seconds...</p>
          </div>
        )}
      </div>

      {error && (
        <p className="mt-4 text-center text-sm font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
