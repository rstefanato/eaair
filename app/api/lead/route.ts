import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE = path.join(process.cwd(), "data", "leads.json");

interface LeadData {
  nome: string;
  email: string;
  telefone?: string;
  cep?: string;
  quiz_score: number;
  quiz_risk_level: string;
  timestamp: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: LeadData = await request.json();
    const dataDir = path.join(process.cwd(), "data");
    await fs.mkdir(dataDir, { recursive: true });

    let leads: LeadData[] = [];
    try {
      const raw = await fs.readFile(LEADS_FILE, "utf-8");
      leads = JSON.parse(raw);
    } catch {
      // File doesn't exist yet
    }

    leads.push({ ...body, timestamp: new Date().toISOString() });
    await fs.writeFile(LEADS_FILE, JSON.stringify(leads, null, 2));
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to save lead" }, { status: 500 });
  }
}
