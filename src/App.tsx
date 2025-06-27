import { Atom, Beaker, TrendingUp, Upload } from "lucide-react";
import { useState } from "react";
import FrameAnalyzer from "./components/FrameAnalyzer";
import MoleculeViewer from "./components/MoleculeViewer";
import StatusCard from "./components/StatusCard";
import VideoUploader from "./components/VideoUploader";

function App() {
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [smiles, setSmiles] = useState("HCl + phenolphthalein");
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-25 to-blue-50">

      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Titration Analyzer
                </h1>
                <p className="text-sm text-gray-500">Advanced color change detection</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <TrendingUp className="w-4 h-4" />
              <span>Real-time Analysis</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <StatusCard
            icon={Upload}
            title="Video Status"
            value={video ? "Loaded" : "No Video"}
            color="bg-blue-500"
          />
          <StatusCard
            icon={TrendingUp}
            title="Progress"
            value={`${Math.round(progress)}%`}
            color="bg-green-500"
          />
          <StatusCard
            icon={Atom}
            title="Current State"
            value={
              smiles.includes("NaCl")
                ? "Salt"
                : smiles.includes("NaOH")
                ? "Basic (Pink)"
                : "Acidic"
            }
            color="bg-purple-500"
          />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Video Upload + Analyzer */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <Upload className="w-5 h-5 text-purple-600" />
                <span>Video Upload</span>
              </h2>
              <VideoUploader onVideoLoad={setVideo} />
            </div>

            {video && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <span>Analysis Controls</span>
                </h2>
                <FrameAnalyzer
                  video={video}
                  setSmiles={setSmiles}
                  setProgress={setProgress}
                />
              </div>
            )}
          </div>

          {/* Molecule Viewer */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center space-x-2">
              <Atom className="w-5 h-5 text-purple-600" />
              <span>Molecular Structure</span>
            </h2>
            <MoleculeViewer smiles={smiles} />
          </div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Analysis Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-4 rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                style={{ width: `${progress}%` }}
              >
                {progress > 10 && (
                  <span className="text-white text-xs font-medium">
                    {Math.round(progress)}%
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>

  );
}

export default App;
