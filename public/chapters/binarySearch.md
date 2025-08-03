### **Pattern 1: Classic Binary Search Template (Mid + Shrink Window)**

**Used in:**

- Basic BS (Iterative & Recursive)
- First Bad Version
- Infinite Sorted Array (with exponential window)
- Fixed Point
- Matrix Search
- Peak Element (1D)

**Concept**:

```java
int binarySearch(int[] arr, int target)
{
    int low = 0, high = arr.length - 1;

    while (low <= high)
    {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
	        return mid;
        else if (arr[mid] < target)
	        low = mid + 1;
        else
	        high = mid - 1;
    }

    return -1; // not found
}
```

---

### 🔹 **Pattern 2: Lower Bound / Upper Bound (≥ / > target)**

Used in:

- Lower Bound
- Upper Bound
- First & Last Occurrence
- Count of Element
- Insert Position
- Floor & Ceil
- Row with Maximum 1s
- Matrix Median

**Concept**: Find first index where a condition holds true (monotonic)

```java
int lowerBound(int[] arr, int target)
{
    int low = 0, high = arr.length - 1;
    int ans = arr.length;

    while (low <= high)
    {
        int mid = low + (high - low) / 2;

        if (arr[mid] >= target)  //So we are finding "first element that is ≥ target"
        {
            ans = mid;
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
    }
    return ans;
}

int upperBound(int[] arr, int target)
{
    int low = 0, high = arr.length - 1;
    int ans = arr.length;

    while (low <= high) // so here we are finding "first index greater than target"
    {
        int mid = low + (high - low) / 2;

        if (arr[mid] > target)
        {
		        // try to minimize further
            ans = mid;
            high = mid - 1;
        }
        else
        {
            low = mid + 1;
        }
    }
    return ans;
}
```

---

### 🔹 **Pattern 3: Binary Search on Answer / BS over Value Space**

Used in:

- Koko Eating Bananas
- Ship Packages
- Minimum Days to Make Bouquets
- Book Allocation
- Split Array
- Painter’s Partition
- Smallest Divisor
- Minimize Max Distance
- Aggressive Cows
- Matrix Median

**Concept**:

You’re not searching in `index`, you’re **guessing an answer**, and checking **if it's possible**

```java
int binarySearchAnswer(int low, int high)
{
    int ans = -1;

    while (low <= high)
    {
        int mid = low + (high - low) / 2;

        if (isPossible(mid))
        {
            ans = mid;         // we found a possible answer
            high = mid - 1;    // try to minimize further
        }
        else
        {
            low = mid + 1;
        }
    }

    return ans;
}
```

---

### 🔹 **Pattern 4: Pivot-Based Search (Rotated Sorted Array)**

Used in:

- Rotated Sorted Array I & II
- Find Minimum in Rotated Array
- Count Rotations
- Single Element in Sorted Array

**Concept**:

Use BS to find the **pivot or break point**, then apply search in sub-arrays.

So the idea is to play between

```java
int findPivot(int[] arr)
{
    int start = 0, end = nums.length - 1;

		while (start <= end) {
		    int mid = start + (end - start) / 2;

		    if (nums[mid] == target) return mid;

		    // LEFT half is sorted
		    if (nums[start] <= nums[mid]) {
		        if (nums[start] <= target && target < nums[mid]) {
		            end = mid - 1; // target lies in left sorted half
		        } else {
		            start = mid + 1;
		        }
		    }
		    // RIGHT half is sorted
		    else {
		        if (nums[mid] < target && target <= nums[end]) {
		            start = mid + 1; // target lies in right sorted half
		        } else {
		            end = mid - 1;
		        }
		    }
		}
		return -1;

}
```

---

### 🔹 **Pattern 5: Peak / Slope Based Binary Search**

Used in:

- Peak in 1D & 2D
- Bitonic Array Peak
- Mountain Array Peak
- Local Minima

**Concept**:

Find a point where `arr[mid] > arr[mid+1] && arr[mid] > arr[mid-1]`

(or the direction changes)

_“Idea is , we assume if something is greater ahead we say there will be a peak, if not we assume there was a peak before.”_

```java
int findPeak(int[] arr)
{
    int low = 0, high = arr.length - 1;

    while (low < high)
    {
        int mid = low + (high - low) / 2;

        if (arr[mid] < arr[mid + 1])
        {
            low = mid + 1; // move to slope up
        }
        else
        {
            high = mid; // move to slope down
        }
    }

    return low; // or high
}
```

---

### 🔹 **Pattern 6: Modified Mid Checks (Even/Odd Index, Count of Missing, etc.)**

Used in:

- Single Element in Sorted Array
- Kth Missing Number
- Count Missing in Infinite Array

**Concept**:

Add smart condition handling → not just `target == mid`, but index-based logic (even/odd, position count, etc.)

```java
int singleNonDuplicate(int[] arr)
{
    int low = 0, high = arr.length - 2;

    while (low <= high)
    {
        int mid = (low + high) / 2;

        if (mid % 2 == 0)  //even
        {
            if (arr[mid] == arr[mid + 1]) low = mid + 2;
            else high = mid - 1;
        }
        else //odd
        {
            if (arr[mid] == arr[mid - 1]) low = mid + 1;
            else high = mid - 1;
        }
    }

    return arr[low];
}
```

---

### 🔹 **Pattern 7: Exponential Range Expansion + BS (for Infinite arrays)**

Used in:

- Search in Infinite Sorted Array
- Count in Infinite Array

**Concept**:

Start with small range, expand exponentially till you go beyond target. Then apply classic BS

```java
int searchInInfiniteArray(int[] arr, int target)
{
    int low = 0, high = 1;

    // Expand the window exponentially until arr[high] > target
    while (arr[high] < target)
    {
        low = high;
        high *= 2;
    }

    // Now perform normal binary search
    while (low <= high)
    {
        int mid = low + (high - low) / 2;

        if (arr[mid] == target)
	        return mid;
        else if (arr[mid] < target)
	        low = mid + 1;
        else
	        high = mid - 1;
    }

    return -1;
}
```

**Notes :**

For 2D matrix BS :
Think it like this this is 3\*4 matrix

Index: 0 1 2 3 4 5 6 7 8 9 10 11
Value: [1, 3, 5, 7, 10, 11, 16, 20, 23, 30, 34, 60]

## ✅ You can use the **flattened Binary Search** trick **only when:**

### 1️⃣ Matrix is:

- Row-wise sorted **AND**
- First element of each row > last element of previous row

➡️ **This forms a fully sorted 1D view.**

---

## ❌ You **CANNOT** use this when:

### 2️⃣ Matrix is:

- Row-wise sorted **AND**
- Column-wise sorted
  BUT rows are not connected in order.

Example:

```
text
CopyEdit
[
 [1,  4,  7, 11],
 [2,  5,  8, 12],
 [3,  6,  9, 16]
]

```

Here:

- First elements in rows are not increasing strictly → Can't flatten it
- So, **flattened index trick fails**
