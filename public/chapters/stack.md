## 🟦 STACK PATTERNS & TEMPLATES

---

### 1. **Basic Stack Implementation**

```java
Stack<Integer> stack = new Stack<>();

stack.push(x);
stack.pop();
stack.peek();
stack.isEmpty();
```

---

### 2. **Monotonic Stack (Next Greater / Smaller Element)**

### 🧭 Next Greater Element

```java
Stack<Integer> stack = new Stack<>();
int[] res = new int[n];

for (int i = n - 1; i >= 0; i--)
{
    while (!stack.isEmpty() && stack.peek() <= arr[i])
        stack.pop();  // squash everyone who is smaller than me

    res[i] = stack.isEmpty() ? -1 : stack.peek();
    stack.push(arr[i]);
}
```

### 🔻 Next Smaller Element (just flip the comparison)

```java
while (!stack.isEmpty() && stack.peek() >= arr[i])
    stack.pop();  // squash everyone who is greater than me
```

---

### 3. **Min Stack (track minimum in O(1))**

```java
Stack<Integer> stack = new Stack<>();
Stack<Integer> minStack = new Stack<>();

void push(int val)
{
    stack.push(val);

    if (minStack.isEmpty() || val <= minStack.peek())
        minStack.push(val);
}

void pop()
{
    if (stack.pop().equals(minStack.peek()))
        minStack.pop();
}

int getMin()
{
    return minStack.peek();
}
```

---

### 4. **Balanced Parentheses / Expression Parsing**

```java
Stack<Character> stack = new Stack<>();

for (char ch : str.toCharArray())
{
    if (opening bracket)
    {
	    stack.push(ch);
	  }
    else if (closing bracket)
    {
        if (stack.isEmpty() || !isMatching(stack.pop(), ch))
	        return false;
    }
}
return stack.isEmpty();
```

---

### 5. **Infix / Postfix / Prefix Conversion & Evaluation**

These use one or two stacks:

### Example: Infix to Postfix

```java
Stack<Character> operator = new Stack<>();
StringBuilder postfix = new StringBuilder();

for (char ch : expr)
{
    if (isOperand(ch))
    {
	    postfix.append(ch);
	  }
    else if (ch == '(')
    {
	     operator.push(ch);
	  }
    else if (ch == ')')
    {
        while (operator.peek() != '(')
            postfix.append(operator.pop());

        operator.pop(); // remove '('
    }
    else
    {
        while (!operator.isEmpty() && precedence(operator.peek()) >= precedence(ch))
            postfix.append(operator.pop());

        operator.push(ch);
    }
}

while (!operator.isEmpty())
	postfix.append(operator.pop());
```

---

### 6. **Stock Span / Histogram / Remove K Digits / Asteroids**

All of them use a **monotonic pattern**:

```java
for (i...)
{
    while (!stack.isEmpty() && condition on stack.peek()) // can be on value or index
        stack.pop();
    // do something with stack
    stack.push(i or value);
}
```

---

## 🟨 QUEUE PATTERNS & TEMPLATES

---

### 1. **Basic Queue Implementation**

```java
Queue<Integer> q = new LinkedList<>();

q.offer(x); // or add(x)
q.poll();   // or remove()
q.peek();
q.isEmpty();
```

---

### 2. **Deque for Sliding Window Maximum**

```java
Deque<Integer> dq = new LinkedList<>();

for (int i = 0; i < n; i++)
{
    while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i])
        dq.pollLast();

    dq.offerLast(i);

    if (dq.peekFirst() <= i - k) // out of window
        dq.pollFirst();

    if (i >= k - 1)
        result[i - k + 1] = nums[dq.peekFirst()];
}
```

---

### 3. **Fixed Size Window (Map + Queue)**

Used in:

- Longest Substring with K Distinct Characters
- Fruit Into Baskets

```java
Map<Character, Integer> map = new HashMap<>();

int left = 0;

for (int right = 0; right < s.length(); right++)
{
    char rChar = s.charAt(right);
    map.put(rChar, map.getOrDefault(rChar, 0) + 1);

    while (map.size() > k)
    {
        char lChar = s.charAt(left++);
        map.put(lChar, map.get(lChar) - 1);

        if (map.get(lChar) == 0)
            map.remove(lChar);
    }

    maxLen = Math.max(maxLen, right - left + 1);
}
```

---

### 4. **First Non-Repeating Character in a Stream**

```java
Queue<Character> q = new LinkedList<>();
int[] freq = new int[26];

for (char ch : stream)
{
    q.offer(ch);
    freq[ch - 'a']++;

    while (!q.isEmpty() && freq[q.peek() - 'a'] > 1)
        q.poll();

    result.append(q.isEmpty() ? '#' : q.peek());
}
```

---

### 5. **Rotten Oranges / BFS Template**

```java
Queue<int[]> q = new LinkedList<>();

boolean[][] visited = new boolean[n][m];

q.offer(new int[]{startX, startY});

visited[startX][startY] = true;

while (!q.isEmpty())
{
    int[] curr = q.poll();

    for (int[] dir : directions)
    {
        int nx = curr[0] + dir[0];
        int ny = curr[1] + dir[1];

        if (valid(nx, ny) && !visited[nx][ny])
        {
            visited[nx][ny] = true;
            q.offer(new int[]{nx, ny});
        }
    }
}
```

---

### 6. **Generate Binary Numbers from 1 to N**

```java
Queue<String> q = new LinkedList<>();
q.offer("1");

while (n-- > 0)
{
    String curr = q.poll();
    System.out.print(curr + " ");
    q.offer(curr + "0");
    q.offer(curr + "1");
}
```
