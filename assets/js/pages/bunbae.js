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

// 카카오 SDK 초기화 (페이지 로드 시 한 번만 실행)
if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
    Kakao.init('8ce74d1540029fb70e61e998bf098017'); 
}

// 카카오톡 이미지 공유 기능
function shareToKakao() {
    if (typeof Kakao === 'undefined') {
        alert("카카오 SDK를 불러오지 못했습니다.");
        return;
    }

    if (!Kakao.isInitialized()) {
        alert("카카오 SDK가 초기화되지 않았습니다. JavaScript 키를 확인해 주세요.");
        return;
    }

    // 캡처 시 숨길 요소들 숨기기
    $(".capture-hide").hide();
    
    const captureArea = document.querySelector("#captureArea");
    
    html2canvas(captureArea, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        onclone: (clonedDoc) => {
            const inputs = clonedDoc.querySelectorAll('input');
            inputs.forEach(input => {
                const value = input.value || input.placeholder;
                const span = clonedDoc.createElement('span');
                span.innerText = value;
                span.style.display = "inline-block";
                span.style.padding = "0.6em 1em";
                span.style.border = "1px solid #ddd";
                span.style.borderRadius = "8px";
                span.style.width = "100%";
                span.style.minWidth = "80px";
                span.style.backgroundColor = "#fff";
                span.style.color = "#333";
                input.parentNode.replaceChild(span, input);
            });
            const hideElements = clonedDoc.querySelectorAll('.capture-hide');
            hideElements.forEach(el => el.style.display = 'none');
        }
    }).then(canvas => {
        $(".capture-hide").show();
        
        canvas.toBlob(blob => {
            const file = new File([blob], '메산기_분배결과.png', { type: 'image/png' });

            // 1. 이미지를 카카오 서버에 업로드
            Kakao.Share.uploadImage({
                file: [file],
            }).then(function(res) {
                // 2. 업로드된 이미지 URL로 메시지 보내기
                Kakao.Share.sendDefault({
                    objectType: 'feed',
                    content: {
                        title: '메산기 분배 결과',
                        description: '보상 분배 정산 내역입니다.',
                        imageUrl: res.infos.original.url,
                        link: {
                            mobileWebUrl: window.location.href,
                            webUrl: window.location.href,
                        },
                    },
                    buttons: [
                        {
                            title: '계산기 보러가기',
                            link: {
                                mobileWebUrl: window.location.href,
                                webUrl: window.location.href,
                            },
                        },
                    ],
                });
            }).catch(function(err) {
                console.error('카카오 업로드 실패:', err);
                alert("카카오 이미지 업로드에 실패했습니다. (도메인이 등록되어 있는지 확인해 주세요)");
            });
        }, 'image/png');
    });
}

// 결과 이미지 공유/저장 기능 (기존 기능 유지)
function shareAsImage() {
    // 캡처 시 숨길 요소들 숨기기
    $(".capture-hide").hide();
    
    const captureArea = document.querySelector("#captureArea");
    
    html2canvas(captureArea, {
        backgroundColor: "#ffffff",
        scale: 2,
        useCORS: true,
        // 중요: 복제된 DOM에서 input 태그를 span으로 교체하여 텍스트가 보이게 함
        onclone: (clonedDoc) => {
            const inputs = clonedDoc.querySelectorAll('input');
            inputs.forEach(input => {
                const value = input.value || input.placeholder;
                const span = clonedDoc.createElement('span');
                span.innerText = value;
                // 기존 input과 유사한 스타일 입히기
                span.style.display = "inline-block";
                span.style.padding = "0.6em 1em";
                span.style.border = "1px solid #ddd";
                span.style.borderRadius = "8px";
                span.style.width = "100%";
                span.style.minWidth = "80px";
                span.style.backgroundColor = "#fff";
                span.style.color = "#333";
                
                input.parentNode.replaceChild(span, input);
            });
            // 캡처 영역 안의 정보 아코디언 강제 숨김 (복제본에서)
            const hideElements = clonedDoc.querySelectorAll('.capture-hide');
            hideElements.forEach(el => el.style.display = 'none');
        }
    }).then(canvas => {
        $(".capture-hide").show();
        
        canvas.toBlob(blob => {
            const file = new File([blob], '메산기_분배결과.png', { type: 'image/png' });
            
            // Web Share API 지원 여부 확인 (모바일 카톡/디스코드 공유용)
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({
                    files: [file],
                    title: '메산기 분배 결과',
                    text: '보상 분배 결과 이미지입니다.'
                }).catch(err => {
                    if(err.name !== 'AbortError') console.error('공유 실패:', err);
                });
            } else {
                // 지원하지 않는 경우 기존처럼 다운로드
                const link = document.createElement('a');
                link.download = '메산기_분배결과_' + new Date().getTime() + '.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
                alert("이미지가 다운로드되었습니다. 파티원들에게 공유해 보세요!");
            }
        }, 'image/png');
    });
}

// 결과 텍스트 복사 기능
function copyResultText() {
    let saleMeso = $("#saleMeso").val() || "0";
    let dajoPrice = $("#dajoPrice").val() || "0";
    let text = "";

    if ($("#equalBtn").hasClass("active")) {
        // 균등 분배 텍스트 생성
        let memberCnt = $("#memberCnt").val() || "0";
        let bunbaeMeso = $("#equalBunbaeMeso").text();
        let bunbaeWon = $("#equalBunbaeWon").text();
        let bunbaeDajo = $("#equalBunbaeDajo").text();

        text = `[메산기 분배 결과]\n` +
               `판매금액: ${saleMeso} 메소\n` +
               `조각금액: ${dajoPrice} 메소\n` +
               `파티원 수: ${memberCnt} 명\n` +
               `인당 분배금(메소): ${bunbaeMeso} 메소\n` +
               `인당 분배금(원): 약 ${bunbaeWon} 원\n` +
               `인당 분배금(조각): ${bunbaeDajo} 개`;
    } else {
        // 차등 분배 텍스트 생성
        text = `[메산기 분배 결과 - 차등]\n` +
               `판매금액: ${saleMeso} 메소\n` +
               `조각금액: ${dajoPrice} 메소\n` +
               `--------------------\n`;
        
        for (let i = 1; i <= 6; i++) {
            let nick = $(`#memberName${i}`).val() || `파티원${i}`;
            let share = $(`#memberStack${i}`).val();
            if (share && share !== "0") {
                let mShare = $(`#customBunbaeMeso${i}`).text();
                let wShare = $(`#customBunbaeWon${i}`).text();
                let dShare = $(`#customBunbaeDajo${i}`).text();
                text += `${nick} (${share}지분): ${mShare} 메소 / 약 ${wShare} 원 / ${dShare} 조각\n`;
            }
        }
    }

    // 클립보드 복사
    navigator.clipboard.writeText(text).then(() => {
        alert("분배 결과가 텍스트로 복사되었습니다.\n디스코드나 카톡에 붙여넣기(Ctrl+V) 하세요!");
    }).catch(err => {
        console.error('복사 실패:', err);
        alert("복사 실패했습니다. 브라우저 설정을 확인해주세요.");
    });
}
