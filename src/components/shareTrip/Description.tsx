import "./Share.css";
import AddImgs from "../icons/AddImgsIcon";
import RightArrow from "../icons/RightArrowIcon";
import { useEffect, useRef, useState } from "react";
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
  const [send, setSend] = useState(false);
  const [descriptions, setDescriptions] = useState(Array(dayNumber).fill(""));
  const [tripPhotos, setTripPhotos] = useState<string[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (dayNumber === 1) {
      setIsLastDay(true);
    }
  }, [dayNumber]);
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
  const [isLastDay, setIsLastDay] = useState(false);
  // Function to update the current day and check if it's the last day
  const updateNextDay = () => {
    updateDescriptions(descriptions);
    if (num < dayNumber) {
      setNum(num + 1);
      setIsLastDay(num + 1 === dayNumber); // Check if it's the last day
    }
    if (num === dayNumber) {
      onClickLastDay(num);
    }
  };

  const updateDayBefore = () => {
    if (num > 1) {
      setNum(num - 1);
      setIsLastDay(false); // If going back, definitely not the last day
    }
  };

  const handleSendclick = () => {
    updateDescriptions(descriptions);
    console.log(` =============descriptions: ${descriptions}`);
    setSend(true);
  };
  return (
    <section className="arrow-in-description-box container">
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
          <AddImgs />
        </div>
      </div>
      {!finish && !isLastDay ? (
        // Buttons for navigating between days when not on the last day and not finished
        <div className="change-day-description-block">
          <p onClick={updateNextDay} className="change-day-button">
            Next Day
          </p>
          {num > 1 && (
            <p onClick={updateDayBefore} className="change-day-button">
              Previous Day
            </p>
          )}
        </div>
      ) : isLastDay ? (
        // Adding "Previous Day" button even on the last day
        <div className="change-day-description-block">
          {!send ? (
            <p className="change-day-button" onClick={handleSendclick}>
              finish
            </p>
          ) : (
            <p className="change-day-button" onClick={handleFinish}>
              send
            </p>
          )}
          <p onClick={updateDayBefore} className="change-day-button">
            Previous Day
          </p>
        </div>
      ) : null}
    </section>
  );
}

export default Description;
