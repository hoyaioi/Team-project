import "../CSS/ServiceCenter.css";
import { GoSearch } from 'react-icons/go'
import search from '../Img/search.png';
import {useState} from 'react';
import {Link} from "react-router-dom";
import Faq from './Faq';

function ServiceCenter() {

    let [faqModal, setFaqModal] = useState(false);

    return (
        <>
            <div id="service_container">
                <div id="service_contents">
                    <div className="service_main_contents">
                        <div className="service_side_cont">
                            <div className="service_side_box">
                                <h2>고객센터</h2>
                                <ul className="service_side_menu">
                                    <Link to="/servicecenter"><li>FAQ</li></Link>
                                    <Link to="/notice"><li>공지사항</li></Link>
                                </ul>
                            </div>
                            <div className="service_side_info">
                                <ul>
                                    <li>고객상담센터</li>
                                    <li><strong className="service_num">1818-1818</strong></li>
                                    <li>test@test.com</li>
                                    <li>월 ~ 금 09 : 00 ~ 18 : 00</li>
                                    <li>점심시간 12: 00 ~ 13 : 00</li>
                                    <li>공휴일 / 토,일 휴무</li>
                                </ul>
                            </div>
                        </div>
                        <div className="service_main_cont">
                            <div className="service_board_sec">
                                <div className="service_search_box">
                                    <form>
                                        <div className="service_search_data">
                                            <h2>자주묻는 질문 검색</h2>
                                            <div className="service_search_area">
                                                <input
                                                    type="text"
                                                    className="service_search_bar"
                                                    spellCheck="false"
                                                    maxLength="64"
                                                    placeholder="검색어를 입력해주세요."
                                                />
                                                <button
                                                    type="submit"
                                                    className="service_search_btn"
                                                >
                                                    <img
                                                        src={search}
                                                        className="service_search_img"
                                                    />
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="service_board_title">
                                    <h3>FAQ</h3>
                                </div>
                                <div className="service_board_list">
                                    <div className="service_board_hot">
                                        <ul>
                                            <li><a>전체</a></li>
                                            <li><a>회원가입/정보</a></li>
                                            <li><a>결제/배송</a></li>
                                            <li><a>환불/반품</a></li>
                                            <li><a>기타</a></li>
                                        </ul>
                                    </div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>번호</th>
                                                <th>분류</th>
                                                <th>내용</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>00</td>
                                                <td onClick={() => { setFaqModal(!faqModal) }}>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                            
                                            {faqModal === true ? <Faq /> : null}
                                            <tr>
                                                <td>00</td>
                                                <td>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                            <tr>
                                                <td>00</td>
                                                <td>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                            <tr>
                                                <td>00</td>
                                                <td>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                            <tr>
                                                <td>00</td>
                                                <td>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                            <tr>
                                                <td>00</td>
                                                <td>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                            <tr>
                                                <td>00</td>
                                                <td>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                            <tr>
                                                <td>00</td>
                                                <td>기타</td>
                                                <td>내용내용내용내용</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ServiceCenter;