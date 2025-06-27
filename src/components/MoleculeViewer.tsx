import { useEffect, useRef, useState } from "react";
import * as $3Dmol from "3dmol";
import confetti from "canvas-confetti";

const MoleculeViewer = ({ smiles }: { smiles: string }) => {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!viewerRef.current) return;
    const element = viewerRef.current;
    setVisible(false);

    setTimeout(() => {
      element.innerHTML = "";

      const viewer = $3Dmol.createViewer(element, {
        backgroundColor: "white",
      });

      // Use VITE_BACKEND_URL from .env
      fetch(`${import.meta.env.VITE_BACKEND_URL}/sdf`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ smiles }),
      })
        .then((res) => res.text())
        .then((sdf) => {
          viewer.addModel(sdf, "sdf");
          viewer.setStyle({}, { stick: {}, sphere: { scale: 0.3 } });
          viewer.zoomTo();
          viewer.render();
          setVisible(true);

          if (smiles === "Cl[Na]") {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 },
              colors: ["#a78bfa", "#ec4899"],
            });
          }
        })
        .catch((err) => {
          console.error("Error loading 3D model:", err);
        });
    }, 300);
  }, [smiles]);

  return (
    <div className="text-center">
      <div className="mb-4 text-sm text-gray-600">
        SMILES:{" "}
        <code className="bg-gray-100 px-2 py-1 rounded font-mono">{smiles}</code>
      </div>
      <div className="mb-4 text-sm text-gray-600 italic">
        {smiles === "Cl[Na]"
          ? "End product is NaCl — a neutral salt."
          : smiles === "C1=CC=C(C=C1)C(C(=O)O)=C(C2=CC=CC=C2)O"
          ? "NaOH is added — solution turns pink."
          : smiles === "C20H14O4"
          ? "HCl and phenolphthalein — initially colorless."
          : ""}
      </div>
     <div
  ref={viewerRef}
  className={`relative z-0 w-[400px] h-[400px] max-w-full mx-auto border border-gray-200 rounded-lg overflow-hidden transition-opacity duration-700 ${
    visible ? "opacity-100" : "opacity-0"
  }`}
/>

      
    </div>
  );
};

export default MoleculeViewer;
