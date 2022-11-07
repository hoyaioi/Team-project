import "bootstrap/dist/css/bootstrap.css";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaFacebookF } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { useDaumPostcodePopup } from "react-daum-postcode";
import axios from "axios";

import "../CSS/Register.css";

function Register() {
  const handleComplete = (data) => {
    let fullAddress = data.address;
    let postCode = data.zonecode;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    setAddr1(fullAddress);
    setPostCode(postCode);
  };

  // 주소검색창 팝업열기
  const open = useDaumPostcodePopup(
    "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
  );
  const handleOpenSearchAddress = () => {
    open({ onComplete: handleComplete });
  };

  const datas = [
    { id: 0, title: "만 14세 이상입니다." },
    { id: 1, title: "이용 약관 동의" },
    { id: 2, title: "개인정보처리방침 동의" },
    { id: 3, title: "마케팅 수신 동의" },
  ];

  const [checkItems, setCheckItems] = useState([]);

  const [name, setName] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [postCode, setPostCode] = useState("");
  const [addr1, setAddr1] = useState("");
  const [addr2, setAddr2] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handlerChangeName = (e) => setName(e.target.value);
  const handlerChangePhoneNum = (e) => setPhoneNum(e.target.value);
  const handlerChangePostCode = (e) => setPostCode(e.target.value);
  const handlerChangeAddr1 = (e) => setAddr1(e.target.value);
  const handlerChangeAddr2 = (e) => setAddr2(e.target.value);
  const handlerChangeEmail = (e) => setEmail(e.target.value);
  const handlerChangePassword = (e) => setPassword(e.target.value);

  const handlerClickSubmit = (e) => {
    e.preventDefault();

    const memInfo = {
      memName: name,
      memPhone: phoneNum,
      memPostNum: postCode,
      memAddr1: addr1,
      memAddr2: addr2,
      memEmail: email,
      memPw: password,
    };

    axios
      .post("http://localhost:8080/api/member/join", memInfo)
      .then((response) => {
        if (
          response.status === 200 &&
          !(
            name === "" &&
            phoneNum === "" &&
            postCode === "" &&
            addr1 === "" &&
            addr2 === "" &&
            email === "" &&
            password === ""
          )
        ) {
          alert("정상적으로 등록되었습니다.");
        } else {
          alert("등록에 실패했습니다.");
          return;
        }
      })
      .catch((error) => console.log(error));
  };

  const onChangeEmail = (e) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (!e.target.value || emailRegex.test(e.target.value))
      setEmailError(false);
    else setEmailError(true);
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    if (!confirmPassword || e.target.value === confirmPassword)
      setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setPassword(e.target.value);
  };

  const onChangeConfirmPassword = (e) => {
    if (password === e.target.value) setConfirmPasswordError(false);
    else setConfirmPasswordError(true);
    setConfirmPassword(e.target.value);
  };

  const validation = () => {
    if (!email) setEmailError(true);
    if (!confirmPassword) setConfirmPasswordError(true);
  };

  const onSubmit = (e) => {
    if (validation()) return;
  };

  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckItems((prev) => [...prev, id]);
    } else {
      setCheckItems(checkItems.filter((el) => el !== id));
    }
  };

  useEffect(() => {
    console.log(checkItems);
  });

  const handleAllCheck = (checked) => {
    if (checked) {
      const idArray = [];
      datas.forEach((el) => idArray.push(el.id));
      setCheckItems(idArray);
    } else {
      setCheckItems([]);
    }
  };

  return (
    <>
      <div className="sign_container">
        <h2>회원가입</h2>
        <div className="sign_wrap">
          <Form>
            <Form.Group>
              <Form.Label style={{ color: "grey" }}>이름</Form.Label>
              <Form.Control
                style={{ marginBottom: "30px", width: "450px" }}
                type="name"
                placeholder="이름을 입력하세요."
                value={name}
                onChange={handlerChangeName}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label style={{ color: "grey", display: "block" }}>
                연락처
              </Form.Label>
              <Form.Control
                className="phonenumForm"
                style={{ display: "inline-block", width: "300px" }}
                type="phonenumber"
                placeholder="연락처를 '-'없이 입력하세요"
                value={phoneNum}
                onChange={handlerChangePhoneNum}
              />
              <button
                className="sendCode  btn text-white"
                type="button"
                style={{ marginLeft: "20px" }}
              >
                인증번호 발송
              </button>
              <Form.Control
                className="vertificodeForm"
                style={{
                  display: "inline-block",
                  width: "300px",
                  marginBottom: "30px",
                }}
                type="vertification code"
                placeholder="인증번호를 입력하세요"
              />
              <button
                className="confirmCode btn text-white"
                type="button"
                style={{ marginLeft: "20px" }}
              >
                인증번호 확인
              </button>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: "grey" }}>우편번호</Form.Label>
              <br />
              <Form.Control
                className="postCodeInput"
                readOnly
                type="postcode"
                value={postCode}
                onChange={handlerChangePostCode}
              />
              <button
                className="searchPostCode btn text-white"
                type="button"
                onClick={handleOpenSearchAddress}
                style={{ marginLeft: "20px" }}
              >
                검색
              </button>
            </Form.Group>
            <Form.Group>
              <Form.Label style={{ color: "grey" }}>주소</Form.Label>
              <Form.Control
                style={{ width: "450px", marginBottom: "30px" }}
                type="address"
                name="address"
                placeholder="주소를 입력하세요"
                value={addr1}
                onChange={handlerChangeAddr1}
                required
              />
              <Form.Label style={{ color: "grey" }}>상세주소</Form.Label>
              <Form.Control
                style={{ width: "450px" }}
                type="addressDetail"
                placeholder="상세주소를 입력하세요"
                required
                value={addr2}
                onChange={handlerChangeAddr2}
              />
            </Form.Group>

            <hr style={{ margin: "20px 0px", width: "450px" }}></hr>
            <Form.Group>
              <Form.Label style={{ display: "block", color: "grey" }}>
                아이디(이메일형식)
              </Form.Label>
              <Form.Control
                className="emailForm"
                style={{ display: "inline-block", width: "300px" }}
                type="email"
                placeholder="아이디(이메일형식)을 입력하세요."
                value={email}
                onChange={onChangeEmail}
                required
              />
              <button
                className="checkOverlapEmail btn text-white"
                type="button"
                style={{ marginLeft: "20px", width: "127px" }}
              >
                중복확인
              </button>
              {emailError && (
                <div class="invalid-input" style={{ color: "red" }}>
                  <br />
                  이메일 형식으로 아이디를 입력해주세요.
                </div>
              )}

              <Form.Label style={{ color: "grey" }}>비밀번호</Form.Label>
              <Form.Control
                className="passwordForm"
                style={{ width: "300px" }}
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={password}
                onChange={onChangePassword}
                required
              />

              <Form.Label style={{ color: "grey" }}>비밀번호 확인</Form.Label>
              <Form.Control
                className="passwordCheckForm"
                style={{ width: "300px" }}
                type="password"
                placeholder="비밀번호를 다시 입력해주세요."
                value={confirmPassword}
                onChange={onChangeConfirmPassword}
                required
              />
              <br />
              {confirmPasswordError && (
                <span style={{ color: "red" }}>
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </Form.Group>

            <div className="agreement_wrapper">
              <thead>
                <tr>
                  <th>
                    <Form.Check
                      className="agree_box"
                      type="checkbox"
                      label="모두 동의하기"
                      style={{ fontSize: "20px", fontWeight: "bold" }}
                      onChange={(e) => handleAllCheck(e.target.checked)}
                      checked={
                        checkItems.length === datas.length ? true : false
                      }
                    />
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td>
                    <hr style={{ margin: "20px 0px", width: "450px" }}></hr>
                  </td>
                </tr>
                {datas?.map((data) => {
                  return (
                    <tr>
                      <td>
                        <Form.Check
                          className="agree_box"
                          type="checkbox"
                          label={data.title}
                          required={data.id === 3 ? false : true}
                          onChange={(e) =>
                            handleSingleCheck(e.target.checked, data.id)
                          }
                          checked={checkItems.includes(data.id) ? true : false}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </div>
            <span className="choice_option">선택사항</span>

            <div className="second_register_btn_wrapper">
              <input
                className="second_regbtn"
                type="submit"
                id="submit"
                value="회원가입"
                onClick={() => {
                  onSubmit();
                  handlerClickSubmit();
                }}
              />
              <button className="secondKktRegbtn btn text" type="button">
                <RiKakaoTalkFill size="30" />
                카카오톡 회원가입
              </button>
              <button className="secondFacebookRegbtn btn text" type="button">
                <FaFacebookF size="30" color="white" />
                페이스북 회원가입
              </button>
              <button className="secondNaverRegbtn btn text" type="button">
                <SiNaver size="30" color="white" />
                네이버 회원가입
              </button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
