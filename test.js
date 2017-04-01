

//Promise
//typeof Promise == 'function'

//prototype ==> then/catch

//静态方法 ==> all/race/resolve/reject


//第一步 new Promise
/*let p = new Promise((resolve, reject) => {
    setTimeout(reject, 1000, 'hello world');
});
console.log(p);

//1、将这些回调函数 存入处理队列queue
//2、如果promise已经是fullfilled或者rejected状态了 autoRun
// 数据结构的角度来讲 ==》 链表 p ==> another 当p fullfilled时another能
var another = p.then(val => 
    //处理resolve的结果
    console.log(`resolve val is ${val}`),
    val => 
    //处理reject结果
    console.log(`reject val is ${val}`)
)
console.log(`another instanceof Promise is ${another instanceof Promise}`);*/

/*//处理reject结果
setTimeout(() => {
    console.log(p);
    p.catch(val => console.log(`catch val is ${val}`))
}
, 2000)*/

/*p.catch(val => console.log(`catch val is ${val}`))
p.catch(val => console.log(`catch val is ${val}`))
p.catch(val => console.log(`catch val is ${val}`))*/

/*var t = Promise.resolve(1);
var another = Promise.resolve({
    then: function(resolve,reject){
        reject(2);
    }
});
//another.then(val => console.log(val));
another.catch(val => console.log(val));
console.log(another);*/


const assert = require('assert');

const p = Promise.resolve(1);

const p1 = p.then(val => {
    console.log(val);
    return val+1;
});

console.log(p1 instanceof Promise);

const p2 = p1.then(val => {
    console.log(val);
    assert.equal(val, 3);
})

