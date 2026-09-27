import type { Category } from "../types";
import { ALL_CATEGORIES, CATEGORY_META } from "../categoryMeta";

interface Props {
  active: Set<Category>;
  onToggle: (category: Category) => void;
  onSolo: (category: Category) => void;
  onReset: () => void;
}

export default function CategoryFilter({ active, onToggle, onSolo, onReset }: Props) {
  const allOn = active.size === ALL_CATEGORIES.length;
  return (
    <div className="category-filter">
      <button
        className={`chip reset-chip${allOn ? " active" : ""}`}
        onClick={onReset}
        title="Show all categories"
      >
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
            onClick={(e) => (e.altKey ? onToggle(cat) : onSolo(cat))}
            title="Click: show only this · Alt+click: add/remove"
          >
            <span>{meta.emoji}</span> {meta.label}
          </button>
        );
      })}
    </div>
  );
}
