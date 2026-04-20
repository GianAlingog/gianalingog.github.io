---
title: Square Root Decomposition
description: Fake divide and conquer.
slug: square-root-decomposition
date: 2026-04-20 00:00:00+0000
image: 
categories:
    - Computer Science
tags:
    - Square Root Decomposition
    - Block Decomposition
math: true
---

## Introduction to Block Decomposition
Block decomposition is a technique used to answer range queries efficiently by splitting the whole interval $[1, N]$ into blocks of size $B$, resulting in $\left \lceil \frac{N}{B} \right \rceil$ of these blocks, with the last block possibly being incomplete.

### Example 1
Let's go over an example problem together.

Given an integer array $A$ of length $N$, answer $Q$ queries of the form, "find the sum of the integers in the range $[l, r]$." Formally, return $\sum_{i=l}^{r} A_i$.
<br>$A_i \leq 10^9$
<br>$N, Q \leq 10^5$

A straightforward $\Theta(NQ)$ algorithm by iterating through all the elements in the range given by each query. If you are familiar with [prefix sums](/p/prefix-sums/) to achieve $\Theta(N+Q)$, forget about that for now.

#### Solution
What we can do to achieve a better time complexity is block decomposition!

##### Precomputation
Divide the array into blocks of size $B$ (which we will determine the value of later --- though you can probably guess what it will be). As discussed before this will split the array into $\left \lceil \frac{N}{B} \right \rceil$ blocks of size at most $B$. Then, for each of these blocks, let's precompute the sum of all the elements in this block and denote $\mathrm{sum}(i)$ as the sum for block $i$. This will take $\Theta(N)$ across all blocks.

##### Handling Queries
To answer the range queries, we need to iterate over the blocks that have some intersection with $[l, r]$. It's clear that the bound for this is $O(\left \lceil \frac{N}{B} \right \rceil)$. For blocks that are fully contained within $[l, r]$, we can take find the sum of these elements in $\Theta(1)$ each because we precomputed these values previously.

Then, we just need to handle the blocks that are not fully contained. Convince yourself that there are at most $2$ of these blocks. We can simply iterate over the relevant elements in these blocks in $O(B)$.

Our runtime is thus $O(B + \left \lceil \frac{N}{B} \right \rceil)$ per query and $O(N + Q(B + \left \lceil \frac{N}{B} \right \rceil))$ overall.

### Choosing the Block Size
Intuitively, we want to balance the time between the $O(B)$ part and the $O(\left \lceil \frac{N}{B} \right \rceil)$ part of our queries. We can actually just set them equal to each other for the best case:
$$ B = \frac{N}{B} $$
$$ B^2 = N $$
$$ B = \sqrt{N} $$

This is how square root decomposition is motivated. We balance the operations between iterating over blocks and iterating over elements in blocks.

#### More Complex Block Sizes
There are times when we might have a more unbalanced equation, typically when there are $\mathrm{log}$ factors involved.
For example:

$$ B \mathrm{log}(B) = \frac{N}{B} $$
$$ B^2 \mathrm{log}(B) \le B^2 \mathrm{log}(N) = N $$
$$ B^2 = \frac{N}{\mathrm{log}(N)} $$
$$ B = \sqrt{\frac{N}{\mathrm{log}(N)}} $$

We achieve a better runtime by doing so, rather than blindly applying $\sqrt{N}$.

## Moving Forward

#### Other Queries

##### Handling Updates
Say we also had updates to change the value at an index to a new one. We can update the element in its block in $O(1)$, but that's not the only data that was affected by the update. We also need to update the $\mathrm{sum}(i)$ for the respective block $i$. We can simply recalculate this in $O(\left \lceil \frac{N}{B} \right \rceil)$. This still result in the same runtime as before: $O(N + Q(B + \left \lceil \frac{N}{B} \right \rceil))$.

#### Resources
- [CP Algorithms - Sqrt Decomposition](https://cp-algorithms.com/data_structures/sqrt_decomposition.html)
