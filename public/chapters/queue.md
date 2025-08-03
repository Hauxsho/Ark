## 🔁 **Pattern 1: Sliding Window Maximum (Monotonic Deque)**

> Use a deque to maintain potential max in the window.

### ✅ Template:

```java
Deque<Integer> dq = new LinkedList<>();
int[] result = new int[n - k + 1];

for (int i = 0; i < n; i++) {
    // Remove elements out of the current window
    if (!dq.isEmpty() && dq.peekFirst() <= i - k)
        dq.pollFirst();

    // Remove all elements smaller than current from the back
    while (!dq.isEmpty() && nums[dq.peekLast()] < nums[i])
        dq.pollLast();

    dq.offerLast(i);

    if (i >= k - 1)
        result[i - k + 1] = nums[dq.peekFirst()];
}
```

### 🎯 Problems:

- Sliding Window Maximum
- Max in Subarray of size k
- Daily Temperatures (variation)

---

## 🟨 **Pattern 2: Longest Substring with Constraints (HashMap + Window)**

> Track frequency or distinct count using a map. Expand → shrink window as needed.

### ✅ Template:

```java
Map<Character, Integer> map = new HashMap<>();
int left = 0, maxLen = 0;

for (int right = 0; right < s.length(); right++) {
    char rChar = s.charAt(right);
    map.put(rChar, map.getOrDefault(rChar, 0) + 1);

    while (/* condition not valid */) {
        char lChar = s.charAt(left++);
        map.put(lChar, map.get(lChar) - 1);
        if (map.get(lChar) == 0)
            map.remove(lChar);
    }

    maxLen = Math.max(maxLen, right - left + 1);
}
```

### 🎯 Problems:

- Longest Substring with At Most K Distinct Characters
- Longest Substring Without Repeating Characters
- Fruit Into Baskets
- Max Consecutive Ones III
- Count Nice Subarrays

---

## 🟦 **Pattern 3: First Non-Repeating Character in Stream**

> Use Queue + Frequency Array. Only queue when freq = 1

### ✅ Template:

```java
Queue<Character> q = new LinkedList<>();
int[] freq = new int[26];
StringBuilder result = new StringBuilder();

for (char ch : stream) {
    freq[ch - 'a']++;
    q.offer(ch);

    while (!q.isEmpty() && freq[q.peek() - 'a'] > 1)
        q.poll();

    result.append(q.isEmpty() ? '#' : q.peek());

```

### 🎯 Problem:

- First Non-Repeating Character in a Stream

---

## 🔃 **Pattern 4: Minimum Window Substring (Two Maps)**

> Use freq maps of required and current counts. Expand until window is valid, then contract.

### ✅ Template:

```java
Map<Character, Integer> need = new HashMap<>();
Map<Character, Integer> window = new HashMap<>();

for (char c : t.toCharArray())
    need.put(c, need.getOrDefault(c, 0) + 1);

int left = 0, right = 0, valid = 0;
int start = 0, len = Integer.MAX_VALUE;

while (right < s.length()) {
    char c = s.charAt(right++);
    // update window
    if (need.containsKey(c)) {
        window.put(c, window.getOrDefault(c, 0) + 1);
        if (window.get(c).equals(need.get(c)))
            valid++;
    }

    while (valid == need.size()) {
        if (right - left < len) {
            start = left;
            len = right - left;
        }

        char d = s.charAt(left++);
        if (need.containsKey(d)) {
            if (window.get(d).equals(need.get(d)))
                valid--;
            window.put(d, window.get(d) - 1);
        }
    }
}

return len == Integer.MAX_VALUE ? "" : s.substring(start, start + len);
```

### 🎯 Problems:

- Minimum Window Substring
- Minimum Window Subsequence (variation)
- Subarray with K different integers

---

## 🔢 **Pattern 5: Generate Binary Numbers from 1 to N using Queue**

> Classic queue simulation where every element generates next 2

### ✅ Template:

```java

Queue<String> q = new LinkedList<>();
q.offer("1");

while (n-- > 0) {
    String curr = q.poll();
    System.out.print(curr + " ");
    q.offer(curr + "0");
    q.offer(curr + "1");
}

```

### 🎯 Problem:

- Generate Binary Numbers

---

## 🍊 **Pattern 6: Rotten Oranges / BFS (Optional)**

> Multi-source BFS (all 2s rot adjacent 1s)

### ✅ Template:

```java

Queue<int[]> q = new LinkedList<>();
boolean[][] visited = new boolean[m][n];

for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        if (grid[i][j] == 2) {
            q.offer(new int[]{i, j});
            visited[i][j] = true;
        }
    }
}

int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
int time = 0;

while (!q.isEmpty()) {
    int size = q.size();
    for (int i = 0; i < size; i++) {
        int[] cell = q.poll();
        for (int[] dir : dirs) {
            int nx = cell[0] + dir[0], ny = cell[1] + dir[1];
            if (valid and not visited) {
                visited[nx][ny] = true;
                q.offer(new int[]{nx, ny});
            }
        }
    }
    time++;
}

```
