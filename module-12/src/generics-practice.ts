// src/generics-practice.ts
import { Request } from "express";
import { User } from "./users";

interface CreateTaskBody {
  title: string;
}

// --- Reading Generics ---

// 1. Promise<User>
//    A Promise that, when it resolves, will give you a User object.
//    The <User> tells TypeScript what type the resolved value will be.
//    Example: an async function that fetches a user from a database.
type _1 = Promise<User>;

// 2. Array<string>
//    A list that can only contain strings. Equivalent to string[].
//    TypeScript will error if you try to push a number or boolean into it.
type _2 = Array<string>;

// 3. Map<string, number>
//    A key-value collection where every key is a string and every value is a number.
//    Example: { "alice": 42, "bob": 7 } — useful for counts, scores, lookups.
type _3 = Map<string, number>;

// 4. Request<{ id: string }, {}, CreateTaskBody>
//    An Express Request with three type slots filled in:
//      - Params  : { id: string }     → req.params.id is a string
//      - ResBody : {}                 → not used (response body goes on res, not req)
//      - ReqBody : CreateTaskBody     → req.body is typed as CreateTaskBody
//    Filling these in gives you autocomplete and type safety on req.params and req.body.
type _4 = Request<{ id: string }, {}, CreateTaskBody>;

// 5. (items: T[]) => T | undefined
//    A generic function signature. T is a type placeholder decided at call time.
//    It accepts an array of any one type T and returns either one item of that
//    same type T, or undefined (if the array is empty).
//    The key insight: the return type is always the same type as the array's element —
//    TypeScript enforces this relationship without you naming the concrete type.
type _5 = <T>(items: T[]) => T | undefined;

// --- Generic function ---

function firstItem<T>(items: T[]): T | undefined {
  return items[0];
}

// TypeScript infers T = number — result is number | undefined
const firstNumber = firstItem([10, 20, 30]);
console.log("First number:", firstNumber); // 10

// TypeScript infers T = string — result is string | undefined
const firstString = firstItem(["apple", "banana", "cherry"]);
console.log("First string:", firstString); // apple

// TypeScript infers T = never on an empty array — result is undefined
const fromEmpty = firstItem([]);
console.log("From empty:", fromEmpty); // undefined
