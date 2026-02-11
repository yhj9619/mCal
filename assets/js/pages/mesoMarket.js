// mesoMarket.html 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_mesoMarket();

    // 이 페이지에만 해당하는 다른 입력 필드가 있다면, 여기에 이벤트 리스너 추가
    // 예: $("#cachePrice").on("keyup change", fn_mesoMarket);
}

// 메소마켓 관련 계산 로직
function fn_mesoMarket(){
    vPresentMesoInMesoMarket = Number(vPresentMeso.replace(/,/g, ''));

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
}
