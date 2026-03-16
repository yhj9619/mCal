// 메소판매차익 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_saleProfit(""); // 초기 로드 시 전체 계산 실행

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    // thisId를 넘겨주기 위해 함수를 래핑
    $("#buyMesoPrice, #buyMesoAmt, #buyMesoWon").on("keyup change", function() {
        fn_saleProfit($(this).attr("id"));
    });
}

// 메소판매차익 계산 로직
function fn_saleProfit(thisId){
    var buyMesoPrice = $("#buyMesoPrice").val().replace(/,/g, '');
    var buyMesoAmt = $("#buyMesoAmt").val().replace(/,/g, '');
    var buyMesoWon = $("#buyMesoWon").val().replace(/,/g, '');
    
    // 서로 의존적인 입력 필드 계산
    if(thisId == "buyMesoPrice"){
        var buyMesoWonVal = (Number(buyMesoAmt) * Number(buyMesoPrice)).toLocaleString('ko-KR', {maximumFractionDigits: 2});
        $("#buyMesoWon").val(buyMesoWonVal);
    } else if(thisId == "buyMesoAmt"){
        var buyMesoWonVal = (Number(buyMesoAmt) * Number(buyMesoPrice)).toLocaleString('ko-KR', {maximumFractionDigits: 2});
        $("#buyMesoWon").val(buyMesoWonVal);
    } else if(thisId == "buyMesoWon"){
        // buyMesoPrice가 0이 아니어야 나눗셈 가능
        if (Number(buyMesoPrice) !== 0) {
            var buyMesoAmtVal = (Number(buyMesoWon) / Number(buyMesoPrice)).toLocaleString('ko-KR', {maximumFractionDigits: 2});
            $("#buyMesoAmt").val(buyMesoAmtVal);
        } else {
            $("#buyMesoAmt").val("0");
        }
    }

    // setTimeout 내의 로직을 즉시 실행
    // setTimeout이 있었던 이유는 이전 oninput 처리와의 순서 때문인듯 하나,
    // 지금은 단일 로직으로 처리되므로 setTimeout 제거 (필요시 복구)
    buyMesoPrice = $("#buyMesoPrice").val().replace(/,/g, '');
    buyMesoAmt = $("#buyMesoAmt").val().replace(/,/g, '');
    buyMesoWon = $("#buyMesoWon").val().replace(/,/g, '');

    var realMeso = Number(buyMesoAmt) * auctionRate;
    var saleMesoWon = realMeso * Number(vPresentMeso.replace(/,/g , '')); // vPresentMeso는 global.js에서 설정됨
    var saleProfitVal = saleMesoWon - Number(buyMesoWon);
    var saleProfitPercent = (Number(buyMesoWon) !== 0) ? saleProfitVal / Number(buyMesoWon) * 100 : 0;

    $('#saleProfit1').html(customFormatNumber(realMeso));
    $('#saleProfit2').html(customFormatNumber(saleProfitVal));
    $('#saleProfit3').html(
        (isNaN(saleProfitPercent) || saleProfitPercent === null || saleProfitPercent === '' )
        ? '' 
        : customFormatNumber(saleProfitPercent)
    );
}
