var vPresentMeso;
var vPresentMepo;
var vPercentMVP;
var vDiscountRate;
var vAuctionCharge;
var discountRate;
var auctionRate;
var realMepo;
var moneyTransMepo;
var for1MilWithPerson;
var for1MilWithMarket;

$(document).ready(function() {
    $("#presentMeso").val('1,600');
    $("#presentMepo").val('2,040');
    $("#percentMVP").val('8,000');
    $("#discountRate").val('10');
    $('#3per').attr("checked", true);

    $("#pcFee").val('3,000');
    $("#pcHH").val('2');
    $("#pcMM").val('40');
    $("#piecePrice").val('8,900,000');
    

    fn_collection();
    createGrid1();

    $(document).find("input,select,textarea,button").on("focus keyup change", function(){
        fn_collection();
    });
});

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
    fn_juhua()
    //피방조각효율
    fn_pcRoom();
}

function setNumber(){
    //기본값값
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
    realMepo = vPresentMepo - Math.round(vPresentMepo*0.01);
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
    
    $("#sellMeso").text(moneyTransMepo);
    $("#marketParam1").text(moneyTransMepo);
    $("#marketParam2").text(for1MilWithPerson);
    $("#marketParam3").text(for1MilWithMarket);
}

function fn_juhua(){
    var juhuaVal = $("#juhuaVal").val().replace(/[^0-9]/g,'');
    var juhuaCnt = 1;

    if($("#juhuaCnt").val() != "" && $("#juhuaCnt").val() != null){
        juhuaCnt = $("#juhuaCnt").val().replace(/[^0-9]/g,'');
    }else{
        juhuaCnt = 1;
    }

    if(juhuaVal != "" && juhuaVal != null){
        var juhuaMeso = (juhuaVal/100000000)
        $("#juhua1").text((juhuaMeso*juhuaCnt).toFixed(2));
        $("#juhua2").text(((juhuaMeso*vPresentMepo-300)*juhuaCnt).toFixed(2));
    }else{
        $("#juhua1").text('');
        $("#juhua2").text('');
    }
}

function fn_pcRoom(){
    var pcFee = $("#pcFee").val().replace(/[^0-9]/g,'');
    var pcHH = $("#pcHH").val().replace(/[^0-9]/g,'');
    var pcMM = $("#pcMM").val().replace(/[^0-9]/g,'');
    var piecePrice = $("#piecePrice").val().replace(/[^0-9]/g,'');
    var totMin =  Number(pcHH*60)+Number(pcMM);
    var ninetyPrice = pcFee/totMin*90;
    var pieceWon = (vPresentMeso/auctionRate*piecePrice/100000000).toFixed(2)
    var daysWon = (ninetyPrice/10).toFixed(2);
    var endsWon = (ninetyPrice/15).toFixed(2);

    $("#pcRoom1").text(totMin);
    $("#pcRoom2").text(ninetyPrice);
    $("#pcRoom3").text(pieceWon);
    $("#pcRoom4").text(daysWon);
    $("#pcRoom5").text(endsWon);
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