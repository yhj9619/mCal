// 주흔&아즈모스코인가치 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_juHeunVal();

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    $("#juHeunPrice, #juHeunPiece, #juHeunBundle, #azmPotionPrice").on("keyup change", fn_juHeunVal);
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

    var azmPotionPrice = $("#azmPotionPrice").val().replace(/,/g, '');

    $("#azmVal1").html(customFormatNumber(Number(azmPotionPrice) / 50 * 10 / oneHunMil)+"<span>억(</span>"
                    +customFormatNumber(Number(azmPotionPrice) / 50 * 10 / oneHunMil * Number(vPresentMeso))+"<span>원)</span>");
    $("#azmVal2").html(customFormatNumber(Number(azmPotionPrice) / 50 * 20 / oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(Number(azmPotionPrice) / 50 * 20 / oneHunMil * Number(vPresentMeso))+"<span>원)</span>");
    $("#azmVal3").html(customFormatNumber(Number(azmPotionPrice) / 50 * 50 / oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(Number(azmPotionPrice) / 50 * 50 / oneHunMil * Number(vPresentMeso))+"<span>원)</span>");
    $("#azmVal4").html(customFormatNumber(Number(azmPotionPrice) / 50 * 100 / oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(Number(azmPotionPrice) / 50 * 100 / oneHunMil * Number(vPresentMeso))+"<span>원)</span>");
    $("#azmVal5").html(customFormatNumber(Number(azmPotionPrice) / 50 * 120 / oneHunMil)+"<span>억(</span>"
                        +customFormatNumber(Number(azmPotionPrice) / 50 * 120 / oneHunMil * Number(vPresentMeso))+"<span>원)</span>");


    if(juHeunPrice == null || juHeunPrice == "" || Number(juHeunPrice) == 0 || azmPotionPrice == null || azmPotionPrice == "" || Number(azmPotionPrice) == 0 ){
        $("#azmVal6").text("주흔 가격과 아즈모스 영약 가격을 같이 입력해주세요.");
    }else{
        if(Number(juHeunCalMeso) * 20000 > Number(azmPotionPrice) / 50 * 100 / oneHunMil){
            $("#azmVal6").text("아즈모스에서 사고 영약 경매장에서 사드세요.");
        }else{
            $("#azmVal6").text("주흔으로 사고 영약 경매장에 파세요.");
        }
    }
}
