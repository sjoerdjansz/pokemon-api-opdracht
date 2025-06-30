import "./Button.css";

export function Button({ label, type, isDisabled, handleClick, value }) {
  console.log(isDisabled);
  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={handleClick}
      value={value}
    >
      {label}
    </button>
  );
}
