"use client";

import { useMemo, useRef, useState } from "react";
import Header from "@/components/Header";
import ClasificadosHero from "./ClasificadosHero";
import QuickCategoryPills from "./QuickCategoryPills";
import ClasificadosFilterBar, { type ViewMode } from "./ClasificadosFilterBar";
import ResultsGrid from "./ResultsGrid";
import ResultsList from "./ResultsList";
import ResultsMap from "./ResultsMap";
import AddClasificadoBanner from "./AddClasificadoBanner";
import AddClasificadoModal from "./AddClasificadoModal";
import { ITEMS, type Clasificado, type ClasificadoCategory, type SortKey } from "@/lib/clasificadosData";
import { SORTERS, filterClasificados } from "@/lib/clasificadosUtils";

const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

export default function ClasificadosApp() {
  const [items, setItems] = useState<Clasificado[]>(ITEMS);
  const [searchText, setSearchText] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filterCategory, setFilterCategory] = useState<ClasificadoCategory | null>(null);
  const [filterPrice, setFilterPrice] = useState("Todos");
  const [filterCondition, setFilterCondition] = useState("Todas");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortKey>("latest");
  const [showAddModal, setShowAddModal] = useState(false);
  const nextId = useRef(ITEMS.length + 1);

  const toggleQuickCategory = (category: ClasificadoCategory) => {
    setFilterCategory((prev) => (prev === category ? null : category));
  };

  const sortedList = useMemo(() => {
    const filtered = filterClasificados(items, { category: filterCategory, price: filterPrice, condition: filterCondition, searchText, searchLocation });
    return [...filtered].sort(SORTERS[sortBy]);
  }, [items, filterCategory, filterPrice, filterCondition, searchText, searchLocation, sortBy]);

  const handleAddItem = (values: Omit<Clasificado, "id" | "added" | "addedLabel" | "views">) => {
    const today = new Date();
    const newItem: Clasificado = {
      ...values,
      id: `cls-${nextId.current++}`,
      added: today.toISOString().slice(0, 10),
      addedLabel: `${today.getDate()} ${MONTHS[today.getMonth()]}, ${today.getFullYear()}`,
      views: 0,
    };
    setItems((prev) => [newItem, ...prev]);
    setShowAddModal(false);
  };

  return (
    <>
      <Header ctaLabel="AGREGAR ARTÍCULO" onCtaClick={() => setShowAddModal(true)} />
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
