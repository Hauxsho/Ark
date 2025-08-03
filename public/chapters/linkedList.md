## What is a Linked List?

A **Linked List** is a linear data structure where elements are **stored in nodes**, and each node **points to the next one** using a reference (called `next`).

Unlike arrays:

- ✅ **Dynamic size** (no resizing needed)
- ✅ **Easy insertion/deletion** at head/middle
- ❌ **No direct indexing** (can’t do `arr[3]`)

---

## 🧱 What is a Node?

A **Node** is a building block of a linked list.

```java
java
CopyEdit
class ListNode {
    int val;
    ListNode next;

    ListNode(int val) {
        this.val = val;
        this.next = null;
    }
}

```

Each node contains:

- 🔢 `val`: the actual data
- 🔗 `next`: reference to the next node (or `null` if it’s the last node)

---

## 🧵 How Linked List Looks (Visually)

### Example: 10 → 20 → 30 → null

```
css
CopyEdit
[10|next] → [20|next] → [30|null]
  ↑           ↑           ↑
 head       node2       tail

```

---

## 🧠 Types of Linked Lists

| Type                        | Description              | Code                                   |
| --------------------------- | ------------------------ | -------------------------------------- |
| Singly Linked List          | Points only to next      | `node.next`                            |
| Doubly Linked List          | Points to next and prev  | `node.next`, `node.prev`               |
| Circular Linked List        | Last node points to head | `tail.next = head`                     |
| Circular Doubly Linked List | DLL + circular           | `tail.next = head`, `head.prev = tail` |

---

## 🔧 Basic Operations in LL

| Operation      | Description                            |
| -------------- | -------------------------------------- |
| Insert at head | Add a node at the beginning            |
| Insert at tail | Add at end (need to loop to last node) |
| Delete node    | Remove node (with value or position)   |
| Search         | Traverse and compare                   |
| Reverse        | Rewire the links                       |

---

## ⚙️ Why Use Linked List?

✅ Pros:

- Dynamic memory allocation
- No memory wastage
- Easy insertion/deletion

❌ Cons:

- No random access (`arr[i]` is faster in arrays)
- Extra space for storing pointers (`next`)

---

## 📌 When to Use?

| Use case                      | Prefer      |
| ----------------------------- | ----------- |
| Frequent insertions/deletions | Linked List |
| Random indexing, searching    | Array       |

---

# Patterns Involved in Linked List

### 🔁 1. **Traversal Pattern (Iterative)**

Used in: Print, Count, Search, Length, etc.

```java

ListNode curr = head;
while (curr != null) {
    // do something with curr.val
    curr = curr.next;
}

```

---

### 🔄 2. **Traversal (Recursive)**

```java

void traverse(ListNode node) {
    if (node == null) return;
    // do something before or after recursion
    traverse(node.next);
}

```

---

### 🔧 3. **Insertion at Head**

```java

ListNode newNode = new ListNode(val);
newNode.next = head;
head = newNode;

```

---

### 🧹 4. **Deletion of a Node (given value)**

Find node, maintain prev pointer.

```java

ListNode curr = head, prev = null;
while (curr != null) {
    if (curr.val == target) {
        if (prev == null) head = curr.next;
        else prev.next = curr.next;
        break;
    }
    prev = curr;
    curr = curr.next;
}

```

---

### 🐢🐇 5. **Tortoise-Hare (Slow-Fast Pointer)**

Used in: middle element, loop detection, finding intersection

```java

ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}

```

---

### 🔁 6. **Reverse Linked List (Iterative)**

Used in multiple questions: reverse, palindrome, K-group reverse

```java

ListNode prev = null, curr = head;
while (curr != null) {
    ListNode next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
}
return prev;

```

---

### 🔁 7. **Reverse Linked List (Recursive)**

```java

ListNode reverse(ListNode head) {
    if (head == null || head.next == null) return head;
    ListNode newHead = reverse(head.next);
    head.next.next = head;
    head.next = null;
    return newHead;
}

```

---

### 🔗 8. **Find Nth Node from End**

Using 2 pointers with gap of N steps.

```java

ListNode fast = head, slow = head;
for (int i = 0; i < n; i++) fast = fast.next;
while (fast != null) {
    fast = fast.next;
    slow = slow.next;
}
// now slow points to nth node from end

```

---

### 🔁 9. **Remove Duplicates from Sorted List**

```java

ListNode curr = head;
while (curr != null && curr.next != null) {
    if (curr.val == curr.next.val)
        curr.next = curr.next.next;
    else
        curr = curr.next;
}

```

---

### 🧠 10. **Cycle Detection (Floyd’s Algorithm)**

```java

ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true;
}
return false;

```
