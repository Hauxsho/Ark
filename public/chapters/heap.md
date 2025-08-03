# HEAP DSA TEMPLATE MASTERLIST

This is your complete template bank covering **all Heap-based questions** across Striver + advanced interview sets.

---

## ✅ TEMPLATE 1: **Min Heap (Default in Java)**

```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
minHeap.add(10);
minHeap.add(5);
minHeap.add(7);

while (!minHeap.isEmpty()) {
    System.out.println(minHeap.poll());  // Prints in ascending order
}
```

**Used In:**

- Kth Smallest Element
- Sort K-Sorted Array
- Merge K Sorted Lists
- Connect N Ropes
- Task Scheduler
- IPO (Cost Side)

---

## ✅ TEMPLATE 2: **Max Heap (Using Comparator or Negating)**

### Option 1: Comparator

```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
```

### Option 2: Negate values

```java
PriorityQueue<Integer> maxHeap = new PriorityQueue<>();
maxHeap.add(-val); // use -heap.poll() to get original value
```

**Used In:**

- Kth Largest Element
- Max Sum Combination
- Frequency Sort
- K Most Frequent Elements
- Reorganize String
- IPO (Profit Side)

---

## ✅ TEMPLATE 3: **Custom Object with Comparator**

```java

class Pair {
    int value, frequency;
    Pair(int v, int f) {
        this.value = v;
        this.frequency = f;
    }
}

PriorityQueue<Pair> heap = new PriorityQueue<>((a, b) -> {
    if (a.frequency != b.frequency)
        return b.frequency - a.frequency;  // Max freq
    return a.value - b.value;  // Tie-breaker
});

```

**Used In:**

- Top K Frequent Words
- Reorganize String
- Frequency Sort
- Task Scheduler
- Design Twitter
- Smallest Range from K Lists

---

## ✅ TEMPLATE 4: **Two Heaps for Median (Max Left + Min Right)**

```java

PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

void addNumber(int num) {
    maxHeap.add(num);
    minHeap.add(maxHeap.poll());

    if (minHeap.size() > maxHeap.size()) {
        maxHeap.add(minHeap.poll());
    }
}

double findMedian() {
    if (maxHeap.size() == minHeap.size())
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    return maxHeap.peek();
}

```

**Used In:**

- Median from Data Stream
- IPO (Min + Max Heap Combined)

---

## ✅ TEMPLATE 5: **HashMap + Heap (Frequency Based Pattern)**

```java

Map<Integer, Integer> freqMap = new HashMap<>();
for (int num : nums)
    freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);

PriorityQueue<Map.Entry<Integer, Integer>> maxHeap =
    new PriorityQueue<>((a, b) -> b.getValue() - a.getValue());

maxHeap.addAll(freqMap.entrySet());

List<Integer> result = new ArrayList<>();
for (int i = 0; i < k; i++)
    result.add(maxHeap.poll().getKey());

```

**Used In:**

- K Most Frequent Elements
- Frequency Sort
- Top K Frequent Words
- Reorganize String
- Hands of Straights

---

## ✅ TEMPLATE 6: **Fixed Size Heap (Top K Pattern)**

```java

PriorityQueue<Integer> minHeap = new PriorityQueue<>();

for (int num : nums) {
    minHeap.add(num);
    if (minHeap.size() > k) {
        minHeap.poll();  // remove smallest to keep only top K
    }
}

```

**Used In:**

- Kth Largest
- Kth Smallest
- Max Sum Combination
- K Most Frequent
- Top K Frequent Words

---

## ✅ TEMPLATE 7: **Min Heap for Merge K Lists or Grid Cells**

```java

class Pair {
    int val, row, col;
    Pair(int v, int r, int c) {
        val = v; row = r; col = c;
    }
}

PriorityQueue<Pair> pq = new PriorityQueue<>((a, b) -> a.val - b.val);

```

**Used In:**

- Merge K Sorted Lists
- Smallest Range from K Lists
- Trapping Rain Water II
- Matrix-related problems using heap
