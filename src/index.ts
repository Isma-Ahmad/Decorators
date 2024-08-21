// Class Decorators

function SimpleDecorator(constructor: Function) {
    console.log("SimpleDecorator called on:", constructor.name);
}

@SimpleDecorator
class MyClass {
    constructor() {
        console.log("MyClass instance created.");
    }
}

const myClassInstance = new MyClass();


//Method Decorators

function LogMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`Method ${propertyKey} was called with args: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };
}

class Calculator {
    @LogMethod
    add(a: number, b: number): number {
        return a + b;
    }
}

const calc = new Calculator();
console.log(calc.add(2, 3));


// Property Decorators

function DefaultValue(value: any) {
    return function (target: any, propertyKey: string) {
        let _value = value;

        Object.defineProperty(target, propertyKey, {
            get: () => _value,
            set: (newValue) => _value = newValue,
            enumerable: true,
            configurable: true
        });
    };
}

class User {
    @DefaultValue('Anonymous')  
    name!: string;

    constructor(name?: string) {
        if (name) {
            this.name = name;  
        }
    }
}

const user1 = new User();
console.log(user1.name); 

const user2 = new User('John');
console.log(user2.name); 

//Parameter Decorators
function LogParameter(target: any, propertyKey: string, parameterIndex: number) {
    console.log(`Parameter at index ${parameterIndex} in method ${propertyKey} was decorated`);
}

class UserService {
    greet(@LogParameter name: string) {
        console.log(`Hello, ${name}`);
    }
}

const services = new UserService();
services.greet('Alice');

//Combining Multiple Decorators

function FirstDecorator() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("FirstDecorator called");
    };
}

function SecondDecorator() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("SecondDecorator called");
    };
}

class MyService {
    @FirstDecorator()
    @SecondDecorator()
    doSomething() {
        console.log("Doing something");
    }
}

const service = new MyService();
service.doSomething();

