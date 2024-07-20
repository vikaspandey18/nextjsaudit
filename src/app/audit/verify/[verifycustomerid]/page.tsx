"use client";
import NavBar from "@/components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";

interface CustomerAuditProps {
  params: {
    verifycustomerid: string;
  };
}

interface AuditCustomer {
  sga_avaliable: string;
  serial_number: string;
  outlet_code: string;
  outlet_name: string;
  remark: string;
  visiting_card: string;
  machine_image: string;
  other_image: string;
}

function createData(name: string, value: string) {
  return { name, value };
}

const CustomerVerifyAudit = ({ params }: CustomerAuditProps) => {
  const { verifycustomerid } = params;
  const [loading, setLoading] = useState(false);
  const [getcustomer, setGetCustomer] = useState<AuditCustomer>();
  const router = useRouter();

  useEffect(() => {
    const fecthData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `/api/audit/auditedcustomer/${verifycustomerid}`
        );
        setGetCustomer(data.customer);
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        console.log(error?.response?.data?.message);
      }
    };
    fecthData();
  }, [params]);

  return (
    <>
      <NavBar />
      {loading ? (
        "Loading...."
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Values</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Sga Avaliable
                    </TableCell>
                    <TableCell align="center">
                      {getcustomer?.sga_avaliable.toUpperCase()}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Serial Number
                    </TableCell>
                    <TableCell align="center">
                      {getcustomer?.serial_number.toUpperCase()}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Outlet Code
                    </TableCell>
                    <TableCell align="center">
                      {getcustomer?.outlet_code.toUpperCase()}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Outlet Name
                    </TableCell>
                    <TableCell align="center">
                      {getcustomer?.outlet_name.toUpperCase()}
                    </TableCell>
                  </TableRow>
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      Remark
                    </TableCell>
                    <TableCell align="center">
                      {getcustomer?.remark.toUpperCase()}
                    </TableCell>
                  </TableRow>
                  {getcustomer?.visiting_card && (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Visiting Card
                      </TableCell>
                      <TableCell align="center">
                        <Image
                          src={`/auditimage/${getcustomer?.visiting_card}`}
                          width={300}
                          height={300}
                          className="rounded"
                          alt={getcustomer?.serial_number}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {getcustomer?.machine_image && (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Machine Image
                      </TableCell>
                      <TableCell align="center">
                        <Image
                          src={`/auditimage/${getcustomer?.machine_image}`}
                          width={300}
                          height={300}
                          className="rounded"
                          alt={getcustomer?.serial_number}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                  {getcustomer?.other_image && (
                    <TableRow
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        Other Image
                      </TableCell>
                      <TableCell align="center">
                        <Image
                          src={`/auditimage/${getcustomer?.other_image}`}
                          width={300}
                          height={300}
                          className="rounded"
                          alt={getcustomer?.serial_number}
                        />
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
};
export default CustomerVerifyAudit;
