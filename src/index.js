import { Todo } from './todo';

const testTodo = new Todo("Fix the Console Bug");

// 1. Log a 'Snapshot' of the initial state
console.log("1. Initial:", JSON.parse(JSON.stringify(testTodo)));

testTodo.toggleComplete();
testTodo.addSubTask("Deep dive into JS references");

// 2. Log a 'Snapshot' of the updated state
console.log("2. Updated:", JSON.parse(JSON.stringify(testTodo)));