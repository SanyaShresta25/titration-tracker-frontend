import { useRef, useState } from 'react';

const VideoUploader = ({ onVideoLoad }: { onVideoLoad: (video: HTMLVideoElement) => void }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState<string>("");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setUrl(videoURL);
    }
  };

  return (
    <div className="p-4 text-center">
      <label htmlFor="video-upload" className="block font-medium mb-2 text-sm text-gray-700">
        Upload Titration Video
      </label>
      <input
        id="video-upload"
        type="file"
        accept="video/*"
        ref={inputRef}
        onChange={handleUpload}
        aria-label="Upload titration video"
        title="Upload titration video"
        className="mx-auto mb-4"
      />

      {url && (
        <video
          src={url}
          controls
          className="mx-auto rounded-lg shadow-md w-full max-w-3xl"
          onLoadedMetadata={(e) => onVideoLoad(e.currentTarget)}
        />
      )}
    </div>
  );
};

export default VideoUploader;
