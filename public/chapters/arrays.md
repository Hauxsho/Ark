# Arrays

Arrays are one of the most fundamental data structures in computer science. They store elements in contiguous memory locations.

## Key Concepts

- **Indexing**: Access elements by their position (0-based)
- **Time Complexity**: O(1) for access, O(n) for search
- **Space Complexity**: O(n)

## Common Patterns

1. **Two Pointers**: Use two pointers moving towards each other
2. **Sliding Window**: Maintain a window of elements
3. **Prefix Sum**: Precompute cumulative sums

## Example Code

\`\`\`python
def two_sum(nums, target):
seen = {}
for i, num in enumerate(nums):
complement = target - num
if complement in seen:
return [seen[complement], i]
seen[num] = i
return []
\`\`\`

## Tips

- NONE
