import "./StyledInput.scss";

import React, { useEffect, useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
// Composant de base
interface StyledInputBaseProps<T> {
  label: string;
  value: T;
  setValue: (value: T) => void;
  type: string;
  children: React.ReactNode;
  className?: string;
}

const StyledInputBase: React.FC<StyledInputBaseProps<any>> = ({
  label,
  children,
  className,
}) => {
  return (
    <div className={`styledInput ${className || ""}`}>
      <label>{label}</label>
      {children}
    </div>
  );
};

export const StyledInputText: React.FC<{
  label: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  className?: string;
}> = ({ label, value, setValue, required, className }) => (
  <StyledInputBase label={label} value={value} setValue={setValue} type="text">
    <input
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={label}
      required={required}
      className={className ?? ""}
    />
  </StyledInputBase>
);

export const StyledInputNumber: React.FC<{
  label: string;
  value: number;
  setValue: (value: number) => void;
}> = ({ label, value, setValue }) => (
  <StyledInputBase
    label={label}
    value={value}
    setValue={setValue}
    type="number"
  >
    <input
      type="number"
      value={value}
      min={0}
      max={100}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  </StyledInputBase>
);

export const StyledInputDate: React.FC<{
  label: string;
  value: Date;
  setValue: (value: Date) => void;
}> = ({ label, value, setValue }) => (
  <StyledInputBase label={label} value={value} setValue={setValue} type="date">
    <input
      type="date"
      value={value.toISOString().split("T")[0]}
      onChange={(e) => setValue(new Date(e.target.value))}
    />
  </StyledInputBase>
);

export const StyledTextArea: React.FC<{
  label: string;
  value: string;
  setValue: (value: string) => void;
}> = ({ label, value, setValue }) => (
  <StyledInputBase label={label} value={value} setValue={setValue} type="text">
    <textarea value={value} onChange={(e) => setValue(e.target.value)} />
  </StyledInputBase>
);

export const StyledInputEmail: React.FC<{
  label: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  className?: string;
}> = ({ label, value, setValue, required, className }) => (
  <StyledInputBase label={label} value={value} setValue={setValue} type="email">
    <input
      type="email"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={label}
      required={required}
      className={className ?? ""}
    />
  </StyledInputBase>
);

export const StyledInputPassword: React.FC<{
  label: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  className?: string;
}> = ({ label, value, setValue, required, className }) => {
  const [inputType, setInputType] = useState("password");

  const toggleVisibility = () => {
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <StyledInputBase
      label={label}
      value={value}
      setValue={setValue}
      type={inputType}
    >
      <div className="inputGroup">
        <input
          type={inputType}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={label}
          required={required}
          className={`${className ?? ""}`}
        />
        <div className="inputHideElement" onClick={toggleVisibility}>
          {inputType === "password" ? <FiEyeOff /> : <FiEye />}
        </div>
      </div>
    </StyledInputBase>
  );
};

export const StyledInputFile: React.FC<{
  label: string;
  setValue: (file: File | null) => void;
  value?: File | null;
  required?: boolean;
  accept?: string;
  className?: string;
}> = ({ label, setValue, required, accept, className, value }) => {
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setValue(file);

    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFilePreview(previewUrl);
      setFileType(file.type);
    } else {
      setFilePreview(null);
      setFileType(null);
    }
  };

  useEffect(() => {
    if (value) {
      const previewUrl = URL.createObjectURL(value);
      console.log(previewUrl, value);
      setFilePreview(previewUrl);
      setFileType(value.type);
    }
  }, [value]);

  return (
    <StyledInputBase
      label={label}
      value={""}
      setValue={setValue}
      type="file"
      className={className ?? ""}
    >
      <input
        type="file"
        onChange={handleFileChange}
        required={required}
        accept={accept}
      />
      {filePreview && fileType && (
        <div className="filePreview">
          {fileType === "application/pdf" ? (
            <embed src={filePreview} width="100%" height="400px" />
          ) : /^image\/(jpeg|png|svg\+xml)$/.test(fileType) ? (
            <img
              src={filePreview}
              alt="Aperçu du fichier"
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          ) : (
            <p>Aperçu non disponible pour ce type de fichier.</p>
          )}
        </div>
      )}
    </StyledInputBase>
  );
};

export const StyledInputTime: React.FC<{
  label: string;
  value: string;
  setValue: (value: string) => void;
  required?: boolean;
  className?: string;
}> = ({ label, value, setValue, required, className }) => (
  <StyledInputBase label={label} value={value} setValue={setValue} type="time">
    <input
      type="time"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required={required}
      className={className ?? ""}
    />
  </StyledInputBase>
);
