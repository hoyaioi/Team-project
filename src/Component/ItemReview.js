import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "../CSS/ItemReview.css";

function Review(props) {
  const reviewIdx = props.value;
  const [datas, setData] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:8080/review/${reviewIdx}`)
      .then((response) => {
        console.log(response);
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    // <table className='review-modal-table'>
    //     <tbody>
    // <>

    <tr colSpan="4" className="review-modal">
      <td>
        <div className="review-modal-cont">{datas.reviewTitle}</div>
        <div className="review-comment">
          <span className="comment-name">코멘트</span>
          <div>
            <span>{datas.reviewContents}</span>
          </div>
          <div className="comment-date">
            <span>{datas.reviewWriteDate}</span>
          </div>
        </div>
      </td>
    </tr>
    // </>
    //    </tbody>
    // </table>
  );
}

export default Review;
