'use client';

import { MessageCircle } from "lucide-react";

const FACEBOOK_GROUP_URL = "https://www.facebook.com/profile.php?id=61594017590609";

export default function WhatsAppButton() {
  return (
    <a
      href={FACEBOOK_GROUP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our Facebook community"
      className="fixed bottom-6 right-6 z-50 p-4 bg-[#156b33] text-white rounded-full transition print:hidden flex items-center justify-center shadow-lg hover:bg-[#128a3c] hover:scale-105"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
