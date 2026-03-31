// 큐브 현금가치 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_cubeValue();
}

// 큐브 현금가치 계산 로직
function fn_cubeValue() {
    var psm = Number(vPresentMeso); // 1억당 현금
    var pmp = Number(vPresentMepo); // 1억당 메포

    $(".calc-cell").each(function() {
        var baseMeso = Number($(this).data("base-meso"));
        
        // 현금 가치 계산
        var cashVal = (baseMeso / oneHunMil) * psm;
        // 메포 가치 계산 (메소마켓 기준)
        var mpVal = (baseMeso / oneHunMil) * pmp;

        var html = `
            <div class="cube-val-container">
                <div class="cube-val-meso">${formatKoreanUnit(baseMeso)}</div>
                <div class="cube-val-cash">${Math.round(cashVal).toLocaleString()}원</div>
                <div class="cube-val-mp">${Math.round(mpVal).toLocaleString()}메포</div>
            </div>
        `;
        $(this).html(html);
    });
}
