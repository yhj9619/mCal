// 피시방 효율 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_pcRoom();

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    $("#pcFee, #pcHH, #pcMM, #piecePrice").on("keyup change", fn_pcRoom);
}

// 피시방 효율 계산 로직
function fn_pcRoom(){
    var pcFee = $("#pcFee").val().replace(/,/g, '');
    var pcHH = $("#pcHH").val().replace(/,/g, '');
    var pcMM = $("#pcMM").val().replace(/,/g, '');
    var piecePrice = $("#piecePrice").val().replace(/,/g, '');
    var totMin =  Number(pcHH * 60) + Number(pcMM);
    var ninetyPrice = (pcFee / totMin * 90);
    var pieceWon = (Number(vPresentMeso) / auctionRate * Number(piecePrice) / oneHunMil); // vPresentMeso는 global.js에서 설정됨
    var daysWon = (ninetyPrice / 10);
    var endsWon = (ninetyPrice / 15);

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
