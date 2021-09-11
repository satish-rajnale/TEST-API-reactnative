import { useState } from "react";

const DataList = () => {
    const [mainData, setMainData] = useState({products: [], offset: 0, limit: 100});
    const [cartCount, setcartCount] = useState([]);
    const [loading, setloading] = useState(true);
}