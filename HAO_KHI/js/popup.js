const popup = document.getElementById("popupOverlay");
const popupBox = document.getElementById("popupBox");
const popupContent = document.getElementById("popupContent");
const closePopup = document.getElementById("closePopup");
const successPopup = document.getElementById("successPopup");
const successBox = document.getElementById("successBox");
const successContent = document.getElementById("successContent");
const closeSuccess = document.getElementById("closeSuccess");

const popupData = {
    rule:{
        background:"images/thele.png",
        title:"THỂ LỆ",
        content:`
            <p>1. Nội dung thể lệ...</p>
            <p>2. Nội dung thể lệ...</p>
            <p>3. Nội dung thể lệ...</p>
        `
    },
    "guide-home":{
        background:"images/huongdan.png",
        title:"HƯỚNG DẪN THAM GIA",
        content:`
            <p>Bước 1 : Đăng nhập game.</p>
            <p>Bước 2 : Chọn ảnh dự thi.</p>
            <p>Bước 3 : Điền thông tin.</p>
            <p>Bước 4 : Nhấn Đồng ý.</p>
        `
    },
    "guide-vote":{
        background:"images/huongdan.png",
        title:"HƯỚNG DẪN BÌNH CHỌN",
        content:`
            <p>Bước 1 : Chọn thí sinh.</p>
            <p>Bước 2 : Nhấn Vote.</p>
            <p>Bước 3 : Chọn số hoa.</p>
            <p>Bước 4 : Xác nhận.</p>
        `
    },
    flower:{
        background:"images/hoafree.png",
        title:"Nhiệm vụ",
        missions:[
            {
                text:"Đăng nhập mỗi ngày : +10 Hoa",
                button:""
            },
            {
                text:"Share Landing : +10 Hoa",
                button:""
            },
            {
                text:"Like Fanpage : +10 Hoa",
                button:""
            },
            {
                text:"Like Post : +10 Hoa",
                button:""
            },
            {
                text:"Tham gia Group : +10 Hoa",
                button:""
            }
        ]
    }
};
document.querySelectorAll(".popup-btn").forEach(button=>{
    button.addEventListener("click",function(e){
        e.preventDefault();
        const type=this.dataset.popup;
        if(!popupData[type]) return;
        popup.classList.add("show");
        popupBox.style.backgroundImage=
        `url('${popupData[type].background}')`;
        if(type==="flower"){
let html = "";

popupData[type].missions.forEach((item, index) => {

    html += `
        <div class="flower-task">
            <img src="images/nv.png" class="task-bg" alt="Task">
            <div class="task-content">
                <span class="task-text">${item.text}</span>
                <button class="flower-btn" data-index="${index}">
                    <img src="images/buttonnhan.png" alt="">
                    <span>${item.button}</span>
                </button>
            </div>
        </div>
    `;
});
popupContent.innerHTML = html;
        }
        else{
            popupContent.innerHTML=`
                <h3>${popupData[type].title}</h3>
                ${popupData[type].content}
            `;
        }
    });
});
document.addEventListener("click",function(e){
    const btn=e.target.closest(".flower-btn");
    if(!btn) return;
    const index=btn.dataset.index;
    alert("Đã nhận nhiệm vụ số "+(Number(index)+1));
});
if(closePopup){
    closePopup.addEventListener("click",()=>{
        popup.classList.remove("show");
    });
}
if(popup){
    popup.addEventListener("click",function(e){
        if(e.target===popup){
            popup.classList.remove("show");
        }
    });
}
const btnSubmit=document.getElementById("btnSubmit");
if(btnSubmit){
    btnSubmit.addEventListener("click",function(e){
        e.preventDefault();
        if(!successPopup) return;
        successPopup.classList.add("show");
        successBox.style.backgroundImage=
        "url('images/popupthongbao 2.png')";
        successContent.innerHTML=`
            <h2>ĐÃ ĐĂNG KÝ THÀNH CÔNG</h2>
        `;
    });
}
if(closeSuccess){
    closeSuccess.addEventListener("click",()=>{
        successPopup.classList.remove("show");
    });
}
if(successPopup){
    successPopup.addEventListener("click",function(e){
        if(e.target===successPopup){
            successPopup.classList.remove("show");
        }
    });
}