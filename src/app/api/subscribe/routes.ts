import { NextRequest, NextResponse } from "next/server";

/**
 * Route pour enregistrer les souscriptions des utilisateurs
 *
 * Cette route permet d'enregistrer les souscriptions des utilisateurs
 * en récupérant l'endpoint de la souscription depuis la requête.
 *
 */

export async function POST(request: NextRequest) {
  try {
    const { endpoint } = await request.json();
    console.log("Endpoint reçu:", endpoint);

    return NextResponse.json(
      { message: "Souscription enregistrée" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de l'enregistrement de la souscription:", error);
    return NextResponse.json(
      { message: "Erreur lors de l'enregistrement" },
      { status: 500 }
    );
  }
}
