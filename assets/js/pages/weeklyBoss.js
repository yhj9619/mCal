// 주간보스 시급계산기 - 다중 캐릭터 지원 버전
let bossData = [
    { name: "스우", difficulties: { "노멀": 17600000, "하드": 54200000, "익스트림": 604000000 }, maxPartySize: 2 },
    { name: "데미안", difficulties: { "노멀": 18400000, "하드": 51500000 } },
    { name: "가디언 엔젤 슬라임", difficulties: { "노멀": 26800000, "카오스": 79100000 } },
    { name: "루시드", difficulties: { "이지": 31400000, "노멀": 37500000, "하드": 66200000 } },
    { name: "윌", difficulties: { "이지": 34000000, "노멀": 43300000, "하드": 81200000 } },
    { name: "더스크", difficulties: { "노멀": 46300000, "카오스": 73500000 } },
    { name: "듄켈", difficulties: { "노멀": 50000000, "하드": 99400000 } },
    { name: "진 힐라", difficulties: { "노멀": 74900000, "하드": 112000000 } },
    { name: "선택받은 세렌", difficulties: { "노멀": 266000000, "하드": 396000000, "익스트림": 3150000000 } },
    { name: "감시자 칼로스", difficulties: { "이지": 311000000, "노멀": 561000000, "카오스": 1340000000, "익스트림": 4320000000 } },
    { name: "최초의 대적자", difficulties: { "이지": 324000000, "노멀": 589000000, "하드": 1510000000, "익스트림": 4960000000 }, maxPartySize: 3  },
    { name: "카링", difficulties: { "이지": 419000000, "노멀": 714000000, "하드": 1830000000, "익스트림": 5670000000 } },
    { name: "찬란한 흉성", difficulties: { "노멀": 658000000, "하드": 2819000000 }, maxPartySize: 3 },
    { name: "림보", difficulties: { "노멀": 1080000000, "하드": 2510000000 }, maxPartySize: 3 },
    { name: "발드릭스", difficulties: { "노멀": 1440000000, "하드": 3240000000 }, maxPartySize: 3 },
    { name: "유피테르", difficulties: { "노멀": 1700000000, "하드": 5100000000 }, maxPartySize: 3 }
];

let mCalData = {
    characters: [],
    activeIndex: 0
};

function run_page_calculations() {
    loadData();
    renderBossList();
    renderTabs();
    updateUI();
}

// 데이터 로드
function loadData() {
    const saved = localStorage.getItem('mCal_weeklyBoss_v2');
    if (saved) {
        mCalData = JSON.parse(saved);
    } else {
        // 데이터가 없으면 초기 캐릭터 생성
        addNewCharacter(false);
    }
}

// 데이터 저장
function saveData() {
    localStorage.setItem('mCal_weeklyBoss_v2', JSON.stringify(mCalData));
    updateUI();
}

// 캐릭터 추가
function addNewCharacter(shouldSave = true) {
    const newChar = {
        nickname: "신규 캐릭터 " + (mCalData.characters.length + 1),
        selectedBosses: [],
        bossConfigs: {} // { bossIndex: { difficulty, partySize, actualTime } }
    };
    
    // 기본 설정값 채우기
    bossData.forEach((boss, idx) => {
        newChar.bossConfigs[idx] = {
            difficulty: Object.keys(boss.difficulties).reverse()[0], // 높은 난이도 기본
            partySize: 1,
            actualTime: 30
        };
    });

    mCalData.characters.push(newChar);
    mCalData.activeIndex = mCalData.characters.length - 1;
    
    if (shouldSave) {
        saveData();
        renderBossList();
        renderTabs();
    }
}

// 캐릭터 삭제
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
        renderBossList();
        renderTabs();
    }
}

// 캐릭터 전환
function switchCharacter(index) {
    mCalData.activeIndex = index;
    saveData();
    renderBossList();
    renderTabs();
}

// 닉네임 수정
function updateNickname(val) {
    mCalData.characters[mCalData.activeIndex].nickname = val;
    saveData();
    renderTabs();
}

// 탭 렌더링
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

// 보스 목록 렌더링
function renderBossList() {
    const container = $('#boss-list-container');
    container.empty();
    
    const currentChar = mCalData.characters[mCalData.activeIndex];

    bossData.forEach((boss, index) => {
        const config = currentChar.bossConfigs[index];
        const isSelected = currentChar.selectedBosses.includes(index);
        
        let difficultyOptions = Object.keys(boss.difficulties).reverse().map(d => 
            `<option value="${d}" ${config.difficulty === d ? 'selected' : ''}>${d}</option>`
        ).join('');
        
        let maxParty = boss.maxPartySize || 6;
        let partyOptions = '';
        for (let i = 1; i <= maxParty; i++) {
            partyOptions += `<option value="${i}" ${config.partySize == i ? 'selected' : ''}>${i}인</option>`;
        }

        let bossRow = `
            <div class="boss-row ${isSelected ? 'selected' : ''}" data-boss-index="${index}">
                <span class="boss-name">${boss.name}</span>
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

    // 행 클릭 이벤트
    container.off('click', '.boss-row').on('click', '.boss-row', function(e) {
        if ($(e.target).is('select, input, option')) return;
        
        const idx = $(this).data('boss-index');
        const selectedIdx = currentChar.selectedBosses.indexOf(idx);
        
        if (selectedIdx > -1) {
            currentChar.selectedBosses.splice(selectedIdx, 1);
        } else {
            if (currentChar.selectedBosses.length >= 12) {
                alert('캐릭터당 최대 12개까지 선택 가능합니다.');
                return;
            }
            currentChar.selectedBosses.push(idx);
        }
        saveData();
        renderBossList();
    });
}

// 보스 설정 업데이트
function updateBossConfig(bossIdx, key, val) {
    const currentChar = mCalData.characters[mCalData.activeIndex];
    if (key === 'partySize' || key === 'actualTime') {
        val = parseInt(val) || 0;
    }
    currentChar.bossConfigs[bossIdx][key] = val;
    saveData();
}

// UI 업데이트 및 계산
function updateUI() {
    const MINIMUM_WAGE_PER_HOUR = 10320;
    const MINIMUM_WAGE_PER_MINUTE = MINIMUM_WAGE_PER_HOUR / 60;
    
    let accountTotalMeso = 0;
    let accountTotalMinutes = 0;

    // 모든 캐릭터 순회하며 계산
    mCalData.characters.forEach((char, charIdx) => {
        let charMeso = 0;
        let charMinutes = 0;

        bossData.forEach((boss, bIdx) => {
            const config = char.bossConfigs[bIdx];
            const price = boss.difficulties[config.difficulty];
            const perPersonMeso = price / config.partySize;
            const perPersonWon = perPersonMeso / oneHunMil * vPresentMeso;

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

            // 선택된 보스라면 합계에 추가
            if (char.selectedBosses.includes(bIdx)) {
                charMeso += perPersonMeso;
                charMinutes += config.actualTime;
            }
        });

        // 현재 캐릭터 요약 업데이트
        if (charIdx === mCalData.activeIndex) {
            $('#selected-boss-count').text(`${char.selectedBosses.length} / 12`);
            $('#weekly-profit').text(`${Math.floor(charMeso).toLocaleString()} 메소`);
            $('#total-clear-time-hours').text(`${charMinutes}분 (${(charMinutes / 60).toFixed(1)}시간)`);
            
            let charHourly = (charMinutes > 0) ? (charMeso / oneHunMil * vPresentMeso) / (charMinutes / 60) : 0;
            $('#total-weekly-hourly-wage').text(`${Math.floor(charHourly).toLocaleString()} 원`);
        }

        // 계정 합산에 추가
        accountTotalMeso += charMeso;
        accountTotalMinutes += charMinutes;
    });

    // 계정 전체 요약 업데이트
    $('#total-char-count').text(`${mCalData.characters.length}`);
    $('#account-total-profit').text(`${Math.floor(accountTotalMeso).toLocaleString()} 메소`);
    $('#account-total-time').text(`${accountTotalMinutes}분 (${(accountTotalMinutes / 60).toFixed(1)}시간)`);
    
    let accountHourly = (accountTotalMinutes > 0) ? (accountTotalMeso / oneHunMil * vPresentMeso) / (accountTotalMinutes / 60) : 0;
    $('#account-hourly-wage').text(`${Math.floor(accountHourly).toLocaleString()} 원`);
}
