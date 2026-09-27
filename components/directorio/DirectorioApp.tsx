"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import PromoBanner from "@/components/PromoBanner";
import { MobileIcon } from "@/components/mobile/icons";
import DirectorioHero from "./DirectorioHero";
import FilterBar, { type ViewMode } from "./FilterBar";
import ResultsGrid from "./ResultsGrid";
import ResultsList from "./ResultsList";
import ResultsMap from "./ResultsMap";
import AddBusinessBanner from "./AddBusinessBanner";
import DirectorioMobile from "./DirectorioMobile";
import { BANNER_PAIRS, PAGE_SIZE, type Business, type BusinessCategory, type SortKey } from "@/lib/directorioData";
import { SORTERS, filterBusinesses } from "@/lib/directorioUtils";
import { fetchApprovedBusinesses } from "@/lib/supabase/businesses";

export default function DirectorioApp() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  useEffect(() => {
    fetchApprovedBusinesses().then(setBusinesses);
  }, []);

  const [searchText, setSearchText] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [category, setCategory] = useState<BusinessCategory | "Todo">("Todo");
  const [filterPrice, setFilterPrice] = useState("Todos");
  const [filterRating, setFilterRating] = useState("0");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [mobileView, setMobileView] = useState<"list" | "map">("list");
  const [sortBy, setSortBy] = useState<SortKey>("az");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedList = useMemo(() => {
    const filtered = filterBusinesses(businesses, { price: filterPrice, rating: filterRating, searchText, searchLocation, category });
    return [...filtered].sort(SORTERS[sortBy]);
  }, [businesses, filterPrice, filterRating, searchText, searchLocation, category, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedList.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sortedList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
      <Header
        mobileRightAction={
          <button
            onClick={() => setMobileView((v) => (v === "list" ? "map" : "list"))}
            aria-label={mobileView === "list" ? "Ver mapa" : "Ver lista"}
            style={{ width: 42, height: 42, border: "none", background: "#F4FAFB", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0 }}
          >
            <MobileIcon name={mobileView === "list" ? "map" : "list"} color="#143840" size={19} />
          </button>
        }
      />
      <PromoBanner pairs={BANNER_PAIRS} />

      <div className="vsc-desktop-only">
        <DirectorioHero searchText={searchText} onSearchTextChange={setSearchText} searchLocation={searchLocation} onSearchLocationChange={setSearchLocation} />
        <FilterBar
          filterPrice={filterPrice}
          onFilterPriceChange={setFilterPrice}
          filterRating={filterRating}
          onFilterRatingChange={setFilterRating}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          sortBy={sortBy}
          onSortByChange={setSortBy}
        />
        {viewMode === "grid" && (
          <ResultsGrid businesses={pageItems} favorites={favorites} onToggleFavorite={toggleFavorite} page={currentPage} totalPages={totalPages} onPageChange={setPage} />
        )}
        {viewMode === "list" && <ResultsList businesses={pageItems} />}
        {viewMode === "map" && <ResultsMap businesses={pageItems} />}
        <AddBusinessBanner />
      </div>

      <DirectorioMobile
        businesses={sortedList}
        searchText={searchText}
        onSearchTextChange={setSearchText}
        category={category}
        onCategoryChange={setCategory}
        filterPrice={filterPrice}
        onFilterPriceChange={setFilterPrice}
        filterRating={filterRating}
        onFilterRatingChange={setFilterRating}
        sortBy={sortBy}
        onSortByChange={setSortBy}
        view={mobileView}
        favorites={favorites}
        onToggleFavorite={toggleFavorite}
      />
    </>
  );
}
