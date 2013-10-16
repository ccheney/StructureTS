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

/**
 * A MerchantUtility class that has several static methods to assist in development.
 *
 * @class MerchantUtil
 * @module StructureTS
 * @submodule util
 * @constructor
 * @version 0.1.0
 **/
class MerchantUtil {
    /**
     * @overridden BaseObject.CLASS_NAME
     */
    public static CLASS_NAME:string = 'MerchantUtil';

    constructor()
    {//    https://github.com/as3/as3-utils/tree/master/src/utils/validation
    }


    /**
     * Determines if credit card is valid using the Luhn formula.
     * @example
     * MerchantUtil.isCreditCard("1234567890123456");
     * 
     * @method isCreditCard
     * @param cardNumber {string} The credit card number.
     * @returns {boolean} <code>true</code> if String is a valid credit card number; otherwise <code>false</code>.
     * @public
     * @static
     */
    public static isCreditCard(cardNumber:string):boolean
    {
        if (cardNumber.length < 7 || cardNumber.length > 19 || Number(cardNumber) < 1000000)
            return false;

        var pre:number;
        var sum:number = 0;
        var alt:boolean = true;

        var i:number = cardNumber.length;
        while (--i > -1)
        {
            if (alt)
                sum += Number(cardNumber.substr(i, 1));
            else
            {
                pre = Number(cardNumber.substr(i, 1)) * 2;
                sum += (pre > 8) ? pre -= 9 : pre;
            }

            alt = !alt;
        }

        return sum % 10 == 0;
    }

    /**
     * Encode a credit card number as a string and encode all digits except the last <code>digitsShown</code>.
     *
     * @example
     * MerchantUtil.encodeCreditCardNumber("1234567890123456"); // ************3456
     * MerchantUtil.encodeCreditCardNumber("1234567890123456", 5, "x");  // xxxxxxxxxxx23456
     *
     * @method encodeCreditCardNumber
     * @param strNumber {string} The credit card number as string.
     * @param [digitsShown=4] {number} Display this many digits at the end of the card number for security purposes.
     * @param [encodeChar=*] {string} Optional encoding character to use instead of default '*'.
     * @returns {string}
     * @public
     * @static
     */
    public static encodeCreditCardNumber(strNumber:string, digitsShown:number = 4, encodeChar:string = "*"):string
    {
        var encoded:string = "";
        for (var i:number = 0; i < strNumber.length - digitsShown; i++)
        {
            encoded += encodeChar;
        }
        encoded += strNumber.slice(-digitsShown);
        return encoded;
    }

    /**
     * Returns a credit card provider name from the credit card number passed in.
     *
     * @method getCreditCardProvider
     * @param cardNumber {string}
     * @returns {string}
     */
    public static getCreditCardProvider(cardNumber:string):string
    {
        if (!MerchantUtil.isCreditCard(cardNumber))
        {
            return 'invalid';
        }


        if (cardNumber.length == 13 || cardNumber.length == 16 && cardNumber.indexOf('4') == 0)
        {
            return 'visa';
        }
        else if (cardNumber.indexOf('51') == 0 || cardNumber.indexOf('52') == 0 || cardNumber.indexOf('53') == 0 || cardNumber.indexOf('54') == 0 || cardNumber.indexOf('55') == 0 && cardNumber.length == 16)
        {
            return 'mastercard';
        }
        else if (cardNumber.length == 16 && cardNumber.indexOf('6011') == 0)
        {
            return 'discover';
        }
        else if (cardNumber.indexOf('34') == 0 || cardNumber.indexOf('37') == 0 && cardNumber.length == 15)
        {
            return 'amex';
        }
        else if (cardNumber.indexOf('300') == 0 || cardNumber.indexOf('301') == 0 || cardNumber.indexOf('302') == 0 || cardNumber.indexOf('303') == 0 || cardNumber.indexOf('304') == 0 || cardNumber.indexOf('305') == 0 || cardNumber.indexOf('36') == 0 || cardNumber.indexOf('38') == 0 && cardNumber.length == 14)
        {
            return 'diners';
        }
        else
        {
            return 'other';
        }
    }

    /**
     * Validate a credit card's expiration date.
     * @example
     * var isValidDate:boolean = MerchantUtil.isValidExDate( 11, 2010 );
     *
     * @method isValidExpirationDate
     * @param month {number}
     * @param year {number}
     * @returns {boolean}
     */
    public static isValidExpirationDate(month:number, year:number):boolean
    {
        var d:Date = new Date();
        var currentMonth:number = d.getMonth() + 1;
        var currentYear:number = d.getFullYear();
        if ((year > currentYear) || (year == currentYear && month >= currentMonth))
        {
            return true;
        }
        return false;
    }

}