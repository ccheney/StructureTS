/*
 * Copyright (c) 2013 Robert S. https://github.com/codeBelt/StructureTS
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without restriction,
 * including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NON-INFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

///<reference path=''/>

/**
 * The MathUtil...
 *
 * @class MathUtil
 * @module StructureTS
 * @submodule util
 * @constructor
 * @static
 **/
class MathUtil {
    /**
     * @overridden BaseObject.CLASS_NAME
     */
    public static CLASS_NAME:string = 'MathUtil';

    constructor()
    {
    }

    /**
     * Returns a number constrained between min and max.
     *
     * @method constrain
     * @param num {number}
     * @param min {number}
     * @param  max {number}
     * @return  {number}
     */
    public static constrain(num:number, min:number = 0, max:number = 1):number
    {
        if (num < min)
        {
            return min;
        }
        if (num > max)
        {
            return max;
        }
        return num;
    }


    /**
     * Returns a random number between min and max.
     *
     * @method randomRange
     * @param min {number}
     * @param max {number}
     * @return {number}
     */
    public static randomRange(min:number, max:number, round:boolean = false):number
    {
        var num:number = (min + Math.random() * (max - min));

        if (round)
        {
            return Math.round(num);
        }
        return num;
    }


    /**
     * Returns the percentage of a number in a given range.
     * Example: num = 15 range 10 to 20 // outputs 0.5
     *
     * @method rangeToPercent
     * @param num {number}
     * @param min {number}
     * @param max {number}
     * @param constrainMin {boolean}        Returns 0 if num < min.
     * @param constrainMax {boolean}        Returns 1 if num > max.
     * @return {number}
     */
    public static rangeToPercent(num:number, min:number, max:number, constrainMin:boolean = false, constrainMax:boolean = false):number
    {
        if (constrainMin && num < min)
        {
            return 0;
        }
        if (constrainMax && num > max)
        {
            return 1;
        }
        return (num - min) / (max - min);
    }


    /**
     * Returns the number that corresponds to the percentage in a given range.
     * Example: percent = 0.5 range 10 to 20 // outputs 15
     *
     * @method percentToRange
     * @param percent {number}
     * @param min {number}
     * @param max {number}
     * @return {number}
     */
    public static percentToRange(percent:number, min:number, max:number):number
    {
        return (percent * (max - min)) + min;
    }


    /**
     * Re-maps a number from one range to another. The output is the same as inputing the result of rangeToPercent() numbero percentToRange().
     * Example: num = 10, min1 = 0, max1 = 100, min2 = 0, max2 = 50 // outputs 5
     *
     * @method map
     * @param num {number}
     * @param min1 {number}
     * @param max1 {number}
     * @param min2 {number}
     * @param max2 {number}
     * @return {number}
     */
    public static map(num:number, min1:number, max1:number, min2:number, max2:number, round:boolean = true, constrainMin:boolean = true, constrainMax:boolean = true):number
    {
        if (constrainMin && num < min1)
        {
            return min2;
        }
        if (constrainMax && num > max1)
        {
            return max2;
        }

        var num1:number = (num - min1) / (max1 - min1);
        var num2:number = (num1 * (max2 - min2)) + min2;
        if (round)
        {
            return Math.round(num2);
        }
        return num2;
    }


    /**
     * Converts radians to degrees.
     *
     * @method radiansToDegrees
     * @param radians {number}
     * @return {number}
     */
    public static radiansToDegrees(radians:number):number
    {
        return (radians * 180 / Math.PI);
    }


    /**
     * Converts degrees to radians.
     *
     * @method degreesToRadians
     * @param degrees {number}
     * @return {number}
     */
    public static degreesToRadians(degrees:number):number
    {
        return (degrees * Math.PI / 180);
    }


    /**
     * Returns 1 if the value is >= 0. Returns -1 if the value is < 0.
     *
     * @method sign
     * @param num {number}
     * @return {number}
     */
    public static sign(num:number):number
    {
        if (num < 0)
        {
            return -1
        }
        return 1;
    }

    /**
     * Check if number is positive (zero is positive).
     *
     * @method isPositive
     * @param num {number} The number.
     * @return {boolean}
     */
    public isPositive(num:number):boolean
    {
        return (num >= 0);
    }

    /**
     * Check if number is negative.
     *
     * @method isNegative
     * @param num {number} The
     * @return {boolean}
     */
    public isNegative(num:number):boolean
    {
        return (num < 0);
    }

    /**
     * Check if number is odd (convert to Integer if necessary).
     *
     * @method isOdd
     * @param num {number} The number.
     * @return {boolean}
     */
    public isOdd(num:number):boolean
    {
        var i:number = new Number(num);
        var e:number = new Number(2);
        return Boolean(i % e);
    }

    /**
     * Check if number is even (convert to Integer if necessary).
     *
     * @method isEven
     * @param num {number} The number.
     * @return {boolean}
     */
    public isEven(num:number):boolean
    {
        var int:number = new Number(num);
        var e:number = new Number(2);
        return (int % e == 0);
    }

    /**
     * Check if number is Prime (divisible only by itself and one).
     *
     * @method isPrime
     * @param num {number} The number.
     * @return {boolean}
     */
    public isPrime(num:number):boolean
    {
        if (num > 2 && num % 2 == 0)
        {
            return false;
        }
        var l:number = Math.sqrt(num);
        var i:number = 3;
        for (i; i <= l; i += 2) if (num % i == 0)
        {
            return false;
        }
        return true;
    }

    /**
     * Calculate the factorial of the integer.
     *
     * @method factorial
     * @param num {number} The number.
     * @return {number}
     */
    public factorial(num:number):number
    {
        if (num == 0)
        {
            return 1;
        }
        var d:number = num.valueOf();
        var i:number = d - 1;
        while (i)
        {
            d = d * i;
            i--;
        }
        return d;
    }

    /**
     * Return an array of divisors of the integer.
     *
     * @method getDivisors
     * @param num {number} The number.
     * @return {Array.<number>}
     */
    public getDivisors(num:number):number[]
    {
        var r:number[] = [];
        for (var i:number = 1, e:number = num / 2; i <= e; i++) if (num % i == 0)
        {
            r.push(i);
        }
        if (num != 0)
        {
            r.push(num.valueOf());
        }
        return r;
    }

    /**
     * Convert Fahrenheit to Celsius.
     *
     * @method toCelsius
     * @param fahrenheit {number} The fahrenheit value.
     * @param decimals {number} The number of decimals.
     * @return {number}
     */
    public toCelsius(fahrenheit:number, decimals:number = 2):number
    {
        var d:String;
        var r:number = (5 / 9) * (fahrenheit - 32);
        var s:number[] = r.toString().split(".");
        if (s[1] != undefined)
        {
            d = s[1].substr(0, decimals);
        }
        else
        {
            var i:number = decimals;
            while (i > 0)
            {
                d += "0";
                i--;
            }
        }
        var c:String = s[0] + "." + d;
        return number(c);
    }

    /**
     * Convert Celsius to Fahrenheit.
     *
     * @method toFahrenheit
     * @param celsius {number} The celsius value.
     * @param decimals {number} The number of decimals.
     * @return {number}
     */
    public toFahrenheit(celsius:number, decimals:number = 2):number
    {
        var d:String;
        var r:number = (celsius / (5 / 9)) + 32;
        var s:number[] = r.toString().split(".");
        if (s[1] != undefined)
        {
            d = s[1].substr(0, decimals);
        }
        else
        {
            var i:number = decimals;
            while (i > 0)
            {
                d += "0";
                i--;
            }
        }
        var f:String = s[0] + "." + d;
        return number(f);
    }

}