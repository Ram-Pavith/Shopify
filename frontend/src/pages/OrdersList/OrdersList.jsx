import "./OrdersList.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, getProducts } from "../../redux/apiCalls";
// import { productRows } from "../../dummyData";
import {listMyOrders} from "../../actions/orderActions"
export default function OrdersList() {
  const dispatch = useDispatch();
  //const products = useSelector((state) => state.product.products);
  // const products = productRows
  const orderDetails = useSelector(state=>state.orderListMy)
  const {orders} = orderDetails
  console.log(orders)
  useEffect(() => {
    dispatch(listMyOrders())
  }, [dispatch]);

  const handleDelete = (id) => {
    // deleteProduct(id, dispatch);
  };
  function generateRandom() {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

  const columns = [
    { field: "order_id", headerName: "ID", width: 220 },
    {
      field: "order",
      headerName: "Order",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            <img className="orderListImg" src={params.row.image_url} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/order/${params.row.order_id}`}>
              <button className="orderListDetails">Details</button>
            </Link>
            <DeleteOutline
              className="OrderListDelete"
              onClick={() => handleDelete(params.row.order_id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) =>  generateRandom()}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
