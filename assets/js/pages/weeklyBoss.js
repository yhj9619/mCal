// 주간보스 시급계산기 페이지의 계산을 담당하는 함수
function run_page_calculations() {
    
    // 보스 데이터
    const bossData = [
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

    const container = $('#boss-list-container');
    
    // 이미 목록이 렌더링되어 있다면 계산만 수행
    if (container.children().length === 0) {
        // 보스 목록 렌더링
        bossData.forEach((boss, index) => {
            let difficultyOptions = Object.keys(boss.difficulties).map(d => `<option value="${d}">${d}</option>`).join('');
            let maxParty = boss.maxPartySize || 6;
            let partyOptions = '';
            for (let i = 1; i <= maxParty; i++) {
                partyOptions += `<option value="${i}">${i}인</option>`;
            }

            let bossRow = `
                <div class="boss-row" data-boss-index="${index}">
                    <span class="boss-name">${boss.name}</span>
                    <span class="boss-difficulty"><select id="boss-difficulty-${index}">${difficultyOptions}</select></span>
                    <span class="party-size-per-boss"><select id="boss-party-size-${index}">${partyOptions}</select></span>
                    <span class="crystal-price" id="per-person-meso-${index}"></span>
                    <span class="clear-time-per-boss" id="clear-time-${index}"></span>
                    <span class="actual-clear-time"><input type="number" id="actual-time-${index}" placeholder="분" value="30"></span>
                    <span class="hourly-rate-won" id="hourly-rate-${index}"></span>
                </div>
            `;
            container.append(bossRow);
        });

        loadWeeklyBossData(); // 처음 렌더링 시 데이터 로드

        // 이벤트 리스너 등록 (한 번만)
        // 행 클릭 시 선택 토글
        container.off('click', '.boss-row').on('click', '.boss-row', function(e) {
            // select나 input 클릭 시에는 행 선택 토글이 발생하지 않도록 방지
            if ($(e.target).is('select, input, option')) return;

            const $row = $(this);
            const isSelected = $row.hasClass('selected');

            if (!isSelected && $('.boss-row.selected').length >= 12) {
                alert('이미 12개의 보스를 선택했습니다');
                return;
            }
            $row.toggleClass('selected');
            calculate();
            saveWeeklyBossData();
        });
        
        // 드롭다운 및 입력 필드 변경 시
        container.off('change keyup', 'select, input').on('change keyup', 'select, input', function() {
            calculate();
            saveWeeklyBossData();
        });
    }

    function saveWeeklyBossData() {
        const selectedBosses = [];
        $('.boss-row.selected').each(function() {
            selectedBosses.push($(this).data('boss-index'));
        });
        localStorage.setItem('weeklyBoss_selected', JSON.stringify(selectedBosses));

        bossData.forEach((boss, index) => {
            localStorage.setItem(`weeklyBoss_difficulty_${index}`, $(`#boss-difficulty-${index}`).val());
            localStorage.setItem(`weeklyBoss_partySize_${index}`, $(`#boss-party-size-${index}`).val());
            localStorage.setItem(`weeklyBoss_actualTime_${index}`, $(`#actual-time-${index}`).val());
        });
    }

    function loadWeeklyBossData() {
        const savedSelectedBosses = JSON.parse(localStorage.getItem('weeklyBoss_selected') || '[]');
        savedSelectedBosses.forEach(index => {
            $(`.boss-row[data-boss-index="${index}"]`).addClass('selected');
        });

        bossData.forEach((boss, index) => {
            const savedDifficulty = localStorage.getItem(`weeklyBoss_difficulty_${index}`);
            if (savedDifficulty) $(`#boss-difficulty-${index}`).val(savedDifficulty);

            const savedPartySize = localStorage.getItem(`weeklyBoss_partySize_${index}`);
            if (savedPartySize) $(`#boss-party-size-${index}`).val(savedPartySize);

            const savedActualTime = localStorage.getItem(`weeklyBoss_actualTime_${index}`);
            if (savedActualTime) $(`#actual-time-${index}`).val(savedActualTime);
        });
    }

    function formatEok(meso) {
        if (meso >= 100000000) {
            return ` (약 ${(meso / 100000000).toFixed(2)}억)`;
        }
        return '';
    }

    function calculate() {
        const MINIMUM_WAGE_PER_HOUR = 10320;
        const MINIMUM_WAGE_PER_MINUTE = MINIMUM_WAGE_PER_HOUR / 60;

        bossData.forEach((boss, index) => {
            let crystalPrice = boss.difficulties[$(`#boss-difficulty-${index}`).val()];
            let partySize = parseInt($(`#boss-party-size-${index}`).val()) || 1;
            let perPersonMeso = crystalPrice / partySize;
            
            $(`#per-person-meso-${index}`).text(Math.floor(perPersonMeso).toLocaleString());

            let perPersonWon = perPersonMeso / oneHunMil * vPresentMeso;
            let maxTimeInMinutes = (perPersonWon > 0) ? perPersonWon / MINIMUM_WAGE_PER_MINUTE : 0;
            $(`#clear-time-${index}`).text(`${Math.floor(maxTimeInMinutes)}분`);

            let actualTime = parseInt($(`#actual-time-${index}`).val());
            if (actualTime > 0) {
                let hourlyRateWon = (perPersonWon / actualTime) * 60;
                $(`#hourly-rate-${index}`).text(Math.floor(hourlyRateWon).toLocaleString() + '원');
            } else {
                $(`#hourly-rate-${index}`).text('');
            }
        });

        let totalClearTimeMinutes = 0;
        let totalSelectedBossMeso = 0;

        $('.boss-row.selected').each(function() {
            let index = $(this).data('boss-index');
            let crystalPrice = bossData[index].difficulties[$(`#boss-difficulty-${index}`).val()];
            let partySize = parseInt($(`#boss-party-size-${index}`).val()) || 1;
            totalSelectedBossMeso += (crystalPrice / partySize);

            let actualTime = parseInt($(`#actual-time-${index}`).val());
            if (!isNaN(actualTime) && actualTime > 0) {
                totalClearTimeMinutes += actualTime;
            }
        });

        let totalClearTimeHours = totalClearTimeMinutes / 60;
        let totalWeeklyHourlyWage = 0;
        if (totalClearTimeHours > 0) {
            let totalSelectedBossWon = totalSelectedBossMeso / oneHunMil * vPresentMeso;
            totalWeeklyHourlyWage = totalSelectedBossWon / totalClearTimeHours;
        }

        $('#selected-boss-count').text(`${$('.boss-row.selected').length} / 12`);
        $('#weekly-profit').text(`${Math.floor(totalSelectedBossMeso).toLocaleString()} 메소 ${formatEok(totalSelectedBossMeso)}`);
        $('#total-clear-time-hours').text(`${totalClearTimeMinutes}분 (${(totalClearTimeHours).toFixed(1)}시간)`);
        $('#total-weekly-hourly-wage').text(`${Math.floor(totalWeeklyHourlyWage).toLocaleString()} 원`);
    }

    calculate();
}
