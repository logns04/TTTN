const popup = document.getElementById("popupOverlay");

const popupBox = document.getElementById("popupBox");

const popupContent = document.getElementById("popupContent");
const successPopup = document.getElementById("successPopup");

const successBox = document.getElementById("successBox");

const successContent = document.getElementById("successContent");
document.querySelectorAll(".popup-btn").forEach(button=>{

    button.onclick=function(e){

        e.preventDefault();

        popup.classList.add("show");

        if(this.dataset.popup==="rule"){

            popupBox.style.backgroundImage="url('images/popup_thele.png')";

            popupContent.innerHTML=`

<h3>THỂ LỆ CUỘC THI</h3>

<p>1. Người chơi phải đăng ký đúng tài khoản.</p>

<p>2. Chỉ được gửi 01 bài dự thi.</p>

<p>3. Không sử dụng hình ảnh phản cảm.</p>

<p>4. BTC có quyền từ chối bài dự thi.</p>

<p>5. Quyết định của BTC là quyết định cuối cùng.</p>

<p>6. Nội dung có thể dài...</p>

<p>7. Nội dung có thể dài...</p>

<p>8. Nội dung có thể dài...</p>

`;
        }

        if(this.dataset.popup==="guide"){

            popupBox.style.backgroundImage="url('images/popup_huongdan.png')";

            popupContent.innerHTML=`

<h3>HƯỚNG DẪN THAM GIA</h3>

<p>Bước 1: Đăng nhập tài khoản.</p>

<p>Bước 2: Chọn ảnh.</p>

<p>Bước 3: Điền thông tin.</p>

<p>Bước 4: Nhấn Đồng ý.</p>

<p>Bước 5: Chờ xét duyệt.</p>

`;
        }

    }

});

document.getElementById("closePopup").onclick=function(){

    popup.classList.remove("show");

}

popup.onclick=function(e){

    if(e.target===popup){

        popup.classList.remove("show");

    }

}
document.getElementById("btnSubmit").onclick=function(e){

    e.preventDefault();

    successPopup.classList.add("show");

    successBox.style.backgroundImage =
        "url('images/popupthongbao 2.png')";

    successContent.innerHTML = `

        <h2>ĐÃ ĐĂNG KÝ THÀNH CÔNG</h2>
    `;

}
document.getElementById("closeSuccess").onclick=function(){

    successPopup.classList.remove("show");

}
successPopup.onclick=function(e){

    if(e.target===successPopup){

        successPopup.classList.remove("show");

    }

}