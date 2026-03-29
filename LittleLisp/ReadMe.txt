This archive contains the complete set of development and release files
for LittleLisp 1.01.

I hope that between the HTML docs and code comments, there will be enough
information to enable further development of LittleLisp, if so desired.

This software is released free of charge, and may be freely redistributed,
but note the disclaimer in the HTML docs re: the use of LittleLisp.

The kinds of files contained herein are:

 o Release packages.

 o Zip files containing docs and packages.

 o Windows Newton Toolkit 1.6.1 files (.NTK and .LYT) which constitute the source.

 o The NTK project exported as a text file (LittleLisp.txt).

 o Lambda symbol BMP files used for the animated LittleLisp icon.

The last time I looked, there was no way to convert a Windows NTK file to a
Mac NTK file, only vice versa. If still true and you only have access to Mac
NTK, I apologise. At worst, you will have to reconstruct the project (.NTK)
and layout (.LYT) files manually, and populate the appropriate frames with
code, as detailed in the exported LittleLisp.txt file.  

As you will be able to see by scanning through LittleLisp.txt, much of the
important code can be found as frames attached to slots in LittleLispMainView,
such as lexer, reader, writer, and especially evaluate, which is (metaphorically
speaking) the "mother of all frames" and is essentially the heart of the interpreter.
The ViewSetupFormScript of LittleLispMainView sets up important working variables. A
good way to see how the traditional Read-Eval-Print loop works in LittleLisp is to look 
at the evalButton frame code. Other button frames are also instructive, eg loadButton.
  
If you have questions, feel free to contact me. In particular, if you want more
information about the design of LittleLisp, please tell me, and I will provide
you with something more formal than this rather short ReadMe file. Moreover, if you
want more code comments in particular places, let me know.
 
Best regards

David Benn 

djbenn@ozemail.com.au
http://members.ozemail.com.au/~djbenn/

January 1 2002, Adelaide
