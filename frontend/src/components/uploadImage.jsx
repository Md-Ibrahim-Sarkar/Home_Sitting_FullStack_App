import { IKContext, IKUpload } from 'imagekitio-react';
import { useRef } from "react";
import { toast } from "react-toastify";
import { axiosInstance } from '../lib/axiosInstanace';

const authenticator = async () => {
  try {
    const response = await axiosInstance.get(`/auth/upload-auth`);
    const { signature, expire, token } = response.data;
    return { signature, expire, token };
  } catch (error) {
    console.error("Error in authenticator:", error);
    throw new Error(`Authentication request failed: ${error.response?.data?.message || error.message}`);
  }
};

const UploadImage = ({ setProgress, setCoverProgress, setData, children }) => {

  const ref = useRef(null);

  const onError = (error) => {
    toast.error("Image Upload Failed!");
    console.error(error); // Log error for debugging
  };

  const onSuccess = (res) => {
    setData(res.url);
    toast.success("Image Uploaded!");
    setProgress && setTimeout(() => setProgress(0), 1000);
  };

  const onUploadProgress = (progress) => {
    setProgress && setProgress(Math.round((progress.loaded / progress.total) * 100));
    setCoverProgress && setCoverProgress(Math.round((progress.loaded / progress.total) * 100))
  };

  return (
    <>
      <IKContext
        publicKey={import.meta.env.VITE_PUBLIC_KEY}
        urlEndpoint={import.meta.env.VITE_URLENDPOINT}
        authenticator={authenticator}
      >
        <IKUpload
          useUniqueFileName
          onError={onError}
          onSuccess={onSuccess}
          onUploadProgress={onUploadProgress}
          className="hidden"
          ref={ref}
        />
        <button className="cursor-pointer" onClick={(e) => {
          e.stopPropagation();
          ref.current.click();
        }}>
          {children}
        </button>
      </IKContext>
    </>
  );
};

export default UploadImage;
