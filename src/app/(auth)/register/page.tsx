"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputText from "@/components/InputText";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import Alert from "@mui/material/Alert";
import { useRouter } from "next/navigation";




const Register = () => {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setsuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:3000/api/register", {
        name,
        mobile,
        password,
      });
      setLoading(false);
      setsuccessMessage(data?.message);
      setName("");
      setMobile("");
      setPassword("");
      router.push("/login");
    } catch (error: any) {
      setLoading(false);
      setErrorMessage(
        error?.response?.data?.message ||
          "An unexpected error occurred while registering"
      );
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <Typography
          variant="h5"
          className="text-center mb-5"
          component="section"
        >
          Register Page
        </Typography>
        <Card sx={{ minWidth: 400, padding: "15px" }}>
          {successMessage && (
            <>
              <Alert variant="outlined" severity="success">
                {successMessage}
              </Alert>
            </>
          )}

          {errorMessage && (
            <>
              <Alert variant="outlined" severity="error">
                {errorMessage}
              </Alert>
            </>
          )}

          <CardContent>
            <InputText
              type="text"
              label="Enter Name"
              value={name}
              setValue={setName}
            />
            <InputText
              type="number"
              label="Enter Mobile No"
              value={mobile}
              setValue={setMobile}
            />
            <InputText
              type="password"
              label="Enter Password"
              value={password}
              setValue={setPassword}
            />
          </CardContent>
          <CardActions>
            <Button
              size="small"
              variant="contained"
              fullWidth
              className="mx-2 py-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Register"}
            </Button>
          </CardActions>
          <Typography
            variant="subtitle1"
            className="text-center mt-4"
            component="section"
          >
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </Card>
      </div>
    </div>
  );
};
export default Register;
