const SearchInput = ({ value, onChange, placeholder = "Search..." }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input input-bordered w-full"
    />
  );
};

export default SearchInput;