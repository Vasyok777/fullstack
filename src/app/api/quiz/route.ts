import { NextRequest, NextResponse } from "next/server";
import { sendTelegram } from "@/lib/send-telegram";

export async function POST(req: NextRequest) {
  const { siteType, timeline, name, phone, email } = await req.json();

  const text = [
    "🎁 <b>Подарунок активовано!</b>",
    "",
    "Клієнт заповнив коротке опитування 👇",
    "",
    `🌐 Тип сайту: ${siteType}`,
    `⏰ Терміни запуску: ${timeline}`,
    "",
    "━━━━━━━━━━━━━━",
    "📩 Контакти клієнта:",
    "",
    `👤 Ім'я: ${name}`,
    `📞 Телефон: ${phone}`,
    `📧 Пошта: ${email}`,
    "",
    "━━━━━━━━━━━━━━",
    "💰 Запит: Зробити прорахунок ціни +-",
  ].join("\n");

  const ok = await sendTelegram(text);
  return NextResponse.json({ ok }, { status: ok ? 200 : 500 });
}
