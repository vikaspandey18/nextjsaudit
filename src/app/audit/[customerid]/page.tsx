"use client";
import NavBar from "@/components/Navbar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputText from "@/components/InputText";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

interface CustomerAuditProps {
  params: {
    customerid: string;
  };
}

const CustomerAudit = ({ params }: CustomerAuditProps) => {
  const { customerid } = params;
  const [loading, setLoading] = useState(false);
  const [sga, setSga] = useState("");
  const [serialno, setSerialno] = useState("");
  const [outletcode, setOutletCode] = useState("");
  const [outletname, setOutletname] = useState("");
  const [remark, setRemark] = useState("");
  const [visitingCard, setVisitingCard] = useState<File | null>(null);
  const [machineImage, setMachineImage] = useState<File | null>(null);
  const [otherImage, setOtherImage] = useState<File | null>(null);
  const [previewVisting, setPreviewVisting] = useState<string | null>(null);
  const [previewMachine, setPreviewMachine] = useState<string | null>(null);
  const [previewOther, setPreviewOther] = useState<string | null>(null);
  const [userid, setUserid] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
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

  const handleVistingCard = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setVisitingCard(e.target.files[0]);
      setPreviewVisting(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleMahineImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setMachineImage(e.target.files[0]);
      setPreviewMachine(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleOtherImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setOtherImage(e.target.files[0]);
      setPreviewOther(URL.createObjectURL(e.target.files[0]));
    }
  };

  useEffect(() => {
    const { _id } = JSON.parse(localStorage.getItem("@user")!);
    setUserid(_id);
  }, []);

  const handleFormSubmit = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("sga_avaliable", sga);
      formdata.append("serial_number", serialno);
      formdata.append("outlet_code", outletcode);
      formdata.append("outlet_name", outletname);
      formdata.append("remark", remark);
      if (visitingCard) formdata.append("visiting_card", visitingCard);
      if (machineImage) formdata.append("machine_image", machineImage);
      if (otherImage) formdata.append("other_image", otherImage);
      formdata.append("customerid", customerid);
      formdata.append("userid", userid);

      const { data } = await axios.post("/api/audit/createaudit", formdata);
      setSuccessMsg(data.message);
      setLoading(false);
      router.back();
    } catch (error: any) {
      setLoading(false);
      setErrorMsg(error?.response?.data?.message);
      console.log(error);
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSga(event.target.value as string);
  };
  const handleSerialNo = (event: SelectChangeEvent) => {
    setSerialno(event.target.value as string);
  };

  return (
    <>
      <NavBar />
      <div className="flex items-center justify-center min-h-screen">
        <div>
          <Card sx={{ maxWidth: 800, padding: "15px" }}>
            <CardContent>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid sm={6}>
                    <Box sx={{ mb: 3 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          SGA Available ?
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={sga}
                          label="SGA Available ?"
                          onChange={handleChange}
                        >
                          <MenuItem value="yes">YES</MenuItem>
                          <MenuItem value="no">NO</MenuItem>
                          <MenuItem value="na">NA</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid xs={6}>
                    <Box sx={{ mb: 3 }}>
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Serial Number
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={serialno}
                          label="Serial Number"
                          onChange={handleSerialNo}
                        >
                          <MenuItem value="same">SAME</MenuItem>
                          <MenuItem value="mismatch">MISMATCH</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid sm={6}>
                    <Box>
                      <InputText
                        type="text"
                        label="Outlet Code"
                        value={outletcode}
                        setValue={setOutletCode}
                      />
                    </Box>
                  </Grid>
                  <Grid sm={6}>
                    <Box>
                      <InputText
                        type="text"
                        label="Outlet Name"
                        value={outletname}
                        setValue={setOutletname}
                      />
                    </Box>
                  </Grid>
                  <Grid sm={4}>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Visiting Card"
                        type="file"
                        variant="outlined"
                        onChange={handleVistingCard}
                      />
                    </Box>
                    {previewVisting && (
                      <>
                        <img src={previewVisting} alt="" />
                      </>
                    )}
                  </Grid>

                  <Grid sm={4}>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Machine Image"
                        type="file"
                        variant="outlined"
                        onChange={handleMahineImage}
                      />
                    </Box>
                    {previewMachine && (
                      <>
                        <img src={previewMachine} alt="" />
                      </>
                    )}
                  </Grid>
                  <Grid sm={4}>
                    <Box>
                      <TextField
                        id="outlined-basic"
                        label="Other Image"
                        type="file"
                        variant="outlined"
                        onChange={handleOtherImage}
                      />
                    </Box>
                    {previewOther && (
                      <>
                        <img src={previewOther} alt="" />
                      </>
                    )}
                  </Grid>
                  <Grid sm={12}>
                    <Box>
                      <InputText
                        type="text"
                        label="Remark"
                        value={remark}
                        setValue={setRemark}
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                variant="contained"
                fullWidth
                className="mx-2 py-3"
                disabled={loading}
                onClick={handleFormSubmit}
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </CardActions>
            {successMsg && (
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={successMsg}
                action={action}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              />
            )}
            {errorMsg && (
              <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={errorMsg}
                action={action}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              />
            )}
          </Card>
        </div>
      </div>
    </>
  );
};
export default CustomerAudit;
