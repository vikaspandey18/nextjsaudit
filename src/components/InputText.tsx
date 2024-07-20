import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

interface InputProps {
  type: string;
  label: string;
  value?: string;
  setValue?: (value: string) => void;
}

const InputText = ({ type, label, value, setValue }: InputProps) => {
  return (
    <>
      <Box className="mb-5">
        <TextField
          id="outlined-basic"
          label={label}
          type={type}
          variant="outlined"
          fullWidth
          value={value}
          onChange={(e) => setValue && setValue(e.target.value)}
        />
      </Box>
    </>
  );
};
export default InputText;
