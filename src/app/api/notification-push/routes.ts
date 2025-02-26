import { NextRequest, NextResponse } from "next/server";
import { sendNotification } from "@/lib/services/webPush.services";

export async function POST(request: NextRequest) {
  try {
    const { title, message, sub } = await request.json();

    const res = await sendNotification(sub, {
      title,
      message,
    });
    console.log(res);
    return NextResponse.json(
      { message: "Notification envoyée avec succès" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Erreur lors de l'envoi de la notification" },
      { status: 500 }
    );
  }
}
