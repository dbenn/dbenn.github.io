// Status Bar Scroller.
//
// Permits easy customisation of delay, leading spaces, scroll direction 
// etc, via applet parameters.
//
// Spaces embedded in the messages are ignored by Netscape 3.0 and Internet
// Explorer 3.0, but not by the Java AppletViewer. Sigh. This problem may
// be addressed in a future release of this applet.
//
// Also, since the message being displayed in status bar by this applet
// is of varying length, and since the status bar of NS and IE seem to
// to align the text in a weird manner, the point at which the text
// disappears/appears may surprise you. Keeping the text being displayed
// the same length has no noticeable effect.
//
// Parameters:  bgcolor   = background color of applet to get around silly
//                          Netscape 3.0 bug which requires a non-zero
//                          width and height.
//              spaces    = leading spaces.
//              delay     = delay in milliseconds between each scroll motion.
//              direction = scroll left or right.
//              msgcount  = number of message strings to be concatenated.
//              msgN      = message strings 1..N.
//
// Of these, the first four are optional and default to current page's
// bgcolor, 100, 250, and LEFT.
//
// Author: David J Benn
//   Date: 30th,31st October,
//         1st November 1996,
//         4th December 1996

import java.awt.Color;

public class StatusScroller extends java.applet.Applet implements Runnable
{
final int DEFAULT_SPACES = 100;
final int DEFAULT_DELAY = 250;
final String DEFAULT_DIRECTION = "LEFT";

Thread StatusThread;
String msg = "", direction;
int maxMsgIndex, milliSeconds;

        public void init()
        {
        String paramVal;
        int i, msgCount, spaces;

                // Netscape 3.0 does not load a page
                // completely first time, if an applet
                // is specified as having a width/height
                // of 0 which this applet may well have!
                // OTOH, a width/height of 2 is fine!!
                // Go figure.
                //
                // The following hack assumes a white
                // background to suppress any applet
                // area which is showing. :(
                //
                // Rather than parameterise this, it
                // would be better to determine the
                // current page's bgcolor value.
                //
                // Get optional applet background color.
                //
                paramVal = getParameter("bgcolor");
                if (paramVal != null)
                {
                        if (paramVal.length() == 7 &&
                            paramVal.startsWith("#"))
                        // Expect a string of the form "#DDDDDD"
                        // where each D is a hexadecimal digit.
                        //
                        try
                        {
                          int R,G,B;
                          R = Integer.parseInt(paramVal.substring(1,3), 16);
                          G = Integer.parseInt(paramVal.substring(3,5), 16);
                          B = Integer.parseInt(paramVal.substring(5,7), 16);
                          this.setBackground(new Color(R,G,B));
                        }
                        catch (NumberFormatException e) { /* ignore */ }
                }

                // Get message count.
                //
                paramVal = getParameter("msgcount");
                if (paramVal != null)
                        msgCount = Integer.parseInt(paramVal);
                else
                {
                        msgCount = 0;
                        msg = "No message!";
                }

                // Get optional leading-spaces value.
                //
                paramVal = getParameter("spaces");
                if (paramVal != null)
                {
                        spaces = Integer.parseInt(paramVal);
                        if (spaces < 0) spaces = DEFAULT_SPACES;
                }
                else
                        spaces = DEFAULT_SPACES;

                // Accumulate message string.
                //
                for (i=1;i<=spaces;i++) msg += " ";  // precede with spaces

                for (i=1;i<=msgCount;i++)
                {
                        paramVal = getParameter("msg"+i);
                        if (paramVal != null) msg += paramVal;
                }

                // Get last message index.
                //
                if (!msg.equals("")) maxMsgIndex = msg.length()-1;

                // Get optional milliseconds delay value.
                //
                paramVal = getParameter("delay");
                if (paramVal != null)
                {
                        milliSeconds = Integer.parseInt(paramVal);
                        if (milliSeconds < 0) milliSeconds = DEFAULT_DELAY;
                }
                else
                        milliSeconds = DEFAULT_DELAY;

                // Get optional scroll direction.
                paramVal = getParameter("direction");
                if (paramVal != null)
                {
                        paramVal = paramVal.toUpperCase();

                        if (paramVal.equals("LEFT") ||
                            paramVal.equals("RIGHT")) direction = paramVal;
                        else
                                direction = DEFAULT_DIRECTION;
                }
                else
                        direction = DEFAULT_DIRECTION;
        }

        public void start()
        {
                // Create a new thread of execution for this
                // Applet and start it.
                //
                if (StatusThread == null)
                {
                        StatusThread = new Thread(this);
                        StatusThread.start();
                }
        }

        public void stop()
        {
                // Stop this Applet's thread and make the
                // Thread object available for GC.
                //
                if (StatusThread != null)
                {
                        StatusThread.stop();
                        StatusThread = null;
                }
        }

        public void run()
        {
        int n;

                if (direction.equals("LEFT"))
                        n = 0;
                else
                        n = maxMsgIndex;

                while(true)
                {
                        // Show Nth to maxMsgIndex characters.
                        //
                        getAppletContext().showStatus(msg.substring(n));

                        // Move left or right.
                        //
                        if (direction.equals("LEFT"))
                        {
                                ++n;
                                if (n > maxMsgIndex) n = 0;
                        }
                        else
                        {
                                --n;
                                if (n < 0) n = maxMsgIndex;
                        }

                        // Sleep for specified/default milliseconds.
                        //
                        try
                        {
                                Thread.sleep(milliSeconds);
                        }
                        catch(InterruptedException e) {};
                }
        }
}
