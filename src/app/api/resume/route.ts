import { NextResponse } from "next/server";

export async function GET() {
  // For demo: return a simple text resume. Replace with static file or S3 later.
  const text = `Prabhakar Elavala\nAI/ML Engineer\n\nExperience:\n- CommandL: LLM tooling and evals\n- CareEscapes AI: Clinical NLP\n- Song Popularity ML: Modeling\n- GitGuide: AI code review`;
  return new NextResponse(text, {
    headers: {
      "Content-Type": "text/plain",
      "Content-Disposition": 'attachment; filename="Prabhakar_Elavala_Resume.txt"',
    },
  });
}


