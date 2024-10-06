import React from 'react'
import { Input } from '../ui/input'
import { Search,X } from 'lucide-react'
import { Checkbox } from '../ui/checkbox'
import { Label } from '../ui/label'
import { Slider } from '../ui/slider'
import { Select,SelectContent,SelectItem,SelectTrigger,SelectValue } from '../ui/select'
import { Button } from '../ui/button'

interface FilterBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    selectedCategories: string[];
    handleCategoryChange: (category: string) => void;
    priceRange: number[];
    setPriceRange: (value: number[]) => void;
    sortOrder: string;
    setSortOrder: (value: string) => void;
    clearFilters: () => void;
    categories: { id: string; title: string; image: string }[];
}

const FilterBar: React.FC<FilterBarProps> = ({
    searchTerm,
    setSearchTerm,
    selectedCategories,
    handleCategoryChange,
    priceRange,
    setPriceRange,
    sortOrder,
    setSortOrder,
    clearFilters,
    categories
}) => {
    return (
        <>
            <div>
                <h2 className="text-xl font-semibold mb-2">Search</h2>
                <div className="relative">
                    <Input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Categories</h2>
                {categories.map(category => (
                    <div key={category.id} className="flex items-center space-x-2 mb-2">
                        <Checkbox
                            id={category.title}
                            checked={selectedCategories.includes(category.title)}
                            onCheckedChange={() => handleCategoryChange(category.title)}
                        />
                        <Label htmlFor={category.title}>{category.title}</Label>
                    </div>
                ))}
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Price Range</h2>
                <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-semibold mb-2">Sort by Price</h2>
                <Select value={sortOrder} onValueChange={setSortOrder}>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort order" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="asc">Low to High</SelectItem>
                        <SelectItem value="desc">High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Button onClick={clearFilters} variant="outline" className="w-full hover:bg-gray-200 transition-colors">
                Clear Filters
                <X className="ml-2 h-4 w-4" />
            </Button>
        </>
    )
}

export default FilterBar