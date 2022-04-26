import { Variant } from '../../shared';
/**
 * A Spinner component that can be shown to the user when there's a loading state
 * @returns A Spinner Component
 */

const stylesMap: Record<Variant, string> = {
  Primary: 'spinner',
  Secondary: 'spinnerSmall',
};
interface SpinnerProps {
  variant?: Variant;
  className?: string;
}

export const Spinner: React.VFC<SpinnerProps> = ({
  className,
  variant = 'Primary',
}) => {
  const style = stylesMap[variant];
  return (
    <div className={`m-auto rounded-full animate-spin ${style} ${className}`} />
  );
};
