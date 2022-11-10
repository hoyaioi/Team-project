import "../CSS/MyPage.css";
import { useState } from "react";
import MyOrderList from "./MyOrderList";
import MyCart from "./MyCart";
import MyRefund from "./MyRefund";
import MyReview from "./MyReview";
import MyInfoUp1 from "./MyInfoUp1";
import MyInfoUp2 from "./MyInfoUp2";
import MyInfoDel1 from "./MyInfoDel1";
import MyResearch from "./MyResearch";
import ReviewWrite from "./ReviewWrite";
import MyPageResearchDetail from "./MyResearchDetail";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

function MyPage() {
  return (
    <>
      <div id="main">
        <div className="mypage_main_wrap">
          <div className="mypage_side">
            <div className="mypage_side_in">
              <div className="mypage_profile_wrap">
                <div>Welcome!</div>
                <span>이름</span> 님
              </div>
              <div className="mypage_sidemenu">
                <ul>
                  <li>
                    <Link to="myorderlist">
                      <div>주문 현황</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myrefund">
                      <div>반품/환불</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="mycart">
                      <div>장바구니</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myreview">
                      <div>나의 리뷰</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myresearch">
                      <div>나의 설문</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myinfo">
                      <div>회원정보 수정</div>
                    </Link>
                  </li>
                  <li>
                    <Link to="myinfodel">
                      <div>회원탈퇴</div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="my_component">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;
