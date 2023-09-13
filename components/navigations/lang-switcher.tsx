"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";

const LangSwitcher = ({locale}: { locale: string }) => {
    const targetLang = locale === "en" ? "in" : "en";
    const pathname = usePathname();
    const redirectTarget = () => {
        if (!pathname) return "/";
        const segments = pathname.split("/"); //ini untuk pisah path nya
        segments[1] = targetLang;
        return segments.join("/");
    }

  return (
    <Link className="flex items-center gap-1 font-semibold" locale={targetLang} href={redirectTarget()}>
        <span>{targetLang === "en" ? "🇬🇧" : "🇮🇩"}</span>
        {targetLang.toUpperCase()}
    </Link>
  )
}

export default LangSwitcher