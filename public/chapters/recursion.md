**Recursion is when a function calls itself** to break down a larger problem into smaller subproblems.

Example :

```java
void solve(int n)
{
	if(n == 0)
		return;

	solve(n-1);     // recursive call
	System.out.println(n); // do something
}
```

```java
solve(3)
|
|-> solve(2)
    |
    |-> solve(1)
        |
        |-> solve(0)  ❌ Base case: returns
        |
        <- print 1
    <- print 2
<- print 3
```

### Key Building Blocks

1. **Base Case** – when to stop (e.g., `n == 0`)
2. **Recursive Call** – call yourself with smaller input (`n-1`)
3. **Processing** – do something:
   - before calling → going down the tree
   - after calling → coming back up

Example:

```java
solve(int n)
{
	if(n==0)
		return 1;

	sout("WhileGoing " + n);
	solve(n-1);
	sout("WhileComingBack " + n)
}
```

### Core Patterns

Here’s the **high-level list** of recursion patterns every dev must master:

1️⃣ **Take or Not Take (Subsequence Pattern)**

```java
void solve(int i, List<Integer> curr)
{
    if(i == n) {
        ans.add(new ArrayList<>(curr));
        return;
    }

    curr.add(arr[i]);         // take
    solve(i+1, curr);
    curr.remove(curr.size()-1); // backtrack
    solve(i+1, curr);         // not take
}

Used in: subsets, target sum, combination sum
```

2️⃣ Backtracking (Choose → Check → Undo)

```java
for choice in choices:
    if valid:
        change();
        checkRecursion();
        undo();
```

**_SO VERY IMP STUFF_**

- **_Pick not pick is binary pattern , used to do when two choices are given_**
- **_Travel → choose → check → undo is more like graph pattern, and you have to choose from multiple scenarios [1,2,3]_**

**_THE CORE DIFF BETWEEN THEM IS_**

- **_Pick not pick → gives you all combinations_**
- **_Change undo → helps divide , not for all possible sets , but division_**

```java
| Pattern           | Intuition                        | Used For                            |
| ----------------- | -------------------------------- | ----------------------------------- |
| ✅ Pick / Not Pick | Include or exclude this element? | Subsets, Combinations, Subsequences |
| 🧠 Backtracking   | Try all valid *choices*          | Partitions, Constraints, Boards     |

```

The second one has multiple use cases :

### **Backtracking (Choose → Check → Undo)**

Used when we must try paths and revert if invalid

```java
for choice in choices:
    if valid [check]:
        choose it
        recurse
        un-choose (undo)
```

Used in: `N-Queen`, `Sudoku`, `Maze`

---

### 4️⃣ **Partition-Based Recursion**

```java
for (i=start; i<end; i++) {
    if valid partition:
        add it to path
        recurse(i+1)
        remove from path
}
```

Used in: `Palindrome Partitioning`

---

### 5️⃣ **Grid / Directional DFS**

```java
dfs(i, j):
    if out of bounds or visited → return
    mark visited
    dfs in 4 directions
    unmark visited
```

Used in: `Word Search`, `Rat in a Maze`, `Flood Fill`

---

YESSS 🔥 Let’s lock in the **core template code** for all three:

---

## 💥 1. SUBSETS (aka Power Set)

> Pattern: Pick / Not Pick

```java
java
Copy code
void subsets(int index, int[] nums, List<Integer> current, List<List<Integer>> result) {
    if (index == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    // Pick
    current.add(nums[index]);
    subsets(index + 1, nums, current, result);
    current.remove(current.size() - 1); // undo

    // Not Pick
    subsets(index + 1, nums, current, result);
}

```

---

## 💥 2. COMBINATIONS (choose `k` elements from `n`, no duplicates)

> Pattern: For loop from index + 1, no reuse, and no order

```java
java
Copy code
void combine(int index, int[] nums, int k, List<Integer> current, List<List<Integer>> result) {
    if (current.size() == k) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = index; i < nums.length; i++) {
        if (i > index && nums[i] == nums[i - 1]) continue; // Skip duplicates (if needed)

        current.add(nums[i]);
        combine(i + 1, nums, k, current, result); // i + 1 → don't reuse
        current.remove(current.size() - 1);       // backtrack
    }
}

```

---

## 💥 3. PERMUTATIONS (All possible arrangements of distinct elements)

> Pattern: Try every unused number, track with boolean[] used

```java
java
Copy code
void permute(int[] nums, boolean[] used, List<Integer> current, List<List<Integer>> result) {
    if (current.size() == nums.length) {
        result.add(new ArrayList<>(current));
        return;
    }

    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;

        used[i] = true;
        current.add(nums[i]);
        permute(nums, used, current, result);
        current.remove(current.size() - 1);
        used[i] = false; // undo
    }
}

```

---

### ⚡ Summary:

| Type        | Core Recursion Pattern                 |
| ----------- | -------------------------------------- |
| Subset      | Pick / Not Pick                        |
| Combination | For loop from `index`; no reuse        |
| Permutation | For loop from `0`; track with `used[]` |
