import "./Share.css";
import AddImgs from "../icons/AddImgsIcon";
import AddPicture from "../icons/AddPicture";
import RightArrow from "../icons/RightArrow";
import { useRef, useState } from "react";
import { uploadPhoto } from "../../services/fileService";

// Type definitions for props
interface DescriptionProps {
  finish: boolean;
  dayNumber: number;
  onClickRightArrow: () => void;
  onClickLastDay: (num: number) => void;
  updateDescriptions: (descriptions: string[]) => void;
  updateTripPhotos: (newPhotos: string[]) => void;
  handleFinish: () => void;
}

function Description({
  finish,
  dayNumber,
  updateDescriptions,
  updateTripPhotos,
  onClickRightArrow,
  onClickLastDay,
  handleFinish,
}: DescriptionProps) {
  const [num, setNum] = useState(1);
  const [descriptions, setDescriptions] = useState(Array(dayNumber).fill(""));
  const [tripPhotos, setTripPhotos] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  // Handles local file selection and uploads to server
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      await handleUploadImage(file); // Upload file immediately after selection
    }
  };

  // Uploads image to server and updates state with new image URL
  const handleUploadImage = async (imgFile: File) => {
    try {
      const uploadedUrl = await uploadPhoto(imgFile);
      setTripPhotos((currentPhotos) => [...currentPhotos, uploadedUrl]);
      updateTripPhotos([...tripPhotos, uploadedUrl]); // Update parent component with new photo URLs
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
    }
  };

  // Updates description for the current day
  const updateDescription = (day: number, newDescription: string) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[day - 1] = newDescription;
    setDescriptions(updatedDescriptions);
  };

  // Navigation to next or previous day
  const updateNextDay = () => {
    updateDescriptions(descriptions);
    if (num < dayNumber) setNum(num + 1);
    if (num === dayNumber) onClickLastDay(num);
  };
  const updateDayBefore = () => {
    if (num > 1) setNum(num - 1);
  };

  return (
    <section className="container">
      <RightArrow onClickRightArrow={onClickRightArrow} />
      <textarea
        className="description-box"
        placeholder={`Share with us what you did on day ${num}`}
        value={descriptions[num - 1]}
        onChange={(e) => updateDescription(num, e.target.value)}
      ></textarea>
      <input
        type="file"
        ref={imgRef}
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <div className="icons-description-box">
        <div onClick={() => imgRef.current?.click()}>
          <AddImgs /> {/* Icon for adding images */}
        </div>
        <AddPicture /> {/* Placeholder for future functionality */}
      </div>
      {!finish ? (
        <div className="change-day-description-block">
          <p onClick={updateNextDay} className="change-day-description">
            Next day
          </p>
          {num > 1 && (
            <p onClick={updateDayBefore} className="change-day-description">
              Day before
            </p>
          )}
        </div>
      ) : (
        <p className="change-day-description" onClick={handleFinish}>
          Send
        </p>
      )}
    </section>
  );
}

export default Description;
