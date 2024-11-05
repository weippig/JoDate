import axios from 'axios';
import * as React from 'react';
import { Box } from "@mui/material";
import "./page2.css"
import Swal from 'sweetalert2';

function Register() {
	let Register_Data=
	{
	  "uid":"",
	  "password":"",
	  "username":"",
	  "gender":"",
	  "department":"",
	  "intro":""
	}

	function handleButtonClick() {
		  const url = process.env.REACT_APP_BACKEND_URL

	  	Register_Data.uid=document.getElementById("uid").value;
	  	Register_Data.password=document.getElementById("password").value;
	  	Register_Data.username=document.getElementById("username").value;
	  	Register_Data.gender=document.getElementById("gender").value;
	  	Register_Data.department=document.getElementById("department").value;
	  	Register_Data.intro=document.getElementById("intro").value;

	  	if (Register_Data.uid!=="" && Register_Data.password!=="" && Register_Data.username!=="" && Register_Data.gender!=="" && Register_Data.department!=="" && Register_Data.intro!=="")
	  	{
	  		if (Register_Data.uid.includes("@g.nccu.edu.tw")===false)
	  		{
					Swal.fire({
						icon: 'warning',
						text: '您應使用政大郵箱註冊 格式為xxx@g.nccu.edu.tw',
						confirmButtonColor: 'grey',
					})
	  		}
	  		else if (Register_Data.gender==="性別")
	  		{
					Swal.fire({
						icon: 'warning',
						text: '性別欄位不可為空',
						confirmButtonColor: 'grey',
					})
	  		}
	  		else if (document.getElementById("check_password").value!==Register_Data.password)
	  		{
					Swal.fire({
						icon: 'warning',
						text: '兩次密碼輸入不一致',
						confirmButtonColor: 'grey',
					})
	  		}
	  		else
	  		{
	  			console.log('開始註冊');

	  			axios.post(url + '/user/signup', Register_Data)
	    		.then(function (response) {
						Swal.fire({
							icon: 'success',
							text: '註冊完成',
							confirmButtonColor: 'grey',
						}).then((result) => {
							if (result.isConfirmed) {
								window.location.href = process.env.REACT_APP_FRONTED_URL
							}
						})
	    		})
	    		.catch(function (error) {
	    			Swal.fire({
							icon: 'error',
							text: '系統出現錯誤',
							confirmButtonColor: 'grey',
						})
	    		});
	  		}
	  	}
	  	else
	  	{
				Swal.fire({
					icon: 'warning',
					text: '您尚有未填寫完畢的欄位',
					confirmButtonColor: 'grey',
				})
	  	}
  }

  return (
    <Box>
			<div className="main_wrap_leve1">
		<div className="main_wrap_leve2">
			<div className="frame_decorate">
				<div className="main_wrap_leve3">
					<div className="main_wrap_leve4">
						<div className="character">學校信箱</div>
						<input id="uid" className="input_decorate" type="text" name="欄位名稱" />
					</div>
					<div className="block"></div>
					<div className="main_wrap_leve4">
						<div className="character">密碼</div>
						<input id="password" className="input_decorate" type="password" name="欄位名稱" />
					</div>
				</div>
				<div className="main_wrap_leve3">
					<div className="main_wrap_leve4">
						<div className="character">姓名</div>
						<input id="username" className="input_decorate" type="text" name="欄位名稱" />
					</div>
					<div className="block"></div>
					<div className="main_wrap_leve4">
						<div className="character">確認密碼</div>
						<input id="check_password" className="input_decorate" type="password" name="欄位名稱" />
					</div>
				</div>

				<div className="main_wrap_leve3">
					<div className="main_wrap_leve4">
						<div className="character">性別</div>
						<select id="gender"  className="input_decorate">
				    		<option>性別</option>
				    		<option>男</option>
				    		<option>女</option>
				    		<option>第三性</option>
						</select>
					</div>
					<div className="block"></div>
					<div className="main_wrap_leve4">
						<div className="character">系所</div>
						<select id="department"  className="input_decorate">
				    		<option></option>
				    		<option>中國文學系</option>
				    		<option>歷史學系</option>
				    		<option>哲學系</option>
				    		<option>應用數學系</option>
				    		<option>心理學系</option>
				    		<option>政治學系</option>
				    		<option>社會學系</option>
				    		<option>財政學系</option>
				    		<option>公共行政學系</option>
				    		<option>地政學系</option>
				    		<option>經濟學系</option>
				    		<option>民族學系</option>
				    		<option>法律學系</option>
				    		<option>金融學系</option>
				    		<option>國際經營與貿易學系</option>
				    		<option>會計學系</option>
				    		<option>統計學系</option>
				    		<option>企業管理學系</option>
				    		<option>資訊管理學系</option>
				    		<option>財務管理學系</option>
				    		<option>風險管理與保險學系</option>
				    		<option>英國語文學系</option>
				    		<option>阿拉伯語文學系</option>
				    		<option>斯拉夫語文學系</option>
				    		<option>日本語文學系</option>
				    		<option>韓國語文學系</option>
				    		<option>土耳其語文學系</option>
				    		<option>歐洲語文學系</option>
				    		<option>傳播學院大一大二不分系</option>
				    		<option>新聞學系</option>
				    		<option>廣告學系</option>
				    		<option>廣播電視學系</option>
				    		<option>外交學系</option>
				    		<option>教育學系</option>
				    		<option>資訊科學系</option>
						</select>
						{/*<input id="department" className="input_decorate" type="text" name="欄位名稱" />*/}
					</div>
				</div>
				<div className="main_wrap_special">
					<div className="character">自我介紹</div>
					<textarea  id="intro" className="input_decorate_self" type="text" name="欄位名稱" />
				</div>
				<div className="main_wrap_leve3">
					<button id="btn" className="button" type="button" onClick={handleButtonClick}>註冊</button>
				</div>
			</div>
		</div>
	</div>
    </Box>
  );
}


export default Register;

