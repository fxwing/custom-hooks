class Person {
  constructor(name) {
    this.name = name;
  }
}

// 静态方法
Person.getName = () => {
  console.log(this.name);
};

const person = new Person();
console.log(Person, person);
person.getName();
