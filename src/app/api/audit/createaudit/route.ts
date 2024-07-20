import dbConnect from "@/lib/dbConnection";
import Audit from "@/models/auditModel";
import Client from "@/models/clientModel";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const formData = await request.formData();

    const visiting_card = formData.get("visiting_card") as File;
    const machine_image = formData.get("machine_image") as File;
    const other_image = formData.get("other_image") as File;
    const sga_avaliable = formData.get("sga_avaliable") as string | null;
    const serial_number = formData.get("serial_number") as string | null;
    const outlet_code = formData.get("outlet_code") as string | null;
    const outlet_name = formData.get("outlet_name") as string | null;
    const remark = formData.get("remark") as string | null;
    const customerid = formData.get("customerid") as string | null;
    const userid = formData.get("userid") as string | null;

    const saveFile = async (file: File, filename: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      await writeFile(
        path.join(process.cwd(), "public/auditimage", filename),
        buffer
      );
      return filename;
    };

    const vistingCardName = visiting_card
      ? await saveFile(
          visiting_card,
          Date.now() + visiting_card.name.replace(/\s/g, "_")
        )
      : null;
    const machineImageName = machine_image
      ? await saveFile(
          machine_image,
          Date.now() + machine_image.name.replace(/\s/g, "_")
        )
      : null;
    const otherImageName = other_image
      ? await saveFile(
          other_image,
          Date.now() + other_image.name.replace(/\s/g, "_")
        )
      : null;

    const auditUser = await Audit.create({
      sga_avaliable,
      serial_number,
      outlet_code,
      outlet_name,
      remark,
      visiting_card: vistingCardName,
      machine_image: machineImageName,
      other_image: otherImageName,
      userid,
      customerid,
    });

    if (auditUser) {
      await Client.findByIdAndUpdate(
        { _id: customerid },
        { audited_yno: "Yes" }
      );

      return Response.json(
        { message: "Audit Created Successfully" },
        { status: 200 }
      );
    } else {
      return Response.json({ message: "Failed to Created" }, { status: 400 });
    }
  } catch (error: any) {
    console.log(error.message);
    return Response.json(
      { message: "Error in Create Audit Api" },
      { status: 500 }
    );
  }
}
