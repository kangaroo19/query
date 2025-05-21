// 구체적인 Subject 구현
var DataSource = /** @class */ (function () {
    function DataSource() {
        this.observers = [];
    }
    DataSource.prototype.subscribe = function (observer) {
        this.observers.push(observer);
        console.log("\uC635\uC800\uBC84 \uB4F1\uB85D: \uD604\uC7AC \uC635\uC800\uBC84 \uC218 ".concat(this.observers.length, "\uAC1C"));
    };
    DataSource.prototype.unsubscribe = function (observer) {
        this.observers = this.observers.filter(function (obs) { return obs !== observer; });
        console.log("\uC635\uC800\uBC84 \uC81C\uAC70: \uD604\uC7AC \uC635\uC800\uBC84 \uC218 ".concat(this.observers.length, "\uAC1C"));
    };
    DataSource.prototype.notify = function () {
        var _this = this;
        console.log("".concat(this.observers.length, "\uAC1C\uC758 \uC635\uC800\uBC84\uC5D0\uAC8C \uC54C\uB9BC \uC804\uC1A1 \uC911..."));
        this.observers.forEach(function (observer) { return observer.update(_this.data); });
    };
    // 데이터 변경 시 옵저버에게 통지
    DataSource.prototype.setData = function (data) {
        console.log("\uB370\uC774\uD130 \uBCC0\uACBD: ".concat(JSON.stringify(data)));
        this.data = data;
        this.notify();
    };
    // 현재 데이터 반환 메서드 추가
    DataSource.prototype.getData = function () {
        return this.data;
    };
    // 현재 옵저버 목록 반환
    DataSource.prototype.getObserversCount = function () {
        return this.observers.length;
    };
    return DataSource;
}());
var DataDisplay = /** @class */ (function () {
    function DataDisplay(name) {
        this.name = name;
        console.log("".concat(name, " \uB514\uC2A4\uD50C\uB808\uC774 \uC0DD\uC131\uB428"));
    }
    DataDisplay.prototype.update = function (data) {
        console.log("".concat(this.name, " \uD654\uBA74 \uC5C5\uB370\uC774\uD2B8: ").concat(JSON.stringify(data)));
    };
    return DataDisplay;
}());
console.log("===== 옵저버 패턴 예시 시작 =====");
// 1. Subject 생성
var dataSource = new DataSource();
console.log("데이터 소스(Subject) 생성됨");
// 2. Observer 생성
var mobileDisplay = new DataDisplay('모바일');
var webDisplay = new DataDisplay('웹');
var desktopDisplay = new DataDisplay('데스크톱');
// 3. Observer를 Subject에 등록
console.log("\n----- 옵저버 등록 -----");
dataSource.subscribe(mobileDisplay);
dataSource.subscribe(webDisplay);
dataSource.subscribe(desktopDisplay);
// 4. 데이터 변경 - 모든 Observer에게 통지됨
console.log("\n----- 첫 번째 데이터 변경 -----");
dataSource.setData({ temperature: 25, humidity: 60 });
// 5. Observer 제거
console.log("\n----- 옵저버 제거 -----");
dataSource.unsubscribe(webDisplay);
// 6. 데이터 다시 변경 - 등록된 Observer에게만 통지됨
console.log("\n----- 두 번째 데이터 변경 -----");
dataSource.setData({ temperature: 26, humidity: 55 });
// 7. 현재 상태 확인
console.log("\n----- 최종 상태 -----");
console.log("\uD604\uC7AC \uB4F1\uB85D\uB41C \uC635\uC800\uBC84 \uC218: ".concat(dataSource.getObserversCount()));
console.log("\uD604\uC7AC \uB370\uC774\uD130: ".concat(JSON.stringify(dataSource.getData())));
console.log("\n===== 옵저버 패턴 예시 종료 =====");
