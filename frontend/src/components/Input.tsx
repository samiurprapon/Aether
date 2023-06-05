// import components
import { TextField } from "@mui/material";
export default function Input({ id, name, label, required = false, type = "text", disabled = false, fullWidth = false }) {
  return (
    <>
      <TextField
        id={id}
        name={name}
        variant="filled"
        label={label}
        required={required}
        type={type}
        disabled = {disabled}
        fullWidth={fullWidth}
      />
    </>
  );
}
