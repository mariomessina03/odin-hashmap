// Class for HashMap

class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.buckets = new Array(initialCapacity);
    this.size = 0;
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  }

  //

  set(key, value) {
    const index = this.hash(key) % this.capacity;

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      let bucketItem = this.buckets[index][i];

      if (bucketItem.key === key) {
        bucketItem.value = value;
        return;
      }
    }

    this.buckets[index].push({ key: key, value: value });
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      const newCapacity = this.capacity * 2;
      const newBuckets = new Array(newCapacity);

      for (let i = 0; i < this.buckets.length; i++) {
        if (this.buckets[i]) {
          for (let j = 0; j < this.buckets[i].length; j++) {
            const { key, value } = this.buckets[i][j];
            const index = this.hash(key) % newCapacity;

            if (index < 0 || index >= newBuckets.length) {
              throw new Error("Trying to access index out of bound");
            }

            if (!newBuckets[index]) {
              newBuckets[index] = [];
            }
            newBuckets[index].push({ key, value });
          }
        }
      }

      this.buckets = newBuckets;
      this.capacity = newCapacity;
    }
  }

  get(key) {
    let index = this.hash(key) % this.capacity;
    console.log(`Getting key: ${key}, Index: ${index}`);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[index]) {
      console.log(`Bucket is empty at index ${index}`);
      return null;
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      let bucketItem = this.buckets[index][i];
      console.log(`Checking bucket item: ${JSON.stringify(bucketItem)}`);

      if (bucketItem.key === key) {
        console.log(`Found value: ${bucketItem.value}`);
        return bucketItem.value;
      }
    }
    console.log(`Key ${key} not found`);
    return null;
  }

  has(key) {
    let index = this.hash(key) % this.capacity;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[index]) {
      return false;
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      let bucketItem = this.buckets[index][i];

      if (bucketItem.key === key) {
        return true;
      }
    }
    return false;
  }

  remove(key) {
    let index = this.hash(key) % this.capacity;

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bound");
    }

    if (!this.buckets[index]) {
      return false;
    }

    for (let i = 0; i < this.buckets[index].length; i++) {
      let bucketItem = this.buckets[index][i];

      if (bucketItem.key === key) {
        this.buckets[index].splice(i, 1);
        this.size--;
        return true;
      }
    }
    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    for (let i = 0; i < this.buckets.length; i++) {
      this.buckets[i] = [];
    }

    this.size = 0;
  }

  keys() {
    const keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          keys.push(this.buckets[i][j].key);
        }
      }
    }
    return keys;
  }

  values() {
    const values = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          values.push(this.buckets[i][j].value);
        }
      }
    }
    return values;
  }

  entries() {
    const entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          const { key, value } = this.buckets[i][j];
          entries.push({ key, value });
        }
      }
    }
    return entries;
  }
}

// For testing purposes

const test = new HashMap();

test.set("apple", "red");
test.get("apple");

test.set("banana", "yellow");
test.get("banana");

test.set("carrot", "orange");
test.get("carrot");

test.set("dog", "brown");
test.get("dog");

test.set("elephant", "gray");
test.get("elephant");

test.set("frog", "green");
test.get("frog");

test.set("grape", "purple");
test.get("grape");

test.set("hat", "black");
test.get("hat");

test.set("ice cream", "white");
test.get("ice cream");

test.set("jacket", "blue");
test.get("jacket");

test.set("kite", "pink");
test.get("kite");

test.set("lion", "golden");
test.get("lion");

//
test.set("kite", "pippo");
test.get("kite");

test.set("kite", "baudo");
test.get("kite");

test.set("moon", "silver");
test.get("moon");

test.set("moon", "davide");
test.get("moon");

test.set("moon", "marra");
test.get("moon");

test.set("lion", "ilconoscitore");
test.get("lion");

test.set("lion", "italiano");
test.get("lion");

test.set("moon", "silver");
test.get("moon");

test.clear();

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

test.get("lion");
console.log(test.has("lion"));

console.log(test.length());

test.remove("lion");
test.get("lion");
console.log(test.has("lion"));

console.log(test.keys());
console.log(test.values());
console.log(test.entries());

console.log(test.length());

test.set("moon", "silver");
test.get("moon");

test.set("lion", "italiano");
test.get("lion");

console.log(test.keys());
console.log(test.values());
console.log(test.entries());
