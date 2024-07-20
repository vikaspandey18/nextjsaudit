"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface TownEntity {
  townname: string;
}

const Town = () => {
  const searchParams = useSearchParams();
  const entityname = searchParams.get("entity");

  const [tonwname, setTonwname] = useState<TownEntity[]>([]);

  useEffect(() => {
    const gettownname = async () => {
      const { data } = await axios.get(`/api/town/${entityname}`);
      setTonwname(data.townname);
    };
    gettownname();
  }, []);

  return (
    <div>
      <Link href="">
        <p className="bg-gray-300 p-4 m-2 rounded-md">{entityname}</p>
      </Link>
    </div>
  );
};
export default Town;
