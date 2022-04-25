import React from 'react';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '.';
import { Color, Variant } from '../../graphql/generated';

/**
 * A type to represent the fields in the form related to filtering
 */
type FieldFilterType = keyof Pick<FormValues, 'color' | 'variant'>;

/**
 * The variations of filters that can be applied to a search
 */
type FilterVariation = typeof Color | typeof Variant;

/**
 * Used to create a map between the different fields, and the filter for those fields
 */
const filterMap: Record<FieldFilterType, FilterVariation> = {
  color: Color,
  variant: Variant,
};

interface FilterSectionProps {
  fieldValue: FieldFilterType;
  filterName: string;
}
/**
 * A component that's used to create filters for the Store
 * @param param0
 */
const FilterSection: React.VFC<FilterSectionProps> = ({
  fieldValue,
  filterName,
}) => {
  const { register, getValues, setValue } = useFormContext<FormValues>();
  const filter = filterMap[fieldValue];

  const onClickToggle = (value: keyof typeof filter) =>
    getValues(fieldValue) === value
      ? setValue(fieldValue, null)
      : setValue(fieldValue, value);

  return (
    <details open>
      <summary>{filterName}</summary>
      <form>
        {(Object.keys(filter) as Array<keyof typeof filter>).map((value) => {
          return (
            <div className="flex items-center gap-x-2" key={value}>
              <input
                {...register(fieldValue)}
                type="radio"
                id={value}
                value={filter[value]}
                onClick={() => onClickToggle(filter[value])}
              />
              <label htmlFor={value}>{value}</label>
            </div>
          );
        })}
      </form>
    </details>
  );
};

export const StorefrontFilter: React.VFC = () => {
  return (
    <aside className=" flex flex-col min-w-[160px]">
      <h2>Filter</h2>
      <div className="flex flex-col gap-2">
        <FilterSection fieldValue="color" filterName="Colors" />
        <FilterSection fieldValue="variant" filterName="Variants" />
      </div>
    </aside>
  );
};
