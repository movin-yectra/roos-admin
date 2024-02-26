import BaseButton from "../controls/BaseButton";
import BaseInput from "../controls/BaseInput";

import { faMagnifyingGlass } from "../../ui/Icons/Icons";
import { useState } from "react";

interface IProps {
  searchMenu: (data: string) => void;
}

const SearchBar: React.FC<IProps> = ({ searchMenu }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    searchMenu(searchValue);
  };
  return (
    <div>
      <div className="d-flex justify-content-around align-items-center">
        <div className="col-8">
          <BaseInput
            name="search"
            placeholder="Search..."
            type="text"
            value={searchValue}
            inputClass="border-0"
            inputIcon={faMagnifyingGlass}
            iconPosition="start"
            handleBlur={() => console.log("first")}
            handleChange={(e: any) => setSearchValue(e.target.value)}
          />
        </div>
        <div>
          <BaseButton
            types="button"
            defaultClass="btn btn-success"
            name="Search"
            handleClick={handleSearch}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
