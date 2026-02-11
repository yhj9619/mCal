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
var vJuHeunPrice, vAzmPotionPrice;
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
    if ($('#menuSearchInput').length) { // 검색 입력 필드가 존재할 때만 활성화
        $('#menuSearchInput').on('keyup', function() {
            var searchTerm = $(this).val().toLowerCase(); // 검색어 소문자 변환
            
            // 각 메뉴 항목 순회
            $('#nav ul li').each(function() {
                var menuItem = $(this);
                var $menuLink = menuItem.find('a'); // <a> 태그를 선택
                var menuItemText = $menuLink.text().toLowerCase(); // 메뉴 항목의 보이는 텍스트
                var dataKeywords = $menuLink.data('keywords') ? $menuLink.data('keywords').toLowerCase() : ''; // data-keywords 속성 값

                // 검색어에 보이는 텍스트 또는 data-keywords에 포함되는지 확인
                if (menuItemText.includes(searchTerm) || dataKeywords.includes(searchTerm)) {
                    menuItem.show(); // 검색어 포함 시 보이기
                } else {
                    menuItem.hide(); // 검색어 미포함 시 숨기기
                }
            });
        });
    }
});

// 모든 계산을 실행하는 메인 함수
function fn_collection(){
    console.log("fn_collection 호출됨");
    setNumber(); // 공통 숫자 설정

    // 현재 페이지에 해당하는 계산 함수가 존재하면 실행
    if (typeof run_page_calculations === "function") {
        console.log("run_page_calculations 호출 시도");
        run_page_calculations();
    }
}

// 공통 숫자 변수 설정
function setNumber(){
    vPresentMeso = $("#presentMeso").val().replace(/,/g, '');
    vPresentMepo = $("#presentMepo").val().replace(/,/g, '');
    vPercentMVP = $("#percentMVP").val().replace(/,/g, '');
    vDiscountRate = $("#discountRate").val().replace(/,/g, '');
    vAuctionCharge = $("input:radio[name='auctionCharge']:checked").val();
    
    console.log("setNumber() 실행됨 - mainDiv 입력 값:", {
        presentMeso: $("#presentMeso").val(),
        presentMepo: $("#presentMepo").val(),
        percentMVP: $("#percentMVP").val(),
        discountRate: $("#discountRate").val(),
        auctionCharge: $("input:radio[name='auctionCharge']:checked").val()
    });
    console.log("setNumber() 실행됨 - 전역 변수 값:", {
        vPresentMeso, vPresentMepo, vPercentMVP, vDiscountRate, vAuctionCharge
    });


    discountRate = 1 - vDiscountRate / 100;
    auctionRate = 1 - vAuctionCharge / 100;

    realMepo = vPresentMepo - Math.ceil(vPresentMepo * 0.01);
    moneyTransMepo = Math.round(tenThsd / realMepo / auctionRate * vPresentMeso);
    
    for1MilWithPerson = Math.round(1 / auctionRate * vPresentMeso);
    for1MilWithMarket = Math.round(vPresentMepo * discountRate);
    for1MilWithMarket2 = Math.round(vPresentMepo * vPercentMVP / 10000);
}


// 초기 기본값 설정
function firstValSetting(){
    if ($("#presentMeso").length > 0 && !localStorage.getItem('presentMeso')) $("#presentMeso").val('850');
    if ($("#presentMepo").length > 0 && !localStorage.getItem('presentMepo')) $("#presentMepo").val('1,280');
    if ($("#percentMVP").length > 0 && !localStorage.getItem('percentMVP')) $("#percentMVP").val('7,500');
    if ($("#discountRate").length > 0 && !localStorage.getItem('discountRate')) $("#discountRate").val('0');
    if ($('input[name="auctionCharge"]').length > 0 && !localStorage.getItem('auctionCharge')) $('input[name="auctionCharge"]')[0].checked = true;

    // 페이지별 초기값
    if ($("#juhwaVal").length > 0 && !localStorage.getItem('juhwaVal')) $("#juhwaVal").val('83,942,300');
    if ($("#pcFee").length > 0 && !localStorage.getItem('pcFee')) $("#pcFee").val('3,000');
    if ($("#pcHH").length > 0 && !localStorage.getItem('pcHH')) $("#pcHH").val('2');
    if ($("#pcMM").length > 0 && !localStorage.getItem('pcMM')) $("#pcMM").val('40');
    if ($("#piecePrice").length > 0 && !localStorage.getItem('piecePrice')) $("#piecePrice").val('9,999,999');
    if ($("#pastMeso").length > 0 && !localStorage.getItem('pastMeso')) $("#pastMeso").val('1,800');
    if ($("#itemMesoVal").length > 0 && !localStorage.getItem('itemMesoVal')) $("#itemMesoVal").val('0');
    if ($("#juHeunPrice").length > 0 && !localStorage.getItem('juHeunPrice')) $("#juHeunPrice").val('3,000');
    if ($("#azmPotionPrice").length > 0 && !localStorage.getItem('azmPotionPrice')) $("#azmPotionPrice").val('6,666,666');
    if ($('input[name="juHeun50Event"]').length > 0 && !localStorage.getItem('juHeun50Event')) $('input[name="juHeun50Event"]')[0].checked = true;
    if ($("#saleMeso").length > 0 && !localStorage.getItem('saleMeso')) $("#saleMeso").val('0');
    if ($("#dajoPrice").length > 0 && !localStorage.getItem('dajoPrice')) $("#dajoPrice").val('0');
    if ($("#memberCnt").length > 0 && !localStorage.getItem('memberCnt')) $("#memberCnt").val('1');
    if ($("#buyMesoPrice").length > 0 && !localStorage.getItem('buyMesoPrice')) $("#buyMesoPrice").val('1,500');
    if ($("#buyMesoAmt").length > 0 && !localStorage.getItem('buyMesoAmt')) $("#buyMesoAmt").val('10');
    if ($("#buyMesoWon").length > 0 && !localStorage.getItem('buyMesoWon')) $("#buyMesoWon").val('15,000');
}

// 로컬 스토리지에서 데이터 불러오기
function dataLoad(){
    console.log("dataLoad() 실행됨");
    vPresentMeso = localStorage.getItem('presentMeso');
    vPresentMepo = localStorage.getItem('presentMepo');
    vPercentMVP = localStorage.getItem('percentMVP');
    vDiscountRate = localStorage.getItem('discountRate');
    vAuctionCharge = localStorage.getItem('auctionCharge');

    if (vPresentMeso && $("#presentMeso").length > 0) $('#presentMeso').val(vPresentMeso);
    if (vPresentMepo && $("#presentMepo").length > 0) $('#presentMepo').val(vPresentMepo);
    if (vPercentMVP && $("#percentMVP").length > 0) $('#percentMVP').val(vPercentMVP);
    if (vDiscountRate && $("#discountRate").length > 0) $('#discountRate').val(vDiscountRate);
    if (vAuctionCharge && $('input[name="auctionCharge"]').length > 0) {
        $('#'+vAuctionCharge+"per").prop("checked", true);
    } else if ($('input[name="auctionCharge"]').length > 0) {
        $('#5per').prop("checked", true); // 기본값
    }

    // 페이지별 값 로드
    vJuhwaVal = localStorage.getItem('juhwaVal');
    if (vJuhwaVal && $('#juhwaVal').length > 0) $('#juhwaVal').val(vJuhwaVal);

    vJuhwaCnt = localStorage.getItem('juhwaCnt');
    if (vJuhwaCnt && $('#juhwaCnt').length > 0) $('#juhwaCnt').val(vJuhwaCnt);

    vPcFee = localStorage.getItem('pcFee');
    if (vPcFee && $('#pcFee').length > 0) $('#pcFee').val(vPcFee);

    vPcHH = localStorage.getItem('pcHH');
    if (vPcHH && $('#pcHH').length > 0) $('#pcHH').val(vPcHH);

    vPcMM = localStorage.getItem('pcMM');
    if (vPcMM && $('#pcMM').length > 0) $('#pcMM').val(vPcMM);

    vPiecePrice = localStorage.getItem('piecePrice');
    if (vPiecePrice && $('#piecePrice').length > 0) $('#piecePrice').val(vPiecePrice);

    vPastMeso = localStorage.getItem('pastMeso');
    if (vPastMeso && $('#pastMeso').length > 0) $('#pastMeso').val(vPastMeso);

    vItemMesoVal = localStorage.getItem('itemMesoVal');
    if (vItemMesoVal && $('#itemMesoVal').length > 0) $('#itemMesoVal').val(vItemMesoVal);

    vJuHeunPrice = localStorage.getItem('juHeunPrice');
    if (vJuHeunPrice && $('#juHeunPrice').length > 0) $('#juHeunPrice').val(vJuHeunPrice);

    vAzmPotionPrice = localStorage.getItem('azmPotionPrice');
    if (vAzmPotionPrice && $('#azmPotionPrice').length > 0) $('#azmPotionPrice').val(vAzmPotionPrice);

    var juHeun50Event = localStorage.getItem('juHeun50Event');
    if (juHeun50Event && $('input[name="juHeun50Event"]').length > 0) {
        $('input[name="juHeun50Event"][value="' + juHeun50Event + '"]').prop("checked", true);
    }

    vSaleMeso = localStorage.getItem('saleMeso');
    if (vSaleMeso && $('#saleMeso').length > 0) $('#saleMeso').val(vSaleMeso);

    vDajoPrice = localStorage.getItem('dajoPrice');
    if (vDajoPrice && $('#dajoPrice').length > 0) $('#dajoPrice').val(vDajoPrice);

    vMemberCnt = localStorage.getItem('memberCnt');
    if (vMemberCnt && $('#memberCnt').length > 0) $('#memberCnt').val(vMemberCnt);
    
    vBuyMesoPrice = localStorage.getItem('buyMesoPrice');
    if (vBuyMesoPrice && $('#buyMesoPrice').length > 0) $('#buyMesoPrice').val(vBuyMesoPrice);
    
    vBuyMesoAmt = localStorage.getItem('buyMesoAmt');
    if (vBuyMesoAmt && $('#buyMesoAmt').length > 0) $('#buyMesoAmt').val(vBuyMesoAmt);
    
    vBuyMesoWon = localStorage.getItem('buyMesoWon');
    if (vBuyMesoWon && $('#buyMesoWon').length > 0) $('#buyMesoWon').val(vBuyMesoWon);
}

// 로컬 스토리지에 데이터 저장하기
function saveData() {
    localStorage.setItem('presentMeso', $("#presentMeso").val());
    localStorage.setItem('presentMepo', $("#presentMepo").val());
    localStorage.setItem('percentMVP', $("#percentMVP").val());
    localStorage.setItem('discountRate', $("#discountRate").val());
    localStorage.setItem('auctionCharge', $("input:radio[name='auctionCharge']:checked").val());

    // 페이지별 값 저장
    localStorage.setItem('juhwaVal', $("#juhwaVal").val());
    localStorage.setItem('juhwaCnt', $("#juhwaCnt").val());
    localStorage.setItem('pcFee', $("#pcFee").val());
    localStorage.setItem('pcHH', $("#pcHH").val());
    localStorage.setItem('pcMM', $("#pcMM").val());
    localStorage.setItem('piecePrice', $("#piecePrice").val());
    localStorage.setItem('pastMeso', $("#pastMeso").val());
    localStorage.setItem('itemMesoVal', $("#itemMesoVal").val());
    localStorage.setItem('juHeunPrice', $("#juHeunPrice").val());
    localStorage.setItem('azmPotionPrice', $("#azmPotionPrice").val());
    if ($('input[name="juHeun50Event"]:checked').length > 0) {
        localStorage.setItem('juHeun50Event', $('input[name="juHeun50Event"]:checked').val());
    }
    localStorage.setItem('saleMeso', $("#saleMeso").val());
    localStorage.setItem('dajoPrice', $("#dajoPrice").val());
    localStorage.setItem('memberCnt', $("#memberCnt").val());
    localStorage.setItem('buyMesoPrice', $("#buyMesoPrice").val());
    localStorage.setItem('buyMesoAmt', $("#buyMesoAmt").val());
    localStorage.setItem('buyMesoWon', $("#buyMesoWon").val());
}

// 데이터 초기화
function clearData() {
    if(!confirm("조회조건을 초기화하시겠습니까?")) return;

    localStorage.removeItem('presentMeso');
    localStorage.removeItem('presentMepo');
    localStorage.removeItem('percentMVP');
    localStorage.removeItem('discountRate');
    localStorage.removeItem('auctionCharge');
    
    // 페이지별 값 초기화
    localStorage.removeItem('juhwaVal');
    localStorage.removeItem('juhwaCnt');
    localStorage.removeItem('pcFee');
    localStorage.removeItem('pcHH');
    localStorage.removeItem('pcMM');
    localStorage.removeItem('piecePrice');
    localStorage.removeItem('pastMeso');
    localStorage.removeItem('itemMesoVal');
    localStorage.removeItem('juHeunPrice');
    localStorage.removeItem('azmPotionPrice');
    localStorage.removeItem('juHeun50Event');
    localStorage.removeItem('saleMeso');
    localStorage.removeItem('dajoPrice');
    localStorage.removeItem('memberCnt');
    localStorage.removeItem('buyMesoPrice');
    localStorage.removeItem('buyMesoAmt');
    localStorage.removeItem('buyMesoWon');
    
    firstValSetting();
    fn_collection();
    
    alert('조회조건이 초기화되었습니다.');
}

// 숫자와 콤마만 허용하는 유틸리티 함수
function onlyNumberWithComma(obj) {
    let number = obj.value;
    number = number.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
    const parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    obj.value = parts.join('.');
}

// 숫자 포맷팅 유틸리티 함수
function customFormatNumber(value) {
    if (isNaN(value) || value === null || value === '' || !isFinite(value)) return '0';

    let roundedValue = parseFloat(value).toFixed(2);
    let [integerDigits, decimalPart] = roundedValue.split('.');

    let formattedNumber = integerDigits.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    let extraText = "";
    if (Math.abs(parseInt(integerDigits)) >= 100000000) {
        let eokValue = (parseInt(integerDigits) / 100000000);
        let roundedEokValue = eokValue.toFixed(2);
        extraText = ` (약 ${roundedEokValue}억)`;
    }

    return `${formattedNumber}.${decimalPart}${extraText}`;
}