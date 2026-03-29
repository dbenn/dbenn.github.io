// This applet displays the time as an offset in hours from local time.
//
// Parameters:	offset   - offset in hours from local time
//              update   - number of seconds between updates
//              bgcolor  - background colour of applet
//              fgcolor  - foreground colour for text of applet
//              fontname - name of the font to use for display
//              fontsize - name of the font to use for display
//
// All parameters are optional and have the defaults you'd probably expect:
//
//  offset   = 0
//  update   = 1 (any other value will cause seconds not to be displayed)
//  bgcolor  = the browser's default for applets, probably gray
//  fgcolor  = the browser's default for applets, probably black
//  fontname = Times Roman
//  fontsize = 12
//
// The formatted time string is centered in the applet's Panel.
//
// Future:      - Fix minor flicker
//              - Add text styles
//              - 12-hour clock (option)
//              - Date display (option)
//              - Localise format
//              - Analog clock (option)
//
// Author: David Benn
//   Date: 18th May 1998

import java.util.Date;
import java.lang.Math;
import java.awt.Font;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.FontMetrics;

public class AnyTime extends java.applet.Applet implements Runnable
{
    Thread anyTimeThread;

    FontMetrics fm;
    int halfTextHeight;
    int center_x, center_y;

    long offsetMSecs; // offset from local time in microseconds
    long updateMSecs; // update frequency in microseconds
    String timeText = ""; // formatted time string; empty for first paint()

    private void set_time_values()
    {
	String paramVal;

	double offset = 0; // default is local time
	int updateFreq = 1; // default is 1 second

	paramVal = getParameter("offset");
	if (paramVal != null)
	    try
            {
		offset = (new Double(paramVal)).doubleValue();
	    }
	    catch (NumberFormatException e) { /* ignore */ }

	paramVal = getParameter("update");
	if (paramVal != null)
	    try
            {
		updateFreq = Integer.parseInt(paramVal, 10);
	    }
	    catch (NumberFormatException e) { /* ignore */ }

	// Determine offset from local time in millseconds.
	offsetMSecs = Math.round(offset*60*60*1000);

	// Determine update frequency in millseconds.
	updateMSecs = updateFreq*1000;
    } 

    private void set_colors()
    {
	String paramVal;

	paramVal = getParameter("bgcolor");
	if (paramVal != null)
        {
	    if (paramVal.length() == 7 &&
		paramVal.startsWith("#"))
		// Expect a string of the form "#DDDDDD"
		// where each D is a hexadecimal digit.
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

	paramVal = getParameter("fgcolor");
	if (paramVal != null)
        {
	    if (paramVal.length() == 7 &&
		paramVal.startsWith("#"))
		// Expect a string of the form "#DDDDDD"
		// where each D is a hexadecimal digit.
		try
	        {
		    int R,G,B;
		    R = Integer.parseInt(paramVal.substring(1,3), 16);
		    G = Integer.parseInt(paramVal.substring(3,5), 16);
		    B = Integer.parseInt(paramVal.substring(5,7), 16);
		    this.setForeground(new Color(R,G,B));
		}
	        catch (NumberFormatException e) { /* ignore */ }
	}
    }

    private void set_font()
    {
	String paramVal;
	String fontName = "TimesRoman"; // default is Times Roman
	int fontSize = 12; // default is 12 point
	
	// Set the font if font name and/or size is specified.
	paramVal = getParameter("fontname");
	if (paramVal != null) fontName = paramVal; // otherwise use default

	paramVal = getParameter("fontsize");
	if (paramVal != null)
	    try
            {
		fontSize = Integer.parseInt(paramVal, 10);
	    }
	    catch (NumberFormatException e) { /* ignore */ }

	if (fontSize <= 0) fontSize = 12; // in case it gets trashed above
	
	Font theFont = new Font(fontName, Font.PLAIN, fontSize);
	if (theFont != null) setFont(theFont);

       	// Get text height of font in use.
	fm = getFontMetrics(getFont());
	halfTextHeight = fm.getHeight()/2;
    }

    public void init()
    {
	set_time_values();
	set_colors();
	set_font();

	// Find applet's center point.
	center_x = size().width / 2;
	center_y = size().height / 2;
    }

    public void start()
    {
	// Create a new thread of execution for this
	// Applet and start it.
	if (anyTimeThread == null)
	{
	    anyTimeThread = new Thread(this);
	    anyTimeThread.start();
	}
    }

    public void stop()
    {
	// Stop this Applet's thread and make the
	// Thread object available for GC.
	if (anyTimeThread != null)
        {
	    anyTimeThread.stop();
	    anyTimeThread = null;
	}
    }

    public void run()
    {
	Date now;
	String h, m, s;

	while(true)
        {
	    // Create date-time with desired offset.
	    now = new Date();
	    now.setTime(now.getTime()+offsetMSecs);

	    // Create output string.
	    h = "" + now.getHours();
	    if (h.length() == 1) h = "0" + h;
	    timeText = h;

	    m = "" + now.getMinutes();
	    if (m.length() == 1) m = "0" + m;
	    timeText += ":" + m;

	    // Don't display seconds if they won't be updated every second
	    // otherwise it will look pretty weird.
	    if (updateMSecs == 1000)
	    {
		s = "" + now.getSeconds();
		if (s.length() == 1) s = "0" + s;
		timeText += ":" + s;
	    }

	    // Update the time display.
	    repaint();

	    // Sleep for specified number of milliseconds.
	    try
	    {
		Thread.sleep(updateMSecs);
	    }
	    catch(InterruptedException e) { /* ignore */ };
	}
    }

    public void paint(Graphics g)
    {
	// Center the formatted time string in the applet's Panel.
	g.drawString(timeText, 
		     center_x - fm.stringWidth(timeText)/2, 
		     center_y + halfTextHeight);
    }
}
