import type { Category } from "../types";
import { ALL_CATEGORIES, CATEGORY_META } from "../categoryMeta";

interface Props {
  active: Set<Category>;
  onToggle: (category: Category) => void;
  onReset: () => void;
}

export default function CategoryFilter({ active, onToggle, onReset }: Props) {
  const allOn = active.size === ALL_CATEGORIES.length;
  return (
    <div className="category-filter">
      <button className={`chip reset-chip${allOn ? " active" : ""}`} onClick={onReset}>
        All
      </button>
      {ALL_CATEGORIES.map((cat) => {
        const meta = CATEGORY_META[cat];
        const isActive = active.has(cat);
        return (
          <button
            key={cat}
            className={`chip${isActive ? " active" : ""}`}
            style={isActive ? { background: meta.color, borderColor: meta.color } : undefined}
            onClick={() => onToggle(cat)}
          >
            <span>{meta.emoji}</span> {meta.label}
          </button>
        );
      })}
    </div>
  );
}
