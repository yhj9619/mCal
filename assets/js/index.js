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

const option = {
    maximumFractionDigits: 2
  };

$(document).ready(function() {
    firstValSetting();
    dataLoad();
    fn_collection();
    createGrid1();

    $(document).find("input,select,textarea,button,radio").on("focus keyup change", function(){
        fn_collection();
        saveData();
    });
});

function firstValSetting(){
    $("#presentMeso").val('1,600');
    $("#presentMepo").val('1,900');
    $("#percentMVP").val('8,300');
    $("#discountRate").val('10');
    $('input[name="auctionCharge"]')[0].checked = true;

    $("#juhwaVal").val('65,822,900');
    
    $("#pcFee").val('3,000');
    $("#pcHH").val('2');
    $("#pcMM").val('40');
    $("#piecePrice").val('8,888,888');

    $("#pastMeso").val('2,000');
    $("#presentItem").val('0');
    $("#pastItem").val('0');

    $("#itemMesoVal").val('0');

    $('input[name="juHeun50Event"]')[0].checked = true;
    $("#juHeunPrice").val('0');
    
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

    // 모든 라디오 버튼 선택 해제
    $('input[name="auctionCharge"]').removeAttr('checked');
    firstValSetting();
    fn_collection();
    
    alert('조회조건이 초기화되었습니다.');
}

function onlyNumberWithComma(obj) {
    var number = obj.value;

    //숫자가 아닌 값 모두 replace 해주기
    number=number.replace(/[^0-9]/g,'');

    //콤마 표시
    number=Number(number).toLocaleString();
    
    //다시 value 지정해주기
    obj.value = number;
}

function fn_collection(){
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
}

function setNumber(){
    //기본값
    vPresentMeso = $("#presentMeso").val().replace(/[^0-9]/g,'');;
    vPresentMepo = $("#presentMepo").val().replace(/[^0-9]/g,'');;
    vPercentMVP = $("#percentMVP").val().replace(/[^0-9]/g,'');;
    vDiscountRate = $("#discountRate").val().replace(/[^0-9]/g,'');;
    vAuctionCharge = $("input:radio[name='auctionCharge']:checked").val();
    
    //캐시구매 구매비율
    discountRate = 1-vDiscountRate/100
    //경매장 구매비율
    auctionRate = 1-vAuctionCharge/100

    //실제 수령메포포
    realMepo = vPresentMepo - Math.ceil(vPresentMepo*0.01);
    //MVP작대비 비율
    moneyTransMepo = Math.round(10000/realMepo/auctionRate*vPresentMeso);
    
    //엄으로 1억구매 비용
    for1MilWithPerson= Math.round(1/auctionRate*vPresentMeso);
    //메포구매로 1억구매 비용
    for1MilWithMarket= Math.round(vPresentMepo*discountRate);
}

function fn_mesoMarket(){
    if(moneyTransMepo > vPercentMVP){
        $("#buyMepo").text("MVP작 메포판매자에게 구매하세요.");
        $("#buyMepoProfit").text(Math.round(Number(moneyTransMepo)-Number(vPercentMVP)));
        
    }else{
        $("#buyMepo").text("메소마켓 이용을 권장합니다.");
        $("#buyMepoProfit").text(Math.round(Number(vPercentMVP)-Number(moneyTransMepo)));
    }

    if(for1MilWithPerson > for1MilWithMarket){
        $("#buyMeso").text("직접 현카포로 현질해서 메소마켓 이용하세요");
        $("#buyMesoProfit").text(Math.round(Number(for1MilWithPerson)-Number(for1MilWithMarket)));
        
    }else{
        $("#buyMeso").text("사람간 거래를 권장합니다.");
        $("#buyMesoProfit").text(Math.round(Number(for1MilWithMarket)-Number(for1MilWithPerson)));
    }
    
    //직작으로 1만원을 채우는데 드는 비용
    var mvpCost = tenThsd*(discountRate-vPresentMeso/vPresentMepo);
    //직작으로 캐시 1만원을 충전하고 돌려받을 수 있는 현금
    var selfMVPReturn = tenThsd/vPresentMepo*vPresentMeso;

    $("#sellMeso").text(moneyTransMepo.toLocaleString('ko-KR', option));
    $("#marketParam1").text(moneyTransMepo.toLocaleString('ko-KR', option));
    $("#marketParam2").text(for1MilWithPerson.toLocaleString('ko-KR', option));
    $("#marketParam3").text(for1MilWithMarket.toLocaleString('ko-KR', option));
    $("#marketParam4").text((mvpCost).toLocaleString('ko-KR', option));
    if(selfMVPReturn > vPercentMVP){
        $("#marketParam5").text("직작하세요.");
    }else{
        $("#marketParam5").text("유저한테 "+vPercentMVP+":1에 파세요.");
    }
    $("#marketParam6").text(Math.round(selfMVPReturn)+":1");
}

function fn_juhwa(){
    var juhwaVal = $("#juhwaVal").val().replace(/[^0-9]/g,'');
    var juhwaCnt = 1;

    if($("#juhwaCnt").val() != "" && $("#juhwaCnt").val() != null){
        juhwaCnt = $("#juhwaCnt").val().replace(/[^0-9]/g,'');
    }else{
        juhwaCnt = 1;
    }

    if(juhwaVal != "" && juhwaVal != null){
        var juhwaMeso = (juhwaVal/oneHunMil)
        $("#juhwa1").text((juhwaMeso*juhwaCnt).toLocaleString('ko-KR', option));
        $("#juhwa2").text(((juhwaMeso*realMepo-300)*juhwaCnt).toLocaleString('ko-KR', option));

        var azmVal = Number(juhwaMeso*realMepo-300)*3
        if(azmVal>2500){
            $("#juhwa3").text("사세요.(1,000점당 "+(azmVal-2500).toLocaleString('ko-KR', option)+"메포 이득)");
        }else{
            $("#juhwa3").text("사지마세요.(1,000점당 "+(2500-azmVal).toLocaleString('ko-KR', option)+"메포 손해)");
        }
    }else{
        $("#juhwa1").text('');
        $("#juhwa2").text('');
        $("#juhwa3").text('주화가격을 입력해주세요.');
    }
}

function fn_pcRoom(){
    var pcFee = $("#pcFee").val().replace(/[^0-9]/g,'');
    var pcHH = $("#pcHH").val().replace(/[^0-9]/g,'');
    var pcMM = $("#pcMM").val().replace(/[^0-9]/g,'');
    var piecePrice = $("#piecePrice").val().replace(/[^0-9]/g,'');
    var totMin =  Number(pcHH*60)+Number(pcMM);
    var ninetyPrice = (pcFee/totMin*90);
    var pieceWon = (vPresentMeso/auctionRate*piecePrice/oneHunMil)
    var daysWon = (ninetyPrice/10);
    var endsWon = (ninetyPrice/15);

    $("#pcRoom1").text(totMin.toLocaleString('ko-KR', option));
    $("#pcRoom2").text(ninetyPrice.toLocaleString('ko-KR', option));
    $("#pcRoom3").text(pieceWon.toLocaleString('ko-KR', option));
    $("#pcRoom4").text(daysWon.toLocaleString('ko-KR', option));
    $("#pcRoom5").text(endsWon.toLocaleString('ko-KR', option));
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
    var pastMeso = $("#pastMeso").val().replace(/[^0-9]/g,'');
    var presentItem = $("#presentItem").val().replace(/[^0-9]/g,'');
    var pastItem = $("#pastItem").val().replace(/[^0-9]/g,'');

    $("#valueOf1").text((presentItem/pastMeso*vPresentMeso).toLocaleString('ko-KR', option));
    $("#valueOf2").text((pastItem/vPresentMeso*pastMeso).toLocaleString('ko-KR', option));
}

function fn_mesoToWon(){
    //아이템가치
    var itemMesoVal = $("#itemMesoVal").val().replace(/[^0-9]/g,'');
    //메소가격
    psm = Number(vPresentMeso);
    //경매장 구매비율
    auctionRate = 1-vAuctionCharge/100
    //1d억

    $("#mesoToWon1").text((psm*itemMesoVal/oneHunMil*auctionRate).toLocaleString('ko-KR', option));
    $("#mesoToWon2").text((psm*itemMesoVal/oneHunMil).toLocaleString('ko-KR', option));
    $("#mesoToWon3").text((psm*itemMesoVal/oneHunMil/auctionRate).toLocaleString('ko-KR', option));
    
}

function fn_juHeunVal(){
    var juHeun50Event = $("input:radio[name='juHeun50Event']:checked").val();
    var juHeunPrice = $("#juHeunPrice").val().replace(/[^0-9]/g,'');
    var juHeunPiece = $("#juHeunPiece").val().replace(/[^0-9]/g,'');
    var juHeunBundle = $("#juHeunBundle").val().replace(/[^0-9]/g,'');
    
    var juHeunCalMeso = juHeun50Event*juHeunPrice/oneHunMil;

    $("#juHeunVal1").text((12000*juHeunCalMeso).toLocaleString('ko-KR', option)+"억/"
                        +(12000*juHeunCalMeso*vPresentMeso).toLocaleString('ko-KR', option)+"원");
    $("#juHeunVal2").text((20000*juHeunCalMeso).toLocaleString('ko-KR', option)+"억/"
                        +(20000*juHeunCalMeso*vPresentMeso).toLocaleString('ko-KR', option)+"원");
    $("#juHeunVal3").text((24000*juHeunCalMeso).toLocaleString('ko-KR', option)+"억/"
                        +(24000*juHeunCalMeso*vPresentMeso).toLocaleString('ko-KR', option)+"원");

    $("#juHeunVal4").text((juHeunPiece*juHeunPrice).toLocaleString('ko-KR', option));
    $("#juHeunVal5").text((juHeunPiece*juHeunPrice*vPresentMeso/oneHunMil).toLocaleString('ko-KR', option));
    $("#juHeunVal6").text((juHeunBundle*juHeunPrice*9000).toLocaleString('ko-KR', option));
    $("#juHeunVal7").text((juHeunBundle*juHeunPrice*vPresentMeso*9000/oneHunMil).toLocaleString('ko-KR', option));
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