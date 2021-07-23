let result = document.querySelector('.resultCl');  //按鈕
let list = document.querySelector('.listCl'); //輸出ul
let icon = document.querySelector('.icon');//點擊圖標
let iconback =document.querySelector('.iconBack')
let iconP=document.querySelector('.icon p');//圖標P
let data =JSON.parse(localStorage.getItem('BMI'))||[];
//取得localStorage陣列化的值以此觸發||空值建立新陣列以避免BUG產生

list.addEventListener('click',listDel,false);
result.addEventListener('click',count,false);
//監聽

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}//取後兩位小數點



function count(e){
    res()
    let height = parseInt(document.querySelector('.heightCl').value); //身高
    let width = parseInt(document.querySelector('.widthCl').value); //體重
    if(isNaN(height)||isNaN(width)){
        result.value ='請輸入'    
        return
    }
    let total = width/(height*height/10000)//bmi算式
    let listTo =roundToTwo(total)//取小數後兩位
    let into ={
        widthstr:height,
        heightstr:width,
        content:listTo,//將算出的數字放入物件內
    };
    data.push(into)//data已經有個陣列，將物件push進去
    localStorage.setItem('BMI',JSON.stringify(data))//轉成字串將陣列輸入至local內
    update(data)//上面在輸入同時，這個data已經將數字導入陣列內，故以此更新ineerHTML
    click(data)
}


function update(items){//這裡的items會用data陣列下去跑
    let str='';
    let len = items.length;
    let calo
    let namee
    for(let i=0;i<len;i++){
        if(items[i].content<18.5){
            calo ='id="light"';//過瘦
            namee='你瘦了兄弟'
        }
        else if(items[i].content>=18.5&&items[i].content<24){
            calo ='id="suitable"'//標準
            namee='健康標準唷'
        }
        else if(items[i].content>=24&&items[i].content<27){
            calo ='id="fat"'//過重
            namee='最近得少吃'
        }
        else if(items[i].content>=27&&items[i].content<30){
            calo ='id="fatter"'//輕度
            namee='該減肥了唷'
        }
        else if(items[i].content>=30&&items[i].content<35){
            calo ='id="fatterr"'//中度
            namee='三高在身邊'
        }
        else if(items[i].content>=35){
            calo ='id="fatterrr"'//重度
            namee='真的不健康'
        }
        str+='<li '+calo+'><h3>'+namee+'</h3><p><span>BMI</span>'+items[i].content+'</p><p><span>Width</span>'+items[i].widthstr+'</p><p><span>Height</span>'+items[i].heightstr+'</p><div data-ggwp="'+i+'" class="dateCl">╳</div></li>';
    }
    list.innerHTML= str;
}
//更新函式將取得的陣列資料輸出至HTML


function listDel(e){
    if(e.target.nodeName !=='DIV'){return}
    let numr = e.target.dataset.ggwp;
    data.splice(numr,1);
    //靠的是點選data選取[]後,刪除當筆物件資料
    localStorage.setItem('BMI',JSON.stringify(data))
    //物件資料更新後轉字串同步的輸入local
    update(data)
    //使陣列在重新輸出一次，更新為新陣列
}
//刪除local資料

update(data)//開啟頁面時更新輸出函式OR建立新陣列

function click(ite){
    let inputtext =document.querySelector('.icon input')
    let intotext =document.querySelector('.icon p')
    let len =ite.length;
    for(let i=0;i<len;i++){
        if(ite[i].content<18.5){
            icon.setAttribute("class","iconNfat")
            intotext.textContent ='過輕'
            inputtext.value =ite[i].content
            //過瘦
        }
        else if(ite[i].content>=18.5&&ite[i].content<24){
            //標準
            icon.setAttribute("class","icongood")
            intotext.textContent ='標準'
            inputtext.value =ite[i].content
        }
        else if(ite[i].content>=24&&ite[i].content<27){
            //過重
            icon.setAttribute("class","iconfat")
            intotext.textContent ='過重'
            inputtext.value =ite[i].content
        }
        else if(ite[i].content>=27&&ite[i].content<30){
            //輕度
            icon.setAttribute("class","iconfatter")
            intotext.textContent ='輕度肥胖'
            inputtext.value =ite[i].content
        }
        else if(ite[i].content>=30&&ite[i].content<35){
            //中度
            icon.setAttribute("class","iconfatterr")
            intotext.textContent ='中度肥胖'
            inputtext.value =ite[i].content
        }
        else if(ite[i].content>=35){
            //重度
            icon.setAttribute("class","iconfatterrr")
            intotext.textContent ='重度肥胖'
            inputtext.value =ite[i].content
        }else{
            icon.setAttribute("class","icon")
            inputtext.value ='請輸入'
        }
    }
}
//使按鈕隨數值變色

let reset =document.querySelector('.icon img')
function back(e){
    let height = document.querySelector('.heightCl'); //身高
    let width = document.querySelector('.widthCl'); //體重
    icon.setAttribute("class","icon")
    height.value = ''
    width.value=''
    result.value='看結果'
}
reset.addEventListener('click',back,true)

function res(e){
    icon.setAttribute("class","icon")
    result.value='看結果'
}
//resetclick以避免錯誤


// function color(items){
//     let len =items.length;
//     for(let i=0;i<len;i++){
//         if(items[i].content<18.5){
//             listli.setAttribute("id","suitable")//過瘦
//         }
//         else if(items[i].content>=18.5&&items[i].content<24){
//             listLi.style ="border-left: 6px #86d73f solid;"//標準
//         }
//         else if(items[i].content>=24&&items[i].content<27){
//             listLi.style ="border-left: 6px #ff982d solid;"//過重
//         }
//         else if(items[i].content>=27&&items[i].content<30){
//             listLi.style ="border-left: 6px #ff6c03 solid;"//輕度
//         }
//         else if(items[i].content>=30&&items[i].content<35){
//             listLi.style ="border-left: 6px #ff6c09 solid;"//中度
//         }
//         else if(items[i].content>=35){
//             listLi.style ="border-left: 6px #ff1200 solid;"//重度
//         }
//     }
// }
//加入updete 使顏色同時生效(X)  可以吃到data資料，但這邊輸入到的是原先的li
