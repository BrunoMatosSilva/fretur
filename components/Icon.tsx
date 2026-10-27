import type { CSSProperties } from "react";

type Props = {
  /** id do símbolo no Sprite, por exemplo "i-wa" */
  name: string;
  className?: string;
  style?: CSSProperties;
};

export default function Icon({ name, className, style }: Props) {
  return (
    <svg className={className ? `ic ${className}` : "ic"} style={style} aria-hidden="true">
      <use href={`#${name}`} />
    </svg>
  );
}
