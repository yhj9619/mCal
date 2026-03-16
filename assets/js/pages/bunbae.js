// 보상분배계산기 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    // 탭 전환 로직 (DOMContentLoaded 대신 여기서 호출)
    // 원래 $(document).ready 안에 있던 로직
    let tableBody = $("#memberTable");

    // 이미 추가된 행이 있는지 확인 (중복 추가 방지)
    if (tableBody.children().length === 0) {
        for (let i = 1; i <= 6; i++) {
            tableBody.append(`
                <tr>
                    <td scope="row" data-label="닉네임">
                        <input type="text" name="memberName${i}" id="memberName${i}" 
                          placeholder="닉네임"/>
                    </td>
                    <td data-label="분배지분">
                        <input type="text" class="memberStack" name="memberStack${i}" id="memberStack${i}" 
                            oninput="onlyNumberWithComma(this);fn_customBunbae();" placeholder="분배지분"/>
                    </td>
                    <td data-label="인당 분배금(메소)">
                        <span id="customBunbaeMeso${i}"></span>
                    </td>
                    <td data-label="인당 분배금(원)">
                        <span id="customBunbaeWon${i}"></span>
                    </td>
                    <td data-label="인당 분배금(조각)">
                        <span id="customBunbaeDajo${i}"></span>
                    </td>
                </tr>
            `);
        }
    }
    
    // 초기화
    for (var i = 1; i <= 6; i++) {
        $(`#customBunbaeMeso${i}`).text("0");
        $(`#customBunbaeWon${i}`).text("0");
        $(`#customBunbaeDajo${i}`).text("0");
    }

    // 탭 전환 이벤트 리스너 (중복 방지)
    $(".tab button").off("click").on("click", function () {
        $(".tab button").removeClass("active");
        $(this).addClass("active");

        if ($(this).attr("id") === "equalBtn") {
            $("#equalDiv").show();
            $("#customDiv").hide();
            fn_equalBunbae(); // 탭 전환 시 바로 계산
        } else {
            $("#equalDiv").hide();
            $("#customDiv").show();
            fn_customBunbae(); // 탭 전환 시 바로 계산
        }
    });

    // 입력 필드에 대한 이벤트 리스너 (oninput이 HTML에 있으므로 여기서 직접 호출만)
    $("#saleMeso, #dajoPrice, #memberCnt").on("keyup change", function() {
        if ($("#equalBtn").hasClass("active")) {
            fn_equalBunbae();
        } else {
            fn_customBunbae();
        }
    });

    // 초기 계산 실행
    if ($("#equalBtn").hasClass("active")) {
        fn_equalBunbae();
    } else {
        fn_customBunbae();
    }
}

// 균등 분배 계산 로직
function fn_equalBunbae(){
    var saleMeso = Math.ceil(($("#saleMeso").val().replace(/[^0-9]/g,''))*auctionRate);
    var dajoPrice = $("#dajoPrice").val().replace(/[^0-9]/g,'');
    var memberCnt = $("#memberCnt").val().replace(/,/g, '');
    
    // memberCnt가 유효한 숫자가 아니거나 0이면 계산하지 않음
    if (isNaN(memberCnt) || memberCnt === "" || parseInt(memberCnt) === 0) {
        $("#equalBunbaeMeso").html("0");
        $("#equalBunbaeWon").html("0");
        $("#equalBunbaeDajo").html("0");
        return;
    }

    $("#equalBunbaeMeso").html(customFormatNumber(saleMeso / memberCnt));
    $("#equalBunbaeWon").html(customFormatNumber(saleMeso / memberCnt / oneHunMil * vPresentMeso));
    if(dajoPrice != "" && dajoPrice != null && dajoPrice != 0){
        $("#equalBunbaeDajo").html(customFormatNumber(saleMeso / memberCnt / dajoPrice));
    }else{
        $("#equalBunbaeDajo").text("조각가격없음");
    }
}

// 차등 분배 계산 로직
function fn_customBunbae(){
    var saleMeso = Math.ceil(($("#saleMeso").val().replace(/[^0-9]/g,''))*auctionRate);
    var dajoPrice = $("#dajoPrice").val().replace(/[^0-9]/g,'');

    var memberStacks = {}; 
    for (var i = 1; i <= 6; i++) {
        var value = $("#memberStack" + i).val();
        memberStacks[i] = value ? value.replace(/[^0-9]/g, '') : "0";
    }

    var memberStackSum = 0;
    $(".memberStack").each(function () {
        var val = Number($(this).val().replace(/,/g, "")) || 0;
        memberStackSum += val;
    });

    for (var i = 1; i <= 6; i++) {
        var stackValue = Number(memberStacks[i]) || 0; 
        
        if (memberStackSum > 0) {
            var mesoShare = customFormatNumber(saleMeso / memberStackSum * stackValue);
            var wonShare = customFormatNumber(saleMeso / memberStackSum * stackValue / oneHunMil * vPresentMeso.replace(/,/g , ''));
            var dajoShare = customFormatNumber((saleMeso / memberStackSum * stackValue) / dajoPrice);

            $(`#customBunbaeMeso${i}`).text(mesoShare);
            $(`#customBunbaeWon${i}`).text(wonShare);
            if(dajoPrice != "" && dajoPrice != null && dajoPrice != 0){
                $(`#customBunbaeDajo${i}`).text(dajoShare);
            }else{
                $(`#customBunbaeDajo${i}`).text("조각가격없음");
            }
            
        } else {
            $(`#customBunbaeMeso${i}`).text("0");
            $(`#customBunbaeWon${i}`).text("0");
            $(`#customBunbaeDajo${i}`).text("0");
        }
    }
}
