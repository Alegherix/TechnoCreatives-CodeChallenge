/**
 * A Spinner component that can be shown to the user when there's a loading state
 * @returns A Spinner Component
 */
export const Spinner = () => {
  return (
    <div className="m-auto rounded-full border-[10px] border-gray-300 border-t-blue-600 h-20 w-20 animate-spin" />
  );
};
