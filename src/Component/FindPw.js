import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import {
  FormControl,
  FormGroup,
  FormLabel,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../CSS/Find.css";

function FindPw() {

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(name);
  })

  const onChangeEmail = (e) => setEmail(e.target.value);
  const onChangeName = (e) => setName(e.target.value);
  const onChangePhoneNum = (e) => setPhoneNum(e.target.value.replace(/[^0-9]/g, ""));

  const clickFindPW = (e) => {
    console.log(e)
    e.preventDefault();
    // axios.get("http://localhost:8080/api/member/"+name+"/"+phoneNum)
    axios.get(`http://localhost:8080/member/${email}/${name}/${phoneNum}`)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        navigate('/login');
        alert(`${name}님의 비밀번호는 ${response.data.memPw}입니다.`);
      }
    })
    .catch(error => {
      alert("입력하신 정보로 가입된 계정이 없습니다.")
      console.log(error)
    });
  }
  return (
    <>
      <div className="find_wrapper_pw">
        <div className="find_container">
          <h2>비밀번호 찾기</h2>

          <Row id="find_input">
            <FormGroup className="find_input_box">
              <FormLabel style={{ color: "grey" }}>아이디(이메일)</FormLabel>
              <FormControl
                style={{ width: "450px" }}
                type="email"
                value={email}
                onChange={onChangeEmail}
                placeholder="아이디(이메일)을 입력하세요."
              />

              <FormLabel style={{ color: "grey" }}>이름</FormLabel>
              <FormControl
                style={{ width: "450px" }}
                type="name"
                value={name}
                onChange={onChangeName}
                placeholder="이름을 입력하세요."
              />

              <FormLabel style={{ color: "grey" }}>연락처</FormLabel>
              <FormControl
                style={{ width: "450px" }}
                type="phoneNum"
                value={phoneNum}
                onChange={onChangePhoneNum}
                placeholder="연락처를 '-'없이 입력하세요."
              />
              <button className="find_btn btn-text" type="button" onClick={clickFindPW}>
                비밀번호 찾기
              </button>
            </FormGroup>
          </Row>
        </div>
      </div>
    </>
  );
}

export default FindPw;
