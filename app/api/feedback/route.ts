import { NextResponse } from "next/server";

type FeedbackPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  type?: unknown;
  message?: unknown;
  website?: unknown;
};

const asText = (value: unknown) => (typeof value === "string" ? value.trim() : "");

export async function POST(request: Request) {
  let payload: FeedbackPayload;

  try {
    payload = (await request.json()) as FeedbackPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  if (asText(payload.website)) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const feedback = {
    name: asText(payload.name).slice(0, 120),
    email: asText(payload.email).slice(0, 180),
    phone: asText(payload.phone).slice(0, 80),
    type: asText(payload.type).slice(0, 80),
    message: asText(payload.message).slice(0, 3000),
    source: "mokai-website",
    submittedAt: new Date().toISOString(),
  };

  if (!feedback.name || !feedback.email || feedback.message.length < 10) {
    return NextResponse.json({ ok: false, error: "Please complete the required fields." }, { status: 422 });
  }

  const webhook = process.env.MOKAI_FEEDBACK_WEBHOOK_URL;
  if (!webhook) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Delivery failed." }, { status: 502 });
  }
}
