We occasionally come across edge cases in which JavaScript's native ```toFixed()``` does not accurately round the number. We can simulate calculations like ```1.005 * 100``` with ```1.005e2```(using exponential notation).

This is less of a practical exercise as it is as an exercise to think about how the calculation would be done by just using string manipulation to move the decimal point. Without using multiplication or exponential notation write ```toFixed``` to move the decimal point, round the number and then move the decimal point back using only string manipulation.

So in the example above, instead of using ```1.005e2```, figure out a way to work with the string ```"1.005"``` and then create a new string with the decimal point moved over two places to the right. In other words, you need to turn ```"1.005"``` into ```"100.5"``` using string manipulation.

Include tests that cover the weird cases such as  ```0.615```, ```10.235```, and ```1.005```.

