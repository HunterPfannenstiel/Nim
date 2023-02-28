
# Nim Game

Play a game of Nim versus a friend or Bob Nim, the AI that knows how to win every game of Nim!


## The Logic Behind Bob Nim

Bob Nim is able to make the best moves possible by calculating what is known as a Nim sum over all piles of sticks. By calculating the Nim sum, Bob Nim knows exactly how many sticks to take and from which pile to make sure that there is no chance that he loses.


### Nim Sum

#### What is a Nim sum?

A Nim sum is a specific kind of addition over binary numbers. It is very similar to adding binary numbers but you do not carry bits over to the next column if there are any leftover from adding all bits in one column. Essentially, if there are an even amount of 1 bits in a column, the addition of that column is 0, if there are an odd amount of 1 bits in a column, the addition of that column is 1.

#### How can a Nim sum be used to make a move?

Calculating the Nim sum allows you to know what move to make in order to move into a kernel position. In progressively finite games, a kernel is known as a 'winning position'. By moving into a kernel position, you force the other player on their turn to move out of it because by definition, it is impossible to move from one kernel position directly to another kernel position. Since they moved out of the kernel on their move, you have the ability to move back into another kernel on your move. Eventually, the kernel will be the overall winning position.

#### What Represents a Kernel Position for a Nim Sum?
When the Nim sum is equal to 0, that means the current arrangement of sticks is in a kernel position. When the Nim sum is not equal to 0, that means there is a move that can be made to move into a kernel position.

### How to Make a Move Based on the Nim Sum

Assume we have 3 piles with 7, 8, and 10 sticks respectively. In binary this looks like:
| 8 | 4 | 2 | 1 |
| :-| :-| :-| :-|
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |

If we calculate the Nim sum, we get the following binary number:
| 0 | 1 | 0 | 1 |
| :-| :-| :-| :-|

With this Nim sum, we now want to know the stick arrangements that will make this Nim sum equal to 0

The process for finding an arrangement of sticks that will make our Nim sum equal to 0 is:
1. Look at the left most 1 bit in our Nim sum (in this case it is the bit in the column representing the value '4'). 
2. Find a pile that also contains a 1 bit in the same column (in this case its the 1st pile, the pile that has 7 sticks).
3. For every 1 bit in the Nim sum, we want to go to the corresponding column in our chosen pile and flip the bit. The pile representing 7 will now look like:

| 0 | 0 | 1 | 0 |
| :-| :-| :-| :-|

- This now tells us that we want the pile that contains 7 sticks to contain only 2 sticks (2 is the decimal form of the pile that we flipped)

4. Now if we recalculate our Nim sum, it should end being equal to 0

| 8 | 4 | 2 | 1 |
| :-| :-| :-| :-|
| 0 | 0 | 1 | 0 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 0 |

| 0 | 0 | 0 | 0 |
| :-| :-| :-| :-|

- Sure enough, it does!

By taking 5 sticks from the first pile, we can get a Nim sum of 0. Now there is no way for our opponent to also make a move that will give them a Nim sum of 0.
- By continuing this process after every move our oppenent makes, we will eventually be able to take the last sticks and win the game, which is exactly what Bob Nim does!

#### Important to note: 
If the initial arrangement of sticks before the game starts is a kernel position, you would want your opponent to make the first move so that they move out of the kernel which would allow you to move back into a kernel position.
