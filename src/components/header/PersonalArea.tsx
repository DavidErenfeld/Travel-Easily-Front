import { useEffect, useRef, useState } from "react";
import CloseIcon from "../icons/CloseIcon";
import { uploadPhoto } from "../../services/fileService";
import EditIcon from "../icons/EditIcon";
import { updateUser } from "../../services/usersService";

interface PersonalAreaProps {
  imgUrl: string;
  goToMainPage: () => void;
}

function PersonalArea({ imgUrl, goToMainPage }: PersonalAreaProps) {
  const imgRef = useRef<HTMLInputElement>(null);
  const userName = localStorage.getItem("userName") || "";
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [imgSrc, setImgSrc] = useState(imgUrl);
  const [isButtonClicede, setButtonClicede] = useState(false);
  const loggedUserId = localStorage.getItem("loggedUserId");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setButtonClicede(true);
      setImgFile(e.target.files[0]);
      setImgSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onClickSave = async () => {
    if (imgFile) {
      imgUrl = (await handleUploadImage(imgFile)) || "";
    }
    try {
      const response = await updateUser(loggedUserId || "", { imgUrl: imgUrl });
      console.log(response);
      setButtonClicede(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUploadImage = async (imgFile: File) => {
    try {
      const uploadedUrl = await uploadPhoto(imgFile);
      console.log(`Image uploaded successfully: ${uploadedUrl}`);
      return uploadedUrl;
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image.");
      return null;
    }
  };

  useEffect(() => {
    return () => {
      if (imgSrc) URL.revokeObjectURL(imgSrc);
    };
  }, [imgSrc]);

  return (
    <>
      <section className="personal-area-section">
        <input
          type="file"
          name="img"
          ref={imgRef}
          style={{ display: "none" }}
          onChange={handleChange}
        />
        <div className="close-icon">
          <CloseIcon onClick={goToMainPage} />
        </div>
        <img className="profile-img" src={imgSrc} alt="img profile" />
        <p className="profile-name">{userName}</p>
        <div className="edit-box">
          <button onClick={() => imgRef.current?.click()} className="btn-edit">
            Edit picture
          </button>
          {isButtonClicede && (
            <button onClick={onClickSave} className="btn-edit">
              Save
            </button>
          )}
        </div>
      </section>
    </>
  );
}
export default PersonalArea;
