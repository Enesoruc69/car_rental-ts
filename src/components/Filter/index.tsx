import ReactSelect from "react-select";

import { useSearchParams } from "react-router-dom";
import { fuels } from "../../utils/constans";

const Filter = () => {
  const [params, setParams] = useSearchParams();

  const selected = {
    label: params.get("fuel_type"),
    value: params.get("fuel_type"),
  };

  return (
    <div>
      <ReactSelect
        onChange={(e) => {
          params.set("fuel_type", e?.value as string);

          setParams(params);
        }}
        options={fuels}
        className="text-black"
        defaultValue={selected}
      />
    </div>
  );
};

export default Filter;
