import { FC, useRef, useEffect, useState, useCallback } from "react";
import { Input } from "../Input";
import type { DropdownProps, DropdownItem } from "./Dropdown.types";
import "./Dropdown.scss";

export const Dropdown: FC<DropdownProps> = ({
  value,
  onChange,
  onSelect,
  items,
  placeholder = "Пошук...",
  label,
  disabled = false,
  isOpen: controlledIsOpen,
  onOpenChange,
  emptyText = "Нічого не знайдено",
  className = "",
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isControlled = controlledIsOpen !== undefined;
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;

  const setIsOpen = useCallback(
    (open: boolean) => {
      if (isControlled) {
        onOpenChange?.(open);
      } else {
        setInternalIsOpen(open);
      }
    },
    [isControlled, onOpenChange]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    if (isOpen && highlightedIndex >= 0 && menuRef.current) {
      const activeItem = menuRef.current.children[
        highlightedIndex
      ] as HTMLElement;
      if (activeItem) {
        activeItem.scrollIntoView({ block: "nearest" });
      }
    }
  }, [highlightedIndex, isOpen]);

  const handleSelect = (item: DropdownItem) => {
    onSelect(item);
    onChange(item.label);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    if (!isOpen) {
      setIsOpen(true);
    }
    setHighlightedIndex(-1);
  };

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex = prev < items.length - 1 ? prev + 1 : prev;
          return newIndex;
        });
        break;

      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => {
          const newIndex = prev > 0 ? prev - 1 : prev;
          return newIndex;
        });
        break;

      case "Enter":
        if (highlightedIndex >= 0 && items[highlightedIndex]) {
          e.preventDefault();
          handleSelect(items[highlightedIndex]);
        }
        break;

      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const containerClasses = ["dropdown", isOpen && "dropdown--open", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div ref={containerRef} className={containerClasses}>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        label={label}
        disabled={disabled}
      />

      {isOpen && (
        <div ref={menuRef} className="dropdown__menu" role="listbox">
          {items.length > 0 ? (
            items.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={`dropdown__item ${
                  index === highlightedIndex ? "dropdown__item--active" : ""
                }`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setHighlightedIndex(index)}
                role="option"
                aria-selected={index === highlightedIndex}
              >
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="dropdown__item-image"
                  />
                ) : item.icon ? (
                  <span className="dropdown__item-icon">{item.icon}</span>
                ) : null}
                <span className="dropdown__item-label">{item.label}</span>
              </button>
            ))
          ) : (
            <div className="dropdown__empty">{emptyText}</div>
          )}
        </div>
      )}
    </div>
  );
};
