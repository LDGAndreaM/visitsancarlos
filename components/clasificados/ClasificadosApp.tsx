"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import ClasificadosHero from "./ClasificadosHero";
import QuickCategoryPills from "./QuickCategoryPills";
import ClasificadosFilterBar, { type ViewMode } from "./ClasificadosFilterBar";
import ResultsGrid from "./ResultsGrid";
import ResultsList from "./ResultsList";
import ResultsMap from "./ResultsMap";
import AddClasificadoBanner from "./AddClasificadoBanner";
import AddClasificadoModal from "./AddClasificadoModal";
import { PROMO_PAIRS, type Clasificado, type ClasificadoCategory, type SortKey } from "@/lib/clasificadosData";
import { SORTERS, filterClasificados } from "@/lib/clasificadosUtils";
import { fetchApprovedClasificados, createClasificado } from "@/lib/supabase/classifieds";
import { getCurrentUser, type CurrentUser } from "@/lib/supabase/session";

export default function ClasificadosApp() {
  const router = useRouter();
  const [items, setItems] = useState<Clasificado[]>([]);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    fetchApprovedClasificados().then(setItems);
    getCurrentUser().then(setCurrentUser);
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filterCategory, setFilterCategory] = useState<ClasificadoCategory | null>(null);
  const [filterPrice, setFilterPrice] = useState("Todos");
  const [filterCondition, setFilterCondition] = useState("Todas");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortKey>("latest");
  const [showAddModal, setShowAddModal] = useState(false);

  const toggleQuickCategory = (category: ClasificadoCategory) => {
    setFilterCategory((prev) => (prev === category ? null : category));
  };

  const sortedList = useMemo(() => {
    const filtered = filterClasificados(items, { category: filterCategory, price: filterPrice, condition: filterCondition, searchText, searchLocation });
    return [...filtered].sort(SORTERS[sortBy]);
  }, [items, filterCategory, filterPrice, filterCondition, searchText, searchLocation, sortBy]);

  const handleAddItem = async (values: Omit<Clasificado, "id" | "added" | "addedLabel" | "views">) => {
    setShowAddModal(false);
    if (!currentUser) {
      router.push("/login");
      return;
    }
    await createClasificado(currentUser.id, values);
    setSubmitMessage("¡Listo! Tu artículo fue enviado y se publicará en cuanto el equipo lo apruebe.");
    setTimeout(() => setSubmitMessage(""), 6000);
  };

  return (
    <>
      <Header ctaLabel="AGREGAR ARTÍCULO" onCtaClick={() => setShowAddModal(true)} />
      {submitMessage && (
        <div style={{ margin: "16px 48px 0", background: "#E5F6F7", color: "#009BA4", fontWeight: 600, fontSize: 13, padding: "12px 18px", borderRadius: 12, textAlign: "center" }}>{submitMessage}</div>
      )}
      <PromoBanner pairs={PROMO_PAIRS} />
      <ClasificadosHero
        searchText={searchText}
        onSearchTextChange={setSearchText}
        searchLocation={searchLocation}
        onSearchLocationChange={setSearchLocation}
        filterCategory={filterCategory}
        onSelectCategory={setFilterCategory}
      />
      <QuickCategoryPills active={filterCategory} onToggle={toggleQuickCategory} />
      <ClasificadosFilterBar
        filterPrice={filterPrice}
        onFilterPriceChange={setFilterPrice}
        filterCondition={filterCondition}
        onFilterConditionChange={setFilterCondition}
        filterCategory={filterCategory}
        onClearCategory={() => setFilterCategory(null)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortByChange={setSortBy}
      />
      {viewMode === "grid" && <ResultsGrid items={sortedList} />}
      {viewMode === "list" && <ResultsList items={sortedList} />}
      {viewMode === "map" && <ResultsMap items={sortedList} />}
      <AddClasificadoBanner onOpen={() => setShowAddModal(true)} />
      {showAddModal && <AddClasificadoModal onClose={() => setShowAddModal(false)} onSubmit={handleAddItem} />}
    </>
  );
}
