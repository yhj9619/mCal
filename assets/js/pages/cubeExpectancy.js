// 큐브 데이터 (넥슨 공식 공시 및 전문 사이트 확률 기반)
const OPTION_DETAILS = {
    "atk": { name: "공격력/마력", leg: "12%", uni: "9%" },
    "boss": { name: "보스 데미지", leg: "35/40% 합산", uni: "30%" },
    "ignore": { name: "방어율 무시", leg: "35/40% 합산", uni: "30%" },
    "stat": { name: "주스탯", leg: "12%", uni: "9%" },
    "allStat": { name: "올스탯", leg: "9%", uni: "6%" },
    "critDmg": { name: "크리티컬 데미지", leg: "8%", uni: "N/A" },
    "cooldown2": { name: "쿨타임 감소", leg: "2초", uni: "N/A" },
    "cooldown1": { name: "쿨타임 감소", leg: "1초", uni: "1초" },
    "drop": { name: "아이템 드롭률", leg: "20%", uni: "N/A" },
    "meso": { name: "메소 획득량", leg: "20%", uni: "N/A" }
};

const CUBE_DATA = {
    "weapon": {
        "atk": { "leg": 5.0, "uni": 6.25 },
        "boss": { "leg": 5.0, "uni": 6.25 },
        "ignore": { "leg": 5.0, "uni": 6.25 }
    },
    "subWeapon": {
        "atk": { "leg": 5.0, "uni": 6.25 },
        "boss": { "leg": 5.0, "uni": 6.25 },
        "ignore": { "leg": 5.0, "uni": 6.25 }
    },
    "emblem": {
        "atk": { "leg": 10.0, "uni": 10.0 },
        "ignore": { "leg": 10.0, "uni": 10.0 }
    },
    "hat": {
        "cooldown2": { "leg": 5.0, "uni": 0 },
        "cooldown1": { "leg": 10.0, "uni": 10.0 },
        "stat": { "leg": 10.0, "uni": 10.0 }
    },
    "gloves": {
        "critDmg": { "leg": 10.0, "uni": 0 },
        "stat": { "leg": 10.0, "uni": 10.0 }
    },
    "topOverall": {
        "stat": { "leg": 10.0, "uni": 10.0 },
        "allStat": { "leg": 5.0, "uni": 5.0 }
    },
    "bottom": {
        "stat": { "leg": 10.0, "uni": 10.0 },
        "allStat": { "leg": 5.0, "uni": 5.0 }
    },
    "shoesCapeShoulder": {
        "stat": { "leg": 10.0, "uni": 10.0 },
        "allStat": { "leg": 5.0, "uni": 5.0 }
    },
    "accessory": {
        "stat": { "leg": 10.0, "uni": 10.0 },
        "drop": { "leg": 10.0, "uni": 0 },
        "meso": { "leg": 10.0, "uni": 0 }
    },
    "heart": {
        "stat": { "leg": 10.0, "uni": 10.0 },
        "allStat": { "leg": 5.0, "uni": 5.0 }
    }
};

// 페이지 로드 시 초기화
$(document).ready(function() {
    updateTargetOptions();
    fn_cubeExpectancy();
});

function updateTargetOptions() {
    const category = $("#itemCategory").val();
    const selects = ["#line1Option", "#line2Option", "#line3Option"];
    
    selects.forEach((selId, index) => {
        const $sel = $(selId);
        const prevVal = $sel.val();
        $sel.empty();

        if (category === "custom") {
            $("#smartOptions").hide();
            $("#customOption").show();
        } else {
            $("#smartOptions").show();
            $("#customOption").hide();
            
            $sel.append(`<option value="any">상관없음</option>`);
            const options = CUBE_DATA[category];
            for (let optKey in options) {
                const det = OPTION_DETAILS[optKey];
                const weight = options[optKey];
                
                if (weight.leg > 0) {
                    const suffix = (index === 0) ? "" : " (레전/이탈)";
                    $sel.append(`<option value="${optKey}_leg">${det.name} ${det.leg}${suffix}</option>`);
                }
                if (index > 0 && weight.uni > 0) {
                    $sel.append(`<option value="${optKey}_uni">${det.name} ${det.uni} (유니크/정옵)</option>`);
                }
            }
        }
        if (prevVal) $sel.val(prevVal);
    });
}

function fn_cubeExpectancy() {
    const category = $("#itemCategory").val();
    const cubeKind = $("#cubeType option:selected").data("cube-kind");
    const cubeCost = Number($("#cubeType").val());
    
    let totalProb = 0;

    if (category === "custom") {
        totalProb = Number($("#targetProb").val()) / 100;
    } else {
        const lineChoices = [
            $("#line1Option").val(),
            $("#line2Option").val(),
            $("#line3Option").val()
        ];
        
        const weights = CUBE_DATA[category];
        
        let legTierProbs = [];
        let uniTierProbs = [];
        
        if (cubeKind === "black") {
            legTierProbs = [1.0, 0.2, 0.05];
            uniTierProbs = [0.0, 0.8, 0.95];
        } else {
            legTierProbs = [1.0, 0.004975, 0.004975];
            uniTierProbs = [0.0, 0.995025, 0.995025];
        }

        let p_match = [1.0, 1.0, 1.0];

        for (let i = 0; i < 3; i++) {
            const choice = lineChoices[i];
            if (choice === "any") {
                p_match[i] = 1.0;
                continue;
            }

            const [optKey, tier] = choice.split('_');
            const w = weights[optKey];

            if (!w) {
                p_match[i] = 0;
            } else {
                if (tier === "leg") {
                    p_match[i] = legTierProbs[i] * (w.leg / 100);
                } else {
                    p_match[i] = uniTierProbs[i] * (w.uni / 100);
                }
            }
        }

        totalProb = p_match[0] * p_match[1] * p_match[2];
    }

    if (totalProb <= 0) {
        $("#expectCount").text("0");
        $("#expectMeso").text("0");
        $("#expectCash").text("0");
        $("#expectMp").text("0");
        return;
    }

    const expectCount = 1 / totalProb;
    const expectMesoTotal = expectCount * cubeCost;

    const psm = Number(vPresentMeso);
    const pmp = Number(vPresentMepo);
    const cashVal = (expectMesoTotal / oneHunMil) * psm;
    const mpVal = (expectMesoTotal / oneHunMil) * pmp;

    $("#expectCount").text(Math.round(expectCount).toLocaleString());
    $("#expectMeso").html(formatResultWithWrap(expectMesoTotal));
    $("#expectCash").text(Math.round(cashVal).toLocaleString());
    $("#expectMp").text(Math.round(mpVal).toLocaleString());
}

function setProb(val) {
    $("#itemCategory").val("custom");
    updateTargetOptions();
    $("#targetProb").val(val);
    fn_cubeExpectancy();
}
