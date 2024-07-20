"use client";
import NavBar from "@/components/Navbar";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface EntityData {
  getentityname: string;
}

const Client = () => {
  const [entityName, setEntityName] = useState<EntityData[]>([]);

  useEffect(() => {
    const showentity = async () => {
      const { data } = await axios.get("/api/get_entity_name");
      setEntityName(data.getentityname);
    };
    showentity();
  }, []);

  return (
    <>
      <NavBar />
      {entityName.map((entity, index) => (
        <div key={index}>
          <Link href={`client/town/${decodeURI(entity.getentityname)}`}>
            <p className="bg-gray-300 p-4 m-2 rounded-md">
              {entity.getentityname}
            </p>
          </Link>
        </div>
      ))}
    </>
  );
};
export default Client;
