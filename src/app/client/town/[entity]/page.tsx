"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

interface TownEntity {
  count: number;
  towns: string;
}

const Town = ({ params }: { params: { entity: string } }) => {
  const { entity } = params;

  const [townnames, setTownnames] = useState<TownEntity[]>([]);

  useEffect(() => {
    const gettownname = async () => {
      const { data } = await axios.get(`/api/town/${entity}`);
      setTownnames(data.towns);
    };
    gettownname();
  }, []);

  return (
    <>
      {townnames &&
        townnames.map((town, index) => (
          <div key={index}>
            <Link href={`./${entity}/${town.towns}`}>
              <p className="bg-gray-300 p-4 m-2 rounded-md">
                {town.towns} ({town.count})
              </p>
            </Link>
          </div>
        ))}
      <br />
    </>
  );
};
export default Town;
