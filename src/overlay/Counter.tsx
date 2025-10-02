import './Counter.css'

function Counter({
  value,
  onCount
}: {
  value: number,
  onCount?: (value: number) => void
}) {
  const newValue = (val: number) => {
    if (val === value) return
    if (onCount) {
      onCount(val)
    }
  }

  return <div className="overlay-counter">
    <button onClick={() => newValue(Math.max(value - 1, 0))}>-</button>
    <div>{value}</div>
    <button onClick={() => newValue(value + 1)}>+</button>
  </div>
}

export default Counter
