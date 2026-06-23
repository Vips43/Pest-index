/*eslint-disable */
import { useMemo, useState } from "react";
import { useMyStore } from "../store/store";

function Livedata() {
  const [value, setValue] = useState("");

  const getCurrWeather = useMyStore((state) => state.getCurrWeather);
  const getWeather = useMyStore((state) => state.getWeather);
  const weather = useMyStore((state) => state.weather);
  const pestIndices = useMyStore((state) => state.pestIndices);
  const err = useMyStore((state) => state.err);
  const debounce = useMyStore((state) => state.debounce);


  const debounceUpdate = useMemo(
    () => debounce((value) => getCurrWeather(value), 500),
    [],
  );

  const handleChange = (e) => {
    debounceUpdate(e.target.value);
  };

  return (
    <div className="space-y-5 m-3 text-center py-10">
      <h3 className="text-2xl font-semibold text-light">
        Search for city by name
      </h3>
      <div>
        <input
          type="text"
          placeholder="Enter city..."
          onChange={handleChange}
          className="outline-none border-2 border-primary-light/50 focus:border-primary bg-light px-4 py-2 rounded-lg transition-colors w-64 shadow-sm"
        />
      </div>
      <p className="text-white">{value}</p>
      {err && (
        <p className="text-red-500 font-medium capitalize bg-red-100/50 w-fit mx-auto px-4 py-1 rounded-md">
          {err}
        </p>
      )}

      <div className="flex flex-wrap gap-4 mt-4 justify-center pb-5">
        {!err &&
          value &&
          pestIndices &&
          Object.entries(pestIndices).map(([p, i]) => (
            <span
              key={p}
              className={`px-5 py-2.5 rounded-xl capitalize border shadow-md transition-colors duration-300 backdrop-blur-md text-white font-medium tracking-wide
                ${
                  i > 70
                    ? "bg-red-500/40 border-red-500"
                    : i > 40
                      ? "bg-yellow-500/40 border-yellow-500 text-yellow-50"
                      : "bg-green-500/40 border-green-500"
                }`}
            >
              {p}: <strong className="text-2xl ml-2">{i}</strong>
            </span>
          ))}
      </div>
    </div>
  );
}

export default Livedata;
