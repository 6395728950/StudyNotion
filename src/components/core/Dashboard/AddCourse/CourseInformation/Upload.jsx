import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
// import { useSelector } from "react-redux";
import "video-react/dist/video-react.css";
import { Player } from "video-react";

export default function Upload({
  name,
  label,
  register,
  setValue,  // ✅ Corrected from setvalue
  errors,
  video = false,
  viewData = null,
  editData = null,
}) {
  // const { course } = useSelector((state) => state.course);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(
    viewData ? viewData : editData ? editData : ""
  );
  const inputRef = useRef(null);
  console.log("video in upload function",video);

   
  useEffect(() => {
    console.log("Selected file updated:", selectedFile);
  }, [selectedFile]); // Log after state update

  // useEffect(() => {
  //   console.log("Selected file updated:", previewSource);
  // }, [previewSource]); 
  // Handle file selection

  const onDrop = (acceptedFiles) => {
    console.log("Check the accepted file:", acceptedFiles);
    const file = acceptedFiles[0];
    console.log("Check the file:", file);
    if (acceptedFiles.length > 0) {
      previewFile(file);
      setSelectedFile(file); // State update is scheduled here
      console.log("Check the selected file (temporary):", file); // Log the file directly
    }
  };
    
  // Configure dropzone
 
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop,
  })

  // File preview logic
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    }
   
  };

  // Register field with react-hook-form
  useEffect(() => {
    console.log("value in name",name);
    register(name, { required: true });
  }, [register]);

  // Set selected file in react-hook-form

  // console.log("setvalue ka type",typeof setValue);
  useEffect(() => {
    if (setValue && typeof setValue === "function") {
      setValue(name, selectedFile);
    }
  }, [selectedFile, setValue]);

  // Trigger file input on icon click
  const handleBrowseClick = () => {
    inputRef.current.click();
  };
  console.log("preview source",previewSource);
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm text-left opacity-90" htmlFor={name}>
        {label} {!viewData && <sup className="text-pink-200">*</sup>}
      </label>

      <div
         
        className={`${
          isDragActive ? "bg-richblack-600" : "bg-richblack-700"
        } flex min-h-[250px] cursor-pointer items-center justify-center rounded-md border-2 border-dotted border-richblack-500`}
      >
        {previewSource ? (
          <div className="flex w-full flex-col p-6">
            {!video ? (
              <img
                src={previewSource}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
              <Player aspectRatio="16:9" playsInline src={previewSource} />
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewSource("");
                  setSelectedFile(null);
                  setValue(name, null);
                }}
                className="mt-3 text-richblack-400 underline"
              >
                Cancel
              </button>
            )}
          </div>
        ) : (
          <div className="flex w-full flex-col items-center p-6"
           {...getRootProps()}>
            <input
              {...getInputProps()}
              ref={inputRef}
                 
            />
            <div
              onClick={handleBrowseClick}  // ✅ Trigger file input on icon click
              className="grid aspect-square w-14 place-items-center rounded-full bg-pure-greys-800 cursor-pointer"
            >
              <FiUploadCloud className="text-2xl text-yellow-50" />
            </div>

            <p className="mt-2 max-w-[200px] text-center text-sm text-richblack-200" onClick={handleBrowseClick}>
              Drag and drop a {!video ? "image" : "video"}, or click to{" "}
              <span className="font-semibold text-yellow-50">Browse</span> a
              file
            </p>

            <ul className="mt-10 flex list-disc justify-between space-x-12 text-center text-xs text-richblack-200">
              <li>Aspect ratio 16:9</li>
              <li>Recommended size 1024x576</li>
            </ul>
          </div>
        )}
      </div>

      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  );
}
  
 

   
 