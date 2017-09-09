# Assumptions on tasks

## Task 3

The functioanlity is written, but it is not told when to execute it. Therefor I 
wrote a separate worker functionality so it can be executed in a different node 
instance.

## Task 4

It is told that I should return all hazardous NEOs. This works okay-ish on 
localhost. It takes 100ms - 150ms on my Linux Box, but one should assume that 
pagination could be more beneficial. Otherwise it could be possible to add a
memoize function that stores the response for an hour or so, as the queries are
not very specific / user related.

## Task 6 and 7

It is not clear, what kind of data should be returned, when hazardous is false.
I assumed to return all the results, including hazardous and non hazardous.
