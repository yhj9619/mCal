// 과거와 현재 아이템 가치 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_valueOf();

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    $("#pastMeso, #presentItem, #pastItem").on("keyup change", fn_valueOf);
}

// 과거와 현재 아이템 가치 계산 로직
function fn_valueOf(){
    var pastMeso = $("#pastMeso").val().replace(/,/g, '');
    var presentItem = $("#presentItem").val().replace(/,/g, '');
    var pastItem = $("#pastItem").val().replace(/,/g, '');

    $("#valueOf1").html(customFormatNumber(presentItem / pastMeso * vPresentMeso));
    $("#valueOf2").html(customFormatNumber(pastItem / vPresentMeso * pastMeso));
}
