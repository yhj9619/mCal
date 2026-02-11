// MVP 비용 계산기 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    fn_mvpCost();

    // 이 페이지에만 해당하는 입력 필드에 대한 이벤트 리스너 추가
    $("#cachePrice, #mvpCache, #mvpSaleMeso").on("keyup change", fn_mvpCost);
}

// MVP 비용 관련 계산 로직
function fn_mvpCost(){
    var vPresentMesoInMesoMarket = Number(vPresentMeso.replace(/,/g, ''));

    // mvpCost와 selfMVPReturn 재계산 (fn_mesoMarket에 있던 로직)
    var mvpCost = tenThsd * (discountRate - vPresentMesoInMesoMarket / vPresentMepo);
    var selfMVPReturn = tenThsd / vPresentMepo * vPresentMesoInMesoMarket;
    
    var mvpLowestPrice = 0;
    var mvpLowestMethod = "";
    
    $("#mvpPriceParam1").html(customFormatNumber(tenThsd * discountRate - vPercentMVP));
    $("#mvpPriceParam2").html(customFormatNumber(mvpCost));
    if(selfMVPReturn > vPercentMVP){
        $("#mvpPriceResult").text("직작하세요.");
        mvpLowestPrice = mvpCost;
        mvpLowestMethod = "메소마켓 판매식";
    }else{
        $("#mvpPriceResult").text("선물식으로 "+vPercentMVP+":1에 파세요.");
        mvpLowestPrice = tenThsd*discountRate - vPercentMVP;
        mvpLowestMethod = "선물식";
    }
    
    var cachePrice = $("#cachePrice").val().replace(/,/g, '');
    var mvpAutcionPrice = 0;
    var tenThsdByAuctionCost = 0;

    if(cachePrice > 0){
        mvpAutcionPrice = (Math.ceil(((cachePrice * (discountRate - mvpLowestPrice / tenThsd)) / (auctionRate * vPresentMesoInMesoMarket)) * 100)) / 100;
        tenThsdByAuctionCost = (cachePrice * discountRate - mvpAutcionPrice * auctionRate * vPresentMesoInMesoMarket) * tenThsd / cachePrice;
    }
    
    $("#minAucionParam1").html(customFormatNumber(mvpAutcionPrice));
    $("#minAucionParam2").html(customFormatNumber(tenThsdByAuctionCost));  

    var mvpCache = $("#mvpCache").val().replace(/,/g, '');
    var mvpSaleMeso = $("#mvpSaleMeso").val().replace(/,/g, '');

    $("#auctionProfitParam1").text(0);
    $("#auctionProfitParam2").text(0);

    if(mvpCache!= "" && mvpCache != null && mvpSaleMeso != "" && mvpSaleMeso != null){
        var mvpAuctionPNL = mvpCache * discountRate - mvpSaleMeso * auctionRate * vPresentMesoInMesoMarket;
        var mvpAuctionPNLPerTenThsd = mvpAuctionPNL / mvpCache * tenThsd;
        var mvpAuctionPNLTxt= "";

        if(mvpAuctionPNL >=0){
            mvpAuctionPNLTxt = customFormatNumber(mvpAuctionPNL)+"원 손해";
            $("#auctionProfitParam1").html(mvpAuctionPNLTxt).css({
                "color": "blue",
                "font-weight": "bold"
            });
            $("#auctionProfitParam2").html(customFormatNumber(mvpAuctionPNLPerTenThsd)).css({
                "color": "blue",
                "font-weight": "bold"
            });
        }else{
            mvpAuctionPNLTxt = customFormatNumber(mvpAuctionPNL*-1)+"원 이득";
            $("#auctionProfitParam1").html(mvpAuctionPNLTxt).css({
                "color": "red",
                "font-weight": "bold"
            });
            $("#auctionProfitParam2").html(customFormatNumber(mvpAuctionPNLPerTenThsd*-1)).css({
                "color": "red",
                "font-weight": "bold"
            });
        }
    }
}
