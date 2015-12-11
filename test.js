let obj = {
        nums: ['a'],
        func: () => {
            this.nums.forEach((v) => {
            if (v % 5 === 0){
                this.fives.push(v)
            }
        })
        }
}
obj.func()
console.log(obj)