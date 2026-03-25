// 아이템의 현금가치 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_mesoToWon();

    // 입력 필드 변경 시 계산 및 한글 단위 도우미 업데이트
    $("#itemMesoVal").on("keyup change", function() {
        fn_mesoToWon();
        updateKoreanUnitHelper(this, 'itemMesoValHelper');
    });

    // 초기 로드 시 도우미 텍스트 업데이트
    updateKoreanUnitHelper(document.getElementById('itemMesoVal'), 'itemMesoValHelper');
}

// 아이템의 현금가치 계산 로직
function fn_mesoToWon(){
    var itemMesoVal = $("#itemMesoVal").val() ? $("#itemMesoVal").val().replace(/,/g, '') : 0;
    var psm = Number(vPresentMeso); 
    
    $("#mesoToWon1").html(customFormatNumber(psm * itemMesoVal / oneHunMil * auctionRate));
    $("#mesoToWon2").html(customFormatNumber(psm * itemMesoVal / oneHunMil));
    $("#mesoToWon3").html(customFormatNumber(psm * itemMesoVal / oneHunMil / auctionRate));
}

// 결과 텍스트 복사 기능
function copyResultText() {
    let itemMeso = $("#itemMesoVal").val() || "0";
    let text = `[메산기 아이템 현금가치 결과]\n` +
               `아이템 가격: ${itemMeso} 메소\n` +
               `--------------------------------\n` +
               `판매자 기준: ${$("#mesoToWon1").text()} 원\n` +
               `구매자(보유) 기준: ${$("#mesoToWon2").text()} 원\n` +
               `구매자(구매) 기준: ${$("#mesoToWon3").text()} 원\n` +
               `--------------------------------\n` +
               `시세 기준: 1억당 ${vPresentMeso}원 / 수수료 ${vAuctionCharge}%`;

    navigator.clipboard.writeText(text).then(() => {
        alert("텍스트로 복사되었습니다.");
    });
}
