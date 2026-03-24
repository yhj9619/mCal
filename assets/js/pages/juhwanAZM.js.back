// 골드주화가치 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_juhwa();

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    $("#juhwaVal, #juhwaCnt").on("keyup change", fn_juhwa);
}

// 골드주화가치 계산 로직
function fn_juhwa(){
    var juhwaVal = $("#juhwaVal").val().replace(/,/g, '');
    var juhwaCnt = 1;

    if($("#juhwaCnt").val() != "" && $("#juhwaCnt").val() != null){
        juhwaCnt = $("#juhwaCnt").val().replace(/,/g, '');
    }else{
        juhwaCnt = 1;
    }

    if(juhwaVal != "" && juhwaVal != null){
        var juhwaMeso = (juhwaVal / oneHunMil)
        $("#juhwa1").html(customFormatNumber(juhwaMeso * juhwaCnt));
        $("#juhwa2").html(customFormatNumber((juhwaMeso * realMepo - 300) * juhwaCnt));

        var azmVal = Number(juhwaMeso * realMepo - 300) * 3
        if(azmVal > 2500){
            $("#juhwa3").html("<span>사세요.(1,000점당 </span>"+customFormatNumber(azmVal - 2500)+"<span>메포 이득)</span>");
        }else{
            $("#juhwa3").html("<span>사지마세요.(1,000점당 </span>"+customFormatNumber(2500 - azmVal)+"<span>메포 손해)<span>");
        }
    }else{
        $("#juhwa1").text('');
        $("#juhwa2").text('');
        $("#juhwa3").text('주화가격을 입력해주세요.');
    }
}
