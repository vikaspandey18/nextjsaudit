"use client";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputText from "@/components/InputText";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);
  const router = useRouter();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleLogin = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/login", { mobile, password });
      localStorage.setItem("@user", JSON.stringify(data.user));
      setSuccess(data.message);
      setLoading(false);
      setMobile("");
      setPassword("");
      router.push("/");
    } catch (error: any) {
      setOpen(true);
      setLoading(false);
      setError(error?.response?.data?.message);
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
          Login Page
        </Typography>
        <Card sx={{ minWidth: 400, padding: "15px" }}>
          <CardContent>
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
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </CardActions>
          <Typography
            variant="subtitle1"
            className="text-center mt-4"
            component="section"
          >
            Don't have an account? <Link href="/register">Register</Link>
          </Typography>

          {success && (
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message={success}
              action={action}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
          )}
          {error && (
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              message={error}
              action={action}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
          )}
        </Card>
      </div>
    </div>
  );
};
export default Login;
