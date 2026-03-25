// 전역 변수
var tenThsd  = 10000;
var oneHunMil = 100000000;
var vPresentMeso, vPresentMepo, vPercentMVP, vDiscountRate, vAuctionCharge;
var discountRate, auctionRate, realMepo, moneyTransMepo;
var for1MilWithPerson, for1MilWithMarket;

// 페이지별 변수들
var vJuhwaVal, vJuhwaCnt;
var vPcFee, vPcHH, vPcMM, vPiecePrice;
var vPastMeso;
var vItemMesoVal;
var vJuHeunPrice;
var vSaleMeso, vDajoPrice, vMemberCnt; // Bunbae calculator
var vBuyMesoPrice, vBuyMesoAmt, vBuyMesoWon; // SaleProfit calculator

// 페이지 로드 시 실행
$(document).ready(function() {
    console.log("global.js $(document).ready 실행됨");
    firstValSetting();
    dataLoad();
    fn_collection(); // 초기 계산 실행

    // 공통 입력 필드에 대한 이벤트 리스너
    $(".mainDiv input, .radioSelect input").on("keyup change", function(){
        saveData();
        fn_collection();
    });

    // 메뉴 검색 기능 추가
    if ($('#menuSearchInput').length) {
        $('#menuSearchInput').on('keyup', function() {
            var searchTerm = $(this).val().toLowerCase();
            $('#nav ul li').each(function() {
                var menuItem = $(this);
                var $menuLink = menuItem.find('a');
                var menuItemText = $menuLink.text().toLowerCase();
                var dataKeywords = $menuLink.data('keywords') ? $menuLink.data('keywords').toLowerCase() : '';
                if (menuItemText.includes(searchTerm) || dataKeywords.includes(searchTerm)) {
                    menuItem.show();
                } else {
                    menuItem.hide();
                }
            });
        });
    }

    // 공통 아코디언 기능 추가
    $(document).off('click', '.accordion-header').on('click', '.accordion-header', function() {
        var $header = $(this);
        var $content = $header.nextAll('.accordion-content:first');
        var $icon = $header.find('.accordion-icon');

        $content.slideToggle('fast', function() {
            if ($content.is(':visible')) {
                $icon.removeClass('fa-chevron-down').addClass('fa-chevron-up');
            } else {
                $icon.removeClass('fa-chevron-up').addClass('fa-chevron-down');
            }
        });
    });

    // 다크모드 초기화
    initDarkMode();

    // 사이드바 상태 초기화
    initSidebar();

    // 카카오 SDK 초기화
    if (typeof Kakao !== 'undefined' && !Kakao.isInitialized()) {
        Kakao.init('8ce74d1540029fb70e61e998bf098017'); 
    }
});

// 사이드바 토글 함수
function toggleSidebar() {
    const body = document.body;
    const isCollapsed = body.classList.toggle('sidebar-collapsed');
    localStorage.setItem('sidebarState', isCollapsed ? 'collapsed' : 'expanded');
}

// 사이드바 초기 설정
function initSidebar() {
    const savedState = localStorage.getItem('sidebarState');
    if (savedState === 'expanded') {
        document.body.classList.remove('sidebar-collapsed');
    } else {
        document.body.classList.add('sidebar-collapsed');
    }
}

// 다크모드 토글 함수
function toggleDarkMode() {
    const body = document.body;
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeUI(isDark);
}

// 다크모드 초기 설정
function initDarkMode() {
    const savedTheme = localStorage.getItem('theme');
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = (isDark) => {
        if (isDark) {
            document.body.classList.add('dark-mode');
            updateThemeUI(true);
        } else {
            document.body.classList.remove('dark-mode');
            updateThemeUI(false);
        }
    };
    const shouldShowDark = savedTheme === 'dark' || (!savedTheme && darkModeMediaQuery.matches);
    applyTheme(shouldShowDark);
    darkModeMediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches);
        }
    });
}

// 테마 UI 업데이트
function updateThemeUI(isDark) {
    const circle = document.getElementById('toggle-circle');
    const sunIcon = document.getElementById('sun-icon');
    const moonIcon = document.getElementById('moon-icon');
    if (circle && sunIcon && moonIcon) {
        if (isDark) {
            circle.style.left = '22px';
            sunIcon.style.color = '#555';
            sunIcon.style.opacity = '0.5';
            moonIcon.style.color = '#f1c40f';
            moonIcon.style.opacity = '1';
        } else {
            circle.style.left = '2px';
            sunIcon.style.color = '#f5a623';
            sunIcon.style.opacity = '1';
            moonIcon.style.color = '#555';
            moonIcon.style.opacity = '0.5';
        }
    }
}

// 모든 계산을 실행하는 메인 함수
function fn_collection(){
    setNumber();
    if ($("#intro_meso").length > 0) {
        $("#intro_meso").text(customFormatNumber(vPresentMeso));
        $("#intro_market").text(customFormatNumber(vPresentMepo));
        $("#intro_gift").text(customFormatNumber(vPercentMVP));
        $("#intro_discount").text(vDiscountRate);
        $("#intro_auction").text(vAuctionCharge);
    }
    if (typeof run_page_calculations === "function") {
        run_page_calculations();
    }
}

// 공통 숫자 변수 설정
function setNumber(){
    vPresentMeso = $("#presentMeso").val() ? $("#presentMeso").val().replace(/,/g, '') : "0";
    vPresentMepo = $("#presentMepo").val() ? $("#presentMepo").val().replace(/,/g, '') : "0";
    vPercentMVP = $("#percentMVP").val() ? $("#percentMVP").val().replace(/,/g, '') : "0";
    vDiscountRate = $("#discountRate").val() ? $("#discountRate").val().replace(/,/g, '') : "0";
    vAuctionCharge = $("input:radio[name='auctionCharge']:checked").val() || "5";
    
    discountRate = 1 - vDiscountRate / 100;
    auctionRate = 1 - vAuctionCharge / 100;
    realMepo = vPresentMepo - Math.ceil(vPresentMepo * 0.01);
    moneyTransMepo = Math.round(tenThsd / realMepo / auctionRate * vPresentMeso);
    for1MilWithPerson = Math.round(1 / auctionRate * vPresentMeso);
    for1MilWithMarket = Math.round(vPresentMepo * discountRate);
}

// 초기 기본값 설정
function firstValSetting(){
    var getLocal = function(key) { return localStorage.getItem(key); };
    var isEmptyOrUndefined = function(val) { return val === null || val === "" || val === "undefined"; };
    if ($("#presentMeso").length > 0 && isEmptyOrUndefined(getLocal('presentMeso'))) $("#presentMeso").val('1,100');
    if ($("#presentMepo").length > 0 && isEmptyOrUndefined(getLocal('presentMepo'))) $("#presentMepo").val('1,650');
    if ($("#percentMVP").length > 0 && isEmptyOrUndefined(getLocal('percentMVP'))) $("#percentMVP").val('7,500');
    if ($("#discountRate").length > 0 && isEmptyOrUndefined(getLocal('discountRate'))) $("#discountRate").val('0');
    if ($('input[name="auctionCharge"]').length > 0 && isEmptyOrUndefined(getLocal('auctionCharge'))) $('input[name="auctionCharge"]')[0].checked = true;
    if ($("#juhwaVal").length > 0 && isEmptyOrUndefined(getLocal('juhwaVal'))) $("#juhwaVal").val('83,942,300');
    if ($("#pcFee").length > 0 && isEmptyOrUndefined(getLocal('pcFee'))) $("#pcFee").val('3,000');
    if ($("#pcHH").length > 0 && isEmptyOrUndefined(getLocal('pcHH'))) $("#pcHH").val('2');
    if ($("#pcMM").length > 0 && isEmptyOrUndefined(getLocal('pcMM'))) $("#pcMM").val('40');
    if ($("#piecePrice").length > 0 && isEmptyOrUndefined(getLocal('piecePrice'))) $("#piecePrice").val('9,999,999');
    if ($("#pastMeso").length > 0 && isEmptyOrUndefined(getLocal('pastMeso'))) $("#pastMeso").val('1,800');
    if ($("#itemMesoVal").length > 0 && isEmptyOrUndefined(getLocal('itemMesoVal'))) $("#itemMesoVal").val('0');
    if ($("#juHeunPrice").length > 0 && isEmptyOrUndefined(getLocal('juHeunPrice'))) $("#juHeunPrice").val('3,000');
    if ($('input[name="juHeun50Event"]').length > 0 && isEmptyOrUndefined(getLocal('juHeun50Event'))) $('input[name="juHeun50Event"]')[0].checked = true;
    if ($("#saleMeso").length > 0 && isEmptyOrUndefined(getLocal('saleMeso'))) $("#saleMeso").val('0');
    if ($("#dajoPrice").length > 0 && isEmptyOrUndefined(getLocal('dajoPrice'))) $("#dajoPrice").val('0');
    if ($("#memberCnt").length > 0 && isEmptyOrUndefined(getLocal('memberCnt'))) $("#memberCnt").val('1');
    if ($("#buyMesoPrice").length > 0 && isEmptyOrUndefined(getLocal('buyMesoPrice'))) $("#buyMesoPrice").val('1,500');
    if ($("#buyMesoAmt").length > 0 && isEmptyOrUndefined(getLocal('buyMesoAmt'))) $("#buyMesoAmt").val('10');
    if ($("#buyMesoWon").length > 0 && isEmptyOrUndefined(getLocal('buyMesoWon'))) $("#buyMesoWon").val('15,000');
}

// 데이터 불러오기
function dataLoad(){
    var getLocal = function(key) { 
        var val = localStorage.getItem(key);
        return (val === "undefined" || val === "[object Object]") ? "" : val;
    };
    vPresentMeso = getLocal('presentMeso');
    vPresentMepo = getLocal('presentMepo');
    vPercentMVP = getLocal('percentMVP');
    vDiscountRate = getLocal('discountRate');
    vAuctionCharge = getLocal('auctionCharge');
    if (vPresentMeso && $("#presentMeso").length > 0) $('#presentMeso').val(vPresentMeso);
    if (vPresentMepo && $("#presentMepo").length > 0) $('#presentMepo').val(vPresentMepo);
    if (vPercentMVP && $("#percentMVP").length > 0) $('#percentMVP').val(vPercentMVP);
    if (vDiscountRate && $("#discountRate").length > 0) $('#discountRate').val(vDiscountRate);
    if (vAuctionCharge && $('input[name="auctionCharge"]').length > 0) $('#'+vAuctionCharge+"per").prop("checked", true);
    
    // 페이지별 로드 (필요한 것들 위주)
    if ($('#juhwaVal').length > 0) $('#juhwaVal').val(getLocal('juhwaVal'));
    if ($('#juhwaCnt').length > 0) $('#juhwaCnt').val(getLocal('juhwaCnt'));
    if ($('#pcFee').length > 0) $('#pcFee').val(getLocal('pcFee'));
    if ($('#pcHH').length > 0) $('#pcHH').val(getLocal('pcHH'));
    if ($('#pcMM').length > 0) $('#pcMM').val(getLocal('pcMM'));
    if ($('#piecePrice').length > 0) $('#piecePrice').val(getLocal('piecePrice'));
    if ($('#pastMeso').length > 0) $('#pastMeso').val(getLocal('pastMeso'));
    if ($('#itemMesoVal').length > 0) $('#itemMesoVal').val(getLocal('itemMesoVal'));
    if ($('#juHeunPrice').length > 0) $('#juHeunPrice').val(getLocal('juHeunPrice'));
    if ($('#saleMeso').length > 0) $('#saleMeso').val(getLocal('saleMeso'));
    if ($('#dajoPrice').length > 0) $('#dajoPrice').val(getLocal('dajoPrice'));
    if ($('#memberCnt').length > 0) $('#memberCnt').val(getLocal('memberCnt'));
    if ($('#buyMesoPrice').length > 0) $('#buyMesoPrice').val(getLocal('buyMesoPrice'));
    if ($('#buyMesoAmt').length > 0) $('#buyMesoAmt').val(getLocal('buyMesoAmt'));
    if ($('#buyMesoWon').length > 0) $('#buyMesoWon').val(getLocal('buyMesoWon'));
}

// 데이터 저장
function saveData() {
    localStorage.setItem('presentMeso', $("#presentMeso").val() || "");
    localStorage.setItem('presentMepo', $("#presentMepo").val() || "");
    localStorage.setItem('percentMVP', $("#percentMVP").val() || "");
    localStorage.setItem('discountRate', $("#discountRate").val() || "");
    localStorage.setItem('auctionCharge', $("input:radio[name='auctionCharge']:checked").val() || "5");
    
    // 현재 페이지 요소가 있으면 저장
    if ($("#juhwaVal").length > 0) localStorage.setItem('juhwaVal', $("#juhwaVal").val());
    if ($("#juhwaCnt").length > 0) localStorage.setItem('juhwaCnt', $("#juhwaCnt").val());
    if ($("#pcFee").length > 0) localStorage.setItem('pcFee', $("#pcFee").val());
    if ($("#pcHH").length > 0) localStorage.setItem('pcHH', $("#pcHH").val());
    if ($("#pcMM").length > 0) localStorage.setItem('pcMM', $("#pcMM").val());
    if ($("#piecePrice").length > 0) localStorage.setItem('piecePrice', $("#piecePrice").val());
    if ($("#pastMeso").length > 0) localStorage.setItem('pastMeso', $("#pastMeso").val());
    if ($("#itemMesoVal").length > 0) localStorage.setItem('itemMesoVal', $("#itemMesoVal").val());
    if ($("#juHeunPrice").length > 0) localStorage.setItem('juHeunPrice', $("#juHeunPrice").val());
    if ($("#saleMeso").length > 0) localStorage.setItem('saleMeso', $("#saleMeso").val());
    if ($("#dajoPrice").length > 0) localStorage.setItem('dajoPrice', $("#dajoPrice").val());
    if ($("#memberCnt").length > 0) localStorage.setItem('memberCnt', $("#memberCnt").val());
    if ($("#buyMesoPrice").length > 0) localStorage.setItem('buyMesoPrice', $("#buyMesoPrice").val());
    if ($("#buyMesoAmt").length > 0) localStorage.setItem('buyMesoAmt', $("#buyMesoAmt").val());
    if ($("#buyMesoWon").length > 0) localStorage.setItem('buyMesoWon', $("#buyMesoWon").val());
}

// 유틸리티: 숫자 콤마
function onlyNumberWithComma(obj) {
    let number = obj.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    const parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    obj.value = parts.join('.');
}

// 유틸리티: 포맷팅
function customFormatNumber(value) {
    if (isNaN(value) || value === null || value === '' || !isFinite(value)) return '0';
    let roundedValue = parseFloat(value).toFixed(2);
    let [integerDigits, decimalPart] = roundedValue.split('.');
    let formattedNumber = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let extraText = "";
    if (Math.abs(parseInt(integerDigits)) >= 100000000) {
        let eokValue = (parseInt(integerDigits) / 100000000).toFixed(2);
        extraText = ` (약 ${eokValue}억)`;
    }
    return `${formattedNumber}.${decimalPart}${extraText}`;
}

// --- 공통 공유 및 한글 단위 도우미 기능 ---

// 한글 단위 도우미 업데이트
function updateKoreanUnitHelper(input, helperId) {
    if (!input) return;
    const value = input.value.replace(/,/g, "");
    const helper = document.getElementById(helperId);
    if (helper) {
        if (!value || isNaN(value)) {
            helper.innerText = "";
            return;
        }
        helper.innerText = formatKoreanUnit(Number(value));
    }
}

function formatKoreanUnit(number) {
    if (number === 0) return "0";
    let result = "";
    let eok = Math.floor(number / 100000000);
    let man = Math.floor((number % 100000000) / 10000);
    let rest = Math.floor(number % 10000);
    if (eok > 0) result += eok + "억 ";
    if (man > 0) result += man.toLocaleString() + "만 ";
    if (rest > 0) result += rest.toLocaleString();
    return result.trim();
}

function formatResultWithWrap(value) {
    if (isNaN(value) || value === null || value === '' || !isFinite(value)) return '0';
    let roundedValue = parseFloat(value).toFixed(0);
    let formattedNumber = roundedValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    let unitText = "";
    if (Math.abs(parseInt(roundedValue)) >= 100000000) {
        let eokValue = (parseInt(roundedValue) / 100000000).toFixed(2);
        unitText = `<br><small style="color: #888;">(약 ${eokValue}억)</small>`;
    }
    return `${formattedNumber}${unitText}`;
}

// 결과 이미지 공유/복사 (범용)
function shareAsImage(areaId = "#captureArea", filename = "메산기_결과") {
    $(".capture-hide").hide();
    const captureArea = document.querySelector(areaId);
    if (!captureArea) return;

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
                span.style.cssText = "display:inline-block; padding:12px 16px; border:1px solid #ddd; border-radius:8px; width:100%; background:#fff; color:#333; text-align:right; font-weight:bold; box-sizing:border-box;";
                input.parentNode.replaceChild(span, input);
            });
            const hideElements = clonedDoc.querySelectorAll('.capture-hide');
            hideElements.forEach(el => el.style.display = 'none');
        }
    }).then(canvas => {
        $(".capture-hide").show();
        canvas.toBlob(blob => {
            const file = new File([blob], filename + '.png', { type: 'image/png' });
            // 클립보드 복사 시도
            if (navigator.clipboard && window.ClipboardItem) {
                const item = new ClipboardItem({ 'image/png': blob });
                navigator.clipboard.write([item]);
            }
            // 공유 시도
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                navigator.share({ files: [file], title: filename });
            } else {
                const link = document.createElement('a');
                link.download = filename + '_' + new Date().getTime() + '.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
                alert("이미지가 복사 및 다운로드되었습니다.");
            }
        }, 'image/png');
    });
}
