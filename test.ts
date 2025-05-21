// Subject 인터페이스
interface Subject {
  subscribe(observer: Observer): void
  unsubscribe(observer: Observer): void
  notify(): void
}

// Observer 인터페이스
interface Observer {
  update(data: any): void
}

// 구체적인 Subject 구현
class DataSource implements Subject {
  private observers: Observer[] = [] // 옵저버 목록
  private data: any 

  subscribe(observer: Observer): void {
    this.observers.push(observer)
    console.log(`옵저버 등록: 현재 옵저버 수 ${this.observers.length}개`)
  }

  unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer)
    console.log(`옵저버 제거: 현재 옵저버 수 ${this.observers.length}개`)
  }

  
  notify(): void {
    console.log(`${this.observers.length}개의 옵저버에게 알림 전송 중...`)
    this.observers.forEach((observer) => observer.update(this.data))
  }

  // 데이터 변경 시 옵저버에게 통지
  setData(data: any): void {
    console.log(`데이터 변경: ${JSON.stringify(data)}`)
    this.data = data
    this.notify()
  }

  // 현재 데이터 반환 메서드 추가
  getData(): any {
    return this.data
  }

  // 현재 옵저버 목록 반환
  getObserversCount(): number {
    return this.observers.length
  }
}

class DataDisplay implements Observer {
  private name: string

  constructor(name: string) {
    this.name = name
    console.log(`${name} 디스플레이 생성됨`)
  }

  update(data: any): void {
    console.log(`${this.name} 화면 업데이트: ${JSON.stringify(data)}`)
  }
}

console.log("===== 옵저버 패턴 예시 시작 =====")

// 1. Subject 생성
const dataSource = new DataSource()
console.log("데이터 소스(Subject) 생성됨")

// 2. Observer 생성
const mobileDisplay = new DataDisplay('모바일')
const webDisplay = new DataDisplay('웹')
const desktopDisplay = new DataDisplay('데스크톱')

// 3. Observer를 Subject에 등록
console.log("\n----- 옵저버 등록 -----")
dataSource.subscribe(mobileDisplay)
dataSource.subscribe(webDisplay)
dataSource.subscribe(desktopDisplay)

// 4. 데이터 변경 - 모든 Observer에게 통지됨
console.log("\n----- 첫 번째 데이터 변경 -----")
dataSource.setData({ temperature: 25, humidity: 60 })

// 5. Observer 제거
console.log("\n----- 옵저버 제거 -----")
dataSource.unsubscribe(webDisplay)

// 6. 데이터 다시 변경 - 등록된 Observer에게만 통지됨
console.log("\n----- 두 번째 데이터 변경 -----")
dataSource.setData({ temperature: 26, humidity: 55 })

// 7. 현재 상태 확인
console.log("\n----- 최종 상태 -----")
console.log(`현재 등록된 옵저버 수: ${dataSource.getObserversCount()}`)
console.log(`현재 데이터: ${JSON.stringify(dataSource.getData())}`)

console.log("\n===== 옵저버 패턴 예시 종료 =====")