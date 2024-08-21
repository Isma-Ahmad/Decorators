"use strict";
// Class Decorators
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
function SimpleDecorator(constructor) {
    console.log("SimpleDecorator called on:", constructor.name);
}
let MyClass = class MyClass {
    constructor() {
        console.log("MyClass instance created.");
    }
};
MyClass = __decorate([
    SimpleDecorator
], MyClass);
const myClassInstance = new MyClass();
//Method Decorators
function LogMethod(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        console.log(`Method ${propertyKey} was called with args: ${JSON.stringify(args)}`);
        return originalMethod.apply(this, args);
    };
}
class Calculator {
    add(a, b) {
        return a + b;
    }
}
__decorate([
    LogMethod
], Calculator.prototype, "add", null);
const calc = new Calculator();
console.log(calc.add(2, 3));
// Property Decorators
function DefaultValue(value) {
    return function (target, propertyKey) {
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
    constructor(name) {
        if (name) {
            this.name = name;
        }
    }
}
__decorate([
    DefaultValue('Anonymous')
], User.prototype, "name", void 0);
const user1 = new User();
console.log(user1.name);
const user2 = new User('John');
console.log(user2.name);
//Parameter Decorators
function LogParameter(target, propertyKey, parameterIndex) {
    console.log(`Parameter at index ${parameterIndex} in method ${propertyKey} was decorated`);
}
class UserService {
    greet(name) {
        console.log(`Hello, ${name}`);
    }
}
__decorate([
    __param(0, LogParameter)
], UserService.prototype, "greet", null);
const services = new UserService();
services.greet('Alice');
//Combining Multiple Decorators
function FirstDecorator() {
    return function (target, propertyKey, descriptor) {
        console.log("FirstDecorator called");
    };
}
function SecondDecorator() {
    return function (target, propertyKey, descriptor) {
        console.log("SecondDecorator called");
    };
}
class MyService {
    doSomething() {
        console.log("Doing something");
    }
}
__decorate([
    FirstDecorator(),
    SecondDecorator()
], MyService.prototype, "doSomething", null);
const service = new MyService();
service.doSomething();
