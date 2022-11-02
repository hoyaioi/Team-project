import "./css/Survey1.css";
import { BsArrowRightCircle, BsArrowLeftCircle } from 'react-icons/bs';
import { Component, useState } from "react";
import { Link } from "react-router-dom";

const Step2 = ({ nextSteps, prevSteps, info }) => {

    //체크된 값 저장할 리스트
    const [checked, setChecked] = useState([]);

    //체크된 값 저장하는 함수
    const onChecked = (e) => {
        //체크된 값이 없으면 추가하고, 체크된 값이 있으면 제거
        if (checked.indexOf(e.target.value) === -1) {
            setChecked([...checked, e.target.value]);
        } else {
            setChecked(checked.filter(item => item !== e.target.value));
        }

        console.log(checked);
    }

      
      const saveInfo=(e)=>{
        let sessionStorage = window.sessionStorage;
        sessionStorage.setItem("checked", JSON.stringify(checked));
        sessionStorage.setItem("checkedlength", JSON.stringify(checked.length));
        console.log(sessionStorage.getItem("checked")); 
        console.log(checked.length);
      }
      
      const nextStep = (e) => {
        saveInfo();

        nextSteps();
     }
     
    return (
        <>
            <div className="back1">
                <div className="inside">
                    <h2>나에게 맞춤 영양제 찾기</h2>
                    <h4>걱정되는 건강항목을 체크 해주세요.</h4>
                    <div className="organcheck">
                        <input className="radio" type='checkbox' name='organ' value='간' onChange={onChecked} /> 간
                        <input className="radio" type='checkbox' name='organ' value='눈' onChange={onChecked} /> 눈
                        <input className="radio" type='checkbox' name='organ' value='몸' onChange={onChecked} /> 몸(활력)
                        <br />
                        <input className="radio" type='checkbox' name='organ' value='혈관' onChange={onChecked} /> 혈관
                        <input className="radio" type='checkbox' name='organ' value='장' onChange={onChecked} /> 장
                    </div>

                    <div className='prev' onClick={prevSteps}><BsArrowLeftCircle size={75} color='white' /></div>
                    <div className='next' onClick={nextStep}><BsArrowRightCircle size={75} color='white' /></div>
                </div>
            </div>

        </>
    );

};


export default Step2;

