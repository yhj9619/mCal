// 큐브 데이터 (넥슨 공식 공시 및 전문 사이트 확률 기반)
const OPTION_DETAILS = {
    "atk": "공격력/마력",
    "dmg": "데미지",
    "boss": "보스 데미지",
    "ignore": "방어율 무시",
    "stat": "주스탯",
    "allStat": "올스탯",
    "criDmg": "크리티컬 데미지",
    "cooldown": "쿨타임 감소",
    "drop": "아이템 드롭률",
    "meso": "메소 획득량"
};

const ITEM_DETAILS = {
    "weapon": "무기",
    "emblem": "엠블렘",
    "subWeapon": "보조무기",
    "hat": "모자",
    "gloves": "장갑",
    "shoes": "신발",
    "capeShoulderBelt": "망토/어깨/벨트",
    "top": "상의",
    "bottom": "하의",
    "accessory": "악세서리",
    "heart": "하트"
}

const normal_figures_120_200 = {
    leg: {
        "atk": { "max": 12 },
        "dmg": { "max": 12 },
        "boss": { "min": 35, "max": 40 },
        "ignore": { "min": 35, "max": 40 },
        "criDmg": { "max": 8 },
        "cooldown": { "min": 1, "max": 2 },
        "stat": { "max": 12 },
        "allStat": { "max": 9 },
        "drop": { "max": 20 },
        "meso": { "max": 20 }
    },
    uni: {
        "atk": { "max": 9 },
        "dmg": { "max": 9 },
        "boss": { "max": 30 },
        "ignore": { "max": 30 },
        "stat": { "max": 9 },
        "allStat": { "max": 6 }
    }
}

const normal_figures_201_250 = {
    leg: {
        "atk": { "max": 13 },
        "dmg": { "max": 13 },
        "boss": { "min": 40, "max": 45 },
        "ignore": { "min": 40, "max": 45 },
        "criDmg": { "max": 8 },
        "cooldown": { "min": 1, "max": 2 },
        "stat": { "max": 13 },
        "allStat": { "max": 10 },
        "drop": { "max": 20 },
        "meso": { "max": 20 }
    },
    uni: {
        "atk": { "max": 10 },
        "dmg": { "max": 10 },
        "boss": { "max": 35 },
        "ignore": { "max": 35 },
        "stat": { "max": 10 },
        "allStat": { "max": 7 }
    }
}

const additional_figures_120_200 = {
    leg: {
        "atk": { "max": 12 },
        "dmg": { "max": 12 },
        "boss": { "max": 18 },
        "ignore": { "max": 5 },
        "criDmg": { "max": 1, "max": 3 },
        "cooldown": { "min": 1, "max": 2 },
        "stat": { "max": 8 },
        "allStat": { "max": 6 },
        "drop": { "max": 5 },
        "meso": { "max": 5 }
    },
    uni: {
        "atk": { "max": 9 },
        "dmg": { "max": 9 },
        "boss": { "max": 12 },
        "ignore": { "max": 4 },
        "stat": { "max": 6 },
        "allStat": { "max": 5 }
    }
}

const additional_figures_201_250 = {
    leg: {
        "atk": { "max": 13 },
        "dmg": { "max": 13 },
        "boss": { "max": 20 },
        "ignore": { "max": 7 },
        "criDmg": { "max": 1, "max": 3 },
        "cooldown": { "min": 1, "max": 2 },
        "stat": { "max": 9 },
        "allStat": { "max": 7 },
        "drop": { "max": 5 },
        "meso": { "max": 5 }
    },
    uni: {
        "atk": { "max": 10 },
        "dmg": { "max": 10 },
        "boss": { "max": 14 },
        "ignore": { "max": 6 },
        "stat": { "max": 7 },
        "allStat": { "max": 6 }
    }
}

const legGrade = {
    "weapon": {
        "1": { leg: { "atk": { "max": 4.8780 }, "dmg": { "max": 4.8780 }, "boss": { "min": 9.7561, "max": 4.8780 }, "ignore": { "min": 4.8780, "max": 4.8780 } } },
        "2": { 
            leg: { "atk": { "max": 0.9756 }, "dmg": { "max": 0.9756 }, "boss": { "min": 1.9512, "max": 0.9756 }, "ignore": { "min": 0.9756, "max": 0.9756 } },
            uni: { "atk": { "max": 5.5814 }, "dmg": { "max": 5.5814 }, "boss": { "max": 5.5814 }, "ignore": { "max": 5.5814 } }
        },
        "3": { 
            leg: { "atk": { "max": 0.2439 }, "dmg": { "max": 0.2439 }, "boss": { "min": 0.4878, "max": 0.2439 }, "ignore": { "min": 0.2439, "max": 0.2439 } },
            uni: { "atk": { "max": 6.6279 }, "dmg": { "max": 6.6279 }, "boss": { "max": 6.6279 }, "ignore": { "max": 6.6279 } }
        }
    },
    "emblem": {
        "1": { leg: { "atk": { "max": 5.7143 }, "dmg": { "max": 5.7143 }, "ignore": { "min": 5.7143, "max": 5.7143 } } },
        "2": { 
            leg: { "atk": { "max": 1.1429 }, "dmg": { "max": 1.1429 }, "ignore": { "min": 1.1429, "max": 1.1429 } },
            uni: { "atk": { "max": 6 }, "dmg": { "max": 6 }, "ignore": { "max": 6 } }
        },
        "3": { 
            leg: { "atk": { "max": 0.2857 }, "dmg": { "max": 0.2857 }, "ignore": { "min": 0.2857, "max": 0.2857 } },
            uni: { "atk": { "max": 7.1250 }, "dmg": { "max": 7.1250 }, "ignore": { "max": 7.1250 } }
        }
    },
    "subWeapon": {
        "1": { leg: { "atk": { "max": 4.2553 }, "dmg": { "max": 4.2553 }, "boss": { "min": 8.5106, "max": 4.2553 }, "ignore": { "min": 4.2553, "max": 4.2553 } } },
        "2": { 
            leg: { "atk": { "max": 0.8511 }, "dmg": { "max": 0.8511 }, "boss": { "min": 1.9512, "max": 0.8511 }, "ignore": { "min": 0.8511, "max": 0.8511 } },
            uni: { "atk": { "max": 4.7059 }, "dmg": { "max": 4.7059 }, "boss": { "max": 4.7059 }, "ignore": { "max": 4.7059 } }
        },
        "3": { 
            leg: { "atk": { "max": 0.2128 }, "dmg": { "max": 0.2128 }, "boss": { "min": 0.4255, "max": 0.2128 }, "ignore": { "min": 0.2128, "max": 0.2128 } },
            uni: { "atk": { "max": 5.5882 }, "dmg": { "max": 5.5882 }, "boss": { "max": 5.5882 }, "ignore": { "max": 5.5882 } }
        }
    },
    "hat": {
        "1": { leg: { "cooldown": { "min": 7.3171, "max": 4.8780 }, "stat": { "max": 9.7561 }, "allStat": { "max": 7.3171 } } },
        "2": { 
            leg: { "cooldown": { "min": 1.4634, "max": 0.9756 }, "stat": { "max": 1.9512 }, "allStat": { "max": 1.4634 } },
            uni: { "stat": { "max": 7.6923 }, "allStat": { "max": 6.1538 } }
        },
        "3": { 
            leg: { "cooldown": { "min": 0.3659, "max": 0.2439 }, "stat": { "max": 0.4878 }, "allStat": { "max": 0.3659 } },
            uni: { "stat": { "max": 9.1346 }, "allStat": { "max": 7.3077 } }
        }
    },
    "gloves": {
        "1": { leg: { "criDmg": { "max": 10 }, "stat": { "max": 10 }, "allStat": { "max": 7.5 } } },
        "2": { 
            leg: { "criDmg": { "max": 2.0000 }, "stat": { "max": 2.0000 }, "allStat": { "max": 1.5000 } },
            uni: { "stat": { "max": 7.1429 }, "allStat": { "max": 5.7143 } }
        },
        "3": { 
            leg: { "criDmg": { "max": 0.5000 }, "stat": { "max": 0.5000 }, "allStat": { "max": 0.3750 } },
            uni: { "stat": { "max": 8.4821 }, "allStat": { "max": 6.7857 } }
        }
    },
    "shoes": {
        "1": { leg: { "stat": { "max": 11.1111 }, "allStat": { "max": 8.3333 } } },
        "2": { 
            leg: { "stat": { "max": 2.2222 }, "allStat": { "max": 1.6667 } },
            uni: { "stat": { "max": 7.6923 }, "allStat": { "max": 6.1538 } }
        },
        "3": { 
            leg: { "stat": { "max": 0.5556 }, "allStat": { "max": 0.4167 } },
            uni: { "stat": { "max": 9.1346 }, "allStat": { "max": 7.3077 } }
        }
    },
    "capeShoulderBelt": {
        "1": { leg: { "stat": { "max": 12.1212 }, "allStat": { "max": 9.09091 } } },
        "2": { 
            leg: { "stat": { "max": 2.4242 }, "allStat": { "max": 1.8182 } },
            uni: { "stat": { "max": 8.3333 }, "allStat": { "max": 6.6667 } }
        },
        "3": { 
            leg: { "stat": { "max": 0.6061 }, "allStat": { "max": 0.4545 } },
            uni: { "stat": { "max": 9.8958 }, "allStat": { "max": 7.9167 } }
        }
    },
    "top": {
        "1": { leg: { "stat": { "max": 10.2564 }, "allStat": { "max": 7.6923 } } },
        "2": { 
            leg: { "stat": { "max": 2.05128 }, "allStat": { "max": 1.5385 } },
            uni: { "stat": { "max": 6.4516 }, "allStat": { "max": 5.1613 } }
        },
        "3": { 
            leg: { "stat": { "max": 0.5128 }, "allStat": { "max": 0.3846 } },
            uni: { "stat": { "max": 7.6613 }, "allStat": { "max": 6.1290 } }
        }
    },
    "bottom": {
        "1": { leg: { "stat": { "max": 12.1212 }, "allStat": { "max": 9.09091 } } },
        "2": { 
            leg: { "stat": { "max": 2.4242 }, "allStat": { "max": 1.8182 } },
            uni: { "stat": { "max": 7.6923 }, "allStat": { "max": 6.1538 } }
        },
        "3": { 
            leg: { "stat": { "max": 0.6061 }, "allStat": { "max": 0.4545 } },
            uni: { "stat": { "max": 9.1346 }, "allStat": { "max": 7.3077 } }
        }
    },
    "accessory": {
        "1": { leg: { "drop": { "max": 7.6923 }, "meso": { "max": 7.6923 }, "stat": { "max": 10.2567 }, "allStat": { "max": 7.6923 } } },
        "2": { 
            leg: { "drop": { "max": 1.5385 }, "meso": { "max": 1.5385 }, "stat": { "max": 2.05128 }, "allStat": { "max": 1.5385 } },
            uni: { "stat": { "max": 10 }, "allStat": { "max": 8.0000 } }
        },
        "3": { 
            leg: { "drop": { "max": 0.3846 }, "meso": { "max": 0.3846 }, "stat": { "max": 0.5128 }, "allStat": { "max": 0.3846 } },
            uni: { "stat": { "max": 11.8750 }, "allStat": { "max": 9.5000 } }
        }
    },
    "heart": {
        "1": { leg: { "stat": { "max": 14.8148 }, "allStat": { "max": 11.1111 } } },
        "2": { 
            leg: { "stat": { "max": 2.9630 }, "allStat": { "max": 2.2222 } },
            uni: { "stat": { "max": 10 }, "allStat": { "max": 8.0000 } }
        },
        "3": { 
            leg: { "stat": { "max": 0.7407 }, "allStat": { "max": 0.5556 } },
            uni: { "stat": { "max": 11.8750 }, "allStat": { "max": 9.5000 } }
        }
    }
};

const CATEGORY_MAP = {
    "weapon": "weapon",
    "subWeapon": "subWeapon",
    "emblem": "emblem",
    "hat": "hat",
    "gloves": "gloves",
    "topOverall": "top",
    "bottom": "bottom",
    "shoesCapeShoulder": "capeShoulderBelt",
    "accessory": "accessory",
    "heart": "heart"
};

$(document).ready(function () {
    updateTargetOptions();
    fn_cubeExpectancy();
});

function run_page_calculations() {
    fn_cubeExpectancy();
}

function updateTargetOptions() {
    const htmlCategory = $("#itemCategory").val();
    const selects = ["#line1Option", "#line2Option", "#line3Option"];

    if (htmlCategory === "custom") {
        $("#smartOptions").hide();
        $("#customOption").show();
        return;
    }

    $("#smartOptions").show();
    $("#customOption").hide();

    const category = CATEGORY_MAP[htmlCategory];
    const itemData = legGrade[category];
    const cubeTypeVal = Number($("#cubeType").val());
    
    // 사용자가 제공한 두 가지 범위만 사용 (Lv.200 이상은 모두 figures_201_250 적용)
    let figures = figures_120_200;
    if (cubeTypeVal >= 5400000) figures = figures_201_250;

    selects.forEach((selId, index) => {
        const $sel = $(selId);
        const prevVal = $sel.val();
        $sel.empty();

        $sel.append(`<option value="any">상관없음</option>`);

        const lineData = itemData[(index + 1).toString()];

        if (lineData.leg) {
            for (let optKey in lineData.leg) {
                const optName = OPTION_DETAILS[optKey];
                const optWeights = lineData.leg[optKey];

                for (let weightKey in optWeights) {
                    let valDisplay = "";
                    if (weightKey === "max") valDisplay = figures.leg[optKey].max;
                    else if (weightKey === "min") valDisplay = figures.leg[optKey].min;
                    
                    if (optKey === "cooldown") valDisplay += "초";
                    else valDisplay += "%";

                    $sel.append(`<option value="${optKey}_leg_${weightKey}">${optName} ${valDisplay} (레전)</option>`);
                }
            }
        }

        if (index > 0 && lineData.uni) {
            for (let optKey in lineData.uni) {
                const optName = OPTION_DETAILS[optKey];
                const valDisplay = figures.uni[optKey].max + "%";
                $sel.append(`<option value="${optKey}_uni_max">${optName} ${valDisplay} (유니크)</option>`);
            }
        }

        if (prevVal) $sel.val(prevVal);
    });
}

function fn_cubeExpectancy() {
    const htmlCategory = $("#itemCategory").val();
    const cubeCost = Number($("#cubeType").val());
    
    let totalProb = 0;

    if (htmlCategory === "custom") {
        totalProb = Number($("#targetProb").val()) / 100;
    } else {
        const category = CATEGORY_MAP[htmlCategory];
        const itemData = legGrade[category];
        const lineChoices = [
            $("#line1Option").val(),
            $("#line2Option").val(),
            $("#line3Option").val()
        ];

        let p_match = [1.0, 1.0, 1.0];

        for (let i = 0; i < 3; i++) {
            const choice = lineChoices[i];
            if (choice === "any") {
                p_match[i] = 1.0;
                continue;
            }

            const [optKey, tier, weightKey] = choice.split('_');
            const lineData = itemData[(i + 1).toString()];
            
            if (lineData[tier] && lineData[tier][optKey]) {
                p_match[i] = lineData[tier][optKey][weightKey || "max"] / 100;
            } else {
                p_match[i] = 0;
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
