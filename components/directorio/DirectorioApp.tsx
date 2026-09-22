"use client";

import { useMemo, useState } from "react";
import DirectorioHero from "./DirectorioHero";
import FilterBar, { type ViewMode } from "./FilterBar";
import ResultsGrid from "./ResultsGrid";
import ResultsList from "./ResultsList";
import ResultsMap from "./ResultsMap";
import AddBusinessBanner from "./AddBusinessBanner";
import { BUSINESSES, PAGE_SIZE, type SortKey } from "@/lib/directorioData";
import { SORTERS, filterBusinesses } from "@/lib/directorioUtils";

export default function DirectorioApp() {
  const [searchText, setSearchText] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filterPrice, setFilterPrice] = useState("Todos");
  const [filterRating, setFilterRating] = useState("0");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortKey>("az");
  const [page, setPage] = useState(1);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedList = useMemo(() => {
    const filtered = filterBusinesses(BUSINESSES, { price: filterPrice, rating: filterRating, searchText, searchLocation });
    return [...filtered].sort(SORTERS[sortBy]);
  }, [filterPrice, filterRating, searchText, searchLocation, sortBy]);

  const totalPages = Math.max(1, Math.ceil(sortedList.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sortedList.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <>
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
    </>
  );
}
