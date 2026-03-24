// 주흔&아즈모스코인가치 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_juHeunVal();

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    $("#juHeunPrice, #juHeunPiece, #juHeunBundle").on("keyup change", fn_juHeunVal);
    $('input[name="juHeun50Event"]').on("change", fn_juHeunVal);
}

// 주흔&아즈모스코인가치 계산 로직
function fn_juHeunVal(){
    var juHeun50Event = $("input:radio[name='juHeun50Event']:checked").val();
    var juHeunPrice = $("#juHeunPrice").val().replace(/,/g, '');
    var juHeunPiece = $("#juHeunPiece").val().replace(/,/g, '');
    var juHeunBundle = $("#juHeunBundle").val().replace(/,/g, '');
    
    var juHeunCalMeso = Number(juHeun50Event) * Number(juHeunPrice) / oneHunMil;

    $("#juHeunVal1").html(customFormatNumber(12000 * juHeunCalMeso)+"<span>억/</span>"
                        +customFormatNumber(12000 * juHeunCalMeso * vPresentMeso)+"<span>원</span>");
    $("#juHeunVal2").html(customFormatNumber(20000 * juHeunCalMeso)+"<span>억/</span>"
                        +customFormatNumber(20000 * juHeunCalMeso * vPresentMeso)+"원</span>");
    $("#juHeunVal3").html(customFormatNumber(24000 * juHeunCalMeso)+"<span>억/</span>"
                        +customFormatNumber(24000 * juHeunCalMeso * vPresentMeso)+"<span>원</span>");

    $("#juHeunVal4").html(customFormatNumber(Number(juHeunPiece) * Number(juHeunPrice)));
    $("#juHeunVal5").html(customFormatNumber(Number(juHeunPiece) * Number(juHeunPrice) * Number(vPresentMeso) / oneHunMil));
    $("#juHeunVal6").html(customFormatNumber(Number(juHeunBundle) * Number(juHeunPrice) * 90000));
    $("#juHeunVal7").html(customFormatNumber(Number(juHeunBundle) * Number(juHeunPrice) * Number(vPresentMeso) * 90000 / oneHunMil));
}
