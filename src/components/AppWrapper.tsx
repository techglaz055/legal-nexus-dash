import React, { useState, useEffect } from 'react';
import { UploadModal } from './upload/UploadModal';

interface AppWrapperProps {
  children: React.ReactNode;
}

export const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  useEffect(() => {
    // Listen for upload modal events
    const handleOpenUploadModal = () => {
      setUploadModalOpen(true);
    };

    window.addEventListener('openUploadModal', handleOpenUploadModal);
    
    return () => {
      window.removeEventListener('openUploadModal', handleOpenUploadModal);
    };
  }, []);

  return (
    <>
      {children}
      <UploadModal 
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </>
  );
};