import { cn } from "../../utils/cn.js";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 20,
    y: -20,
    opacity: 0.9,
  },
};

export const FileUpload = ({ onChange, resetTrigger }) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);

  const handleFileChange = (newFiles) => {
    if (newFiles.length > 0) {
      const file = newFiles[0]; // Restrict to a single file
      setFiles([file]);
      onChange && onChange([file]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    accept: {
      'image/*': [], // Correct MIME type for all image formats
    },
    maxSize: 5 * 1024 * 1024, // 5MB size limit
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log("File upload error:", error);
    },
  });
  

  // Reset files if resetTrigger changes
  React.useEffect(() => {
    setFiles([]);
  }, [resetTrigger]);

  return (
    <div className=" h-[200px]" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="pt-2 md:p-10 group/file block rounded-lg cursor-pointer w-full h-[220px] md:h-[350px] relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept="image/*"
          onChange={(e) =>
            handleFileChange(Array.from(e.target.files || []))
          }
          className="hidden"
        />
        <div className="absolute inset-0">
          <GridPattern />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="mt-2 md:mt-0 relative z-20 text-slate-200 text-lg font-poppins font-bold">
            Upload file
          </p>
          <p className="relative z-20 text-slate-300 text-base px-4 md:mt-2 text-center font-sans">
            Drag or drop your file here or click to upload. Only one image
            (size &lt; 5MB) is allowed.
          </p>
          <div className="relative w-full px-4 md:mt-10 max-w-xl mx-auto">
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-neutral-800 flex flex-col items-start justify-start md:h-24 p-2 mt-2 md:mt-4 w-full mx-auto rounded-md",
                    "shadow-sm"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-1 md:gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 text-sm bg-neutral-800 text-white shadow-input"
                    >
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </motion.p>
                  </div>
                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center  md:mt-2 justify-between text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-neutral-600 text-slate-100"
                    >
                      {file.type}
                    </motion.p>
 
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
                </motion.div>
              ))}
            {!files.length && (
              <motion.div
                layoutId="file-upload"
                variants={mainVariant}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
                className={cn(
                  "relative group-hover/file:shadow-2xl z-40 bg-neutral-200 flex items-center justify-center h-20 md:h-32 mt-2 md:mt-4 w-full max-w-[120px] md:max-w-[8rem] mx-auto rounded-md",
                  "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
                )}
              >
                {isDragActive ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-neutral-600 flex flex-col items-center"
                  >
                    Drop it
                    <DriveFolderUploadIcon className="h-4 w-4 text-slate-800" />
                  </motion.p>
                ) : (
                  <DriveFolderUploadIcon className="h-4 w-4 text-slate-800" />
                )}
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 30; // Reduced columns for smaller grid
  const rows = 8; // Reduced rows for smaller grid
  return (
    <div className="flex bg-neutral-800 flex-wrap justify-center items-center gap-[1px] md:gap-x-px md:gap-y-px scale-95">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-6 h-6 md:w-10 md:h-10 flex rounded-[1px] md:rounded-[2px] ${
                index % 2 === 0
                  ? "bg-neutral-500"
                  : "bg-neutral-600 shadow-[0px_0px_0px_0px_rgba(0,0,0,1)_inset]"
              }`}
            />
          );
        })
      )}
    </div>
  );
}

