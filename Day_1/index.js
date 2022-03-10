//Ex1
const obj1 = {x:20, y:30};
function cloneDeep(obj){
    const obj3 = {...obj}
    return obj3
}

const obj2 = cloneDeep(obj1)

obj2.x = 10
console.log(obj1, obj2)

//Ex2

const macbooks = ['macbook2015', {model:'macbook2014'}, 'macbook2017']
const apples =[...macbooks]
apples[0] = 'air'
apples[1].model = 'm1'
console.log(macbooks)
console.log(apples)

//macbooks = ['macbook2015',{model:'m1'}, 'macbook2017']
//apples = ['air', {'model': m1}, 'macbook2017']

// Giải thích: các phần tử cũ của macbooks khi spread sẽ lưu giá trị tạo thành mảng mới
// trừ {modal:'1'} là lưu địa chỉ vùng nhớ nên khi thay đổi các giá trị 
// các Primitive Types nó sẽ chỉ đổi ở 1 array còn khi đổi trong object con 
// nó sẽ đổi giá trị ở vùng nhớ  

//Ex3

var text = 'outside'
function show() {
    console.log(text)
    var text = 'abcd'
}
show()

//kết quả ở console là undefine vì khi khởi tạo var trong scope
// sẽ được đem lên đầu scope và được khởi tạo bằng giá trị undefine

//Ex4

let arr = [1, 2, 3, 4, 5, 6, 7];
function inBetween(x, y){
    return (a) => { return a>=x && a<=y}
}

function inArray(arr){
  return (a) => { 
    arr.filter((x) => {x=a})
   }
}

alert(arr.filter(inBetween(3,6)));

//Ex5
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





// Ex6

console.log("hello");

setTimeout(() => console.log("world"), 0);

console.log("hi");

//hello, hi, world 
//setTimeout là hàm bất đồng bộ => nó sẽ gọi hàm console sau cùng vì hàm bất đồng bộ sẽ được đưa vào stack cuối cùng và thực thi sau khi các hàm đồng bộ thực thi 
// bất kể đặt thời gian là bao nhiêu