function asyncPool(poolLimit, array, iteratorFn) {
  let i = 0
  const ret = []
  const executing = []
  const enqueue = function () {
    //Boundary processing, array is an empty array
    if (i === array.length) {
      return Promise.resolve()
    }
    //Initialize a promise every enqueue
    const item = array[i++]
    const p = Promise.resolve().then(() => iteratorFn(item, array))
    //Put into promises array
    ret.push(p)
    //After the promise is executed, remove it from the executing array
    const e = p.then(() => executing.splice(executing.indexOf(e), 1))
    //Insert the executing number to indicate the executing promise
    executing.push(e)
    //Using promise.rece, whenever the number of promises in the executing array is less than poollimit, the new promise is instantiated and executed
    let r = Promise.resolve()
    if (executing.length >= poolLimit) {
      r = Promise.race(executing)
    }
    //Recursion until array is traversed
    return r.then(() => enqueue())
  }
  return enqueue().then(() => Promise.all(ret))
}

export default asyncPool
