import { NextRequest, NextResponse } from "next/server";
import { sendTelegram } from "@/lib/send-telegram";

export async function POST(req: NextRequest) {
  const { name, email, phone, message, channel } = await req.json();

  const text = [
    "🆕 <b>Нова заявка з сайту</b>❗️",
    "",
    `👤 Ім'я: ${name || "—"}`,
    `📧 E-mail: ${email || "—"}`,
    `📞 Телефон: ${phone || "—"}`,
    `💬 Повідомлення: ${message || "—"}`,
    `📲 Зручний спосіб комунікації: ${channel || "—"}`,
  ].join("\n");

  const ok = await sendTelegram(text);
  return NextResponse.json({ ok }, { status: ok ? 200 : 500 });
}
