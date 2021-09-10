 const FetchProducts = async () => {
    return await fetch("https://fakestoreapi.com/products").then((data) => data.json())
}
export default FetchProducts