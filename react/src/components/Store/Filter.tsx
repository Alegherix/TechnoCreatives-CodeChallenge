import React, { useRef } from 'react';
import { Color, FilterInput, Variant } from '../../graphql/generated';

interface StorefrontFilterProps {
  setFilter: React.Dispatch<React.SetStateAction<FilterInput | undefined>>;
}

export const StorefrontFilter: React.VFC<StorefrontFilterProps> = ({
  setFilter,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <aside className=" flex flex-col min-w-[120px]">
      <h2>Filter</h2>

      <div>
        <details open>
          <summary>Color</summary>
          <form>
            {(Object.keys(Color) as Array<keyof typeof Color>).map((color) => {
              return (
                <div className="flex items-center gap-x-2" key={color}>
                  <input
                    onChange={(prev) => setFilter({ color: Color[color] })}
                    type="checkbox"
                    id={color}
                    name="Color"
                    value={inputRef.current?.value}
                    ref={inputRef}
                  />
                  <label htmlFor={color}>{color}</label>
                </div>
              );
            })}
          </form>
        </details>
      </div>
    </aside>
  );
};
