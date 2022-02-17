import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./card/card";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [foundDishes, setFoundDishes] = useState([]);
  const [name, setName] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://run.mocky.io/v3/128675fd-afe3-43fd-9b9a-cf7a0ee511ef")
      .then((res) => {
        setFoundDishes(res.data);
        setData(res.data);
      })
      .then(() => setLoading(false))
      .catch((err) => console.error(err));
  }, []);

  const filter = (e) => {
    console.log("filter is called");
    if (e !== "") {
      const results = foundDishes.filter((dishes) => {
        return dishes.name.toLowerCase().startsWith(e.toLowerCase());
      });
      setData(results);
    } else {
      setData(data);
    }
    setName(e);
    console.log("found Dishes are", data);
  };

  function debouce(func) {
    let timer;

    return function (...args) {
      // const context = this;
      // const args = args;
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), 1000);
    };
  }

  // console.log(data);
  return (
    <div className="App">
      {loading ? (
        <span>Data is loading...</span>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <input
              type="text"
              className="inputfield"
              value={name}
              onChange={(e) => filter(e.target.value)}
            />
            <div
              style={{
                marginRight: "5%",
                cursor: "pointer",
                marginTop: "1%",
              }}
              onClick={() => {
                setName("");
                setData(foundDishes);
              }}
            >
              Close
            </div>
          </div>

          {data.map((ele, index) => (
            <div className="container">
              <div className="cardMain" key={index}>
                <div className="foodInfo">
                  <div className="foodDetails">
                    <img
                      width={20}
                      src="https://icon2.cleanpng.com/20180601/ae/kisspng-vegetarian-cuisine-biryani-indian-cuisine-vegetabl-vegetarian-5b11c2357677b7.0724399215278904854853.jpg"
                      alt=""
                    />
                    <div> {ele.name}</div>
                    <div>₹ {ele.price}</div>
                  </div>
                  <img src={ele.cloudinaryImageId} alt="" />
                </div>
                <hr className="line" />
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
