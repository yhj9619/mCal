// 보상분배계산기 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    let tableBody = $("#memberTable");
    if (tableBody.length > 0 && tableBody.children().length === 0) {
        for (let i = 1; i <= 6; i++) {
            tableBody.append(`
                <tr>
                    <td scope="row" data-label="닉네임">
                        <input type="text" name="memberName${i}" id="memberName${i}" placeholder="닉네임"/>
                    </td>
                    <td data-label="분배지분">
                        <input type="text" class="memberStack" name="memberStack${i}" id="memberStack${i}" 
                            oninput="onlyNumberWithComma(this);fn_customBunbae();" placeholder="지분"/>
                    </td>
                    <td data-label="분배금(메소)"><span id="customBunbaeMeso${i}"></span></td>
                    <td data-label="분배금(원)"><span id="customBunbaeWon${i}"></span></td>
                    <td data-label="분배금(조각)"><span id="customBunbaeDajo${i}"></span></td>
                </tr>
            `);
        }
    }
    
    for (var i = 1; i <= 6; i++) {
        if ($(`#customBunbaeMeso${i}`).text() === "") $(`#customBunbaeMeso${i}`).text("0");
    }

    $(".tab button").off("click").on("click", function () {
        $(".tab button").removeClass("active");
        $(this).addClass("active");
        if ($(this).attr("id") === "equalBtn") {
            $("#equalDiv").show();
            $("#customDiv").hide();
            fn_equalBunbae();
        } else {
            $("#equalDiv").hide();
            $("#customDiv").show();
            fn_customBunbae();
        }
    });

    $("#saleMeso, #dajoPrice, #memberCnt").on("keyup change", function() {
        if ($("#equalBtn").hasClass("active")) fn_equalBunbae();
        else fn_customBunbae();
    });

    updateKoreanUnitHelper(document.getElementById('saleMeso'), 'saleMesoHelper');
    updateKoreanUnitHelper(document.getElementById('dajoPrice'), 'dajoPriceHelper');

    if ($("#equalBtn").hasClass("active")) fn_equalBunbae();
    else fn_customBunbae();
}

function fn_equalBunbae(){
    var saleMeso = Math.ceil(($("#saleMeso").val().replace(/[^0-9]/g,''))*auctionRate);
    var dajoPrice = $("#dajoPrice").val().replace(/[^0-9]/g,'');
    var memberCnt = $("#memberCnt").val().replace(/,/g, '') || 1;
    
    $("#equalBunbaeMeso").html(formatResultWithWrap(saleMeso / memberCnt));
    $("#equalBunbaeWon").html(customFormatNumber(saleMeso / memberCnt / oneHunMil * vPresentMeso));
    if(dajoPrice > 0) $("#equalBunbaeDajo").html(customFormatNumber(saleMeso / memberCnt / dajoPrice));
    else $("#equalBunbaeDajo").text("조각가격없음");
}

function fn_customBunbae(){
    var saleMeso = Math.ceil(($("#saleMeso").val().replace(/[^0-9]/g,''))*auctionRate);
    var dajoPrice = $("#dajoPrice").val().replace(/[^0-9]/g,'');
    var memberStackSum = 0;
    $(".memberStack").each(function () {
        memberStackSum += Number($(this).val().replace(/,/g, "")) || 0;
    });

    for (var i = 1; i <= 6; i++) {
        var stackValue = Number($(`#memberStack${i}`).val().replace(/,/g, "")) || 0; 
        if (memberStackSum > 0) {
            var mesoShare = saleMeso / memberStackSum * stackValue;
            $(`#customBunbaeMeso${i}`).html(formatResultWithWrap(mesoShare));
            $(`#customBunbaeWon${i}`).text(customFormatNumber(mesoShare / oneHunMil * vPresentMeso.replace(/,/g , '')));
            if(dajoPrice > 0) $(`#customBunbaeDajo${i}`).text(customFormatNumber(mesoShare / dajoPrice));
            else $(`#customBunbaeDajo${i}`).text("조각가격없음");
        } else {
            $(`#customBunbaeMeso${i}`).text("0");
            $(`#customBunbaeWon${i}`).text("0");
            $(`#customBunbaeDajo${i}`).text("0");
        }
    }
}

function copyResultText() {
    let saleMeso = $("#saleMeso").val() || "0";
    let dajoPrice = $("#dajoPrice").val() || "0";
    let text = `[메산기 분배 결과]\n`;
    text += `판매금액: ${saleMeso} 메소\n`;
    text += `조각금액: ${dajoPrice} 메소\n`;
    if ($("#equalBtn").hasClass("active")) {
        text += `파티원 수: ${$("#memberCnt").val()} 명\n`;
        text += `--------------인당 분배금--------------\n`;
        text += `메소: ${$("#equalBunbaeMeso").text()} 메소\n`;
        text += `현금: ${$("#equalBunbaeWon").text()} 원\n`;
        text += `조각: ${$("#equalBunbaeDajo").text()} 개\n`;
    } else {
        for (let i = 1; i <= 6; i++) {
            let share = $(`#memberStack${i}`).val();
            if (share > 0) {
                text += `-------------${$(`#memberName${i}`).val() || '파티원'+i}:-------------\n`;
                text += `메소: ${$(`#customBunbaeMeso${i}`).text()} 메소\n`;
                text += `현금: ${$(`#customBunbaeWon${i}`).text()} 원\n`;
                text += `조각: ${$(`#customBunbaeDajo${i}`).text()} 개\n`;
                
            }
        }
    }
    text += `--------------시세 기준--------------\n`;
    text += `1억당 ${vPresentMeso}원 / 수수료 ${vAuctionCharge}%`;

    navigator.clipboard.writeText(text).then(() => alert("텍스트가 복사되었습니다."));
}
