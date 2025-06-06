'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { getAvailableTraits } from "@/data/avatars";
import { FilterX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface AvatarFilterProps {
  filters: Record<string, string>;
  onFilterChange: (type: string, value: string) => void;
  sortOrder: string;
  onSortChange: (value: string) => void;
  onClearFilters: () => void;
}

const availableTraits = getAvailableTraits();
const traitTypes = Object.keys(availableTraits);

export function AvatarFilter({
  filters,
  onFilterChange,
  sortOrder,
  onSortChange,
  onClearFilters
}: AvatarFilterProps) {
  return (
    <div className="mb-8 p-6 bg-card rounded-lg shadow-md space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-end">
        {traitTypes.map((type) => (
          <div key={type} className="space-y-2">
            <Label htmlFor={`filter-${type}`} className="font-headline text-sm text-muted-foreground">
              Filter by {type}
            </Label>
            <Select
              value={filters[type] || "all"}
              onValueChange={(value) => onFilterChange(type, value)}
            >
              <SelectTrigger id={`filter-${type}`} className="w-full bg-input hover:border-primary transition-colors">
                <SelectValue placeholder={`Select ${type}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {type}s</SelectItem>
                {availableTraits[type].map((value) => (
                  <SelectItem key={value} value={value}>
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}

        <div className="space-y-2">
          <Label htmlFor="sort-order" className="font-headline text-sm text-muted-foreground">Sort by</Label>
          <Select value={sortOrder} onValueChange={onSortChange}>
            <SelectTrigger id="sort-order" className="w-full bg-input hover:border-primary transition-colors">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="rarity-desc">Rarity (High-Low)</SelectItem>
              <SelectItem value="rarity-asc">Rarity (Low-High)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="ghost" onClick={onClearFilters} className="text-accent hover:text-accent-foreground hover:bg-accent/20">
          <FilterX className="mr-2 h-4 w-4" /> Clear Filters
        </Button>
      </div>
    </div>
  );
}
