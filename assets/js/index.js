var tenThsd  =10000;
var oneHunMil = 100000000;
var vPresentMeso;
var vPresentMepo;
var vPercentMVP;
var vDiscountRate;
var vAuctionCharge;
var discountRate;
var auctionRate;
var realMepo;
var moneyTransMepo;

var vJuhwaVal;
var vJuhwaCnt;

var vPcFee;
var vPcHH;
var vPcMM;
var vPiecePrice;

var for1MilWithPerson;
var for1MilWithMarket;

var vPastMeso;

var vItemMesoVal

var vJuHeunPrice;
var vAzmPotionPrice;

const option = {
    maximumFractionDigits: 2
  };

$(document).ready(function() {
    $('.menu-toggle').click(function(e) {
        e.preventDefault();
        $('#topNav .menu').toggleClass('active');
    });

    firstValSetting();
    dataLoad();
    fn_collection("");
    createGrid1();

    $(document).find("input,select,textarea,button,radio").on("focus keyup change", function(){
        fn_collection($(this).attr("id"));
        saveData();
    });

    let tableBody = $("#memberTable");

    for (let i = 1; i <= 6; i++) {
        tableBody.append(`
            <tr>
                <td scope="row" data-label="닉네임">
                    <input type="text" name="memberName${i}" id="memberName${i}" 
                      placeholder="닉네임"/>
                </td>
                <td data-label="분배지분">
                    <input type="text" class="memberStack" name="memberStack${i}" id="memberStack${i}" 
                        oninput="onlyNumberWithComma(this);fn_customBunbae();" placeholder="분배지분"/>
                </td>
                <td data-label="인당 분배금(메소)">
                    <span id="customBunbaeMeso${i}"></span>
                </td>
                <td data-label="인당 분배금(원)">
                    <span id="customBunbaeWon${i}"></span>
                </td>
                <td data-label="인당 분배금(조각)">
                    <span id="customBunbaeDajo${i}"></span>
                </td>
            </tr>
        `);
    }

    for (var i = 1; i <= 6; i++) {
        $(`#customBunbaeMeso${i}`).text("0");
        $(`#customBunbaeWon${i}`).text("0");
        $(`#customBunbaeDajo${i}`).text("0");
    }


    // 탭 전환
    $(".tab button").click(function () {
        $(".tab button").removeClass("active");
        $(this).addClass("active");

        if ($(this).attr("id") === "equalBtn") {
            $("#equalDiv").show();
            $("#customDiv").hide();
        } else {
            $("#equalDiv").hide();
            $("#customDiv").show();
        }
    });
});

function firstValSetting(){
    //사이드메뉴
    $("#presentMeso").val('1,100');
    $("#presentMepo").val('1,520');
    $("#percentMVP").val('7,500');
    $("#discountRate").val('0');
    $('input[name="auctionCharge"]')[0].checked = true;

    //골드주화가치
    $("#juhwaVal").val('83,942,300');
    
    //피시방 효율
    $("#pcFee").val('3,000');
    $("#pcHH").val('2');
    $("#pcMM").val('40');
    $("#piecePrice").val('9,999,999');

    //과거와 현재 아이템 가치
    $("#pastMeso").val('1,800');
    $("#presentItem").val('0');
    $("#pastItem").val('0');

    //아이템의 현금가치
    $("#itemMesoVal").val('0');

    //주흔&아즈모스코인가치
    $('input[name="juHeun50Event"]')[0].checked = true;
    $("#juHeunPrice").val('3,000');
    $("#azmPotionPrice").val('6,666,666');

    //보상분배계산기
    $("#saleMeso").val('0');
    $("#memberCnt").val('1');

    //메소판매차익
    $("#buyMesoPrice").val('1,500');
    $("#buyMesoAmt").val('10');
    $("#buyMesoWon").val('15,000');
    
}

// 페이지 로드 시 저장된 데이터 불러오기
function dataLoad(){
    vPresentMeso = localStorage.getItem('presentMeso');
    vPresentMepo = localStorage.getItem('presentMepo');
    vPercentMVP = localStorage.getItem('percentMVP');
    vDiscountRate = localStorage.getItem('discountRate');
    vAuctionCharge = localStorage.getItem('auctionCharge');

    vJuhwaVal = localStorage.getItem('juhwaVal');
    vJuhwaCnt = localStorage.getItem('juhwaCnt');

    vPcFee = localStorage.getItem('pcFee');
    vPcHH = localStorage.getItem('pcHH');
    vPcMM = localStorage.getItem('pcMM');
    vPiecePrice = localStorage.getItem('piecePrice');

    vPastMeso = localStorage.getItem('pastMeso'); 

    vItemMesoVal = localStorage.getItem('itemMesoVal'); 

    vJuHeunPrice = localStorage.getItem('juHeunPrice');
    vAzmPotionPrice = localStorage.getItem('azmPotionPrice');

    if (vPresentMeso) {
      document.getElementById('presentMeso').value = vPresentMeso;
    }
    if (vPresentMepo) {
      document.getElementById('presentMepo').value = vPresentMepo;
    }
    if (vPercentMVP) {
        document.getElementById('percentMVP').value = vPercentMVP;
    }
    if (vDiscountRate) {
        document.getElementById('discountRate').value = vDiscountRate;
    }
    if (vAuctionCharge) {
        $('#'+vAuctionCharge+"per").attr("checked", true);
    }
    if (vPcFee) {
        document.getElementById('pcFee').value = vPcFee;
    }
    if (vPcHH) {
        document.getElementById('pcHH').value = vPcHH;
    }
    if (vPcMM) {
        document.getElementById('pcMM').value = vPcMM;
    }
    if (vPiecePrice) {
        document.getElementById('piecePrice').value = vPiecePrice;
    }
    if (vJuhwaVal) {
        document.getElementById('juhwaVal').value = vJuhwaVal;
    }
    if (vJuhwaCnt) {
        document.getElementById('juhwaCnt').value = vJuhwaCnt;
    }
    if (vPastMeso) {
        document.getElementById('pastMeso').value = vPastMeso;
    }
    if (vItemMesoVal) {
        document.getElementById('itemMesoVal').value = vItemMesoVal;
    }
    if (vJuHeunPrice) {
        document.getElementById('juHeunPrice').value = vJuHeunPrice;
    }
    if (vAzmPotionPrice) {
        document.getElementById('azmPotionPrice').value = vAzmPotionPrice;
    }
    
}

  // 데이터 저장 함수
function saveData() {
    vPresentMeso = document.getElementById('presentMeso').value;
    vPresentMepo = document.getElementById('presentMepo').value;
    vPercentMVP = document.getElementById('percentMVP').value;
    vDiscountRate = document.getElementById('discountRate').value;
    vAuctionCharge = document.querySelector('input[name="auctionCharge"]:checked').value;
 
    vJuhwaVal = document.getElementById('juhwaVal').value;
    vJuhwaCnt = document.getElementById('juhwaCnt').value;

    vPcFee = document.getElementById('pcFee').value;
    vPcHH = document.getElementById('pcHH').value;
    vPcMM = document.getElementById('pcMM').value;
    vPiecePrice = document.getElementById('piecePrice').value;

    vPastMeso = document.getElementById('pastMeso').value;

    vItemMesoVal = document.getElementById('itemMesoVal').value;

    vJuHeunPrice = document.getElementById('juHeunPrice').value;
    vAzmPotionPrice = document.getElementById('azmPotionPrice').value;

    localStorage.setItem('presentMeso', vPresentMeso);
    localStorage.setItem('presentMepo', vPresentMepo);
    localStorage.setItem('percentMVP', vPercentMVP);
    localStorage.setItem('discountRate', vDiscountRate);
    localStorage.setItem('auctionCharge', vAuctionCharge);

    localStorage.setItem('juhwaVal', vJuhwaVal);
    localStorage.setItem('juhwaCnt', vJuhwaCnt);

    localStorage.setItem('pcFee', vPcFee);
    localStorage.setItem('pcHH', vPcHH);
    localStorage.setItem('pcMM', vPcMM);
    localStorage.setItem('piecePrice', vPiecePrice);

    localStorage.setItem('pastMeso', vPastMeso);

    localStorage.setItem('itemMesoVal', vItemMesoVal);

    localStorage.setItem('juHeunPrice', vJuHeunPrice);
    localStorage.setItem('azmPotionPrice', vAzmPotionPrice);
}

 // 데이터 초기화 함수
function clearData() {
    if(!confirm("조회조건을 초기화하시겠습니까?")) return;

    localStorage.removeItem('presentMeso');
    localStorage.removeItem('presentMepo');
    localStorage.removeItem('percentMVP');
    localStorage.removeItem('discountRate');
    localStorage.removeItem('auctionCharge');

    localStorage.removeItem('juhwaVal');
    localStorage.removeItem('juhwaCnt');

    localStorage.removeItem('pcFee');
    localStorage.removeItem('pcHH');
    localStorage.removeItem('pcMM');
    localStorage.removeItem('piecePrice');

    localStorage.removeItem('pastMeso');

    localStorage.removeItem('itemMesoVal');

    localStorage.removeItem('juHeunPrice');
    localStorage.removeItem('azmPotionPrice');

    // 모든 라디오 버튼 선택 해제
    $('input[name="auctionCharge"]').removeAttr('checked');
    firstValSetting();
    fn_collection();
    
    alert('조회조건이 초기화되었습니다.');
}

function onlyNumberWithComma(obj) {
    let number = obj.value;

    // 숫자와 소숫점만 남기되, 소숫점은 처음 하나만 허용
    number = number.replace(/[^0-9.]/g, '')          // 숫자와 점만 남기기
                   .replace(/(\..*?)\..*/g, '$1');   // 소숫점 2번 이상 방지

    // 콤마 제거 후 숫자로 변환해서 포맷 적용
    const parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 천 단위 콤마

    obj.value = parts.join('.');
}

function customFormatNumber(value) {
    if (isNaN(value) || value === null || value === '') return '';

    let roundedValue = parseFloat(value).toFixed(2);  // 🔹 소수점 2자리까지 반올림
    let [integerDigits, decimalPart] = roundedValue.split('.');  // 🔹 정수부 & 소수부 분리

    // 🔹 천 단위 콤마 적용
    let formattedNumber = parseInt(integerDigits).toLocaleString('ko-KR');

    // 🔹 1억 이상이면 (n억) 또는 (약 n.nn억) 추가
    let extraText = "";
    if (parseInt(integerDigits) >= 100000000) {
        let eokValue = (parseInt(integerDigits) / 100000000);  // 🔹 억 단위 변환
        let roundedEokValue = eokValue.toFixed(2);  // 🔹 소수점 2자리 유지

        // 🔹 정확히 떨어지는 경우 (n억), 그렇지 않으면 (약 n.nn억)
        extraText = (eokValue % 1 === 0) 
            ? ` (${parseInt(eokValue)}억)` 
            : ` (약 ${roundedEokValue}억)`;
    }

    // 🔹 최종 문자열 조합
    return `${formattedNumber}.${decimalPart}${extraText}`;
}

function fn_collection(thisId){
    //전체 숫자관련
    setNumber();
    //메소마켓효율 페이지
    fn_mesoMarket();
    //골드주화계산
    fn_juhwa()
    //피방조각효율
    fn_pcRoom();
    //과거와 현재 메소가치
    fn_valueOf();
    //아이템의 현금가치
    fn_mesoToWon();
    //주흔계산기
    fn_juHeunVal();
    //균등분배
    fn_equalBunbae();
    //차등분배
    fn_customBunbae();
    //메소수익률
    fn_saleProfit(thisId);
}

function setNumber(){
    //기본값
    vPresentMeso = $("#presentMeso").val().replace(/,/g, '');;
    vPresentMepo = $("#presentMepo").val().replace(/,/g, '');;
    vPercentMVP = $("#percentMVP").val().replace(/,/g, '');;
    vDiscountRate = $("#discountRate").val().replace(/,/g, '');;
    vAuctionCharge = $("input:radio[name='auctionCharge']:checked").val();
    
    //캐시구매 구매비율
    discountRate = 1-vDiscountRate/100
    //경매장 구매비율
    auctionRate = 1-vAuctionCharge/100

    //실제 수령메포
    realMepo = vPresentMepo - Math.ceil(vPresentMepo*0.01);
    //MVP작대비 비율
    moneyTransMepo = Math.round(tenThsd/realMepo/auctionRate*vPresentMeso);
    
    //엄으로 1억구매 비용
    for1MilWithPerson= Math.round(1/auctionRate*vPresentMeso);
    //캐시충전해서 메포구매 후 메소마켓으로 1억구매 비용
    for1MilWithMarket= Math.round(vPresentMepo*discountRate);
    //엠작메포구매해서 메소마켓으로 1억구매 비용
    for1MilWithMarket2= Math.round(vPresentMepo*vPercentMVP/10000);
}

function fn_mesoMarket(){
    vPresentMesoInMesoMarket = Number(vPresentMeso.replace(/,/g, ''))

    if(moneyTransMepo > vPercentMVP){
        $("#buyMepo").text("MVP작 메포판매자에게 구매하세요.");
        $("#buyMepoProfit").text(Math.round(Number(moneyTransMepo)-Number(vPercentMVP)));
        
    }else{
        $("#buyMepo").text("메소마켓 이용을 권장합니다.");
        $("#buyMepoProfit").text(Math.round(Number(vPercentMVP)-Number(moneyTransMepo)));
    }
    
    //직작으로 1만원을 채우는데 드는 비용
    var mvpCost = tenThsd*(discountRate-vPresentMesoInMesoMarket/vPresentMepo);
    //직작으로 캐시 1만원을 충전하고 돌려받을 수 있는 현금
    var selfMVPReturn = tenThsd/vPresentMepo*vPresentMesoInMesoMarket;

    $("#sellMeso").html(customFormatNumber(moneyTransMepo));
   
    $("#marketBuyMesoParam1").html(customFormatNumber(for1MilWithPerson));
    $("#marketBuyMesoParam2").html(customFormatNumber(for1MilWithMarket));
    $("#marketBuyMesoParam3").html(customFormatNumber(for1MilWithMarket2));

    //메소구매자
    if(for1MilWithMarket2 > for1MilWithMarket){
        if(for1MilWithPerson > for1MilWithMarket){
            $("#marketBuyMesoResult").text("캐시로 메포사서 메소마켓으로 사세요.");
        }else{
            $("#marketBuyMesoResult").text("라운지에서 사세요.");
        }
    }else{
        if(for1MilWithPerson > for1MilWithMarket2){
            $("#marketBuyMesoResult").text("사람한테 메포사서 메소마켓으로 사세요.");
        }else{
            $("#marketBuyMesoResult").text("라운지에서 사세요.");
        }
    }
    
    //메포구매자
    $("#marketBuyMepoParam1").html(customFormatNumber(vPercentMVP));
    $("#marketBuyMepoParam2").html(customFormatNumber(moneyTransMepo));

    if(moneyTransMepo > vPercentMVP){
        $("#marketBuyMepoResult").text("선물식 사세요");
        
    }else{
        $("#marketBuyMepoResult").text("메소마켓에서 사세요.");
    }

    var mvpLowestPrice = 0;
    var mvpLowestMethod = "";
    

    //엠작유저
    $("#mvpPriceParam1").html(customFormatNumber(tenThsd*discountRate - vPercentMVP));
    $("#mvpPriceParam2").html(customFormatNumber(mvpCost));
    if(selfMVPReturn > vPercentMVP){
        $("#mvpPriceResult").text("직작하세요.");
        mvpLowestPrice = mvpCost;
        mvpLowestMethod = "메소마켓 판매식";
    }else{
        $("#mvpPriceResult").text("선물식으로 "+vPercentMVP+":1에 파세요.");
        mvpLowestPrice = tenThsd*discountRate - vPercentMVP;
        mvpLowestMethod = "선물식";
    }
    
    var cachePrice = $("#cachePrice").val().replace(/,/g, '');
    //mvp시 경매장에 팔아야하는 캐시 최소가격
    var mvpAutcionPrice = 0;
    //경매장판매 시 1만원당 비용
    var tenThsdByAuctionCost = 0;

    if(cachePrice > 0){
        //(캐시가격*할인율-판매메소*경매장수수료*메소가격)/캐시가격*10000 < 최저가격
        //(캐시가격*(할인율-최저엠작수단가격/10000))/*(경매장수수료*메소가격)을 둘째자리에서 올림처리
        mvpAutcionPrice = (Math.ceil(((cachePrice*(discountRate - mvpLowestPrice/tenThsd))/(auctionRate*vPresentMesoInMesoMarket))*100))/100
        //(캐시가격*할인율 - 경매장판매가*경매장수수료*메소시세)*10000/(캐시가격*할인율)
        tenThsdByAuctionCost = (cachePrice*discountRate - mvpAutcionPrice*auctionRate*vPresentMesoInMesoMarket)*tenThsd/cachePrice;

    }
    
    $("#minAucionParam1").html(customFormatNumber(mvpAutcionPrice));
    $("#minAucionParam2").html(customFormatNumber(tenThsdByAuctionCost));  

    var mvpCache = $("#mvpCache").val().replace(/,/g, '');
    var mvpSaleMeso = $("#mvpSaleMeso").val().replace(/,/g, '');

    $("#auctionProfitParam1").text(0);
    $("#auctionProfitParam2").text(0);

    if(mvpCache!= "" && mvpCache != null && mvpSaleMeso != "" && mvpSaleMeso != null){
        var mvpAuctionPNL = mvpCache*discountRate - mvpSaleMeso*auctionRate*vPresentMesoInMesoMarket;
        var mvpAuctionPNLPerTenThsd = mvpAuctionPNL/mvpCache*tenThsd;
        var mvpAuctionPNLTxt= "";
        var mvpAuctionPNLPerTenThsdTxt= "";

        if(mvpAuctionPNL >=0){
            mvpAuctionPNLTxt = customFormatNumber(mvpAuctionPNL)+"원 손해";
            mvpAuctionPNLPerTenThsdTxt = customFormatNumber(mvpAuctionPNLPerTenThsd)+"원 손해";
            $("#auctionProfitParam1").html(mvpAuctionPNLTxt).css({
                "color": "blue",
                "font-weight": "bold"
            });
            $("#auctionProfitParam2").html(mvpAuctionPNLPerTenThsdTxt).css({
                "color": "blue",
                "font-weight": "bold"
            });
        }else{
            mvpAuctionPNLTxt = customFormatNumber(mvpAuctionPNL*-1)+"원 이득";
            mvpAuctionPNLPerTenThsdTxt = customFormatNumber(mvpAuctionPNLPerTenThsd*-1)+"원 이득";
            $("#auctionProfitParam1").html(mvpAuctionPNLTxt).css({
                "color": "red",
                "font-weight": "bold"
            });
            $("#auctionProfitParam2").html(mvpAuctionPNLPerTenThsdTxt).css({
                "color": "red",
                "font-weight": "bold"
            });
        }
    }
}

function fn_juhwa(){
    var juhwaVal = $("#juhwaVal").val().replace(/,/g, '');
    var juhwaCnt = 1;

    if($("#juhwaCnt").val() != "" && $("#juhwaCnt").val() != null){
        juhwaCnt = $("#juhwaCnt").val().replace(/,/g, '');
    }else{
        juhwaCnt = 1;
    }

    if(juhwaVal != "" && juhwaVal != null){
        var juhwaMeso = (juhwaVal/oneHunMil)
        $("#juhwa1").html(customFormatNumber(juhwaMeso*juhwaCnt));
        $("#juhwa2").html(customFormatNumber((juhwaMeso*realMepo-300)*juhwaCnt));

        var azmVal = Number(juhwaMeso*realMepo-300)*3
        if(azmVal>2500){
            $("#juhwa3").html("<span>사세요.(1,000점당 </span>"+customFormatNumber(azmVal-2500)+"<span>메포 이득)</span>");
        }else{
            $("#juhwa3").html("<span>사지마세요.(1,000점당 </span>"+customFormatNumber(2500-azmVal)+"<span>메포 손해)<span>");
        }
    }else{
        $("#juhwa1").text('');
        $("#juhwa2").text('');
        $("#juhwa3").text('주화가격을 입력해주세요.');
    }
}

function fn_pcRoom(){
    var pcFee = $("#pcFee").val().replace(/,/g, '');
    var pcHH = $("#pcHH").val().replace(/,/g, '');
    var pcMM = $("#pcMM").val().replace(/,/g, '');
    var piecePrice = $("#piecePrice").val().replace(/,/g, '');
    var totMin =  Number(pcHH*60)+Number(pcMM);
    var ninetyPrice = (pcFee/totMin*90);
    var pieceWon = (vPresentMeso/auctionRate*piecePrice/oneHunMil)
    var daysWon = (ninetyPrice/10);
    var endsWon = (ninetyPrice/15);

    $("#pcRoom1").html(customFormatNumber(totMin));
    $("#pcRoom2").html(customFormatNumber(ninetyPrice));
    $("#pcRoom3").html(customFormatNumber(pieceWon));
    $("#pcRoom4").html(customFormatNumber(daysWon));
    $("#pcRoom5").html(customFormatNumber(endsWon));
    if(pieceWon > daysWon){
        $("#pcRoom6").text("가세요.");
    }else{
        $("#pcRoom6").text("가지마세요.");
    }
    if(pieceWon > endsWon){
        $("#pcRoom7").text("가세요.");
    }else{
        $("#pcRoom7").text("가지마세요.");
    }
    
}


function fn_valueOf(){
    var pastMeso = $("#pastMeso").val().replace(/,/g, '');
    var presentItem = $("#presentItem").val().replace(/,/g, '');
    var pastItem = $("#pastItem").val().replace(/,/g, '');

    $("#valueOf1").html(customFormatNumber(presentItem/pastMeso*vPresentMeso));
    $("#valueOf2").html(customFormatNumber(pastItem/vPresentMeso*pastMeso));
}

function fn_mesoToWon(){
    //아이템가치
    var itemMesoVal = $("#itemMesoVal").val().replace(/,/g, '');
    //메소가격
    psm = Number(vPresentMeso);
    //경매장 구매비율
    auctionRate = 1-vAuctionCharge/100
    //1d억

    $("#mesoToWon1").html(customFormatNumber(psm*itemMesoVal/oneHunMil*auctionRate));
    $("#mesoToWon2").html(customFormatNumber(psm*itemMesoVal/oneHunMil));
    $("#mesoToWon3").html(customFormatNumber(psm*itemMesoVal/oneHunMil/auctionRate));
    
}

function fn_juHeunVal(){
    var juHeun50Event = $("input:radio[name='juHeun50Event']:checked").val();
    var juHeunPrice = $("#juHeunPrice").val().replace(/,/g, '');
    var juHeunPiece = $("#juHeunPiece").val().replace(/,/g, '');
    var juHeunBundle = $("#juHeunBundle").val().replace(/,/g, '');
    
    var juHeunCalMeso = juHeun50Event*juHeunPrice/oneHunMil;

    $("#juHeunVal1").html(customFormatNumber(12000*juHeunCalMeso)+"<span>억/</span>"
                        +customFormatNumber(12000*juHeunCalMeso*vPresentMeso)+"<span>원</span>");
    $("#juHeunVal2").html(customFormatNumber(20000*juHeunCalMeso)+"<span>억/</span>"
                        +customFormatNumber(20000*juHeunCalMeso*vPresentMeso)+"원</span>");
    $("#juHeunVal3").html(customFormatNumber(24000*juHeunCalMeso)+"<span>억/</span>"
                        +customFormatNumber(24000*juHeunCalMeso*vPresentMeso)+"<span>원</span>");

    $("#juHeunVal4").html(customFormatNumber(juHeunPiece*juHeunPrice));
    $("#juHeunVal5").html(customFormatNumber(juHeunPiece*juHeunPrice*vPresentMeso/oneHunMil));
    $("#juHeunVal6").html(customFormatNumber(juHeunBundle*juHeunPrice*90000));
    $("#juHeunVal7").html(customFormatNumber(juHeunBundle*juHeunPrice*vPresentMeso*90000/oneHunMil));

    var azmPotionPrice = $("#azmPotionPrice").val().replace(/,/g, '');

    $("#azmVal1").html(customFormatNumber(azmPotionPrice/50*10/oneHunMil)+"<span>억(</span>"
                    +customFormatNumber(azmPotionPrice/50*10/oneHunMil*vPresentMeso)+"<span>원)</span>");
    $("#azmVal2").html(customFormatNumber(azmPotionPrice/50*20/oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(azmPotionPrice/50*20/oneHunMil*vPresentMeso)+"<span>원)</span>");
    $("#azmVal3").html(customFormatNumber(azmPotionPrice/50*50/oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(azmPotionPrice/50*50/oneHunMil*vPresentMeso)+"<span>원)</span>");
    $("#azmVal4").html(customFormatNumber(azmPotionPrice/50*100/oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(azmPotionPrice/50*100/oneHunMil*vPresentMeso)+"<span>원)</span>");
    $("#azmVal5").html(customFormatNumber(azmPotionPrice/50*120/oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(azmPotionPrice/50*120/oneHunMil*vPresentMeso)+"<span>원)</span>");


    if(juHeunPrice == null || juHeunPrice == "" || juHeunPrice == 0 || azmPotionPrice == null || azmPotionPrice == "" || azmPotionPrice == 0 ){
        $("#azmVal6").text("주흔 가격과 아즈모스 영약 가격을 같이 입력해주세요.");
    }else{
        if(juHeunCalMeso*20000 > azmPotionPrice/50*100/oneHunMil){
            $("#azmVal6").text("아즈모스에서 사고 영약 경매장에서 사드세요.");
        }else{
            $("#azmVal6").text("주흔으로 사고 영약 경매장에 파세요.");
        }
    }

    
    
}

function fn_equalBunbae(){
    var saleMeso = Math.ceil(($("#saleMeso").val().replace(/[^0-9]/g,''))*auctionRate);
    var dajoPrice = $("#dajoPrice").val().replace(/[^0-9]/g,'');
    var memberCnt = $("#memberCnt").val().replace(/,/g, '');
    $("#equalBunbaeMeso").html(customFormatNumber(saleMeso / memberCnt));
    $("#equalBunbaeWon").html(customFormatNumber(saleMeso/memberCnt/oneHunMil*vPresentMeso));
    if(dajoPrice != "" && dajoPrice != null && dajoPrice != 0){
        $("#equalBunbaeDajo").html(customFormatNumber(saleMeso/memberCnt/dajoPrice));
    }else{
        $("#equalBunbaeDajo").text("조각가격없음");
    }

    
}

function fn_customBunbae(){
    var saleMeso = Math.ceil(($("#saleMeso").val().replace(/[^0-9]/g,''))*auctionRate);
    var dajoPrice = $("#dajoPrice").val().replace(/[^0-9]/g,'');

    //memberStack(분배지분) input 값
    var memberStacks = {}; 
    for (var i = 1; i <= 6; i++) {
        var value = $("#memberStack" + i).val();
        memberStacks[i] = value ? value.replace(/[^0-9]/g, '') : "0";
    }

    //전체 분배지분 합
    var memberStackSum = 0;
    $(".memberStack").each(function () {
        var val = Number($(this).val().replace(/,/g, "")) || 0;
        memberStackSum += val;
    });

    //분배계산
    for (var i = 1; i <= 6; i++) {
        var stackValue = Number(memberStacks[i]) || 0; // NaN 방지
        
        if (memberStackSum > 0) {
            var mesoShare = customFormatNumber(saleMeso / memberStackSum * stackValue);
            var wonShare = customFormatNumber(saleMeso / memberStackSum * stackValue / oneHunMil * vPresentMeso.replace(/,/g , ''));
            var dajoShare = customFormatNumber((saleMeso / memberStackSum * stackValue) / dajoPrice);

            $(`#customBunbaeMeso${i}`).text(mesoShare);
            $(`#customBunbaeWon${i}`).text(wonShare);
            if(dajoPrice != "" && dajoPrice != null && dajoPrice != 0){
                $(`#customBunbaeDajo${i}`).text(dajoShare);
            }else{
                $(`#customBunbaeDajo${i}`).text("조각가격없음");
            }

            
        } else {
            $(`#customBunbaeMeso${i}`).text("0");
            $(`#customBunbaeWon${i}`).text("0");
            $(`#customBunbaeDajo${i}`).text("0");
        }
    }
}

function fn_saleProfit(thisId){
    var buyMesoPrice = $("#buyMesoPrice").val().replace(/,/g, '');
    var buyMesoAmt = $("#buyMesoAmt").val().replace(/,/g, '');
    var buyMesoWon = $("#buyMesoWon").val().replace(/,/g, '');;
    
    if(thisId == "buyMesoPrice"){
        var buyMesoWonVal = (buyMesoAmt*buyMesoPrice).toLocaleString('ko-KR', option);
        $("#buyMesoWon").val(buyMesoWonVal);
    }

    if(thisId == "buyMesoAmt"){
        var buyMesoWonVal = (buyMesoAmt*buyMesoPrice).toLocaleString('ko-KR', option);
        $("#buyMesoWon").val(buyMesoWonVal);
    }

    if(thisId == "buyMesoWon"){
        var buyMesoAmtVal = (buyMesoWon/buyMesoPrice).toLocaleString('ko-KR', option);
        $("#buyMesoAmt").val(buyMesoAmtVal);
    }

    setTimeout(() => {
        buyMesoPrice = $("#buyMesoPrice").val().replace(/,/g, '');
        buyMesoAmt = $("#buyMesoAmt").val().replace(/,/g, '');
        buyMesoWon = $("#buyMesoWon").val().replace(/,/g, '');

        var realMeso = buyMesoAmt*auctionRate;
        var saleMesoWon = realMeso*vPresentMeso.replace(/,/g , '');
        var saleProfitVal = saleMesoWon-buyMesoWon;
        var saleProfitPercent = saleProfitVal/buyMesoWon*100;

        $('#saleProfit1').html(customFormatNumber(realMeso));
        $('#saleProfit2').html(customFormatNumber(saleProfitVal));
        $('#saleProfit3').html(
            (isNaN(saleProfitPercent) || saleProfitPercent === null || saleProfitPercent === '' )
            ? '' 
            : customFormatNumber(saleProfitPercent)
        );
      }, "300");
}



function createGrid1(){
    var gridData = [];
    var grid1 = new tui.Grid({
        el: document.getElementById('grid1'),
        data: gridData,
        scrollX: false,
        scrollY: false,
        columns: [
            {
            header: '아이템 값(메소)',
            name: 'price'
            }
            ,{
            header: '판매자기준 현금가치(원)',
            name: 'val1'
            }
            ,{
            header: '구매자(메소보유) 기준 현금가치(원)',
            name: 'val2'
            }
            ,{
            header: '구매자(메소구매)기준 현금가치(원)',
            name: 'val3'
            }
        ]
    });

    grid1.on('afterChange', function(ev) {
        var columnName = ev.changes[0].columnName;
        var rowKey = ev.changes[0].rowKey;
        console.log(ev);
    });
}