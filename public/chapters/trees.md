### 🔁 Pattern 1: **Recursive Traversal (DFS)**

Used in: Preorder, Inorder, Postorder, Path-based, Tree Properties

```java

void dfs(TreeNode node) {
    if (node == null) return;

    // preorder work
    dfs(node.left);      // left
    // inorder work
    dfs(node.right);     // right
    // postorder work
}

```

---

### 🧠 Pattern 2: **BFS / Level Order Traversal**

Used in: Level order, Zigzag, Views (Top/Bottom), Distance K, Burn Tree

```java

void bfs(TreeNode root) {
    if (root == null) return;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.add(root);

    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        for (int i = 0; i < levelSize; i++) {
            TreeNode curr = queue.poll();

            // process node here
            if (curr.left != null) queue.add(curr.left);
            if (curr.right != null) queue.add(curr.right);
        }
    }
}

```

---

### 🔁 Pattern 3: **Iterative Traversals (using Stack)**

Used in: Iterative Preorder/Inorder/Postorder

### 🔹 Iterative Inorder

```java

void inorderIterative(TreeNode root) {
    Stack<TreeNode> stack = new Stack<>();
    TreeNode curr = root;

    while (curr != null || !stack.isEmpty()) {
        while (curr != null) {
            stack.push(curr);
            curr = curr.left;
        }
        curr = stack.pop();
        // process(curr)
        curr = curr.right;
    }
}

```

### 🔹 Iterative Preorder

```java

void preorderIterative(TreeNode root) {
    if (root == null) return;
    Stack<TreeNode> stack = new Stack<>();
    stack.push(root);

    while (!stack.isEmpty()) {
        TreeNode node = stack.pop();
        // process(node)
        if (node.right != null) stack.push(node.right);
        if (node.left != null) stack.push(node.left);
    }
}

```

### 🔹 Iterative Postorder (2 stacks)

```java

void postorderIterative(TreeNode root) {
    if (root == null) return;
    Stack<TreeNode> s1 = new Stack<>();
    Stack<TreeNode> s2 = new Stack<>();

    s1.push(root);
    while (!s1.isEmpty()) {
        TreeNode node = s1.pop();
        s2.push(node);
        if (node.left != null) s1.push(node.left);
        if (node.right != null) s1.push(node.right);
    }

    while (!s2.isEmpty()) {
        TreeNode node = s2.pop();
        // process(node)
    }
}

```

---

### 🧭 Pattern 4: **Root to Node Path (Backtracking)**

Used in: Root to Node, Path Sum, LCA, K Distance

```java

boolean findPath(TreeNode node, int target, List<Integer> path) {
    if (node == null) return false;
    path.add(node.val);

    if (node.val == target) return true;

    if (findPath(node.left, target, path) || findPath(node.right, target, path))
        return true;

    path.remove(path.size() - 1); // backtrack
    return false;
}

```

---

### 🔗 Pattern 5: **View Based (Left, Right, Top, Bottom, Vertical)**

Common idea: BFS + extra data (level or column)

### 🔹 Top View (Column map + BFS)

```java

class Pair {
    TreeNode node;
    int col;
    Pair(TreeNode n, int c) { node = n; col = c; }
}

void topView(TreeNode root) {
    Map<Integer, Integer> map = new TreeMap<>();
    Queue<Pair> q = new LinkedList<>();
    q.add(new Pair(root, 0));

    while (!q.isEmpty()) {
        Pair p = q.poll();
        if (!map.containsKey(p.col))
            map.put(p.col, p.node.val);
        if (p.node.left != null) q.add(new Pair(p.node.left, p.col - 1));
        if (p.node.right != null) q.add(new Pair(p.node.right, p.col + 1));
    }
}

```

---

### 🔥 Pattern 6: **Burning Tree / Distance K using Parent Map**

Used in: Distance K, Burn Tree

```java

void markParents(TreeNode root, Map<TreeNode, TreeNode> parent) {
    Queue<TreeNode> q = new LinkedList<>();
    q.add(root);
    while (!q.isEmpty()) {
        TreeNode curr = q.poll();
        if (curr.left != null) {
            parent.put(curr.left, curr);
            q.add(curr.left);
        }
        if (curr.right != null) {
            parent.put(curr.right, curr);
            q.add(curr.right);
        }
    }
}

```

---

### 🔁 Pattern 7: **Tree Construction from Traversals**

Used in: Inorder + Preorder or Postorder

```java

TreeNode build(int[] preorder, int[] inorder) {
    Map<Integer, Integer> inMap = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) inMap.put(inorder[i], i);
    return helper(preorder, 0, preorder.length - 1, inorder, 0, inorder.length - 1, inMap);
}

TreeNode helper(int[] pre, int ps, int pe, int[] in, int is, int ie, Map<Integer, Integer> inMap) {
    if (ps > pe || is > ie) return null;
    TreeNode root = new TreeNode(pre[ps]);
    int ri = inMap.get(root.val);
    int leftSize = ri - is;

    root.left = helper(pre, ps + 1, ps + leftSize, in, is, ri - 1, inMap);
    root.right = helper(pre, ps + leftSize + 1, pe, in, ri + 1, ie, inMap);

    return root;
}

```

---

### 🧰 Pattern 8: **Serialize / Deserialize**

```java

// Serialize
String serialize(TreeNode root) {
    if (root == null) return "N,";
    return root.val + "," + serialize(root.left) + serialize(root.right);
}

// Deserialize
int idx = 0;
TreeNode deserialize(String[] data) {
    if (data[idx].equals("N")) {
        idx++;
        return null;
    }
    TreeNode node = new TreeNode(Integer.parseInt(data[idx++]));
    node.left = deserialize(data);
    node.right = deserialize(data);
    return node;
}

```
