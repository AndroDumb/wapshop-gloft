/**
 * Sets a cookie for the current domain
 *
 * @param name
 * @param value
 * @param seconds [ optional ]
 */
function setcookie(name, value, seconds)
{
    var expires = '';
    var domain = "; domain=.gameloft.com";
    var path = '; path=/';

    if (seconds)
    {
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie = name + "=" + value + expires + domain + path;
}

/**
 * Returns the requested cookie
 *
 * @param name
 * @returns {mixed}
 */
function cookies(name)
{
    var cookieValue;
    var cookieString = new String(document.cookie);
    var cookieStart = cookieString.indexOf(name + '=');

    cookieValue = null;

    if (cookieStart !== -1)
    {
        var cookieEnd = cookieString.indexOf(';', cookieStart);

        if(cookieEnd === -1)
        {
            cookieEnd = cookieString.length;
        }

        var cookieSubstring = cookieString.substring(cookieStart, cookieEnd);
        var cookiePieces = cookieSubstring.split('=');
        cookieValue = cookiePieces[1];
    }

    return cookieValue;
}