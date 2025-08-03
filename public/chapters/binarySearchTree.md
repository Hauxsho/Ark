### 1️⃣ **Search / Insert / Min / Max Template**

```java

// Search
public TreeNode searchBST(TreeNode root, int val) {
    if (root == null || root.val == val) return root;
    return val < root.val ? searchBST(root.left, val) : searchBST(root.right, val);
}

// Insert
public TreeNode insertIntoBST(TreeNode root, int val) {
    if (root == null) return new TreeNode(val);
    if (val < root.val) root.left = insertIntoBST(root.left, val);
    else root.right = insertIntoBST(root.right, val);
    return root;
}

// Min
public int findMin(TreeNode root) {
    while (root.left != null) root = root.left;
    return root.val;
}

// Max
public int findMax(TreeNode root) {
    while (root.right != null) root = root.right;
    return root.val;
}

```

---

### 2️⃣ **Delete Node in BST (3 cases)**

```java

public TreeNode deleteNode(TreeNode root, int key) {
    if (root == null) return null;
    if (key < root.val) root.left = deleteNode(root.left, key);
    else if (key > root.val) root.right = deleteNode(root.right, key);
    else {
        if (root.left == null) return root.right;
        if (root.right == null) return root.left;
        TreeNode minRight = findMinNode(root.right);
        root.val = minRight.val;
        root.right = deleteNode(root.right, minRight.val);
    }
    return root;
}
private TreeNode findMinNode(TreeNode node) {
    while (node.left != null) node = node.left;
    return node;
}

```

---

### 3️⃣ **Inorder Traversal Template**

```java

// Recursive
public void inorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    inorder(root.left, result);
    result.add(root.val);
    inorder(root.right, result);
}

```

---

### 4️⃣ **Validate BST Template**

```java

public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}
private boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return validate(node.left, min, node.val) &&
           validate(node.right, node.val, max);
}

```

---

### 5️⃣ **Kth Smallest Element (Inorder + Counter)**

```java

int count = 0, result = -1;
public int kthSmallest(TreeNode root, int k) {
    inorder(root, k);
    return result;
}
private void inorder(TreeNode node, int k) {
    if (node == null) return;
    inorder(node.left, k);
    count++;
    if (count == k) result = node.val;
    inorder(node.right, k);
}

```

---

### 6️⃣ **Inorder Successor Template**

```java

public TreeNode inorderSuccessor(TreeNode root, TreeNode p) {
    TreeNode successor = null;
    while (root != null) {
        if (p.val < root.val) {
            successor = root;
            root = root.left;
        } else {
            root = root.right;
        }
    }
    return successor;
}

```

---

### 7️⃣ **Construct BST from Preorder Template**

```java

int idx = 0;
public TreeNode bstFromPreorder(int[] preorder) {
    return helper(preorder, Integer.MAX_VALUE);
}
private TreeNode helper(int[] preorder, int bound) {
    if (idx == preorder.length || preorder[idx] > bound) return null;
    TreeNode root = new TreeNode(preorder[idx++]);
    root.left = helper(preorder, root.val);
    root.right = helper(preorder, bound);
    return root;
}

```

---

### 8️⃣ **BST Iterator Template**

```java

class BSTIterator {
    Stack<TreeNode> stack = new Stack<>();
    public BSTIterator(TreeNode root) {
        pushAllLeft(root);
    }
    public int next() {
        TreeNode node = stack.pop();
        pushAllLeft(node.right);
        return node.val;
    }
    public boolean hasNext() {
        return !stack.isEmpty();
    }
    private void pushAllLeft(TreeNode node) {
        while (node != null) {
            stack.push(node);
            node = node.left;
        }
    }
}

```

---

### 9️⃣ **Two Sum in BST using HashSet**

```java

public boolean findTarget(TreeNode root, int k) {
    Set<Integer> set = new HashSet<>();
    return dfs(root, k, set);
}
private boolean dfs(TreeNode node, int k, Set<Integer> set) {
    if (node == null) return false;
    if (set.contains(k - node.val)) return true;
    set.add(node.val);
    return dfs(node.left, k, set) || dfs(node.right, k, set);
}

```

---

### 🔟 **Largest BST in Binary Tree (Postorder Info)**

```java

class Info {
    boolean isBST;
    int size, min, max;
    Info(boolean isBST, int size, int min, int max) {
        this.isBST = isBST; this.size = size;
        this.min = min; this.max = max;
    }
}

int maxBST = 0;
public int largestBSTSubtree(TreeNode root) {
    postorder(root);
    return maxBST;
}
private Info postorder(TreeNode root) {
    if (root == null) return new Info(true, 0, Integer.MAX_VALUE, Integer.MIN_VALUE);

    Info left = postorder(root.left);
    Info right = postorder(root.right);

    if (left.isBST && right.isBST && root.val > left.max && root.val < right.min) {
        int size = 1 + left.size + right.size;
        maxBST = Math.max(maxBST, size);
        return new Info(true, size, Math.min(root.val, left.min), Math.max(root.val, right.max));
    }
    return new Info(false, 0, 0, 0);
}

```
