interface FilterDropdownProps {
  options: string[];
}

const FilterDropdown = ({ options }: FilterDropdownProps) => {
  return (
    <div>
      <div>
        {options.map((option) => (
          <label key={option}>
            <input type="checkbox" />
            recode
          </label>
        ))}
      </div>
      <button>적용</button>
    </div>
  );
};

export default FilterDropdown;
