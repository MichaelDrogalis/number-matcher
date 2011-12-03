// Issue 1: Bigger text.
            // Issue 2: No 0 numbers.
            
            var MAX = 10.0;
            
            var a = makeInitialRandomNumber();
            var b = makeDependantNumber(a);
            
            var formatted_a = formattedNumber(a);
            var formatted_b = formattedNumber(b);
            
            var trick_numbers = makeTrickNumbers(a, b);
            
            var board = makeBoard(formatted_a, formatted_b, trick_numbers);
            
            function makeInitialRandomNumber() {
                return (Math.round((Math.random() * MAX) * 100) / 100);
            }
            
            function makeDependantNumber(independant_number) {
                return (Math.round((MAX - independant_number) * 100) / 100);
            }
            
            function formattedNumber(number) {
                return number.toFixed(2);
            }
            
            function makeSimiliarNumber(number, used_numbers) {
                var similiar_number;
                
                do {
                    similiar_number = formattedNumber(similiarNumber(number));
                } while ((similiar_number == number) || contains(similiar_number, used_numbers));
                
                return similiar_number;
            }
            
            function similiarNumber(number) {
                return Math.floor((Math.floor(number * 10) + Math.random()) * 10) / 100;
            }
            
            function makeTrickNumbers(independant, dependant) {
                result = new Array();
                
                for (var k = 0; k < 4; k++) {
                    result[k] = makeSimiliarNumber(independant, result);
                }
                
                for (var k = 4; k < 7; k++) {
                    result[k] = makeSimiliarNumber(dependant, result);
                }
                
                return result;
            }
            
            function contains(a, obj) {
                var i = a.length;
                while (i--) {
                   if (a[i] === obj) {
                       return true;
                   }
                }
                return false;
            }
            
            function makeBoard(independant, dependant, trick_numbers) {
                return shuffle(flatten([independant, dependant, trick_numbers]));
            }
            
            function shuffle(array) {
                var tmp, current, top = array.length;

                if(top) while(--top) {
                    current = Math.floor(Math.random() * (top + 1));
                    tmp = array[current];
                    array[current] = array[top];
                    array[top] = tmp;
                }

                return array;
            }
            
            function flatten(array){
                var flat = [];
                for (var i = 0, l = array.length; i < l; i++){
                    var type = Object.prototype.toString.call(array[i]).split(' ').pop().split(']').shift().toLowerCase();
                    if (type) { flat = flat.concat(/^(array|collection|arguments|object)$/.test(type) ? flatten(array[i]) : array[i]); }
                }
                return flat;
            }