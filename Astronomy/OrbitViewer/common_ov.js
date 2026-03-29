  // dbenn@computer.org, June-October 2004, April, July 2006

  // ** COOKIE CODE (originally attributed to Bill Dortch) **
  // http://tech.irt.org/articles/js025/index.htm re: cookies?

  /*
   name - name of the cookie
   value - value of the cookie
   [expires] - expiration date of the cookie
     (defaults to end of current session)
   [path] - path for which the cookie is valid
     (defaults to path of calling document)
   [domain] - domain for which the cookie is valid
     (defaults to domain of calling document)
   [secure] - Boolean value indicating if the cookie transmission requires
     a secure transmission
   - an argument defaults when it is assigned null as a placeholder
   - a null placeholder is not required for trailing omitted arguments
  */
  function setCookie(name, value, expires, path, domain, secure) {
    var curCookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires.toGMTString() : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
    document.cookie = curCookie;
  }

  /*
    name - name of the desired cookie
    return string containing value of specified cookie or null
    if cookie does not exist
  */
  function getCookie(name) {
    var dc = document.cookie;
    var prefix = name + "=";
    var begin = dc.indexOf("; " + prefix);
    if (begin == -1) {
      begin = dc.indexOf(prefix);
      if (begin != 0) return null;
    } else {
      begin += 2;
    }
    var end = document.cookie.indexOf(";", begin);
    if (end == -1)
    end = dc.length;
    return unescape(dc.substring(begin + prefix.length, end));
  }

  /*
    name - name of the cookie
    [path] - path of the cookie (must be same as path used to create cookie)
    [domain] - domain of the cookie (must be same as domain used to
    create cookie)
    path and domain default if assigned null or omitted if no explicit
    argument proceeds
  */
  function deleteCookie(name, path, domain) {
    if (getCookie(name)) {
      document.cookie = name + "=" +
      ((path) ? "; path=" + path : "") +
      ((domain) ? "; domain=" + domain : "") +
      "; expires=Thu, 01-Jan-70 00:00:01 GMT";
    }
  }

  /*
    date - any instance of the Date object
    hand all instances of the Date object to this function for "repairs"
  */
  function fixDate(date) {
    var base = new Date(0);
    var skew = base.getTime();
    if (skew > 0)
      date.setTime(date.getTime() - skew);
  }

  // ** COMMON CODE **

  whitespace = /\s+/;

  months = { Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05",
             Jun: "06", Jul: "07", Aug: "08", Sep: "09", Oct: "10",
             Nov: "11", Dec: "12" };

  // Return a date given days from now.
  // Note that if the actual parameter is negative, the date will be
  // in the past.
  function getRelativeDate(deltaDays) {
      var theDate = new Date();
      theDate = new Date(theDate.getTime() + deltaDays*24*60*60*1000);
      fixDate(theDate);
      return theDate;
  }

  function getMonthNumber(monthName) {
      
      // Given a month string, return a string
      // representing the month number as 2 digits.
      // First shorten the month name to the first
      // 3 letters to avoid MPC format inconsistencies.

      monthName = monthName.substr(0,3);
      return months[monthName];
  }

  function getTwoDigitDayNumber(num) {

      // Given a number, return a two digit day number
      // such that 0..9 => 00..09 and num>=10 => num,

      return (num < 10) ? "0"+num : num;
  }

  function reformatName(nameLine) {

      // Tokenise name line, joining each with a single space to limit
      // the visual weirdness of some long name lines (with much 
      // intervening whitespace) I've encountered.

      nameTokens = nameLine.split(whitespace);
      nameValue = nameTokens[0];
      for (var i=1;i<nameTokens.length;i++) {
        nameValue = nameValue.concat(" ", nameTokens[i]);
      }

      return nameValue;
  }

  function getFieldValue(line, key, pattern) {

      // Tokenise the line, search for the specified key, and
      // return the corresponding value which is assumed to be
      // the subsequent token. Note that we allow for the key
      // to be a substring of a token.

      delimiter = (pattern) ? pattern : whitespace;

      tokens = line.split(delimiter);
      index = -1;
      for (var i=0;i<tokens.length && index == -1;i++) {
        if (tokens[i].indexOf(key) == 0) index = i;
      }

      return tokens[index+1];
  }

  /*
    Create applet element and add all attributes from
    the form elements. We also return the object's params
    as a string, each separated by a space.
  */
  function createApplet(appletSize, elements) {
      var applet = document.createElement("applet");
      applet.setAttribute("id", "applet_target");
      applet.setAttribute("code", "OrbitViewer.class");
      applet.setAttribute("archive", "OrbitViewer.jar");
      applet.setAttribute("width", appletSize.width.value);
      applet.setAttribute("height", appletSize.height.value);

      // Insert the applet by first removing the original target 
      // element and then adding a new one.
      var targetParent = document.getElementById("applet_target_parent");
      var target = document.getElementById("applet_target");
      targetParent.removeChild(target);
      targetParent.appendChild(applet, target);

      // Add orbital elements to applet object and also return them
      // in a space-delimited string.
      var paramStr = "";
      for (var i=0; i<elements.length; i++) {
        var param = document.createElement("param");
        if (elements[i].name.length > 0) {
          // Only include name-value pairs, not from widgets such as
          // buttons which have not been given a name.
          param.setAttribute("name", elements[i].name);
          param.setAttribute("value", elements[i].value);
          applet.appendChild(param);
          paramStr += elements[i].name + " " + elements[i].value;
          if (i < elements.length-1) {            
            paramStr += " ";
          }
        }
      }

      return paramStr;
  }

  /*
    Render the applet on the page, add the object to the
    popup menu, and persist information about the object
    as a cookie.
  */
  function invokeOrbitViewer(appletSize, elements, objListName, objMenuName) {

      // Render the applet for this object.
      var paramStr = createApplet(appletSize, elements);

      // What's the name of this object?
      var name = elements.name.value;

      // Persist orbital elements. This will overwrite previous entry,
      // which is reasonable since one or more of the orbital element
      // fields may have changed.
      setCookie(name, paramStr, getRelativeDate(90));
      
      // Add object to the popup menu and list assuming it doesn't
      // already exist in each. Ensure new menu item is selected.
      var objList = getCookie(objListName);
      if (objList == null || !isMember(name, objList.split(":"))) {
        var popupMenu = document.getElementById(objMenuName);
        var listItem = document.createElement("option");
        listItem.appendChild(document.createTextNode(name));
        popupMenu.appendChild(listItem);
        //popupMenu.selectedIndex = popupMenu.length-1; // JS 1.1+

        if (objList != null) {
          objList = objList + ":" + name;
        } else {
          objList = name;
        }

        setCookie(objListName, objList, getRelativeDate(90));
      }
  }

  // Add each item from the name list to the target menu element.
  function populateMenu(menuElement, nameList) {
      if (nameList != null) {
        for (var i=0; i<nameList.length; i++) {
          var listItem = document.createElement("option");
          listItem.appendChild(document.createTextNode(nameList[i]));
          menuElement.appendChild(listItem);          
        }      
      }
  }

  // Is the specified name a member of the list?
  function isMember(name, list) {

      if (list != null) {
        for (var i=0; i<list.length; i++) {
          if (list[i] == name) return 1;
        }
      }

      return 0;
  }
  
  // See Dr Dobbs Journal, January 2006 re: this AJAX code.
  // Note that we currently only support IE since FireFox et al
  // do not permit an XML document to be fetched from anywhere
  // other than a the server on which the HTML page resides,
  // whereas we need to go to the MPC website for data. The
  // code for non-IE browsers is there however, in case it works
  // at some point in the future.
 
  function loadXMLDoc(url, processXMLReqChange) {
  	if (window.ActiveXObject) {
  		req = new ActiveXObject("Microsoft.XMLHTTP");
  		if (req) {
  			req.onreadystatechange = processXMLReqChange;
  			req.open("GET", url, true);
  			req.send();
  		}
  	} else if (window.XMLHttpRequest) {
  		req = new XMLHttpRequest();
  		req.onreadystatechange = processXMLReqChange;
  		req.open("GET", url, true);
  		req.send(null);  		
  	}
  }
