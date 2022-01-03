// 논리곱: https://ko.wikipedia.org/wiki/%EB%85%BC%EB%A6%AC%EA%B3%B1
// 논리합: https://ko.wikipedia.org/wiki/%EB%85%BC%EB%A6%AC%ED%95%A9

// 곱타입
type Name = {
  name: string
}

type X = {
  x: number
}

type Y = {
  y: number
}

type Radius = {
  radius: number
}

type Length = {
  length: number
}

type ProductShape = Name

// kind는 주석처리 하고 합 타입 코드도 주석처리 하고 곱 타입 관련해서만 확인해보기
type ProductCircle = ProductShape & X & Y & Radius & {kind: "circle"}
type ProductSquare = ProductShape & X & Y & Length & {kind: "square"}
type ProductLine = ProductShape & {kind: "line"} & {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

const productCircle: ProductCircle = {
  kind: "circle",
  name: "원",
  x: 1.0,
  y: 1.0,
  radius: 1.0,
}

const productSquare: ProductSquare = {
  kind: "square",
  name: "정사각형",
  x: 1,
  y: 1,
  length: 1,
}

const productLine: ProductLine = {
  kind: "line",
  name: "직선",
  x1: 1,
  y1: 1,
  x2: 4,
  y2: 5
}

function getGirthLength(shape: ProductShape): number {
  switch(shape.name) {
    // js로 컴파일되면서 타입정보가 다 날아가므로 런타임에서 타입 매칭을 할 수 없기 때문에 shape.name을 사용했다.
    case "원":
      return 2 * Math.PI * (shape as ProductCircle).radius
    case "정사각형":
      return 4 * (shape as ProductSquare).length
    case "직선":
      const line = shape as ProductLine
      const x2 = Math.pow(line.x2 - line.x1, 2.0)
      const y2 = Math.pow(line.y2 - line.y1, 2.0)
      return Math.sqrt(x2 + y2)
    default:
      throw new Error("IllegalArgumentException")
  }
}

console.log("곱타입")
console.log(getGirthLength(productCircle))
console.log(getGirthLength(productSquare))
console.log(getGirthLength(productLine))

// 합타입
type SumShape = ProductCircle | ProductSquare | ProductLine

function getGirthLengthSumType(shape: SumShape): number {
  // 합타입에서 컴파일러는 SumShape.kind가 가질 수 있는 타입의 종류를 알 수 있으므로
  // 곱타입과 다르게 default case가 없어도 리턴 타입에 대해서 컴파일 에러가 발생하지 않는다.

  // shape.kind = "circle" // kind의 타입 알아보기. kind에 가능한 값을 하드코딩으로 넣어보고 발생하는 컴파일 에러 확인. Literal Types
  // type-level html parser: https://github.com/microsoft/TypeScript/pull/40336?from=groupmessage
  switch(shape.kind) {
    case "circle":
      return 2 * Math.PI * shape.radius
    case "square":
      return 4 * shape.length
    case "line":
      const x2 = Math.pow(shape.x2 - shape.x1, 2.0)
      const y2 = Math.pow(shape.y2 - shape.y1, 2.0)
      return Math.sqrt(x2 + y2)
  }
}

console.log("합타입")
console.log(getGirthLengthSumType(productCircle))
console.log(getGirthLengthSumType(productSquare))
console.log(getGirthLengthSumType(productLine))
