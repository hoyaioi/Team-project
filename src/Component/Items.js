import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import dummy from "../dummy.json";

const Items = () => {

  const [datas, setDatas] = useState([]);

  useEffect(()=> {
    axios.get('http://localhost:8080/itemtop')
    .then(response => {
        console.log(response)
        setDatas(response.data);
    })
    .catch(error => console.log(error));
}, []);

  return (
    <div className="main_items_sales">
      {datas && datas.map(item => (
        <Link to={`/item/${item.itemIdx}`}>
          <div key={item.itemIdx} className="main_items">
            <div className="main_items_img_wrap">
              <img src={item.itemThumb} />
            </div>
            <div className="main_items_name">{item.itemName}</div>
            <div className="main_items_price">{item.itemPrice}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Items;