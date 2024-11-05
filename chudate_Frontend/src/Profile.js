import "./page3.css"
import axios from 'axios';
import Swal from "sweetalert2";
import React, { useEffect, useState } from 'react';

function Profile() {
	const url = process.env.REACT_APP_BACKEND_URL
	const [imageUrl, setImageUrl] = useState(null);

	let Profile_Data;
	useEffect(() => {
  	if (imageUrl) {
	    document.getElementById("personal_picture").src = imageUrl+".jpg";
	  }
	}, [imageUrl]);
	function getCookieValue(cookieName) {
	  const cookies = document.cookie.split(';');
	  for (let i = 0; i < cookies.length; i++) {
	    const cookie = cookies[i].trim();
	    if (cookie.startsWith(cookieName + '=')) {
	      return cookie.substring(cookieName.length + 1);
	    }
	  }
	  return null;
	}
	
	axios.post(url + '/user/get', {"uid":getCookieValue('Log_in_ID')})
	.then(function (response) {
		Profile_Data=response.data.user[0];
	  console.log(Profile_Data);
	  document.getElementById("name").innerHTML = "姓名:"+Profile_Data.name;
	  document.getElementById("gender").innerHTML = "性別:"+Profile_Data.gender;
	  document.getElementById("department").innerHTML = "系所:"+Profile_Data.department;
	  document.getElementById("credit").innerHTML = "信用值:"+Profile_Data.credit;
	  document.getElementById("self_intro").innerHTML = Profile_Data.self_intro;
	  setImageUrl(Profile_Data.url);
	  console.log(imageUrl);
	})
	.catch(function (error) {
		Swal.fire({
			icon: 'error',
			text: '系統出現錯誤',
			confirmButtonColor: 'grey',
		})
	});

  
  return (
      <div>
		<div class="main_wrap_leve1">
			<div class="main_wrap_leve2">
				<div class="main_wrap_leve3">
					<img id="personal_picture" class="picture4" src={imageUrl} width="200" alt="pic"/>
					<div class="main_wrap_leve4">
						<div class="special_wrap">
							<div class="special_character">基本資料</div>
							<div class="special_block_wrap"><div class="special_block"></div></div>
							{/*<div class="button_wrap"><button class="button" type="button">編輯個人資料</button></div>*/}
						</div>
						<div class="main_wrap_leve5">
							<div class="main_wrap_leve6">
								<div class="character" id="name"></div>
								<div class="character" id="gender"></div>
								
							</div>
							<div class="block"></div>
							<div class="main_wrap_leve6">
								<div class="character" id="department"></div>
								<div class="character" id="credit"></div>
								
							</div>
						</div>
						{/*
						<div class="character">參與揪團次數: xx</div>
						<div class="character">發起揪團次數: xx</div> 
						<div class="favorite_wrap">
							<div class="favorite">籃球</div>
							<div class="favorite">健身</div>
							<div class="favorite">美食</div>
							<div class="favorite">吉他</div>
						</div> */}
					</div>
				</div>


				<div class="special_wrap">
					<div class="special_character">自我介紹</div>
					<div class="special_block_wrap"><div class="special_block"></div></div>
				</div>
				<div class="character" id="self_intro"></div>
			</div>
		</div>
    </div>
  );
}
 export default Profile;