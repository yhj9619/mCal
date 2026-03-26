// 주간보스 시급계산기 - 다중 캐릭터 지원 버전 (오류 수정 및 최적화)
let bossData = [
    { name: "스우", difficulties: { "노멀": 17600000, "하드": 54200000, "익스트림": 604000000 }, maxPartySize: 2, image: "/images/boss/스우.png" },
    { name: "데미안", difficulties: { "노멀": 18400000, "하드": 51500000 }, image: "/images/boss/데미안.png" },
    { name: "가디언 엔젤 슬라임", difficulties: { "노멀": 26800000, "카오스": 79100000 }, image: "/images/boss/가디언엔젤슬라임.png" },
    { name: "루시드", difficulties: { "이지": 31400000, "노멀": 37500000, "하드": 66200000 }, image: "/images/boss/루시드.png" },
    { name: "윌", difficulties: { "이지": 34000000, "노멀": 43300000, "하드": 81200000 }, image: "/images/boss/윌.png" },
    { name: "더스크", difficulties: { "노멀": 46300000, "카오스": 73500000 }, image: "/images/boss/더스크.png" },
    { name: "듄켈", difficulties: { "노멀": 50000000, "하드": 99400000 }, image: "/images/boss/듄켈.png" },
    { name: "진 힐라", difficulties: { "노멀": 74900000, "하드": 112000000 }, image: "/images/boss/진힐라.png" },
    { name: "선택받은 세렌", difficulties: { "노멀": 266000000, "하드": 396000000, "익스트림": 3150000000 }, image: "/images/boss/세렌.png" },
    { name: "감시자 칼로스", difficulties: { "이지": 311000000, "노멀": 561000000, "카오스": 1340000000, "익스트림": 4320000000 }, image: "/images/boss/칼로스.png" },
    { name: "최초의 대적자", difficulties: { "이지": 324000000, "노멀": 589000000, "하드": 1510000000, "익스트림": 4960000000 }, maxPartySize: 3, image: "/images/boss/최초의대적자.png" },
    { name: "카링", difficulties: { "이지": 419000000, "노멀": 714000000, "하드": 1830000000, "익스트림": 5670000000 }, image: "/images/boss/카링.png" },
    { name: "찬란한 흉성", difficulties: { "노멀": 658000000, "하드": 2819000000 }, maxPartySize: 3, image: "/images/boss/찬란한흉성.png" },
    { name: "림보", difficulties: { "노멀": 1080000000, "하드": 2510000000 }, maxPartySize: 3, image: "/images/boss/림보.png" },
    { name: "발드릭스", difficulties: { "노멀": 1440000000, "하드": 3240000000 }, maxPartySize: 3, image: "/images/boss/발드릭스.png" },
    { name: "유피테르", difficulties: { "노멀": 1700000000, "하드": 5100000000 }, maxPartySize: 3, image: "/images/boss/유피테르.png" }
];

let mCalData = {
    characters: [],
    activeIndex: 0
};

function run_page_calculations() {
    loadData();
    renderTabs();
    renderBossList();
    updateUI();
}

function loadData() {
    const saved = localStorage.getItem('mCal_weeklyBoss_v2');
    if (saved) {
        mCalData = JSON.parse(saved);
    } else {
        addNewCharacter(false);
    }
}

function saveData() {
    localStorage.setItem('mCal_weeklyBoss_v2', JSON.stringify(mCalData));
    updateUI();
}

function addNewCharacter(shouldSave = true) {
    const newChar = {
        nickname: "신규 캐릭터 " + (mCalData.characters.length + 1),
        selectedBosses: [],
        bossConfigs: {}
    };
    
    bossData.forEach((boss, idx) => {
        newChar.bossConfigs[idx] = {
            difficulty: Object.keys(boss.difficulties).reverse()[0],
            partySize: 1,
            actualTime: 30
        };
    });

    mCalData.characters.push(newChar);
    mCalData.activeIndex = mCalData.characters.length - 1;
    
    if (shouldSave) {
        saveData();
        renderTabs();
        renderBossList();
    }
}

function deleteCharacter(index, event) {
    if (event) event.stopPropagation();
    if (mCalData.characters.length <= 1) {
        alert("최소 한 개의 캐릭터는 있어야 합니다.");
        return;
    }
    if (confirm(`'${mCalData.characters[index].nickname}' 캐릭터를 삭제하시겠습니까?`)) {
        mCalData.characters.splice(index, 1);
        if (mCalData.activeIndex >= mCalData.characters.length) {
            mCalData.activeIndex = mCalData.characters.length - 1;
        }
        saveData();
        renderTabs();
        renderBossList();
    }
}

function switchCharacter(index) {
    mCalData.activeIndex = index;
    saveData();
    renderTabs();
    renderBossList();
    updateUI(); // 행 내부 수치를 즉시 다시 계산하여 채움
}

function updateNickname(val) {
    mCalData.characters[mCalData.activeIndex].nickname = val;
    saveData();
    renderTabs();
}

function renderTabs() {
    const tabContainer = $('#character-tabs');
    tabContainer.find('.char-tab').remove();
    
    mCalData.characters.forEach((char, idx) => {
        const isActive = idx === mCalData.activeIndex;
        const tab = $(`
            <div class="char-tab ${isActive ? 'active' : ''}" onclick="switchCharacter(${idx})">
                <span class="tab-text">${char.nickname}</span>
                <button class="delete-char-btn" onclick="deleteCharacter(${idx}, event)">×</button>
            </div>
        `);
        tabContainer.find('.add-char-btn').before(tab);
    });

    $('#char-nickname').val(mCalData.characters[mCalData.activeIndex].nickname);
}

function renderBossList() {
    const container = $('#boss-list-container');
    container.empty();
    
    const currentChar = mCalData.characters[mCalData.activeIndex];

    bossData.forEach((boss, index) => {
        const config = currentChar.bossConfigs[index];
        const isSelected = currentChar.selectedBosses.includes(index);
        
        let difficultyOptions = Object.keys(boss.difficulties).map(d => 
            `<option value="${d}" ${config.difficulty === d ? 'selected' : ''}>${d}</option>`
        ).join('');
        
        let maxParty = boss.maxPartySize || 6;
        let partyOptions = '';
        for (let i = 1; i <= maxParty; i++) {
            partyOptions += `<option value="${i}" ${config.partySize == i ? 'selected' : ''}>${i}인</option>`;
        }

        let bossRow = `
            <div class="boss-row ${isSelected ? 'selected' : ''}" data-boss-index="${index}" style="--boss-bg: url('${boss.image}')">
                <span class="boss-name">
                    <img src="${boss.image}" class="boss-icon" alt="${boss.name}" onerror="this.style.display='none'">
                    ${boss.name}
                </span>
                <span class="boss-difficulty">
                    <select onchange="updateBossConfig(${index}, 'difficulty', this.value)">${difficultyOptions}</select>
                </span>
                <span class="party-size-per-boss">
                    <select onchange="updateBossConfig(${index}, 'partySize', this.value)">${partyOptions}</select>
                </span>
                <span class="crystal-price" id="per-person-meso-${index}">0</span>
                <span class="clear-time-per-boss" id="clear-time-${index}">0</span>
                <span class="actual-clear-time">
                    <input type="number" value="${config.actualTime}" onchange="updateBossConfig(${index}, 'actualTime', this.value)" placeholder="분">
                </span>
                <span class="hourly-rate-won" id="hourly-rate-${index}">0</span>
            </div>
        `;
        container.append(bossRow);
    });

    // 이벤트 위임 방식으로 변경 (더 안정적)
    container.off('click', '.boss-row').on('click', '.boss-row', function(e) {
        if ($(e.target).is('select, input, option')) return;
        
        const idx = $(this).data('boss-index');
        const selectedIdx = currentChar.selectedBosses.indexOf(idx);
        
        if (selectedIdx > -1) {
            currentChar.selectedBosses.splice(selectedIdx, 1);
            $(this).removeClass('selected');
        } else {
            if (currentChar.selectedBosses.length >= 12) {
                alert('캐릭터당 최대 12개까지 선택 가능합니다.');
                return;
            }
            currentChar.selectedBosses.push(idx);
            $(this).addClass('selected');
        }
        saveData(); // saveData 내부에서 updateUI 호출함
    });
}

function updateBossConfig(bossIdx, key, val) {
    const currentChar = mCalData.characters[mCalData.activeIndex];
    if (key === 'partySize' || key === 'actualTime') {
        val = parseInt(val) || 0;
    }
    currentChar.bossConfigs[bossIdx][key] = val;
    saveData();
}

function updateUI() {
    // 전역 변수가 정의되지 않았을 경우를 대비한 방어 로직
    const currentMeso = typeof vPresentMeso !== 'undefined' ? Number(String(vPresentMeso).replace(/,/g, '')) : 0;
    const currentMepo = typeof vPresentMepo !== 'undefined' ? Number(String(vPresentMepo).replace(/,/g, '')) : 0;
    const oneHunMilValue = typeof oneHunMil !== 'undefined' ? oneHunMil : 100000000;

    const MINIMUM_WAGE_PER_HOUR = 10320;
    const MINIMUM_WAGE_PER_MINUTE = MINIMUM_WAGE_PER_HOUR / 60;
    
    let accountTotalMeso = 0;
    let accountTotalMinutes = 0;

    mCalData.characters.forEach((char, charIdx) => {
        let charMeso = 0;
        let charMinutes = 0;

        bossData.forEach((boss, bIdx) => {
            const config = char.bossConfigs[bIdx];
            const price = boss.difficulties[config.difficulty];
            const perPersonMeso = price / config.partySize;
            const perPersonWon = (perPersonMeso / oneHunMilValue) * currentMeso;

            // 현재 활성화된 캐릭터의 행 UI만 업데이트
            if (charIdx === mCalData.activeIndex) {
                $(`#per-person-meso-${bIdx}`).text(Math.floor(perPersonMeso).toLocaleString());
                let maxTime = (perPersonWon > 0) ? perPersonWon / MINIMUM_WAGE_PER_MINUTE : 0;
                $(`#clear-time-${bIdx}`).text(Math.floor(maxTime));
                
                if (config.actualTime > 0) {
                    let hourly = (perPersonWon / config.actualTime) * 60;
                    $(`#hourly-rate-${bIdx}`).text(Math.floor(hourly).toLocaleString());
                } else {
                    $(`#hourly-rate-${bIdx}`).text('0');
                }
            }

            if (char.selectedBosses.includes(bIdx)) {
                charMeso += perPersonMeso;
                charMinutes += config.actualTime;
            }
        });

        if (charIdx === mCalData.activeIndex) {
            $('#selected-boss-count').text(`${char.selectedBosses.length} / 12`);
            $('#weekly-profit').text(`${Math.floor(charMeso).toLocaleString()} 메소`);
            
            // 현금 및 메포 계산 추가
            let charWon = (charMeso / oneHunMilValue) * currentMeso;
            let charMepo = (charMeso / oneHunMilValue) * currentMepo;
            $('#weekly-profit-won-val').text(`${Math.floor(charWon).toLocaleString()} 원`);
            $('#weekly-profit-mepo-val').text(`${Math.floor(charMepo).toLocaleString()} p`);

            $('#total-clear-time-hours').text(`${charMinutes}분 (${(charMinutes / 60).toFixed(1)}시간)`);
            
            let charHourly = (charMinutes > 0) ? charWon / (charMinutes / 60) : 0;
            $('#total-weekly-hourly-wage').text(`${Math.floor(charHourly).toLocaleString()} 원`);
        }

        accountTotalMeso += charMeso;
        accountTotalMinutes += charMinutes;
    });

    $('#total-char-count').text(`${mCalData.characters.length}`);
    $('#account-total-profit').text(`${Math.floor(accountTotalMeso).toLocaleString()} 메소`);
    
    // 계정 합계 현금 및 메포 계산 추가
    let accountWon = (accountTotalMeso / oneHunMilValue) * currentMeso;
    let accountMepo = (accountTotalMeso / oneHunMilValue) * currentMepo;
    $('#account-total-profit-won-val').text(`${Math.floor(accountWon).toLocaleString()} 원`);
    $('#account-total-profit-mepo-val').text(`${Math.floor(accountMepo).toLocaleString()} p`);

    $('#account-total-time').text(`${accountTotalMinutes}분 (${(accountTotalMinutes / 60).toFixed(1)}시간)`);
    
    let accountHourly = (accountTotalMinutes > 0) ? accountWon / (accountTotalMinutes / 60) : 0;
    $('#account-hourly-wage').text(`${Math.floor(accountHourly).toLocaleString()} 원`);
}

function copyWeeklyBossResult() {
    const currentChar = mCalData.characters[mCalData.activeIndex];
    let text = `[메산기 주간보스 시급 결과]\n`;
    text += `캐릭터: ${currentChar.nickname}\n`;
    text += `선택보스: ${$('#selected-boss-count').text()}\n`;
    text += `메소수익: ${$('#weekly-profit').text()}\n`;
    text += `현금수익: ${$('#weekly-profit-won-val').text()}\n`;
    text += `메포수익: ${$('#weekly-profit-mepo-val').text()}\n`;
    text += `소요시간: ${$('#total-clear-time-hours').text()}\n`;
    text += `시급환산: ${$('#total-weekly-hourly-wage').text()}\n`;
    
    text += `\n--------------계정 합계--------------\n`;
    text += `총 캐릭터: ${$('#total-char-count').text()}명\n`;
    text += `총 메소수익: ${$('#account-total-profit').text()}\n`;
    text += `총 현금수익: ${$('#account-total-profit-won-val').text()}\n`;
    text += `총 메포수익: ${$('#account-total-profit-mepo-val').text()}\n`;
    text += `총 소요시간: ${$('#account-total-time').text()}\n`;
    text += `계정 시급: ${$('#account-hourly-wage').text()}\n`;
    
    text += `\n--------------시세 기준--------------\n`;
    text += `1억당 ${vPresentMeso}원 / ${vPresentMepo}메포`;

    navigator.clipboard.writeText(text).then(() => {
        alert("주간보스 계산 결과가 복사되었습니다.");
    });
}
