"use client";

import { useRef, useState } from "react";
import Header from "@/components/Header";
import SoporteHero from "./SoporteHero";
import HelpTabs, { type HelpTab } from "./HelpTabs";
import CategoryPills from "./CategoryPills";
import EmptyState from "./EmptyState";
import FaqList from "./FaqList";
import TutorialsGrid from "./TutorialsGrid";
import TutorialModal from "./TutorialModal";
import FilesList from "./FilesList";
import EmailCta from "./EmailCta";
import SupportChat, { type SupportChatHandle } from "./SupportChat";
import { FAQS, FILES, TUTORIALS, type Faq, type SupportCategory, type Tutorial } from "@/lib/soporteData";
import { matchesQuery } from "@/lib/soporteUtils";

function toSearchable(item: Faq | Tutorial | (typeof FILES)[number]): string {
  if ("q" in item) return [item.q, item.a].join(" ");
  if ("title" in item && "steps" in item) return [item.title, item.steps.join(" ")].join(" ");
  return [item.title, item.desc].join(" ");
}

export default function SoporteApp() {
  const [tab, setTab] = useState<HelpTab>("faq");
  const [cat, setCat] = useState<"all" | SupportCategory>("all");
  const [query, setQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [voted, setVoted] = useState<Record<number, boolean>>({});
  const [tutIdx, setTutIdx] = useState<number | null>(null);
  const chatRef = useRef<SupportChatHandle>(null);

  const matches = (item: Faq | Tutorial | (typeof FILES)[number]) => {
    if (cat !== "all" && item.cat !== cat) return false;
    return matchesQuery(toSearchable(item), query);
  };

  const faqs = FAQS.map((f, index) => ({ ...f, index })).filter(matches);
  const tutorials = TUTORIALS.map((t, index) => ({ ...t, index })).filter(matches);
  const files = FILES.filter(matches);

  const counts: Record<HelpTab, number> = { faq: faqs.length, tut: tutorials.length, files: files.length };
  const tut = tutIdx != null ? TUTORIALS[tutIdx] : null;

  const handleTabChange = (next: HelpTab) => setTab(next);
  const handleCatChange = (next: "all" | SupportCategory) => {
    setCat(next);
    setOpenFaq(null);
  };
  const handleQueryChange = (next: string) => {
    setQuery(next);
    setOpenFaq(null);
  };

  const handleToggleFaq = (index: number) => setOpenFaq((prev) => (prev === index ? null : index));
  const handleVoteFaq = (index: number, faq: Faq, needsHelp: boolean) => {
    setVoted((prev) => ({ ...prev, [index]: true }));
    if (needsHelp) chatRef.current?.sendMessage(`Tengo dudas sobre: ${faq.q}`);
  };
  const handleAskInChat = () => {
    if (query.trim()) chatRef.current?.sendMessage(query.trim());
  };

  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden", background: "#ffffff" }}>
      <Header />
      <SoporteHero query={query} onQueryChange={handleQueryChange} />

      <section style={{ padding: "44px 48px 64px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "minmax(0,1fr) 400px", gap: 36, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24, minWidth: 0 }}>
            <HelpTabs tab={tab} onTabChange={handleTabChange} counts={counts} />
            <CategoryPills active={cat} onSelect={handleCatChange} />

            {counts[tab] === 0 && <EmptyState onAskInChat={handleAskInChat} />}

            {tab === "faq" && counts.faq > 0 && <FaqList faqs={faqs} openIndex={openFaq} onToggle={handleToggleFaq} voted={voted} onVote={handleVoteFaq} />}
            {tab === "tut" && counts.tut > 0 && <TutorialsGrid tutorials={tutorials} onOpen={setTutIdx} />}
            {tab === "files" && counts.files > 0 && <FilesList files={files} />}

            <EmailCta />
          </div>

          <SupportChat ref={chatRef} />
        </div>
      </section>

      {tut && <TutorialModal tutorial={tut} onClose={() => setTutIdx(null)} />}
    </div>
  );
}
