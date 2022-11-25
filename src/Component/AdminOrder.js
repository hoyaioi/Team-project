import axios from "axios";
import { useEffect, useState } from "react";
import "../CSS/AdminOrder.css";
import Paging from "./Paging";


function AdminOrder() {

    const [datas, setDatas] = useState([]);
    const orderState = ["상품준비중", "배송중", "배송완료"];
    const [stateSelect, setStateSelect] = useState([]);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * 10;
    const [pagecount, setPageCount] = useState(10);
    const count = datas.length;
    const stateHandler = (e) => {
        setStateSelect(e.target.value);
        console.log(stateSelect);
    }

    const stateChange = (orderlistIdx) => {

        console.log(orderlistIdx)

        axios.post(
            `http://localhost:8080/admin/orderstate/${orderlistIdx},${stateSelect}`, 
            null, 
            { headers : { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` } }
        )
            .then((response) => {
                console.log(response);
                alert("변경완료");
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    const stateCancle = (orderlistIdx) => {
        axios.post(`http://localhost:8080/admin/ordercancle/${orderlistIdx}`,null, { 
            headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
          }
        })
            .then((response) => {
                console.log(response.data);
                alert("취소처리완료");
                window.location.reload();
            })
            .catch((error) => console.log(error));
    }

    useEffect(() => {
        axios.get("http://localhost:8080/admin/order", { 
            headers: { 
            'Authorization': `Bearer ${sessionStorage.getItem("token")}` 
          }
        })
            .then((response) => {
                console.log(response);
                setDatas(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    return (
        <>
            <div className="adminorder_list">
                <div className="adminorder_header"><strong>관리자 주문목록</strong></div>
                <table className="admin_order_table">
                    <thead >
                        <tr>
                            <th width="16%">상품이미지</th>
                            <th width="16%">주문번호</th>
                            <th width="30%">상품이름</th>
                            <th width="10%">주문자</th>
                            <th width="11%">주문일자</th>
                            <th width="17%">주문상태</th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas.slice(offset, offset + 10).map(orderlist => (
                            <tr>
                                <td className="admin_img" width="16%"><img className="adminorder_img" src={process.env.REACT_APP_API_URL + orderlist.itemThumb} /></td>
                                <td width="16%">{orderlist.orderNum}</td>
                                <td width="30%">{orderlist.itemName}</td>
                                <td width="10%">{orderlist.memIdx}</td>
                                <td width="11%">{orderlist.orderDate}</td>
                                <td width="17%">
                                    {orderlist.orderStatus}
                                   {orderlist.orderStatus === "취소처리중" ? <button onClick={()=>stateCancle(orderlist.orderlistIdx)}>취소처리완료</button> : <select name="categoryName" onChange={stateHandler}>
                                            <option hidden></option>
                                        {orderState.map((state) => (
                                            <option
                                                value={state}
                                                key={state}
                                            >
                                                {state}
                                            </option>
                                        ))}
                                    </select> } 
                                   {orderlist.orderStatus === "취소처리중" ? null : <button onClick={()=>stateChange(orderlist.orderlistIdx)}>변경하기</button>}
                                </td>
                            </tr>
                        ))}


                    </tbody>
                </table>
                    <div><Paging page={page} setPage={setPage} count={count} pagecount={pagecount} /></div>
            </div>
        </>

    );
}

export default AdminOrder;