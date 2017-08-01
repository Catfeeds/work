if ( !Array.prototype.forEach ) {

    Array.prototype.forEach = function forEach( callback, thisArg ) {

        var T, k;

        if ( this == null ) {
            throw new TypeError( "this is null or not defined" );
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if ( typeof callback !== "function" ) {
            throw new TypeError( callback + " is not a function" );
        }
        if ( arguments.length > 1 ) {
            T = thisArg;
        }
        k = 0;

        while( k < len ) {

            var kValue;
            if ( k in O ) {

                kValue = O[ k ];
                callback.call( T, kValue, k, O );
            }
            k++;
        }
    };
}

if(!Object.create){
  Object.create = function (o) {
    function F(){}
    F.prototype = o;
    return new F();
  };
}

if(!Function.prototype.bind) {
  Function.prototype.bind = function(o) {
    var self = this,boundArgs = arguments;
    return function(){
      var args = [], i;
      for(i = 1; i < boundArgs.length; i++) args.push(boundArgs[i]);
      for(i = 0; i < arguments.length; i++) args.push(arguments[i]);
      return self.apply(o , args)
    }
  };
};