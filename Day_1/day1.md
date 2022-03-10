# Ex1 

```js
const obj1 = {x:20, y:30};

function cloneDeep(obj){
    const obj3 = {...obj}
    return obj3
}

const obj2 = cloneDeep(obj1)

obj2.x = 10
console.log(obj1, obj2)
```

# Ex2 

```js
const macbooks = ['macbook2015', {model:'macbook2014'}, 'macbook2017']
const apples =[...macbooks]
apples[0] = 'air'
apples[1].model = 'm1'
console.log(macbooks)
console.log(apples)
```

*kết quả* 

```js

macbooks = ['macbook2015',{model:'m1'}, 'macbook2017']
apples = ['air', {'model': m1}, 'macbook2017']
```
*Giải thích*

 `Các phần tử cũ của macbooks khi spread sẽ lưu giá trị tạo thành mảng mới trừ {modal:'1'} là lưu địa chỉ vùng nhớ nên khi thay đổi các giá trị các Primitive Types nó sẽ chỉ đổi ở 1 trong array còn khi đổi trong object con nó sẽ đổi giá trị ở vùng nhớ  `


# Ex3

```js
var text = 'outside'
function show() {
    console.log(text)
    var text = 'abcd'
}
show()
```

*Giải thích*

`kết quả ở console là undefine vì khi khởi tạo var trong scope nó sẽ được đem lên đầu scope và được khởi tạo bằng giá trị undefine sau đó thực hiện console.log cuối cung mới gián giá trị text = abcd`

# Ex4 

```js
let arr = [1, 2, 3, 4, 5, 6, 7];
function inBetween(x, y){
    return (a) => {a>=x && a<=y}
}

alert(arr.filter(inBetween(3,6)));
```

# Ex5
```js
function Counter() {
    let count = 0;
    this.up = function() {
      return ++count;
    };
    this.down = function() {
      return --count;
    };
  }
  
  let counter = new Counter();

    alert( counter.up() ); // 1
  alert( counter.up() ); // 2
  alert( counter.down() ); // 1
```
*Giải thích*

  `
  Khi khi báo biến counter nó sẽ gọi đến hàm Counter => nó sẽ tạo ra 1 môi trường thực thi riêng gồm
  let count = 0 và 2 hàm up và down và 2 hàm này sẽ nhớ môi trường nó được tạo.
  khi gọi counter.up nó sẽ trỏ ra môi trường nó được tạo để tìm biến count và thấy giá trị count = 0 => tăng lên 1
  khi gọi counter.up lần 2 nó sẽ trỏ ra môi trường đó lần nữa và thấy giá trị count đã là 1 => tăng lên 2
  khi gọi counter.down nó sẽ trỏ ra môi trường khi đó biến count giá trị bằng 2 => 2 -1 = 1  
  (Khái niệm Closure trong javaScript)`


# Ex6

```js
console.log("hello");

setTimeout(() => console.log("world"), 0);

console.log("hi")
```

*Giải thích*


>hello, hi, world 
`SetTimeout là hàm bất đồng bộ => nó sẽ gọi hàm console sau cùng vì hàm bất đồng bộ sẽ được đưa vào stack cuối cùng và thực thi sau khi các hàm đồng bộ thực thi , bất kể đặt thời gian là bao nhiêu`



