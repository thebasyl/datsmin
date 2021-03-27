const fs = require('fs');

var _coinStorageCanary = function(options) 
{
    var coinStorageCanary;

    if (!options) options = {};

    loadCoins();

    function loadCoins() 
    {
        var path = (options.path ? options.path : './') + (options.fileName ? options.fileName : 'coinStorageCanary.json');
        var data = fs.readFileSync(path, 'utf8');
        if (!data) 
        {
            coinStorageCanary = {};
            return;
        }
        coinStorageCanary = JSON.parse(data);
    }

    function saveCoins() 
    {
        var path = (options.path ? options.path : './') + (options.fileName ? options.fileName : 'coinStorageCanary.json');
        fs.writeFile(path, JSON.stringify(coinStorageCanary, space = 4), (error) => 
        {
            if (error) console.error(error);
        });
    }

    function has(key)
    {
        return (coinStorageCanary[key] !== undefined);
    }

    function get(key) 
    {
        var coins = coinStorageCanary[key];
        if (coins == undefined) coins = 0;
        return coins;
    }

    function add(key, value) 
    {
        coinStorageCanary[key] = get(key) + value;
        saveCoins();
    }

    function subtract(key, value) 
    {
        coinStorageCanary[key] = get(key) - value;
        saveCoins();
    }

    function reset(key, value) 
    {
        coinStorageCanary[key] = coins = 0;
        saveCoins();
    }

    function set(key, value) 
    {
        coinStorageCanary[key] = coins = value;
        saveCoins();
    }

    return {
        has,
        get,
        add,
        subtract,
        saveCoins,
        reset,
        set
    };
}

module.exports = _coinStorageCanary;