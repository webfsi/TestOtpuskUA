import { FC, ReactNode } from "react";
import { Loader } from "../../components/ui/Loader";
import { Message } from "../../components/ui/Message";
import "./SearchResults.scss";

interface SearchResultsProps {
  isLoading?: boolean;
  error?: string | null;
  isEmpty?: boolean;
  emptyText?: string;
  children?: ReactNode;
  className?: string;
}

export const SearchResults: FC<SearchResultsProps> = ({
  isLoading,
  error,
  isEmpty,
  emptyText = "За вашим запитом нічого не знайдено",
  children,
  className,
}) => {
  if (isLoading) {
    return (
      <div className={`search-results search-results--loading ${className || ""}`}>
        <Loader size="lg" />
        <span className="search-results__loading-text">Шукаємо...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`search-results search-results--error ${className || ""}`}>
        <Message variant="error">{error}</Message>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`search-results search-results--empty ${className || ""}`}>
        <Message variant="info">{emptyText}</Message>
      </div>
    );
  }

  return (
    <div className={`search-results ${className || ""}`}>
      {children}
    </div>
  );
};

