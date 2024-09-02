function a(x) {
  function b(y) {
    return x+y
  }
  return b
}

console.log(a(3)(4))

const a2 = (x: number) => {
  const b2 = (y: number) => x+y;
  return b2
}
