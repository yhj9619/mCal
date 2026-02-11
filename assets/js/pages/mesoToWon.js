// 아이템의 현금가치 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_mesoToWon();

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    $("#itemMesoVal").on("keyup change", fn_mesoToWon);
}

// 아이템의 현금가치 계산 로직
function fn_mesoToWon(){
    // vItemMesoVal 로컬 스토리지 값 로드 (global.js에서 처리되지만, 페이지별 초기값 설정을 위해 다시 한번)
    vItemMesoVal = localStorage.getItem('itemMesoVal');
    if (vItemMesoVal) {
        document.getElementById('itemMesoVal').value = vItemMesoVal;
    }

    var itemMesoVal = $("#itemMesoVal").val().replace(/,/g, '');
    var psm = Number(vPresentMeso); // vPresentMeso는 global.js에서 설정됨
    
    $("#mesoToWon1").html(customFormatNumber(psm * itemMesoVal / oneHunMil * auctionRate));
    $("#mesoToWon2").html(customFormatNumber(psm * itemMesoVal / oneHunMil));
    $("#mesoToWon3").html(customFormatNumber(psm * itemMesoVal / oneHunMil / auctionRate));
}

// 로컬 스토리지에 vItemMesoVal 저장 (global.js의 saveData에 통합)
// global.js의 saveData 함수는 모든 input 값을 저장하므로 여기서는 별도의 saveData 필요 없음
