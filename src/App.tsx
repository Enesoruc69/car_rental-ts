import { useEffect, useRef, useState } from "react";
import Searchbar from "./components/searchbar";
import fetchCars from "./utils/fetchCars";
import { CarType } from "./types";
import Card from "./components/Card";
import LoadMore from "./components/LoadMore";
import { useSearchParams } from "react-router-dom";
import Year from "./components/Filter/year"
import Header from "./components/Header";
import Hero from "./components/Hero";
import Filter from "./components/Filter";
import Warning from "./components/Warning";

const App = () => {
  const [params, setParams] = useSearchParams();

  const [cars, setCars] = useState<CarType[] | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    // urldeki bütün param'ları bir nesne haline getir
    const paramsObj = Object.fromEntries(params.entries());

    fetchCars({ limit, ...paramsObj })
      .then((data) => setCars(data))
      .catch((err) => setIsError(true));
  }, [limit, params]);

  const catalogueRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen text-white bg-[rgb(23,23,23)]">
      <Header />

      <Hero catalogueRef={catalogueRef} />

      <div
        ref={catalogueRef}
        className="mt-12 padding-x padding-y max-width"
      >
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Araba Kataloğu</h1>
          <p>Beğenebileceğin arabları keşfet</p>
        </div>
        <div className="home__filters">
          <Searchbar />

          <div className="home__filter-container">
            <Filter />
            <Year />
          </div>
        </div>

        {!cars ? (
          <Warning>Yükleniyor..</Warning>
        ) : isError ? (
          <Warning>Üzgünüz bir sorun oluştu</Warning>
        ) : cars.length < 1 ? (
          <Warning>Aranılan kriterlere uygun araç bulunamadı</Warning>
        ) : (
          cars.length > 1 && (
            <section>
              <div className="home__cars-wrapper">
                {cars.map((car, i) => (
                  <Card car={car} key={i} />
                ))}
              </div>

              <LoadMore
                limit={limit}
                handleClick={() => {
                  setLimit(limit + 5);
                }}
              />
            </section>
          )
        )}
      </div>
    </div>
  );
};

export default App;
