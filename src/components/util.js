import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const IconButton = function ({ icon, styles, disabled, ...rest }) {
  return (
    <button
      className={`h-[30px] w-[30px] text-offwhite bg-primary flex justify-center items-center rounded-full disabled:opacity-30 ${styles}`}
      disabled={disabled}
      {...rest}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

export const PrimaryBtn = function ({
  styles = "text-white border-white",
  children,
  disabled,
  ...rest
}) {
  return (
    <button
      className={`bg-primary  rounded-[8px]  px-4 py-1 border-[2px] border-offwhite hover:bg-offwhite hover:text-primary text-sm disabled:opacity-30 font-semibold ${styles}`}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
