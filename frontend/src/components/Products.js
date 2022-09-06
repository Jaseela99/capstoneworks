import React,{useMemo} from 'react'
import axios from "axios"
import {useTable,useSortBy, useGlobalFilter} from "react-table"
import SearchFilter from './SearchFilter'
const Products = () => {
    const [products,setProducts]=React.useState([])
    const fetchProducts = async () => {
        const response = await axios
          .get("https://fakestoreapi.com/products")
          .catch((err) => console.log(err));
    
          if (response) {
              const products = response.data;
              
            //   console.log("Products: ", products);
              setProducts(products);
            }
        };
      //data for the table
     /*  const data = useMemo(
        () => [
          {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description:
              "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
          {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description:
              "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
          {
            id: 1,
            title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
            price: 109.95,
            description:
              "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
            category: "men's clothing",
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            rating: {
              rate: 3.9,
              count: 120,
            },
          },
        ],
        []
      ); */
     
      //column definition for the data accessor is te key from the data whose value we need to render
    /* const columns=useMemo(()=>[{
        Header: "Id",
        accessor: "id",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Title",
        accessor: "title",
      },],[]) */

      const productData=useMemo(()=>
       [...products],[products]
    )
    const productColumns=useMemo(()=>
    products[0]? Object.keys(products[0])
    .filter((key) => key !== "rating")
    .map((key) => {
      if (key === "image")
        return {
          Header: key,
          accessor: key,
          Cell: ({ value }) => <img src={value} alt={key}/>,
          maxWidth: 70,
        };

      return { Header: key, accessor: key };
    })
: [],[products]
    )
    const tableHooks = (hooks) => {
        hooks.visibleColumns.push((columns) => [
          ...columns,
          {
            id: "Edit",
            Header: "Edit",
            Cell: ({ row }) => (
              <button className='pl-4
              pr-4
              pt-2
              pb-2
              text-black
              rounded-md
              bg-green-300
              hover:bg-green-200
              transition-colors' onClick={() => alert("Editing: " + row.values.price)}>
                Edit
              </button>
            ),
          },
        ]);
      };
    
      //useTablehook returns an instance object which contains everything to build a table and interact with its state
      const tableInstance=useTable({
        columns:productColumns,data:productData},
        useGlobalFilter,
        tableHooks,
        useSortBy
        )//data and columns are given for creating table instance
      //to apply the table instance we need to destructure it and give it to table elements
      const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow,  preGlobalFilteredRows,
        setGlobalFilter,
        state}=tableInstance
      const isEven=(index)=>index%2===0
      React.useEffect( ()=>{
        fetchProducts()
      },[])
      return (
        <>
        <SearchFilter preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={state.globalFilter}/>
    {/* apply the table props */}
    <table {...getTableProps()} className="table-fixed
        
    text-base
    text-gray-800">
        <thead className='p-2'>
            {/* loop over the header rows */}
           {
           headerGroups.map((headerGroup)=>(
            // Apply the header row props
            <tr className='border
            border-green-500'{...headerGroup.getHeaderGroupProps()}>
                {// Loop over the headers in each row
                    headerGroup?.headers.map(column => (
                        // Apply the header cell props
                    <th className='border
                    border-green-500
                    p-2' {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {// Render the header
               column.render('Header')}
               {column.isSorted?(column.isSortedDesc? " ▼" : " ▲") : ""}
                    </th>
                    ))}
            </tr>
           ))} 
        </thead>
        {/* apply table body props */}
        <tbody {...getTableBodyProps()}>
            {//loop over table rows
            rows.map((row,index)=>{
                prepareRow(row)
                return(
            // Apply the row props
            <tr className={`border
            border-green-500 ${isEven(index) ? "bg-green-400 bg-opacity-30" : ""}`} {...row.getRowProps()}>
          {// Loop over the rows cells
          row.cells.map((cell,index)=>{
            //Apply the cell props
            return(
                <td className='border
                border-green-500
                p-5' {...cell.getCellProps()}>
                {// Render the cell contents
                cell.render('Cell')}
              </td>  
            )
          })

          }
            </tr>
                )
            })}


        </tbody>
    </table>
    </>
  )
}

export default Products