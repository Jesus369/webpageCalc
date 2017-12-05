// Defining our variables
memory = "0"       // for memory value
Current = "0"      //  the starting value and current value that'll display
operation = 0;     // stores operations (x, /, +, -, =)
MAXLENGTH = 30;    // maximum number of digits before decimal

// Define individual functions
// AddDigit will add a number to the display

function AddDigit(dig)          // Keeping what is displayed as current("0") and replacing it with a new number
 { if (Current.indexOf("!") == -1)  //if not already an error
    { if (    (eval(Current) == 0)
              && (Current.indexOf(".") == -1)
         ) { Current = dig;
           } else
           { Current = Current + dig;
           };
      Current = Current.toLowerCase(); // Force to lowercase!
    } else
    { Current = "Hint! Press 'AC'";  // If error continues, notify the user for assistance
    };
   if (Current.indexOf("e0") != -1)
     { var epos = Current.indexOf("e");
       Current = Current.substring(0,epos+1) + Current.substring(epos+2);
     };
  if (Current.length > MAXLENGTH)
     { Current = "Too long"; // do not allow for the digits to exceed MAXLENGTH
     };
   document.Calculator.Display.value = Current;
 }

function Dot()                  // PUT IN "." if appropriate.
 {
  if ( Current.length == 0)     //no leading ".", use "0."
    { Current = "0.";
    } else
    {  if (   ( Current.indexOf(".") == -1)
            &&( Current.indexOf("e") == -1)
          )
         { Current = Current + ".";
    };   };
  document.Calculator.Display.value = Current;
 }

function DoExponent()
 {
  if ( Current.indexOf("e") == -1 )
       { Current = Current + "e0";
         document.Calculator.Display.value = Current;
       };
 }

function PlusMinus()
 {
  if  (Current.indexOf("e") != -1)
    { var epos = Current.indexOf("e-");
      if (epos != -1)
         { Current = Current.substring(0,1+epos) + Current.substring(2+epos); //clip out -ve exponent
         } else
         { epos = Current.indexOf("e");
           Current = Current.substring(0,1+epos) + "-" + Current.substring(1+epos); //insert -ve exponent
         };
    } else
    {  if ( Current.indexOf("-") == 0 )
         { Current = Current.substring(1);
         } else
         { Current = "-" + Current;
         };
       if (    (eval(Current) == 0)
            && (Current.indexOf(".") == -1 )
          ) { Current = "0"; };
    };
  document.Calculator.Display.value = Current;
 }

function Clear()                //CLEAR ENTRY
 { Current = "0";
   document.Calculator.Display.value = Current;
 }

function AllClear()             // Clear ALL entries!
 { Current = "0";
   Operation = 0;                // clear operation
   Memory = "0";                  // clear memory
   document.Calculator.Display.value = Current;
 }

function Operate(op)            // store operation symbols
 {
 if (Operation != 0) { Calculate(); }; //'Press "=" if pending operation!

  if (op.indexOf("*") > -1) { Operation = 1; };       // multiplication
  if (op.indexOf("/") > -1) { Operation = 2; };       // division
  if (op.indexOf("+") > -1) { Operation = 3; };       // addition
  if (op.indexOf("-") > -1) { Operation = 4; };       // subtraction

  Memory = Current;                 //storing the value entered/displayed
  // note how e.g. Current.value gives neither error nor value! ***
  Current = "";
  document.Calculator.Display.value = Current;
 }

function Calculate()            // Performing the calculation
 {
  if (Operation == 1) { Current = eval(Memory) * eval(Current); };  // perform multiplication
  if (Operation == 2)                                               // perform division
    { if (eval(Current) != 0)
      { Current = eval(Memory) / eval(Current)
      } else
      { Current = "No no no no no! Divide by zero"; //don't allow over MAXLENGTH digits before "."
      }
    };
  if (Operation == 3) { Current = eval(Memory) + eval(Current); };  // perform addition
  if (Operation == 4) { Current = eval(Memory) - eval(Current); };  // perform subtraction
  Operation = 0;                //clear operation
  Memory = "0";                  //clear memory
  Current = Current + "";       //FORCE A STRING!
  if (Current.indexOf("Infinity") != -1)        //eg "1e320" * 1
    { Current = "Aargh! Value too big";
    };
  if (Current.indexOf("NaN") != -1)        //eg "1e320" / "1e320"
    { Current = "Aargh! I don't understand";
    };
  document.Calculator.Display.value = Current;
  // NOTE: if no operation, nothing changes, Current is left the same!
 }

function FixCurrent()
 {
  Current = document.Calculator.Display.value;
  Current = "" + parseFloat(Current);
  if (Current.indexOf("NaN") != -1)
    { Current = "Aargh! I don't understand";
    };
  document.Calculator.Display.value = Current;
 }
