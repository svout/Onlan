import React, { type CSSProperties } from "react";
import clsx from "clsx";

interface DescriptionProps {
  description: string;
  color?: CSSProperties["color"];
  type: "default" | "small" | "medium" | "large" | "extraSm";
  className?: string;
  highlightWords?: string[];
  highlightClassName?: string;
}

const typeClasses: Record<"default" | "small" | "medium" | "large" | "extraSm", string> = {
  extraSm: "text-xs md:text-xs lg:text-xs",
  small: "text-base md:text-base lg:text-base",
  medium: "text-lg md:text-lg lg:text-lg",
  large: "text-xl md:text-xl lg:text-xl",
  default: "text-sm md:text-lg lg:text-lg",
};

const Description = ({
  description,
  color,
  type = "medium",
  className,
  highlightWords,
  highlightClassName = "text-primary",
}: DescriptionProps) => {
  const renderWithHighlights = () => {
    if (!highlightWords || highlightWords.length === 0) {
      return description;
    }

    const escaped = highlightWords.map((word) =>
      word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );

    const regex = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = description.split(regex);

    return parts.map((part, index) => {
      const isHighlight = highlightWords.some(
        (word) => word.toLowerCase() === part.toLowerCase(),
      );

      if (!isHighlight) {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }

      return (
        <span key={index} className={highlightClassName}>
          {part}
        </span>
      );
    });
  };

  return (
    <div>
      <p
        className={clsx("font-normal leading-[22px] m-0", typeClasses[type], className)}
        style={{ color }}
      >
        {renderWithHighlights()}
      </p>
    </div>
  );
};

export default Description;
